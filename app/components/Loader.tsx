'use client';

import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <Wrapper aria-label="Loading content" role="status">
      <div className="spinner">
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    position: relative;
    width: 36px;
    height: 36px;
    perspective: 80px;
  }

  .spinner div {
    width: 100%;
    height: 100%;
    background: rgba(239, 237, 221, 0.9); /* Matches #EFEDDD with transparency */
    position: absolute;
    left: 50%;
    transform-origin: left;
    animation: spinY 2s infinite;
    border-radius: 4px;
  }

  @keyframes spinY {
    0% {
      transform: rotateY(0deg);
    }
    50%, 80% {
      transform: rotateY(-180deg);
    }
    90%, 100% {
      opacity: 0;
      transform: rotateY(-180deg);
    }
  }
`;

export default Loader;
