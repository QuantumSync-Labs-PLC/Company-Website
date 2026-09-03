import PropTypes from 'prop-types';
import Spinner from './Spinner';

export default function SuspenseFallback() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-qs-bg">
      <div className="glass rounded-glass shadow-neon-blue border border-qs-primary/10 p-10 sm:p-12 text-center">
        <Spinner size="w-12 h-12" />
        <p className="font-body text-lg sm:text-xl text-qs-text-section mt-6 font-semibold">Loading page...</p>
      </div>
    </div>
  );
}

SuspenseFallback.propTypes = {};
