export function to_euler_angles(q) {
  const angles = { row: 0, pitch: 0, yaw: 0 };

  // roll (x-axis rotation)
  let sinr_cosp = 2 * (q.w * q.x + q.y * q.z);
  let cosr_cosp = 1 - 2 * (q.x * q.x + q.y * q.y);
  angles.roll = Math.atan2(sinr_cosp, cosr_cosp);

  // pitch (y-axis rotation)
  let sinp = 2 * (q.w * q.y - q.z * q.x);
  if (Math.abs(sinp) >= 1)
    angles.pitch = (Math.PI / 2) * (sinp / Math.abs(sinp)); // use 90 degrees if out of range
  else
    angles.pitch = Math.asin(sinp);

  // yaw (z-axis rotation)
  let siny_cosp = 2 * (q.w * q.z + q.x * q.y);
  let cosy_cosp = 1 - 2 * (q.y * q.y + q.z * q.z);
  angles.yaw = Math.atan2(siny_cosp, cosy_cosp);

  return angles;
}
