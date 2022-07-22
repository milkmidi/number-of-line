import React from 'react';

const App: React.FC = () => {
  const [count] = React.useState(0);
  React.useEffect(() => {
    // https://webpack.js.org/api/module-methods/#magic-comments
    import(
      /* webpackChunkName: "my-chunk-utils" */
      /* webpackExports: ["default", "foo"] */
      '../utils'
    ).then((module) => {
      console.log(module);
      console.log(module.default());
      console.log(module.foo());
    });
  });
  return (
    <div className="app container mx-auto">
      <h1 className="mx-auto block text-5xl">hi react444</h1>
      <h1 className="text-3xl text-red-400">{count}</h1>
    </div>
  );
};

export default App;
