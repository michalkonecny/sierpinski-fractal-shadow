import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

function createTransformControls(camera, canvas) {
  const controls = new TransformControls(camera, canvas);
  return controls;
}

function createCameraControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  // damping and auto rotation require
  // the controls to be updated each frame

  // this.controls.autoRotate = true;
  // controls.enableDamping = true;

  controls.tick = () => controls.update();

  return controls;
}

export { createCameraControls, createTransformControls };
