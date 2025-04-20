import { ModalType, useModalStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  redirectTo: ModalType;
}

const SignRedirect = ({ redirectTo }: Props) => {
  const { open } = useModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    open(redirectTo);
    navigate('/', { replace: true });
  }, [open, navigate]);

  return null;
};

export default SignRedirect;
