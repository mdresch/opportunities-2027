import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import {
  doc,
  getDocFromServer,
  getFirestore,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import type { EmailDeliveryStatus, ScopingInquiryPayload } from './types';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

void testConnection();

const ALLOWED_TARGET_WINDOWS = new Set([
  'Q1 2027',
  'Q2 2027',
  'H2 2027',
  'Immediate / Exploratory',
]);

export async function saveScopingInquiryToFirestore(
  referenceId: string,
  inquiry: ScopingInquiryPayload,
  emailDeliveryStatus: EmailDeliveryStatus
): Promise<void> {
  const cleanRef = referenceId.trim().slice(0, 32);
  const cleanName = inquiry.fullName.trim().slice(0, 120);
  const cleanEmail = inquiry.email.trim().slice(0, 160);
  const cleanOrg = inquiry.organization.trim().slice(0, 160);
  const cleanRole = (inquiry.role.trim() || 'Executive Sponsor').slice(0, 120);
  const cleanWindow = ALLOWED_TARGET_WINDOWS.has(inquiry.targetWindow)
    ? inquiry.targetWindow
    : 'Q1 2027';
  const cleanServices = inquiry.selectedServices
    .map((s) => s.trim().slice(0, 160))
    .filter((s) => s.length > 0)
    .slice(0, 12);
  const cleanNotes = inquiry.notes.trim().slice(0, 2000);

  const docPath = `scoping_inquiries/${cleanRef}`;
  try {
    await setDoc(doc(db, 'scoping_inquiries', cleanRef), {
      referenceId: cleanRef,
      fullName: cleanName,
      email: cleanEmail,
      organization: cleanOrg,
      role: cleanRole,
      targetWindow: cleanWindow,
      selectedServices: cleanServices,
      notes: cleanNotes,
      status: 'new',
      adminNotes: '',
      emailDeliveryStatus,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, docPath);
  }
}

export async function signInAdminWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutAdminGoogle(): Promise<void> {
  await signOut(auth);
}
