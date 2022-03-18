import React from 'react';

import './styles/loading.css';

export default function Loading() {
  return (
    <div className="loading-container">
      <p>Carregando..</p>
      <div className="loading" />
    </div>
  );
}
