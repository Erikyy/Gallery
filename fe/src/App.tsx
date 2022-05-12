import React, { FC, useEffect } from 'react';
import { useLogin } from './utils/Api';

const App: FC = () => {
  const { loading, login } = useLogin();
  useEffect(() => {
    login('erik', 'Maastik900');
  }, []);
  return (
    <div className="border border-gray-50 rounded-xl p-20 shadow-xl"></div>
  );
};

export default App;
