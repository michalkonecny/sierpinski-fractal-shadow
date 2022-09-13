import {
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  TetrahedronGeometry,
  TextureLoader,
  Vector3,
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
    color: 'blue',
    // map: texture,
  });

  return material;
}

function shrinkTowards(c,v,shape) {
  shape.position.x = v.x;
  shape.position.y = v.y;
  shape.position.z = v.z;
  shape.scale.set(c,c,c);
}

function refineIFS(c,vertices,shape) {
  const result = new Object3D();

  vertices.forEach(v => {
    const sub = shape.clone();
    shrinkTowards(c,v,sub);
    sub.castShadow = true;
    result.add(sub);
  });

  return result;
}

function refineIFS_n(c,vertices,shape,n) {
  var result = shape;
  for (let index = 0; index < n; index++) {
    result = refineIFS(c,vertices,result);
  }
  return result;
}

function createShape() {

  const material = createMaterial();

  // the default unit tetrahedron
  const unitTH_G = new TetrahedronGeometry(2);
  // console.log(unitTH_G);
  // the half-way vertices of the default unit tetrahedron
  const c = 0.5;
  const tt = 1.154700517654419*(1-c);
  const v1 = new Vector3(tt,tt,tt);
  const v2 = new Vector3(-tt,-tt,tt);
  const v3 = new Vector3(tt,-tt,-tt);
  const v4 = new Vector3(-tt,tt,-tt);
  const vertices = [v1,v2,v3,v4];

  const hull = new Mesh(unitTH_G, material);

  const shape = refineIFS_n(c, vertices, hull, 7);

  // shape.rotation.set(-0.5, -0.1, 0.8);

  const radiansPerSecond = MathUtils.degToRad(30);

  shape.tick = (delta) => {
    // increase the cube's rotation each frame
    shape.rotation.z += delta * radiansPerSecond;
    shape.rotation.x += delta * radiansPerSecond;
    shape.rotation.y += delta * radiansPerSecond;
  };

  return shape;
}

export { createShape };
