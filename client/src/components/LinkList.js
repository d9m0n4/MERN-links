import React from 'react';
import { Link } from 'react-router-dom';

const LinkList = ({ links }) => {
  if (!links) {
    return <p>Ссылок пока неть</p>;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Откуда</th>
            <th>Куда</th>
            <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link, index) => {
            return (
              <tr key={link._id}>
                <td>{index + 1}</td>
                <td>{link.from}</td>
                <td>{link.to}</td>
                <td>
                  <Link to={`/detail/${link._id}`}>Открыть</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LinkList;
