import { AmbientLight, DirectionalLight, Vector2 } from 'three';

function createLights() {
  const light = new DirectionalLight('white', 8);
  light.position.set(0, 0, 100);
  light.castShadow = true;
  light.shadow.mapSize = new Vector2( 2048, 2048 );

  const ambient = new AmbientLight('white', 1);

  // return [light, ambient];
  return [light];
}

export { createLights };
