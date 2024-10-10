import React from 'react';
import useStore from '@/store/useStore';

const Toast = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-black text-white p-4 rounded shadow-lg"
        >
          {toast.message}
          <button
            className="ml-2 text-gray-300"
            onClick={() => removeToast(toast.id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
