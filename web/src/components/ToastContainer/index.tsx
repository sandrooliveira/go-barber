import React from 'react';

import { Container } from './styles';

import Toast from './Toast';
import { ToastInfo } from '../../hooks/toast';

interface ToastContainerProps {
  toasts: ToastInfo[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => (
  <Container>
    {toasts.map(toast => (
      <Toast key={toast.id} toast={toast} />
    ))}
  </Container>
);

export default ToastContainer;
