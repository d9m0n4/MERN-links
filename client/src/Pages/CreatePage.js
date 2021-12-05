import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authContext } from '../context/authContext';
import { useHttp } from '../hooks/http.hook';

const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(authContext);
  const [link, setLink] = useState('');
  const { request } = useHttp();

  const pressHandler = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          {
            from: link,
          },
          {
            authorization: `Bearer ${auth.token}`,
          },
        );

        console.log(data);
        history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <div className="input-field ">
          <input
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
            placeholder="Вставьте ссылку"
            id="link"
            type="email"
            value={link}
            className="validate"
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
