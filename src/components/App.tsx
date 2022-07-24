import { useEffect, useState, useRef } from 'react';
import { validationBirthDay, parserBirthDay, type NumberOfLifeResult } from '@/utils';
// @ts-ignore
import InputMask from 'react-input-mask';
// import SVGCircle from './components/SVGCircle';
// import SVGTriangle from './components/SVGTriangle';
// import SVGSquare from './components/SVGSquare';
import ResultNumber, { type ResultNumberProps } from './components/ResultNumber';

/**
 * 先天圓形⭕️🟢
 * 後天三角 ▲🔺
 * 卓越三角 ▲🔺
 * 本命方形🟦
 */

const App = () => {
  const [name, setName] = useState('');
  const [numberResult, setNumberResult] = useState<NumberOfLifeResult | null>(null);
  const [nineMap, setNineMap] = useState<Record<string, ResultNumberProps>>({});
  const [input, setInput] = useState(() => {
    const u = new URLSearchParams(window.location.search);
    return u.get('d') || '';
  });

  const birthInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isBirthDay = validationBirthDay(input);
    if (isBirthDay) {
      const result = parserBirthDay(input);
      setNumberResult(result);

      birthInputRef.current?.blur();

      window.history.pushState({}, '', `?d=${input}`);

      // TODO，抽離至 utils 寫
      const nineMapResults: Record<string, ResultNumberProps> = {};
      Array.from(Array(10).keys()).forEach((i) => {
        nineMapResults[i] = {
          number: i,
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
          // @ts-ignore
          nineMapResults[text].circleCount += 1;
        });

      result.major
        .toString()
        .split('')
        .forEach((text) => {
          // @ts-ignore
          nineMapResults[text].triangleCount += 1;
        });
      result.minor
        .toString()
        .split('')
        .forEach((text) => {
          // @ts-ignore
          nineMapResults[text].triangleCount += 1;
        });

      const mainLifeNumber = result.patch.toString();
      // @ts-ignore
      nineMapResults[mainLifeNumber].squareCount += 1;
      delete nineMapResults['0'];
      setNineMap(nineMapResults);
    } else {
      setNumberResult(null);
      setNineMap({});
    }
  }, [input]);

  return (
    <div className="app container mx-auto px-5">
      <div className="mx-auto max-w-2xl space-y-4 py-5">
        <div>
          <div className="text-center text-3xl">Your Name</div>
          <input
            type="text"
            className="input input-bordered w-full text-3xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            ref={birthInputRef}
            value={input}
          />
        </div>
        <div className="border py-2">
          {numberResult && (
            <div className="flex text-center text-4xl">
              <div className="w-1/3 space-y-2">
                <p>後天數</p>
                <p>{numberResult.major}</p>
              </div>
              <div className="w-1/3 space-y-2">
                <p>{numberResult.minorText}</p>
                <p>{numberResult.minor}</p>
              </div>
              <div className="w-1/3 space-y-2">
                <p>主命數</p>
                <p>{numberResult.patch}</p>
              </div>
            </div>
          )}
        </div>
        <div className="-mx-2 flex flex-wrap text-center text-4xl child:w-1/3 child:px-2 child:py-4">
          {Object.values(nineMap).map((r) => {
            return (
              <div key={r.number}>
                <ResultNumber {...r} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
