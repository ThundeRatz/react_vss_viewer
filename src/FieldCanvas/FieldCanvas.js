import React, { useEffect, useState } from 'react';
import './FieldCanvas.css';
import { draw_field, draw_single_robot, draw_robots } from './draw.js';

function FieldCanvas() {

  const component_id = 'field';

  const position = {
    yellow: [
      { x: 0.25, y: 0, theta: 0 },
      { x: 0.25, y: 0.25, theta: 0 },
      { x: 0.25, y: -0.25, theta: 0 }
    ],
    blue: [
      { x: -0.25, y: 0, theta: 0 },
      { x: -0.25, y: 0.25, theta: 0 },
      { x: -0.25, y: -0.25, theta: 0 }
    ],
  }

  const render = () => {

    const scale = 350;
    const canvas = document.getElementById(component_id);
    const { width, height } = canvas.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    draw_field(ctx, canvas.width, canvas.height, scale);
    draw_robots(ctx, position, width, height, scale);
  }

  useEffect(render);

  const click_handler = (event) => {
    event.preventDefault();
    console.log(event.clientX, event.clientY);
  }

  return <canvas className="App" id={component_id} onClick={click_handler} />;
  // return <canvas className="App" id={component_id} width="600" height="500" />;
}

export default FieldCanvas;