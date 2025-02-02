'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push('/');
  }, [logout, router]);

  return <div>Logging out...</div>;
};

export default LogoutPage;
