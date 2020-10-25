import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, Toast } from './styles';

const ToastContainer: React.FC = () => (
  <Container>
    <Toast hasDescription type="error">
      <FiAlertCircle size={20} />

      <div>
        <strong>An error has occured</strong>
        <p>It was not possible to login on the application</p>
      </div>

      <button type="button">
        <FiXCircle size={18} />
      </button>
    </Toast>

    <Toast hasDescription={false} type="success">
      <FiAlertCircle size={20} />

      <div>
        <strong>Success</strong>
      </div>

      <button type="button">
        <FiXCircle size={18} />
      </button>
    </Toast>

    <Toast hasDescription>
      <FiAlertCircle size={20} />

      <div>
        <strong>Info</strong>
        <p>Here is your info</p>
      </div>

      <button type="button">
        <FiXCircle size={18} />
      </button>
    </Toast>
  </Container>
);

export default ToastContainer;
