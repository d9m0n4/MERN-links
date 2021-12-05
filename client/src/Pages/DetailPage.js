import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LinkCard from '../components/LinkCard';
import Loader from '../components/loader';
import { authContext } from '../context/authContext';
import { useHttp } from '../hooks/http.hook';

const DetailPage = () => {
  const [link, setLink] = useState(null);
  const { token } = useContext(authContext);
  const { id } = useParams();
  const { request, loading } = useHttp();

  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/link/${id}`, 'GET', null, {
        authorization: `Bearer ${token}`,
      });
      setLink(data);
    } catch (error) {}
  }, [token, id, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <div>{!loading && link && <LinkCard link={link} />}</div>;
};

export default DetailPage;
