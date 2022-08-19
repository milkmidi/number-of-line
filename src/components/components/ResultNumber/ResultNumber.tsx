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
        const idx = i + 1;
        const size = (32 * idx) | (0 + 16);
        const center = size / 2;
        const radius = center - 2;
        return (
          <svg
            key={i}
            height={size}
            width={size}
            viewBox={`0 0 ${size} ${size}`}
            data-type="circle"
            className={style.svg}
          >
            <circle cx={center} cy={center} r={radius} stroke="#0000ff" />
          </svg>
        );
      })}
      {Array.from(Array(triangleCount).keys()).map((i) => {
        const size = 50 * ((i + 1) * 0.8) + 10;
        const center = size / 2;
        const sizeMinusStorke = size - 3;
        return (
          <svg
            key={i}
            height={size}
            width={size}
            viewBox={`0 0 ${size} ${size}`}
            data-type="triangle"
            className={style.svg}
          >
            <polygon
              points={`${center} 0, ${sizeMinusStorke} ${sizeMinusStorke}, 0 ${sizeMinusStorke}`}
              stroke="#2ecc71"
            />
          </svg>
        );
      })}

      {Array.from(Array(squareCount).keys()).map((i) => {
        const size = 50 * ((i + 1) * 1.2);
        return (
          <svg
            key={i}
            height={size}
            width={size}
            viewBox="0 0 50 50"
            data-type="square"
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
