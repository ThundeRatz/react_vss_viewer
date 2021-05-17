import { createSlice } from '@reduxjs/toolkit'

export const fieldSlice = createSlice({
  name: 'field',
  initialState: {
    canvas: {
      height: 0,
      width: 0,
      scale: 350
    },
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
  },
  reducers: {
    set_robot_pos: (state, action) => {
      if (action.payload.is_yellow) {
        state.yellow[action.payload.robot_num] = { ...action.payload.pos };
      } else {
        state.blue[action.payload.robot_num] = { ...action.payload.pos };
      }
    },
    update_canvas: (state, action) => {
      state.canvas.height = action.payload.height;
      state.canvas.width = action.payload.width;
      state.canvas.scale = action.payload.scale;
    }
  }
})

export const set_robot_pos = (is_yellow, robot_num, x, y, theta) => {
  return fieldSlice.actions.set_robot_pos({ is_yellow, robot_num, pos: { x, y, theta } });
};

export const update_canvas = (width, height, scale) => {
  return fieldSlice.actions.update_canvas({ width, height, scale });
};

export default fieldSlice.reducer
