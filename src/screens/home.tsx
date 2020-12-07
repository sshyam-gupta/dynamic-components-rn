import React from 'react';
import Canvas from '../components/Canvas';
import CANVAS_DATA from '../constants/canvas-data';

function Home() {
  return <Canvas canvasData={CANVAS_DATA} />;
}

export default Home;
