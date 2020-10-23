import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, Toast } from './styles';

const ToastContainer: React.FC = () => (
  <Container>
    <Toast type="error">
      <FiAlertCircle size={20} />

      <div>
        <strong>An error has occured</strong>
        <p>It was not possible to login on the application</p>
      </div>

      <button type="button">
        <FiXCircle size={18} />
      </button>
    </Toast>

    <Toast type="success">
      <FiAlertCircle size={20} />

      <div>
        <strong>An error has occured</strong>
        <p>It was not possible to login on the application</p>
      </div>

      <button type="button">
        <FiXCircle size={18} />
      </button>
    </Toast>

    <Toast>
      <FiAlertCircle size={20} />

      <div>
        <strong>An error has occured</strong>
        <p>It was not possible to login on the application</p>
      </div>

      <button type="button">
        <FiXCircle size={18} />
      </button>
    </Toast>
  </Container>
);

export default ToastContainer;
