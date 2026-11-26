import React, { useEffect, useState } from 'react';
import { ArrowLeft, KeyRound, Lock } from 'lucide-react';

interface InternalAuthGateProps {
  onAuthenticated: (token: string, username: string) => void;
  onBackToClient: () => void;
}

interface AuthStatusResponse {
  authenticated: boolean;
  username: string | null;
  needsSetup: boolean;
  configuredViaEnv: boolean;
}

export const InternalAuthGate: React.FC<InternalAuthGateProps> = ({
  onAuthenticated,
  onBackToClient,
}) => {
  const [statusLoading, setStatusLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const checkStatus = async () => {
      setStatusLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/auth/status');
        if (!res.ok) throw new Error('Unable to check sign-in status');
        const data: AuthStatusResponse = await res.json();
        if (!cancelled) {
          setNeedsSetup(data.needsSetup);
        }
      } catch {
        if (!cancelled) {
          setError('Unable to reach the authentication service. Please refresh and try again.');
        }
      } finally {
        if (!cancelled) setStatusLoading(false);
      }
    };
    checkStatus();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedUser = username.trim();
    if (trimmedUser.length < 2) {
      setError('Please enter a valid username (at least 2 characters).');
      return;
    }

    if (needsSetup) {
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    } else if (!password) {
      setError('Please enter your password.');
      return;
    }

    setSubmitting(true);
    try {
      const endpoint = needsSetup ? '/api/auth/setup' : '/api/auth/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUser, password }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 409 && needsSetup) {
          setNeedsSetup(false);
        }
        setError(json.error || 'Authentication failed. Please check your credentials.');
        return;
      }

      if (typeof json.token === 'string' && typeof json.username === 'string') {
        setPassword('');
        setConfirmPassword('');
        onAuthenticated(json.token, json.username);
      } else {
        setError('Unexpected response from authentication server.');
      }
    } catch {
      setError('Network error while signing in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8fa] text-[#17243a] flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-[#dae3e9]">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToClient}
            className="font-display text-lg font-bold tracking-tight text-[#10253f] whitespace-nowrap cursor-pointer"
          >
            CBa Consult
          </button>

          <button
            type="button"
            onClick={onBackToClient}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#10253f] bg-[#f5f8fa] hover:bg-[#eef5f7] border border-[#dae3e9] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Client Showcase
          </button>
        </div>
      </header>

      {/* Main Auth Panel */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white border border-[#dae3e9] rounded-md overflow-hidden">
          <div className="px-6 py-5 bg-[#10253f] text-white border-b border-[#1e3b5c]">
            <div className="flex items-center gap-2 text-xs font-medium text-[#48c5b2] mb-1.5">
              {needsSetup ? <KeyRound className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>Opportunities 2027 · Restricted Access</span>
            </div>
            <h1 className="font-display text-xl font-bold tracking-tight">
              {needsSetup ? 'Set Internal Explorer Credentials' : 'Internal Portfolio Explorer'}
            </h1>
            <p className="text-xs text-[#c4d1df] mt-1.5 leading-relaxed">
              {needsSetup
                ? 'Claim your administrator username and password to unlock the internal portfolio inventory, Stage 2 hypotheses, and governance reports.'
                : 'Sign in with your CBa Consult credentials to access the internal portfolio inventory, governance registers, and executive reports.'}
            </p>
          </div>

          <div className="p-6">
            {statusLoading ? (
              <div className="space-y-4 py-2">
                <div className="h-4 w-1/3 bg-[#eef5f7] rounded animate-pulse" />
                <div className="h-10 w-full bg-[#f5f8fa] rounded animate-pulse" />
                <div className="h-4 w-1/3 bg-[#eef5f7] rounded animate-pulse" />
                <div className="h-10 w-full bg-[#f5f8fa] rounded animate-pulse" />
                <div className="h-10 w-full bg-[#eef5f7] rounded animate-pulse" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="internal-username"
                    className="block text-xs font-semibold text-[#10253f] mb-1.5"
                  >
                    Username
                  </label>
                  <input
                    id="internal-username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] placeholder:text-[#52647a] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="internal-password"
                    className="block text-xs font-semibold text-[#10253f] mb-1.5"
                  >
                    Password
                  </label>
                  <input
                    id="internal-password"
                    type="password"
                    autoComplete={needsSetup ? 'new-password' : 'current-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={needsSetup ? 'At least 8 characters' : 'Enter password'}
                    className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] placeholder:text-[#52647a] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                  />
                </div>

                {needsSetup && (
                  <div>
                    <label
                      htmlFor="internal-password-confirm"
                      className="block text-xs font-semibold text-[#10253f] mb-1.5"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="internal-password-confirm"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] placeholder:text-[#52647a] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                    />
                  </div>
                )}

                {error && (
                  <div
                    role="alert"
                    className="p-3 text-xs font-medium text-[#b91c1c] bg-[#fef2f2] border border-[#fecaca] rounded-md"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 text-sm font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] disabled:opacity-60 rounded-md transition-colors cursor-pointer"
                >
                  {submitting
                    ? needsSetup
                      ? 'Saving Credentials...'
                      : 'Signing In...'
                    : needsSetup
                    ? 'Create Admin Credentials & Enter'
                    : 'Sign In to Internal Explorer'}
                </button>

                {needsSetup && (
                  <p className="text-[11px] text-[#52647a] leading-relaxed pt-1">
                    These credentials unlock this server session immediately. For permanent
                    deployments, configure <span className="font-mono">ADMIN_USERNAME</span> and{' '}
                    <span className="font-mono">ADMIN_PASSWORD</span> in Settings &rarr; Secrets.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
