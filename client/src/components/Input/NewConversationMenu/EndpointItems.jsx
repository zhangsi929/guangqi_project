import React from 'react';
import EndpointItem from './EndpointItem.jsx';

export default function EndpointItems({ endpoints, onSelect }) {
  return (
    <>
      {endpoints.map((endpoint) => (
        <EndpointItem key={endpoint} value={endpoint} onSelect={onSelect} endpoint={endpoint} />
      ))}
    </>
  );
}
