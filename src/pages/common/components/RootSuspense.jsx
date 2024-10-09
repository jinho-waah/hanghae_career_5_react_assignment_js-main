import { LoadingPage } from '@/pages/loading/components/LoadingPage';
import React, { Suspense } from 'react';

export const RootSuspense = ({ children }) => {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
};
