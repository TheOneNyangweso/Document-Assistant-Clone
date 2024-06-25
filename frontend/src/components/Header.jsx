import React from 'react';

function Header({ title }) {
  return (
    <div className="has-text-centered m-2">
      <h1 className="title">{title}</h1>
    </div>
  );
}

export default Header;
