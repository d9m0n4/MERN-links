import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [ready, setReady] = useState(false);

  const storageName = 'userData';

  const login = useCallback((jwt, id) => {
    setToken(jwt);
    setUserId(id);
    localStorage.setItem(storageName, JSON.stringify({ userId: id, token: jwt }));
  }, []);

  const logout = useCallback((jwt, id) => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login]);

  return {
    login,
    logout,
    token,
    userId,
    ready,
  };
};
