import { pageRoutes } from '@/apiRoutes';
import { ApiErrorBoundary } from '@/pages/common/components/ApiErrorBoundary';
import Cookies from 'js-cookie';
import React, { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Skeleton } from '@/components/ui/skeleton';
import { useModal } from '@/hooks/useModal';
import { CartButton } from './CartButton';
import { ConfirmModal } from './ConfirmModal';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import useAuthStore from '../../../store/useAuthStore'; // Auth 관련 zustand store
import useCartStore from '../../../store/useCartStore'; // Cart 관련 zustand store

export const NavigationBar = () => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const { isLogin, user, logout, initializeAuth } = useAuthStore(); // Auth 관련 상태 및 액션
  const { cart, initCart } = useCartStore(); // Cart 관련 상태 및 액션

  // 페이지가 처음 로드될 때 쿠키에서 로그인 정보를 불러와 상태를 초기화
  useEffect(() => {
    initializeAuth(); // 로그인 상태 초기화
  }, []);

  // 로그인 상태와 유저 정보가 있을 때 장바구니를 초기화
  useEffect(() => {
    if (isLogin && user && cart.length === 0) {
      initCart(user.uid); // CartStore의 initCart 사용
    }
  }, [isLogin, user, cart.length, initCart]);

  const handleLogout = () => {
    openModal();
  };

  const handleConfirmLogout = () => {
    logout(); // AuthStore의 logout 사용
    Cookies.remove('accessToken');
    Cookies.remove('user');
    closeModal();
  };

  const handleClickLogo = () => {
    navigate(pageRoutes.main);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1
              className="text-xl font-bold cursor-pointer"
              onClick={handleClickLogo}
            >
              스파르타 마트
            </h1>
            <div className="flex items-center space-x-4">
              {isLogin ? (
                <ApiErrorBoundary>
                  <Suspense fallback={<Skeleton className="w-24 h-8" />}>
                    <CartButton cart={cart} />
                    <LogoutButton onClick={handleLogout} />
                  </Suspense>
                </ApiErrorBoundary>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>
      </nav>
      <ConfirmModal
        title="로그아웃 확인"
        description="로그아웃 하시겠습니까?"
        handleClickDisagree={closeModal}
        handleClickAgree={handleConfirmLogout}
        isModalOpened={isOpen}
      />
    </>
  );
};
