import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details to console in development
    console.error('Error caught by boundary:', error, errorInfo);
    
    // You can also log to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative min-h-screen flex items-center justify-center bg-qs-bg px-4">
          <div className="glass rounded-glass shadow-neon p-8 w-full max-w-2xl mx-auto text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-qs-primary mb-4">
              Oops! Something Went Wrong
            </h1>
            <p className="font-body text-lg text-section mb-8">
              We're sorry for the inconvenience. An unexpected error occurred while rendering this page.
            </p>
            <div className="bg-qs-surface/70 rounded-lg p-4 mb-8 text-left overflow-auto max-h-48 border border-qs-primary/30">
              <p className="font-mono text-sm text-red-400 whitespace-pre-wrap break-words">
                {this.state.error?.toString()}
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center justify-center font-headline px-6 py-2.5 rounded-glass text-base font-bold transition shadow-neon bg-qs-gradient-primary text-qs-text hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-qs-accent"
            >
              Go Back Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
