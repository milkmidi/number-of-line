import React from 'react';

export type ResultNumberProps = {
  number: number;
  circleCount?: number;
  triangleCount?: number;
  squareCount?: number;
};
const ResultNumber: React.FC<ResultNumberProps> = (props) => {
  const { number, circleCount = 0, triangleCount = 0, squareCount = 0 } = props;
  return (
    <div className="space-y-2 border text-3xl">
      <p className="text-5xl">{number}</p>
      <div className="flex items-center justify-center">
        {Array.from(Array(circleCount).keys()).map((i) => {
          return <div key={i}>🟢</div>;
        })}
      </div>
      <div className="flex items-center justify-center">
        {Array.from(Array(triangleCount).keys()).map((i) => {
          return <div key={i}>🔺</div>;
        })}
      </div>
      <div className="flex items-center justify-center">
        {Array.from(Array(squareCount).keys()).map((i) => {
          return <div key={i}>🟦</div>;
        })}
      </div>
    </div>
  );
};

export default React.memo(ResultNumber);
