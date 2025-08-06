// Enhanced ErrorBoundary.tsx with more substantial content
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Mail, BookOpen, HelpCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  private retryTimeoutId: number | null = null;

  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    retryCount: 0,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: true,
        error_boundary: true,
        component_stack: errorInfo.componentStack,
      });
    }

    if (this.state.retryCount < 3) {
      this.retryTimeoutId = window.setTimeout(() => {
        this.handleRetry();
      }, 2000 * (this.state.retryCount + 1));
    }
  }

  public componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  private handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
    }));
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, retryCount } = this.state;
      const canRetry = retryCount < 3;

      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {/* Error Header */}
              <div className="text-center mb-8">
                <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
                <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Oops! Something went wrong
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  We apologize for the inconvenience. The QR code generator encountered an unexpected error.
                </p>
              </div>

              {/* Error Details */}
              <div className="mb-8">
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Technical Details
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p className="font-mono text-xs bg-red-100 p-2 rounded border">
                          {error?.message || 'Unknown error occurred'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {canRetry && (
                    <button
                      onClick={this.handleRetry}
                      className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again {retryCount > 0 && `(${retryCount}/3)`}
                    </button>
                  )}

                  <button
                    onClick={this.handleReload}
                    className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reload Page
                  </button>

                  <button
                    onClick={this.handleGoHome}
                    className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Go to Homepage
                  </button>

                  <button
                    onClick={() => window.open('mailto:support@qr-pro-generator.com')}
                    className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </button>
                </div>
              </div>

              {/* Helpful Resources Section - THIS ADDS SUBSTANTIAL CONTENT */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  While You Wait - Helpful QR Code Resources
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">QR Code Best Practices</h4>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Ensure 2x2 inch minimum size for printing</li>
                      <li>• Use high contrast colors (dark on light)</li>
                      <li>• Test QR codes before deploying</li>
                      <li>• Include clear call-to-action text</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Popular Use Cases</h4>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Restaurant digital menus</li>
                      <li>• WiFi password sharing</li>
                      <li>• Business card contact info</li>
                      <li>• Event check-ins and tickets</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Troubleshooting Guide */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Common QR Code Issues & Solutions
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <h4 className="font-semibold">QR Code Won't Scan?</h4>
                    <p>Ensure adequate size (minimum 2cm x 2cm), high contrast, and clean printing. Try increasing error correction level.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Download Issues?</h4>
                    <p>Clear browser cache, disable ad blockers temporarily, or try a different browser. PNG format usually works best.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Bulk Generation Problems?</h4>
                    <p>Check CSV format: use 'filename' and 'value' columns. Keep file under 1000 rows for best performance.</p>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">💡 Pro Tips for Better QR Codes</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-green-800">
                  <div>
                    <h4 className="font-semibold mb-2">Design Tips</h4>
                    <ul className="space-y-1">
                      <li>• Add your logo in the center (up to 30% coverage)</li>
                      <li>• Use brand colors while maintaining contrast</li>
                      <li>• Include descriptive text: "Scan for Menu"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Placement Tips</h4>
                    <ul className="space-y-1">
                      <li>• Eye-level placement for easy scanning</li>
                      <li>• Avoid reflective surfaces and direct sunlight</li>
                      <li>• Consider scanning distance when sizing</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Error ID for support */}
              <div className="mt-6 text-center border-t pt-4">
                <p className="text-xs text-gray-500">
                  Error ID: {Date.now().toString(36)}-{Math.random().toString(36).substr(2, 5)} | 
                  Time: {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
