import { ErrorPage } from '@/pages/error/components/ErrorPage';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const RootErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
  );
};
