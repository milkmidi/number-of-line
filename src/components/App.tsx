import { useEffect, useState } from 'react';
import { validationBirthDay, parserBirthDay } from '@/utils';
// @ts-ignore
import InputMask from 'react-input-mask';
// import SVGCircle from './components/SVGCircle';
// import SVGTriangle from './components/SVGTriangle';
// import SVGSquare from './components/SVGSquare';
import ResultNumber, { type ResultNumberProps } from './components/ResultNumber';

/**
 * 先天圓形⭕️🟢
 * 後天三角 ▲🔺
 * 本命方形🟦
 */

const App = () => {
  const [numberResults, setNumberResults] = useState<number[]>([]);
  const [nineMap, setNineMap] = useState<Record<string, ResultNumberProps>>({});
  const [input, setInput] = useState('');
  useEffect(() => {
    const isBirthDay = validationBirthDay(input);
    if (isBirthDay) {
      const results = parserBirthDay(input);
      setNumberResults(results);

      const nineMapResults: Record<string, ResultNumberProps> = {};
      Array.from(Array(9).keys()).forEach((i) => {
        nineMapResults[i + 1] = {
          number: i + 1,
          circleCount: 0,
          triangleCount: 0,
          squareCount: 0,
        };
      });

      input
        .split('/')
        .join('')
        .split('')
        .forEach((text) => {
          if (text !== '0') {
            // @ts-ignore
            nineMapResults[text].circleCount += 1;
          }
        });

      results[0]
        .toString()
        .split('')
        .forEach((text) => {
          if (text !== '0') {
            // @ts-ignore
            nineMapResults[text].triangleCount += 1;
          }
        });

      const mainLifeNumber = results[2].toString();
      if (mainLifeNumber !== '0') {
        // @ts-ignore
        nineMapResults[mainLifeNumber].squareCount += 1;
      }
      setNineMap(nineMapResults);
    } else {
      setNumberResults([]);
      setNineMap({});
    }
  }, [input]);

  return (
    <div className="app container mx-auto">
      <div className="mx-auto max-w-xl space-y-4 py-5">
        <h1 className="text-center text-3xl">
          西元生日
          <br />
          先天數
        </h1>
        <div>
          <InputMask
            mask="9999/99/99"
            className="input input-bordered w-full text-center text-3xl"
            onChange={(e: any) => setInput(e.target.value)}
            value={input}
          />
        </div>
        <div className="border">
          {numberResults.length === 3 && (
            <div className="flex text-center text-4xl">
              <div className="w-1/3">
                <p>後天數</p>
                <p>{numberResults[0]}</p>
              </div>
              <div className="w-1/3">
                <p>卓越數</p>
                <p>{numberResults[1]}</p>
              </div>
              <div className="w-1/3">
                <p>主命數</p>
                <p>{numberResults[2]}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap border text-center text-4xl child:w-1/3 child:py-4">
          {Object.values(nineMap).map((r) => {
            return <ResultNumber key={r.number} {...r} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
