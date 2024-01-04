import React from 'react';
import styled, { keyframes } from 'styled-components';

const moveBlob = keyframes`
  0% {
    border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
    transform: translate(0, 0);
  }
  25% {
    border-radius: 70% 30% 70% 30% / 50% 50% 50% 50%;
    transform: translate(${Math.random() * 50}%, ${Math.random() * 50}%);
  }
  50% {
    border-radius: 70% 30% 70% 30% / 50% 50% 50% 50%;
    transform: translate(${Math.random() * 50}%, ${Math.random() * 50}%);
  }
  75% {
    border-radius: 50% 50% 50% 50% / 70% 30% 70% 30%;
    transform: translate(${Math.random() * 50}%, ${Math.random() * 50}%);
  }
  100% {
    border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
    transform: translate(0, 0);
  }
`;

const moveWhiteBlob = keyframes`
  0% {
    border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
    transform: translate(0, 0);
  }
  25% {
    border-radius: 70% 30% 70% 30% / 50% 50% 50% 50%;
    transform: translate(${Math.random() * -50}%, ${Math.random() * -50}%);
  }
  50% {
    border-radius: 70% 30% 70% 30% / 50% 50% 50% 50%;
    transform: translate(${Math.random() * -50}%, ${Math.random() * -50}%);
  }
  75% {
    border-radius: 50% 50% 50% 50% / 70% 30% 70% 30%;
    transform: translate(${Math.random() * -50}%, ${Math.random() * -50}%);
  }
  100% {
    border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
    transform: translate(0, 0);
  }
`;

const Blob = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: #353333; /* Kolor bloba */
  animation: ${moveBlob} 10s infinite; /* Zwiększony czas trwania animacji */
`;

const WhiteBlob = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: #AAAAAA; /* Kolor bloba w odcieniach szarości */
  animation: ${moveWhiteBlob} 10s infinite; /* Zwiększony czas trwania animacji */
`;

const BlobAnimation = () => {
  return (
    <>
      <Blob />
      <WhiteBlob />
    </>
  );
};

export default BlobAnimation;
