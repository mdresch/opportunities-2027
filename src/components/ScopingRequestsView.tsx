import React, { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  Check,
  Copy,
  Download,
  Inbox,
  Mail,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import {
  auth,
  db,
  handleFirestoreError,
  OperationType,
  signInAdminWithGoogle,
  signOutAdminGoogle,
} from '../firebase';
import { parseAssessmentInquiryNotes } from '../data/agentGovernanceAssessment';
import type {
  DeliveryChannelStatus,
  InquiryStatus,
  PersistedScopingInquiry,
} from '../types';

interface ScopingRequestsViewProps {
  authToken: string;
  onUnauthorized?: () => void;
}

const STATUS_OPTIONS: Array<{ value: InquiryStatus; label: string }> = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'archived', label: 'Archived' },
];

function formatTimestamp(ts: unknown): string | null {
  if (!ts) return null;
  if (ts instanceof Timestamp) {
    return ts.toDate().toISOString();
  }
  if (typeof ts === 'string') return ts;
  return null;
}

function formatReadableDate(iso: string | null): string {
  if (!iso) return 'Just now';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function escapeCsvCell(value: string): string {
  const safe = value.replace(/"/g, '""');
  return `"${safe}"`;
}

export const ScopingRequestsView: React.FC<ScopingRequestsViewProps> = ({
  authToken,
  onUnauthorized,
}) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(auth.currentUser);
  const [authReady, setAuthReady] = useState(false);
  const [googleSigningIn, setGoogleSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [inquiries, setInquiries] = useState<PersistedScopingInquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [firestoreError, setFirestoreError] = useState<string | null>(null);

  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryChannelStatus | null>(null);

  const [statusFilter, setStatusFilter] = useState<'all' | InquiryStatus>('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'op-itg-013'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copiedPortalLink, setCopiedPortalLink] = useState(false);

  const [draftStatus, setDraftStatus] = useState<InquiryStatus>('new');
  const [draftNotes, setDraftNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthReady(true);
      setFirestoreError(null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fetchDeliveryStatus = async () => {
      try {
        const res = await fetch('/api/inquiries/delivery-status', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.status === 401) {
          onUnauthorized?.();
          return;
        }
        if (res.ok) {
          const data: DeliveryChannelStatus = await res.json();
          if (!cancelled) setDeliveryStatus(data);
        }
      } catch {
        // Non-blocking status check
      }
    };
    fetchDeliveryStatus();
    return () => {
      cancelled = true;
    };
  }, [authToken, onUnauthorized]);

  useEffect(() => {
    if (!authReady || !firebaseUser) {
      setInquiries([]);
      setLoadingInquiries(false);
      return;
    }

    setLoadingInquiries(true);
    setFirestoreError(null);

    const q = query(collection(db, 'scoping_inquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rows: PersistedScopingInquiry[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            referenceId: typeof d.referenceId === 'string' ? d.referenceId : docSnap.id,
            fullName: typeof d.fullName === 'string' ? d.fullName : '',
            email: typeof d.email === 'string' ? d.email : '',
            organization: typeof d.organization === 'string' ? d.organization : '',
            role: typeof d.role === 'string' ? d.role : 'Executive Sponsor',
            targetWindow: typeof d.targetWindow === 'string' ? d.targetWindow : 'Q1 2027',
            selectedServices: Array.isArray(d.selectedServices)
              ? d.selectedServices.filter((s): s is string => typeof s === 'string')
              : [],
            notes: typeof d.notes === 'string' ? d.notes : '',
            status:
              d.status === 'contacted' || d.status === 'scheduled' || d.status === 'archived'
                ? d.status
                : 'new',
            adminNotes: typeof d.adminNotes === 'string' ? d.adminNotes : '',
            emailDeliveryStatus:
              d.emailDeliveryStatus === 'sent' || d.emailDeliveryStatus === 'failed'
                ? d.emailDeliveryStatus
                : 'not_configured',
            createdAt: formatTimestamp(d.createdAt),
            updatedAt: formatTimestamp(d.updatedAt),
          };
        });
        setInquiries(rows);
        setLoadingInquiries(false);
        setSelectedId((prev) => {
          if (prev && rows.some((r) => r.id === prev)) return prev;
          return rows[0]?.id ?? null;
        });
      },
      (error) => {
        setLoadingInquiries(false);
        try {
          handleFirestoreError(error, OperationType.LIST, 'scoping_inquiries');
        } catch {
          setFirestoreError(
            'Unable to read scoping inquiries with this Google account. Please sign in with your authorized CBa Consult account.'
          );
        }
      }
    );

    return () => unsubscribe();
  }, [authReady, firebaseUser]);

  const portalSubmissionsCount = useMemo(
    () => inquiries.filter((i) => parseAssessmentInquiryNotes(i.notes) !== null).length,
    [inquiries]
  );

  const filteredInquiries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return inquiries.filter((item) => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (sourceFilter === 'op-itg-013' && !parseAssessmentInquiryNotes(item.notes)) return false;
      if (!q) return true;
      return (
        item.referenceId.toLowerCase().includes(q) ||
        item.fullName.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.selectedServices.some((s) => s.toLowerCase().includes(q)) ||
        item.notes.toLowerCase().includes(q)
      );
    });
  }, [inquiries, statusFilter, sourceFilter, searchQuery]);

  const activeInquiry = useMemo(
    () =>
      filteredInquiries.find((i) => i.id === selectedId) ??
      inquiries.find((i) => i.id === selectedId) ??
      filteredInquiries[0] ??
      null,
    [filteredInquiries, inquiries, selectedId]
  );

  useEffect(() => {
    if (activeInquiry) {
      setDraftStatus(activeInquiry.status);
      setDraftNotes(activeInquiry.adminNotes);
      setSaveMessage(null);
      setConfirmDeleteId(null);
    }
  }, [activeInquiry?.id, activeInquiry?.status, activeInquiry?.adminNotes]);

  const handleGoogleConnect = async () => {
    setGoogleSigningIn(true);
    setAuthError(null);
    try {
      await signInAdminWithGoogle();
    } catch {
      setAuthError('Google sign-in was cancelled or failed. Please try again.');
    } finally {
      setGoogleSigningIn(false);
    }
  };

  const handleSaveTriage = async () => {
    if (!activeInquiry || saving) return;
    setSaving(true);
    setSaveMessage(null);
    const docPath = `scoping_inquiries/${activeInquiry.id}`;
    try {
      await updateDoc(doc(db, 'scoping_inquiries', activeInquiry.id), {
        status: draftStatus,
        adminNotes: draftNotes.trim().slice(0, 2000),
        updatedAt: serverTimestamp(),
      });
      setSaveMessage('Saved to Firestore.');
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.UPDATE, docPath);
      } catch {
        setSaveMessage('Failed to save changes. Check your admin permissions.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    setDeleting(true);
    const docPath = `scoping_inquiries/${id}`;
    try {
      await deleteDoc(doc(db, 'scoping_inquiries', id));
      setConfirmDeleteId(null);
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.DELETE, docPath);
      } catch {
        setFirestoreError('Failed to delete inquiry.');
      }
    } finally {
      setDeleting(false);
    }
  };

  const handleExportCsv = () => {
    const headers = [
      'Reference ID',
      'Submitted At',
      'Status',
      'Full Name',
      'Role',
      'Organization',
      'Email',
      'Target Window',
      'Shortlisted Services',
      'Client Notes',
      'Internal Notes',
      'Email Delivery',
    ];
    const lines = [
      headers.map(escapeCsvCell).join(','),
      ...filteredInquiries.map((item) =>
        [
          item.referenceId,
          item.createdAt || '',
          item.status,
          item.fullName,
          item.role,
          item.organization,
          item.email,
          item.targetWindow,
          item.selectedServices.join('; '),
          item.notes,
          item.adminNotes,
          item.emailDeliveryStatus,
        ]
          .map((v) => escapeCsvCell(String(v ?? '')))
          .join(',')
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cba-scoping-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const newCount = inquiries.filter((i) => i.status === 'new').length;
  const scheduledCount = inquiries.filter((i) => i.status === 'scheduled').length;

  const deliveryLabel = deliveryStatus
    ? deliveryStatus.emailConfigured && deliveryStatus.webhookConfigured
      ? 'Email + Webhook Active'
      : deliveryStatus.emailConfigured
      ? `Email Active`
      : deliveryStatus.webhookConfigured
      ? 'Webhook Active'
      : 'Firestore Only'
    : 'Checking...';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#dae3e9]">
        <div>
          <h1 className="text-2xl font-bold text-[#10253f] tracking-tight">
            Client Scoping Call Requests
          </h1>
          <p className="text-sm text-[#52647a] mt-1">
            Permanently stored in Firebase Firestore from the public Opportunities 2027 showcase,
            with triage status, internal notes, and optional email/webhook delivery.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.delete('view');
              url.searchParams.set('assessment', 'agent-governance');
              navigator.clipboard?.writeText(url.toString());
              setCopiedPortalLink(true);
              setTimeout(() => setCopiedPortalLink(false), 2500);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#075d68] bg-[#eef5f7] border border-[#0c8b82]/40 hover:bg-[#dff3f0] rounded-md whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copiedPortalLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedPortalLink ? 'OP-ITG-013 Link Copied' : 'Copy OP-ITG-013 Portal Link'}
          </button>
          {firebaseUser && (
            <>
              <button
                type="button"
                onClick={handleExportCsv}
                disabled={filteredInquiries.length === 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] disabled:opacity-50 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
              <button
                type="button"
                onClick={() => void signOutAdminGoogle()}
                className="px-3 py-1.5 text-xs font-medium text-[#52647a] hover:text-[#10253f] bg-[#f5f8fa] border border-[#dae3e9] rounded-md whitespace-nowrap shrink-0 cursor-pointer"
              >
                Disconnect Google ({firebaseUser.email})
              </button>
            </>
          )}
        </div>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#dae3e9] border border-[#dae3e9] rounded-md overflow-hidden">
        <div className="bg-white p-4">
          <div className="text-xs text-[#52647a] mb-1">Saved Requests</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#10253f]">
            {firebaseUser ? inquiries.length : '—'}
          </div>
          <div className="text-xs text-[#52647a] mt-0.5">Persisted in Firestore</div>
        </div>
        <div className="bg-white p-4">
          <div className="text-xs text-[#52647a] mb-1">OP-ITG-013 Portal</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#0c8b82]">
            {firebaseUser ? `${portalSubmissionsCount} / 10` : '—'}
          </div>
          <div className="text-xs text-[#52647a] mt-0.5">HYP-2027-013 intake target</div>
        </div>
        <div className="bg-white p-4">
          <div className="text-xs text-[#52647a] mb-1">New / Unreviewed</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#0c8b82]">
            {firebaseUser ? newCount : '—'}
          </div>
          <div className="text-xs text-[#52647a] mt-0.5">Awaiting initial follow-up</div>
        </div>
        <div className="bg-white p-4">
          <div className="text-xs text-[#52647a] mb-1">Calls Scheduled</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#10253f]">
            {firebaseUser ? scheduledCount : '—'}
          </div>
          <div className="text-xs text-[#52647a] mt-0.5">Active scoping pipeline</div>
        </div>
        <div className="bg-white p-4">
          <div className="text-xs text-[#52647a] mb-1">Inbox Delivery</div>
          <div className="text-base font-bold text-[#10253f] mt-1">{deliveryLabel}</div>
          <div className="text-xs text-[#52647a] mt-1 truncate">
            {deliveryStatus?.notifyEmail || 'Optional via Settings → Secrets'}
          </div>
        </div>
      </div>

      {/* Google Auth Verification Gate for Firestore Admin Reads */}
      {!authReady ? (
        <div className="bg-white border border-[#dae3e9] rounded-md p-8 text-center text-sm text-[#52647a]">
          Checking Firestore admin connection...
        </div>
      ) : !firebaseUser ? (
        <div className="bg-white border border-[#dae3e9] rounded-md p-8 max-w-xl mx-auto text-center space-y-4">
          <Inbox className="w-8 h-8 text-[#0c8b82] mx-auto" />
          <div>
            <h2 className="text-lg font-bold text-[#10253f]">
              Verify Your CBa Consult Google Account to Read Saved Requests
            </h2>
            <p className="text-sm text-[#40536b] mt-2 leading-relaxed">
              Scoping call inquiries contain client contact details and are locked down by
              Firestore security rules. Sign in with your verified Google account to view, update,
              and export all saved requests in real time.
            </p>
          </div>

          {authError && (
            <div className="text-xs font-medium text-[#b91c1c] bg-[#fef2f2] border border-[#fecaca] rounded-md p-3">
              {authError}
            </div>
          )}

          <div className="pt-1 flex justify-center">
            <button
              type="button"
              onClick={handleGoogleConnect}
              disabled={googleSigningIn}
              className="inline-flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-[#17243a] bg-white hover:bg-[#f5f8fa] border border-[#dae3e9] rounded-md shadow-xs transition-colors cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              <span>{googleSigningIn ? 'Signing in...' : 'Sign in with Google'}</span>
            </button>
          </div>
        </div>
      ) : firestoreError ? (
        <div className="bg-white border border-[#fecaca] rounded-md p-6 text-sm text-[#b91c1c] space-y-3">
          <div className="font-semibold">Firestore Access Denied</div>
          <p>{firestoreError}</p>
          <button
            type="button"
            onClick={() => void signOutAdminGoogle()}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md cursor-pointer"
          >
            Switch Google Account
          </button>
        </div>
      ) : (
        <>
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 bg-white border border-[#dae3e9] rounded-md">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#52647a] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client, organization, reference ID, or service..."
                className="w-full pl-9 pr-8 py-1.5 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] placeholder:text-[#52647a] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#52647a] hover:text-[#10253f] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 p-1 bg-[#f5f8fa] border border-[#dae3e9] rounded-md shrink-0">
                <button
                  type="button"
                  onClick={() => setSourceFilter('all')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    sourceFilter === 'all'
                      ? 'bg-[#10253f] text-white'
                      : 'text-[#52647a] hover:text-[#10253f]'
                  }`}
                >
                  All Sources
                </button>
                <button
                  type="button"
                  onClick={() => setSourceFilter('op-itg-013')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    sourceFilter === 'op-itg-013'
                      ? 'bg-[#0c8b82] text-white'
                      : 'text-[#52647a] hover:text-[#10253f]'
                  }`}
                >
                  OP-ITG-013 Portal ({portalSubmissionsCount})
                </button>
              </div>

              <div className="flex items-center gap-1 p-1 bg-[#f5f8fa] border border-[#dae3e9] rounded-md overflow-x-auto shrink-0">
                {(['all', 'new', 'contacted', 'scheduled', 'archived'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 text-xs font-medium rounded capitalize transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      statusFilter === st
                        ? 'bg-[#10253f] text-white'
                        : 'text-[#52647a] hover:text-[#10253f]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Master-Detail Inbox */}
          {loadingInquiries ? (
            <div className="bg-white border border-[#dae3e9] rounded-md p-8 space-y-3">
              <div className="h-5 w-1/3 bg-[#eef5f7] rounded animate-pulse" />
              <div className="h-16 w-full bg-[#f5f8fa] rounded animate-pulse" />
              <div className="h-16 w-full bg-[#f5f8fa] rounded animate-pulse" />
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="bg-white border border-[#dae3e9] rounded-md p-12 text-center">
              <Inbox className="w-7 h-7 text-[#52647a] mx-auto mb-2" />
              <p className="text-sm font-medium text-[#10253f]">
                {inquiries.length === 0
                  ? 'No scoping call requests submitted yet.'
                  : 'No scoping requests match your current filter.'}
              </p>
              <p className="text-xs text-[#52647a] mt-1">
                Every request submitted through the Client Showcase form will appear here in real
                time.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* List Column */}
              <div className="xl:col-span-5 bg-white border border-[#dae3e9] rounded-md divide-y divide-[#dae3e9] max-h-[680px] overflow-y-auto">
                {filteredInquiries.map((item) => {
                  const active = activeInquiry?.id === item.id;
                  const parsedPortal = parseAssessmentInquiryNotes(item.notes);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className={`w-full text-left p-4 transition-colors cursor-pointer ${
                        active ? 'bg-[#eef5f7]' : 'hover:bg-[#f8fbfc]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs mb-1">
                        <span className="font-mono font-semibold text-[#075d68]">
                          {item.referenceId}
                          {parsedPortal ? (
                            <span className="font-sans font-semibold text-[#0c8b82]">
                              {' '}
                              · OP-ITG-013 Portal
                            </span>
                          ) : null}
                        </span>
                        <span
                          className={`font-semibold capitalize ${
                            item.status === 'new'
                              ? 'text-[#0c8b82]'
                              : item.status === 'scheduled'
                              ? 'text-[#10253f]'
                              : 'text-[#52647a]'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-[#10253f] truncate">
                        {item.organization}
                      </div>
                      <div className="text-xs text-[#40536b] mt-0.5 truncate">
                        {item.fullName} · {item.role}
                      </div>
                      <div className="flex items-center justify-between gap-2 text-[11px] text-[#52647a] mt-2">
                        <span>
                          {parsedPortal
                            ? `Index ${parsedPortal.governanceIndex.split(' ')[0]} · ${parsedPortal.seatBand}`
                            : `Window: ${item.targetWindow}`}
                        </span>
                        <span>{formatReadableDate(item.createdAt)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detail Column */}
              {activeInquiry && (
                <div className="xl:col-span-7 bg-white border border-[#dae3e9] rounded-md overflow-hidden">
                  <div className="px-6 py-4 bg-[#f5f8fa] border-b border-[#dae3e9] flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#52647a] mb-1">
                        <span className="font-mono font-semibold text-[#075d68]">
                          {activeInquiry.referenceId}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{formatReadableDate(activeInquiry.createdAt)}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          Email alert:{' '}
                          <strong className="text-[#10253f]">
                            {activeInquiry.emailDeliveryStatus === 'sent'
                              ? 'Delivered'
                              : activeInquiry.emailDeliveryStatus === 'failed'
                              ? 'Failed'
                              : 'Not configured'}
                          </strong>
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-[#10253f]">
                        {activeInquiry.organization}
                      </h2>
                      <p className="text-sm text-[#40536b]">
                        {activeInquiry.fullName} ({activeInquiry.role}) ·{' '}
                        <a
                          href={`mailto:${activeInquiry.email}`}
                          className="text-[#0c8b82] hover:underline"
                        >
                          {activeInquiry.email}
                        </a>
                      </p>
                    </div>

                    <a
                      href={`mailto:${encodeURIComponent(
                        activeInquiry.email
                      )}?subject=${encodeURIComponent(
                        `CBa Consult — Scoping Call (${activeInquiry.referenceId})`
                      )}&body=${encodeURIComponent(
                        `Hello ${activeInquiry.fullName},\n\nThank you for submitting your scoping request (${activeInquiry.referenceId}) for ${activeInquiry.organization}.\n\nBest regards,\nMenno Drescher\nCBa Consult`
                      )}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#0c8b82] hover:bg-[#075d68] rounded-md whitespace-nowrap shrink-0"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Reply by Email
                    </a>
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-xs font-semibold text-[#52647a] mb-1">
                          Target Start Window
                        </div>
                        <div className="font-medium text-[#10253f]">
                          {activeInquiry.targetWindow}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#52647a] mb-1">
                          Shortlisted Services ({activeInquiry.selectedServices.length})
                        </div>
                        {activeInquiry.selectedServices.length > 0 ? (
                          <ul className="space-y-1 text-[#17243a]">
                            {activeInquiry.selectedServices.map((srv) => (
                              <li key={srv} className="text-xs leading-relaxed">
                                — {srv}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-xs text-[#52647a]">
                            Executive Discovery & Wedge Selection
                          </div>
                        )}
                      </div>
                    </div>

                    {(() => {
                      const parsed = parseAssessmentInquiryNotes(activeInquiry.notes);
                      if (!parsed) {
                        return (
                          <div className="pt-4 border-t border-[#dae3e9]">
                            <div className="text-xs font-semibold text-[#52647a] mb-1.5">
                              Client Context &amp; Objectives
                            </div>
                            <p className="text-sm text-[#17243a] leading-relaxed whitespace-pre-wrap bg-[#f5f8fa] border border-[#dae3e9] rounded-md p-4">
                              {activeInquiry.notes || 'No additional notes provided.'}
                            </p>
                          </div>
                        );
                      }
                      return (
                        <div className="pt-4 border-t border-[#dae3e9] space-y-4">
                          <div className="bg-[#eef5f7] border border-[#dae3e9] rounded-md p-4 space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="text-xs font-bold text-[#10253f]">
                                OP-ITG-013 Self-Assessment Scorecard
                              </div>
                              <div className="text-xs font-mono text-[#075d68]">
                                {parsed.mode}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div>
                                <div className="text-[#52647a]">Governance Index</div>
                                <div className="font-mono font-bold text-[#10253f] mt-0.5">
                                  {parsed.governanceIndex}
                                </div>
                              </div>
                              <div>
                                <div className="text-[#52647a]">Exposure Posture</div>
                                <div className="font-semibold text-[#10253f] mt-0.5">
                                  {parsed.exposurePosture}
                                </div>
                              </div>
                              <div>
                                <div className="text-[#52647a]">Seat Band</div>
                                <div className="font-medium text-[#10253f] mt-0.5">
                                  {parsed.seatBand}
                                </div>
                              </div>
                              <div>
                                <div className="text-[#52647a]">Recommended Entry</div>
                                <div className="font-semibold text-[#0c8b82] mt-0.5">
                                  {parsed.recommendedTier}
                                </div>
                              </div>
                            </div>

                            <div className="text-xs pt-2 border-t border-[#dae3e9] space-y-1.5">
                              <div>
                                <span className="font-semibold text-[#10253f]">P0 Red Flags: </span>
                                <span className="text-[#40536b]">{parsed.redFlags}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-[#10253f]">Platforms: </span>
                                <span className="text-[#40536b]">{parsed.platforms}</span>
                              </div>
                              {parsed.pillarScores && (
                                <div>
                                  <span className="font-semibold text-[#10253f]">
                                    Pillar Scores:{' '}
                                  </span>
                                  <span className="font-mono text-[11px] text-[#40536b]">
                                    {parsed.pillarScores}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {parsed.clientContext && (
                            <div>
                              <div className="text-xs font-semibold text-[#52647a] mb-1.5">
                                Additional Client Context
                              </div>
                              <p className="text-sm text-[#17243a] leading-relaxed whitespace-pre-wrap bg-[#f5f8fa] border border-[#dae3e9] rounded-md p-4">
                                {parsed.clientContext}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Admin Triage Controls */}
                    <div className="pt-4 border-t border-[#dae3e9] space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="inquiry-status-select"
                            className="block text-xs font-semibold text-[#10253f] mb-1.5"
                          >
                            Triage Status
                          </label>
                          <select
                            id="inquiry-status-select"
                            value={draftStatus}
                            onChange={(e) => setDraftStatus(e.target.value as InquiryStatus)}
                            className="w-full px-3 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="inquiry-admin-notes"
                          className="block text-xs font-semibold text-[#10253f] mb-1.5"
                        >
                          Internal Follow-Up Notes
                        </label>
                        <textarea
                          id="inquiry-admin-notes"
                          rows={3}
                          maxLength={2000}
                          value={draftNotes}
                          onChange={(e) => setDraftNotes(e.target.value)}
                          placeholder="Record call date, proposed Phase 0 wedge, or proposal milestones..."
                          className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={handleSaveTriage}
                            disabled={saving}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] disabled:opacity-50 rounded-md cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            {saving ? 'Saving...' : 'Save Changes'}
                          </button>
                          {saveMessage && (
                            <span className="text-xs font-medium text-[#0c8b82]">
                              {saveMessage}
                            </span>
                          )}
                        </div>

                        {confirmDeleteId === activeInquiry.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#b91c1c] font-medium">
                              Delete permanently?
                            </span>
                            <button
                              type="button"
                              onClick={() => void handleDeleteInquiry(activeInquiry.id)}
                              disabled={deleting}
                              className="px-3 py-1.5 text-xs font-medium text-white bg-[#dc2626] hover:bg-[#b91c1c] rounded-md cursor-pointer"
                            >
                              {deleting ? 'Deleting...' : 'Confirm'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-2.5 py-1.5 text-xs text-[#52647a] hover:text-[#10253f] cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(activeInquiry.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#52647a] hover:text-[#dc2626] rounded-md cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Optional Email / Webhook Delivery Configuration Info */}
      {deliveryStatus && !deliveryStatus.emailConfigured && !deliveryStatus.webhookConfigured && (
        <div className="bg-[#eef5f7] border border-[#dae3e9] rounded-md p-5 text-xs text-[#40536b] space-y-1.5">
          <div className="font-semibold text-[#10253f]">
            Optional Automatic Inbox Alerts (Email or Webhook)
          </div>
          <p className="leading-relaxed">
            All requests are already saved permanently in Firestore above. To also receive instant
            email alerts when a client submits the form, add either{' '}
            <span className="font-mono text-[#10253f]">RESEND_API_KEY</span> +{' '}
            <span className="font-mono text-[#10253f]">SCOPING_NOTIFY_EMAIL</span> (direct email)
            or <span className="font-mono text-[#10253f]">SCOPING_WEBHOOK_URL</span> (for Zapier,
            Make, or Power Automate to Gmail) in <strong>Settings &rarr; Secrets</strong>.
          </p>
        </div>
      )}
    </div>
  );
};
