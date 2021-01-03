import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiInfo,
  FiXCircle,
  FiCheckCircle,
} from 'react-icons/fi';
import { ToastInfo, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  toast: ToastInfo;
  style: object;
}

const icons = {
  success: <FiCheckCircle size={24} />,
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ toast, style }: ToastProps) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, toast.id]);

  return (
    <Container
      hasDescription={Number(!!toast.description)}
      style={style}
      type={toast.type}
    >
      {icons[toast.type || 'info']}

      <div>
        <strong>{toast.title}</strong>
        {!!toast.description && <p>{toast.description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(toast.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
