import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/authContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import M from 'materialize-css';

const AuthPage = () => {
  const auth = useContext(authContext);
  const message = useMessage();
  const { request, error, loading, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const regHandler = async () => {
    try {
      const data = await request('api/auth/register', 'POST', { ...form });
      message(data.userId);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('api/auth/login', 'POST', { ...form });
      message(data.userId);
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field ">
                <input
                  onChange={changeHandler}
                  placeholder="Введите email"
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  className="validate"
                />
              </div>
              <div className="input-field ">
                <input
                  onChange={changeHandler}
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  className="validate"
                />
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              disabled={loading}
              onClick={loginHandler}
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}>
              Войти
            </button>
            <button disabled={loading} onClick={regHandler} className="btn grey lighten-1">
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
