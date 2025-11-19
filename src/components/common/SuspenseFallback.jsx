import PropTypes from 'prop-types';
import Spinner from './Spinner';

export default function SuspenseFallback() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-qs-bg">
      <div className="text-center">
        <Spinner />
        <p className="font-body text-lg text-section mt-4">Loading page...</p>
      </div>
    </div>
  );
}

SuspenseFallback.propTypes = {};
