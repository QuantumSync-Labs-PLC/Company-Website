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
          <div className="glass rounded-glass shadow-neon-blue border border-qs-primary/20 p-10 sm:p-12 w-full max-w-3xl mx-auto text-center">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold holo-text mb-6">
              Oops! Something Went Wrong
            </h1>
            <p className="font-body text-lg sm:text-xl text-qs-text-section mb-8 leading-relaxed">
              We're sorry for the inconvenience. An unexpected error occurred while rendering this page.
            </p>
            <div className="bg-qs-surface/70 rounded-glass p-5 mb-10 text-left overflow-auto max-h-56 border border-qs-primary/30">
              <p className="font-mono text-sm text-qs-danger whitespace-pre-wrap break-words">
                {this.state.error?.toString()}
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center justify-center font-headline px-10 py-4 rounded-glass text-base font-bold transition-all duration-300 shadow-neon-blue bg-qs-primary text-qs-on-primary hover:bg-qs-primary-hover hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-qs-primary"
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
