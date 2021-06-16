import React, { useEffect, useState } from 'react';
import { connect_ros, set_robot_pos, update_canvas } from './FieldSlice.js';
import { useSelector, useDispatch } from 'react-redux'
import './FieldCanvas.css';
import ROSLIB from 'roslib';
import { to_euler_angles } from '../utils/math.js';
import { draw_field, draw_single_robot, draw_robots, transform_pixel_meter } from './draw.js';

const ros = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
});

const gazebo_service = new ROSLIB.Service({
  ros: ros,
  name: '/gazebo/get_model_state',
  messageType: 'gazebo_msgs/GetModelState'
});

export default function FieldCanvas() {

  const field_state = useSelector(state => state.field);
  const yellow = useSelector(state => state.field.yellow);
  const blue = useSelector(state => state.field.blue);
  const dispatch = useDispatch();
  const component_id = 'field';
  const scale = 350;

  const poll_state = () => {
    const robot_names = [{
      name: 'yellow_team/robot_0',
      is_yellow: true,
      num: 0
    }, {
      name: 'yellow_team/robot_1',
      is_yellow: true,
      num: 1
    }, {
      name: 'yellow_team/robot_2',
      is_yellow: true,
      num: 2
    }, {
      name: 'blue_team/robot_0',
      is_yellow: false,
      num: 0
    }, {
      name: 'blue_team/robot_1',
      is_yellow: false,
      num: 1
    }, {
      name: 'blue_team/robot_2',
      is_yellow: false,
      num: 2
    }];

    robot_names.forEach(robot => {
      const request = new ROSLIB.ServiceRequest({ model_name: robot.name });
      gazebo_service.callService(request, (response) => {
        const euler = to_euler_angles(response.pose.orientation);
        dispatch(set_robot_pos(robot.is_yellow, robot.num, response.pose.position.x, response.pose.position.y, euler.yaw));
      }, console.error);
    })
  }

  useEffect(() => { window.setInterval(poll_state, 100) }, []);
  const render = () => {

    const canvas = document.getElementById(component_id);
    const { width, height } = canvas.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    dispatch(update_canvas(width, height, scale));

    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    draw_field(ctx, canvas.width, canvas.height, scale);
    draw_robots(ctx, { yellow, blue }, width, height, scale);
  }

  useEffect(render, [dispatch, yellow, blue, scale]);
  const click_handler = (event) => {
    event.preventDefault();
    const rect = document.getElementById(component_id).getBoundingClientRect();
    const pos = transform_pixel_meter(event.clientX - rect.left, event.clientY - rect.top, event.target.attributes.width.value, event.target.attributes.height.value, field_state.canvas.scale);
    dispatch(set_robot_pos(true, 0, pos.x, pos.y, 0));
  }

  return <>
    <canvas className="App" id={component_id} onClick={click_handler} />
  </>;
  // return <canvas className="App" id={component_id} width="600" height="500" />;
}
