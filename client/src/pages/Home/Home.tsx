import React from 'react';

type Props = {};

export default function Home({}: Props) {
  return (
    <div
      style={{
        paddingBlockStart: '80px',
        height: 1000,
      }}
    >
      <div className="container">
        <div className="content">
        Hello word
        </div>
      </div>
    </div>
  );
}
