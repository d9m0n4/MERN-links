import React from 'react';

const LinkCard = ({ link }) => {
  return (
    <div>
      <div className="col s12 m7">
        <h2 className="header">Horizontal Card</h2>
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <p>Ваша ссылка</p>
              <a href={link.to} target="_blank" rel="noopener noreferrer">
                {link.to}
              </a>
              <p>Откуда</p>
              <a href={link.from} target="_blank" rel="noopener noreferrer">
                {link.from}
              </a>
              <p>Количеств кликли по ссылке</p>
              <strong>{link.clicks}</strong>
              <p>Дата создания</p>
              <strong>{new Date(link.date).toLocaleDateString()}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
