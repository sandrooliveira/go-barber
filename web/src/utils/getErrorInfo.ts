import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

const getErrorInfo = (data: ValidationError): Errors => {
  const validationErrors: Errors = {};

  data.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
};

export default getErrorInfo;
