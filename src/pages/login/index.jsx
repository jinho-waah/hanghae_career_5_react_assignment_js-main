import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'js-cookie';
import { Lock, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { EMAIL_PATTERN } from '@/constants';
import { auth } from '@/firebase';
import { Layout, authStatusType } from '@/pages/common/components/Layout';
import useStore from '@/store/useStore'; // zustand 스토어 사용

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLogin, setUser } = useStore(); // zustand 액션 가져오기

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleClickRegister = () => {
    navigate(pageRoutes.register);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!email) {
      formErrors.email = '이메일을 입력하세요';
    } else if (!EMAIL_PATTERN.test(email)) {
      formErrors.email = '이메일 양식이 올바르지 않습니다';
    }
    if (!password) {
      formErrors.password = '비밀번호를 입력하세요';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleClickLoginButton = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();

        Cookies.set('accessToken', token, { expires: 7 });

        // zustand로 로그인 상태 설정
        setIsLogin(true);
        setUser({
          uid: user.uid,
          email: user.email ?? '',
          displayName: user.displayName ?? '',
        });

        navigate(pageRoutes.main);
      } catch (error) {
        console.error(
          '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
          error
        );
        setErrors({
          form: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
        });
      }
    }
  };

  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="w-full h-screen max-w-md mx-auto space-y-8 flex flex-col justify-center">
        <form onSubmit={handleClickLoginButton} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                type="email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                type="password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}
          <Button type="submit" className="w-full" aria-label="로그인">
            로그인
          </Button>
        </form>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleClickRegister}
        >
          회원가입
        </Button>
      </div>
    </Layout>
  );
};
