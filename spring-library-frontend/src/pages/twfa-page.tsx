import { useModalStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const TwoFApage = () => {
  const { open } = useModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    open('twoFALogin');
    navigate('/', { replace: true });
  }, []);

  return <></>;
};

export default TwoFApage;
