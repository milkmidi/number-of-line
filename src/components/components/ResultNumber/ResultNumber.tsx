/* eslint-disable no-bitwise */
import React from 'react';
import style from './ResultNumber.module.scss';

export type ResultNumberProps = {
  number: number;
  circleCount?: number;
  triangleCount?: number;
  squareCount?: number;
};
const ResultNumber: React.FC<ResultNumberProps> = (props) => {
  const { number, circleCount = 0, triangleCount = 0, squareCount = 0 } = props;
  return (
    <div className={style.root}>
      <p className="text-2xl font-bold">{number}</p>
      {Array.from(Array(circleCount).keys()).map((i) => {
        const size = (50 * ((i + 1) * 0.8)) | 0;
        return (
          <svg
            key={i}
            height={size}
            width={size}
            viewBox="0 0 50 50"
            className={style.svg}
          >
            <circle cx="25" cy="25" r="20" stroke="black" />
          </svg>
        );
      })}
      {Array.from(Array(triangleCount).keys()).map((i) => {
        const size = 50 * ((i + 1) * 0.8);
        return (
          <svg
            key={i}
            height={size}
            width={size}
            viewBox="0 0 50 50"
            className={style.svg}
          >
            <polygon points="25 0, 50 48, 0 48" stroke="#3498db" />
          </svg>
        );
      })}

      {Array.from(Array(squareCount).keys()).map((i) => {
        const size = 50 * ((i + 1) * 0.8);
        return (
          <svg
            key={i}
            height={size}
            width={size}
            viewBox="0 0 50 50"
            className={style.svg}
          >
            <polygon points="2 2, 48 2,48 48, 2 48" stroke="#c0392b" />
          </svg>
        );
      })}
    </div>
  );
};

export default React.memo(ResultNumber);
