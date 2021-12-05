import React, { useCallback, useContext, useEffect, useState } from 'react';
import LinkList from '../components/LinkList';
import Loader from '../components/loader';
import { authContext } from '../context/authContext';
import { useHttp } from '../hooks/http.hook';

const LinksPage = () => {
  const [links, setLinks] = useState(null);
  const { token } = useContext(authContext);
  const { request, loading } = useHttp();

  const getLinks = useCallback(async () => {
    try {
      const data = await request(`/api/link/`, 'GET', null, {
        authorization: `Bearer ${token}`,
      });
      setLinks(data);
    } catch (error) {}
  }, [token, request]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (loading) {
    return <Loader />;
  }
  return <div>{!loading && <LinkList links={links} />}</div>;
};

export default LinksPage;
