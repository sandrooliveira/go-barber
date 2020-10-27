import React from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';

import Toast from './Toast';
import { ToastInfo } from '../../hooks/toast';

interface ToastContainerProps {
  toasts: ToastInfo[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const toastsWithTransition = useTransition(toasts, toast => toast.id, {
    from: { right: '-120%' },
    enter: { right: '0%' },
    leave: { right: '-120%' },
  });

  return (
    <Container>
      {toastsWithTransition.map(({ item, key, props }) => (
        <Toast key={key} style={props} toast={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
