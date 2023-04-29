import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui'
import { Nail } from "./nail.js";

// http://www.realtimerendering.com/erich/udacity/exercises/unit3_specular_demo.html

 
const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const gui = new dat.GUI();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;
scene.add(camera);

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight();
// ambientLight.color = new THREE.Color(0xffffff);
// ambientLight.intensity = 0.5;
// scene.add(ambientLight);

let bboxSphereLight, bboxTeapotLight;

const light1 = new THREE.PointLight( 0xffffff, 1, 100 );
light1.position.set( 1, 1.25 ,0 );
// light1.power = 10000;
// light1.distance = 20;
light1.castShadow = true; 
light1.decay = 2;
// Add bounding box
bboxSphereLight = new THREE.Box3().setFromObject(light1);
scene.add( light1 );

const sphereSize = 1;
const pointLightHelper1 = new THREE.PointLightHelper( light1, sphereSize );
pointLightHelper1.color = new THREE.Color(0xffffff);
//scene.add( pointLightHelper1 );


const light2 = new THREE.PointLight( 0xffffff, 1, 100 );
light2.position.set( -1, 1.25, 0 );
// light2.power = 10000;
// light2.distance = 20;
light2.decay = 2;
light2.castShadow = true; 
// Add bounding box
bboxTeapotLight = new THREE.Box3().setFromObject(light2);
scene.add( light2 );

const pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize );
pointLightHelper2.color = new THREE.Color(0xffffff);
//scene.add( pointLightHelper2 );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
ambientLight.intensity = 0;
scene.add(ambientLight);


window.requestAnimationFrame( () => 
{
	pointLightHelper1.update();
    pointLightHelper2.update();
})

gui.add(light1, 'intensity', 0, 5).name("Light1 Intensity");
gui.add(light2, 'intensity', 0, 5).name("Light2 Intensity");
gui.add(ambientLight, 'intensity', 0, 5).name("Ambient Light Intensity");


// Controls
let mouseCntrl = {
  "controlsEnabled": true
}
let controls;
gui.add(mouseCntrl, "controlsEnabled").name("Enable Controls");

controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enabled = true;

const AxesHelper = new THREE.AxesHelper();
//scene.add(AxesHelper);

// load a torus geometry
const torusmaterial = new THREE.MeshPhongMaterial();
const torusgeometry = new THREE.TorusGeometry( 1, 0.5, 16, 100 );
var  torusMesh = new THREE.Mesh(torusgeometry, torusmaterial);
torusMesh.position.set(1,1,0);
torusMesh.scale.set(0.3,0.3,0.3);
scene.add(torusMesh);

//load a sphere:

//const texture = new THREE.TextureLoader().load('/textures/sphere.jpg'); 
//const spherematerial = new THREE.MeshPhongMaterial( { map:texture } );
//const spheregeometry = new THREE.CylinderGeometry(0.7, 0.7, 4, 100, 100);
//const sphereMesh = new THREE.Mesh(spheregeometry, spherematerial);
//sphereMesh.position.set(0,0,0);
//sphereMesh.scale.set(0.3,0.3,0.3);
//sphereMesh.add(AxesHelper)
//scene.add(sphereMesh)

const nail = new Nail([0.0,0.0,0.0], 0.01, 0.015, 0.02, 0.005, [1.0,1.0,1.0])
scene.add(nail)


//Renderer:
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setClearColor( 0xffffff, 0 );
renderer.physicallyBasedShading = true;
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; 


//document.addEventListener("keydown", event => {
//  ////console.log(event);
//  if (event.key == "")
//  {
//  }
//}
//);
    


//Animate:
const clock = new THREE.Clock();
let lastElapsedTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;

    //torusMesh.rotation.y = elapsedTime
    //sphereMesh.rotation.z = elapsedTime
    //nail.rotation.y = elapsedTime

    // Update controls
    if(mouseCntrl.controlsEnabled)
    {
        controls.enabled = true;
        controls.update();
    } else 
    {
        controls.enabled = false;
    }

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();