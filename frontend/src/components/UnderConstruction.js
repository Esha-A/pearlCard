import React from "react";

export default function UnderConstruction({ title }) {
  return (
    <div style={{ padding: '48px', textAlign: 'center' }}>
      <h2>{title}</h2>
      <p style={{ fontSize: 20, color: '#888' }}>Page under construction</p>
    </div>
  );
}
