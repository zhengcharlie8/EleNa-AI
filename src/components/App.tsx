import React from 'react';
import LeafletMap from './LeafletMap';
import { MainInterface } from './MainInterface';

const App: React.FC = () => {
  var map = <LeafletMap />;
  var mainInterface = <MainInterface />;

  return (
    <>
      {mainInterface}
      {map}
    </>

  )
}
export default App
