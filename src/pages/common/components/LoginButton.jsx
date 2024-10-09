import { pageRoutes } from '@/apiRoutes';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const LoginButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickLogin = () => {
    navigate(pageRoutes.login, { state: { prevPath: location.pathname } });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-primary hover:text-primary-dark"
      onClick={handleClickLogin}
    >
      로그인
    </Button>
  );
};
