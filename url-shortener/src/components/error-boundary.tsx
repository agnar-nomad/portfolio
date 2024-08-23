import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();  // This hook provides the error details

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h1>
      <p className="text-gray-600 mb-4">
        {/* @ts-expect-error any types */}
        {error?.statusText || error?.message || 'An unexpected error has occurred.'}
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Go Back to Home
      </button>
    </div>
  );
}

export default ErrorPage;