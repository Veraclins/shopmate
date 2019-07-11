import { useState, useEffect } from 'react';
import api from 'services/api';
import { AxiosRequestConfig } from 'axios';
import { useDispatch } from 'react-redux';
import { changeStatus, throwError } from 'state/status';

export const useForm = (initialValues: any, callback) => {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    callback(values);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((values: any) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export const useAxios = (
  { url, method = 'get', data }: AxiosRequestConfig,
  initializer
) => {
  const [result, setResult] = useState(initializer);
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      try {
        if (!url) return;

        dispatch(changeStatus(true));
        const response = await api[method](url, data);
        const payload = response.data;
        setResult(payload);
        dispatch(changeStatus(false));
      } catch (error) {
        dispatch(throwError(error.message));
      }
    };
    load();
  }, [url, method, data, dispatch]);
  return result;
};
