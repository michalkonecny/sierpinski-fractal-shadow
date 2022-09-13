import {
  PlaneGeometry,
  // MathUtils,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
} from 'three';

function createMaterial() {
  // create a texture loader.
  const textureLoader = new TextureLoader();

  // load a texture
  // const texture = textureLoader.load(
  //   '/assets/textures/uv-test-bw.png',
  // );

  // create a "standard" material using
  // the texture we just loaded as a color map
  const material = new MeshStandardMaterial({
    color: 'white',
    // map: texture,
  });

  return material;
}

function createPaper() {
  const geometry = new PlaneGeometry(8, 8);
  const material = createMaterial();
  const paper = new Mesh(geometry, material);
  
  paper.receiveShadow = true;

  return paper;
}

export { createPaper };
