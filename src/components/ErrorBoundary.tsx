import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  resetKey?: string;
  title?: string;
  onBackToClient?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    let message = 'Something went wrong while loading this section.';
    if (error?.message) {
      try {
        const parsed = JSON.parse(error.message) as { error?: string };
        if (parsed?.error) {
          message = parsed.error.includes('permission')
            ? 'Access denied by database permissions. Please sign in with your authorized CBa Consult Google account.'
            : parsed.error;
        }
      } catch {
        message = error.message;
      }
    }
    return { hasError: true, message };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, message: '' });
    }
  }

  componentDidCatch(error: Error): void {
    console.error('ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="bg-white border border-[#dae3e9] rounded-md p-8 max-w-lg mx-auto my-12 text-center"
        >
          <h2 className="text-base font-semibold text-[#10253f]">
            {this.props.title ?? 'Unable to Load Section'}
          </h2>
          <p className="text-sm text-[#52647a] mt-2 leading-relaxed">{this.state.message}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, message: '' })}
              className="px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md cursor-pointer"
            >
              Try Again
            </button>
            {this.props.onBackToClient && (
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, message: '' });
                  this.props.onBackToClient?.();
                }}
                className="px-4 py-2 text-xs font-medium text-[#10253f] bg-[#f5f8fa] hover:bg-[#eef5f7] border border-[#dae3e9] rounded-md cursor-pointer"
              >
                Return to Client Portfolio
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
