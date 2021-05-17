
const draw_field = (ctx, width, height, scale) => {

  const half_field = (ctx) => {
    // Área da defesa
    ctx.strokeRect(-0.75, -0.35, 0.15, 0.70);
    // Gol da defesa
    ctx.strokeRect(-0.85, -0.20, 0.10, 0.40);

    // Marcações do campo
    const size = 0.025;
    ctx.fillRect(-0.375 - size / 2, -0.4 - size / 2, size, size);
    ctx.fillRect(-0.375 - size / 2, - size / 2, size, size);
    ctx.fillRect(-0.375 - size / 2, 0.4 - size / 2, size, size);


    // Triângulo inferior
    ctx.beginPath();
    ctx.moveTo(-0.75, -0.65);
    ctx.lineTo(-0.75, 0.07 - 0.65);
    ctx.lineTo(0.07 - 0.75, - 0.65);
    ctx.closePath();
    ctx.fill();

    // Triângulo superior
    ctx.beginPath();
    ctx.moveTo(0.75, -0.65);
    ctx.lineTo(0.75, 0.07 - 0.65);
    ctx.lineTo(0.75 - 0.07, - 0.65);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.strokeStyle = 'rgb(255, 255, 255)';

  ctx.lineWidth = 0.01;

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(scale, -scale);

  // Linhas externas do campo
  ctx.strokeRect(-0.75, -0.65, 1.5, 1.3);
  // Linhas meio de campo
  ctx.beginPath();
  ctx.arc(0, 0, 0.2, 0, 2 * Math.PI);
  ctx.moveTo(0, 0.65);
  ctx.lineTo(0, -0.65);
  ctx.closePath();
  ctx.stroke();

  ctx.save();

  half_field(ctx);
  ctx.rotate(Math.PI);
  half_field(ctx);

  ctx.restore();

  ctx.restore();
}

const draw_single_robot = (ctx, x, y, angle, size, fill_color, stroke_color, stroke_width) => {

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.save();
  ctx.fillStyle = fill_color;
  ctx.strokeStyle = stroke_color;
  ctx.lineWidth = stroke_width;

  ctx.fillRect(-size / 2, -size / 2, size, size);
  ctx.strokeRect(-size / 2, -size / 2, size, size);
  ctx.restore();

  ctx.fillStyle = '#777788ff';
  ctx.fillRect(-size * 0.3, (size + stroke_width) / 2, size * 0.6, size * 0.15);
  ctx.fillRect(-size * 0.3, -(size + stroke_width) / 2, size * 0.6, -size * 0.15);
  ctx.restore();

}

/**
 * 
 * @param {*} ctx 
 * @param {*} coords: {yellow: array[{x, y, theta}], blue: array[{x, y, theta}]}
 * @param {*} width 
 * @param {*} height 
 * @param {*} scale 
 */
const draw_robots = (ctx, coords, width, height, scale) => {
  const robot_size = 0.08;
  const yellow_light = '#f5ff0eff';
  const yellow_dark = '#a29814ff';
  const blue_light = '#5f52feff';
  const blue_dark = '#482abdff';
  const orange_light = '#ff6600ff';
  const orange_dark = '#aa4400ff';
  const line_width = 0.0075;

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(scale, -scale);

  console.log(coords);
  for (let i = 0; i < 3; i++) {
    draw_single_robot(ctx, coords.yellow[i].x, coords.yellow[i].y, coords.yellow[i].theta, robot_size, yellow_light, yellow_dark, line_width);
  }

  for (let i = 0; i < 3; i++) {
    draw_single_robot(ctx, coords.blue[i].x, coords.blue[i].y, coords.blue[i].theta, robot_size, blue_light, blue_dark, line_width);
  }

  ctx.save()

  ctx.fillStyle = orange_light;
  ctx.strokeStyle = orange_dark;
  ctx.beginPath();
  ctx.arc(0, 0, 0.02, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.restore();

  ctx.restore();
}

export { draw_field, draw_single_robot, draw_robots };
