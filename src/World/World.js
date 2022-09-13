import { createCamera } from './components/camera.js';
import { createShape } from './components/st4.js';
import { createPaper } from './components/paper.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createCameraControls, createTransformControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    // const camControls = createCameraControls(camera, renderer.domElement);
    // loop.updatables.push(camControls);
    const transfControls = createTransformControls(camera, renderer.domElement);
    transfControls.addEventListener( 'change', this.render );

    const shape = createShape();
    shape.translateZ(2);
    const paper = createPaper();
    paper.translateZ(-2);
    const lights = createLights();

    // stop the shape's animation
    // loop.updatables.push(shape);

    scene.add(shape, paper, transfControls);
    lights.forEach(light => {
      scene.add(light);
    });

    camera.position.set(0, -8, 8);
    camera.lookAt(0,0,0);

    const resizer = new Resizer(container, camera, renderer);

    transfControls.attach(shape);
    transfControls.setMode("rotate");
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
