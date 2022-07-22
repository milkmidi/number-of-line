import { useEffect, useState } from 'react';

const App = () => {
  const [birthDay, setBirthDay] = useState('');
  useEffect(() => {
    console.log(birthDay);
  }, [birthDay]);

  return (
    <div className="app container mx-auto">
      <div>
        <input
          type="number"
          className="input input-bordered"
          value={birthDay}
          onChange={(e) => setBirthDay(e.target.value)}
        />
      </div>

      <button className="btn btn-primary">123</button>
    </div>
  );
};

export default App;
