/*

Use key 's' to start the animation
Use key 'c' to switch between the camera modes
Use GUI buttons to toggle lights on/off

Lighting:
* A point source at a fixed location and illuminating the entire scene --> White color
* A directional spotlight fixed at a certain height on one side of the scene and lighting the
  middle of the scene --> Yellow color
* A moving spotlight that follows the object that is currently moving (the focus of the
  animation at that point) --> Red color

*/


import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui'
import { Setup } from "./setup.js";
import { Nail } from "./nail.js";

// http://www.realtimerendering.com/erich/udacity/exercises/unit3_specular_demo.html

 
const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const gui = new dat.GUI();

var animation_focus;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};


/**
 * Camera
 */
// Base camera
var camera_mode = 0

const camera1 = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.001,
  100
);
camera1.position.x = 0;
camera1.position.y = 3.5;
camera1.position.z = 0;
//scene.add(camera1);

const camera2 = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.001,
  100
);

/**
 * Lights
 */

//Point light:
const light1 = new THREE.PointLight( 0xffffff, 0.3, 100 );
light1.position.set( 1, 1.25 ,0 );
// light1.power = 10000;
// light1.distance = 20;
light1.castShadow = true; 
light1.decay = 2;

const sphereSize = 1;
const pointLightHelper1 = new THREE.PointLightHelper( light1, sphereSize );
pointLightHelper1.color = new THREE.Color(0xffffff);
//scene.add(light1)

//Ambient light:
const ambientLight = new THREE.AmbientLight(0xffffff, 0.37);
scene.add(ambientLight)

//Fixed spotlight:
const spotlight_fixed = new THREE.SpotLight(0xe0b412);
spotlight_fixed.position.set(-10, 10, 0);
spotlight_fixed.castShadow = true;
spotlight_fixed.angle = 0.1;
//scene.add(spotlight_fixed);

//Moving spotlight:
var spotlight_moving = new THREE.SpotLight(0xff0000);
spotlight_moving.position.set(0, 5, 3);
spotlight_moving.castShadow = true;
spotlight_moving.angle = 0.05;
//scene.add(spotlight_moving)


window.requestAnimationFrame( () => 
{
	pointLightHelper1.update();
})

gui.add(light1, 'intensity', 0, 5).name("Light1 Intensity");
gui.add(spotlight_fixed, 'intensity', 0, 10).name("Fixed_SL Intensity");
gui.add(spotlight_moving, 'intensity', 0, 10).name("Moving_SL Intensity");
gui.add(ambientLight, 'intensity', 0, 5).name("Ambient Light Intensity");


// Controls
let mouseCntrl = {
  "controlsEnabled": true,
  "PointLight": true,
  "FixedSpotlight": true,
  "MovingSpotlight": true
}
let controls;
gui.add(mouseCntrl, "controlsEnabled").name("Enable Controls");
gui.add(mouseCntrl, "PointLight").name("Point Light")
gui.add(mouseCntrl, "FixedSpotlight").name("Fixed Spotlight")
gui.add(mouseCntrl, "MovingSpotlight").name("Moving Spotlight")

controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enabled = true;

const AxesHelper = new THREE.AxesHelper();
//scene.add(AxesHelper);

const setup = new Setup();
scene.add(setup.animationSetup)
spotlight_fixed.target = setup.floor;
animation_focus = setup.sphere1




var startAnimation = false

document.addEventListener("keydown", event => {
  if (event.key == "s") //Start the animation
  {
    startAnimation = true
  }

  if(event.key == 'c') //Switch between camera modes
  {

  }
})


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

var nail1_init_y_rotation = setup.nail1.rotation.y
var nail1_init_ang = 0
var nail1_init_ang_aft_s12_coll = 0
var nail1_init_ang_v = 0.001
var nail1_ang_v_flag = -1

var nail2_init_y_rotation = setup.nail2.rotation.y
setup.nail2.rotation.y = -1*setup.nail2.rotation.y
nail2_init_y_rotation = -1*nail2_init_y_rotation
var nail2_init_ang = 0
var nail2_init_ang_aft_rs3_coll = 0
var nail2_init_ang_v = 0.001
var nail2_ang_v_flag = -1
var alt_flag = 0

var nail4_init_y_rotation = setup.nail4.rotation.y
setup.nail4.rotation.y = -1*setup.nail4.rotation.y
nail4_init_y_rotation = -1*nail4_init_y_rotation
var nail4_init_ang = 0
var nail4_init_ang_v = 0.001
var nail4_ang_v_flag = -1

var g = 2.8
var sph1_col_flag = false
var sphere2_v;
var sphere2_ang_v;

var sph3_col_flag = false
var sphere3_v_h = 0;
var sphere3_v_v = 0;
var sphere3_ang_v = 0;
var stp_flag_v = false
var stp_flag_h = false

var startAnimation2 = false
var startAnimation3 = false
var startAnimation4 = false
var startAnimation5 = false

const tick = () => {

    if(mouseCntrl.PointLight)
    {
      scene.add(light1)
    }
    else
    {
      scene.remove(light1)
    }

    if(mouseCntrl.FixedSpotlight)
    {
      scene.add(spotlight_fixed)
    }
    else
    {
      scene.remove(spotlight_fixed)
    }

    if(mouseCntrl.MovingSpotlight)
    {
      scene.add(spotlight_moving)
    }
    else
    {
      scene.remove(spotlight_moving)
    }

    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;

    //torusMesh.rotation.y = elapsedTime
    //sphereMesh.rotation.z = elapsedTime
    //nail.axis.rotation.y = elapsedTime
    //setup.nail4.rotation.y -= 0.01

    if(startAnimation)
    {
      var nail1_ang_v;

      animation_focus = setup.sphere1

      //console.log(setup.nail1.rotation.y - nail1_init_y_rotation)

      if((setup.nail1.rotation.y - nail1_init_y_rotation).toFixed(6) <= nail1_init_ang.toFixed(6) || (setup.nail1.rotation.y - nail1_init_y_rotation).toFixed(6) >= (Math.PI - nail1_init_ang).toFixed(6))
      {
        nail1_ang_v_flag *= -1
      }

      nail1_ang_v = nail1_ang_v_flag*Math.sqrt(nail1_init_ang_v*nail1_init_ang_v + (2*g*(Math.sin(setup.nail1.rotation.y - nail1_init_y_rotation) - Math.sin(nail1_init_ang)))/(setup.rope_length - setup.nail1_axis_radius))

      //console.log(setup.nail1.rotation.y - nail1_init_y_rotation)
      setup.nail1.rotation.y += (nail1_ang_v * deltaTime)

      if(setup.nail1.rotation.y - nail1_init_y_rotation <= 0)
      {
        setup.nail1.rotation.y = nail1_init_y_rotation
      }
      if(setup.nail1.rotation.y - nail1_init_y_rotation >= Math.PI)
      {
        setup.nail1.rotation.y = Math.PI + nail1_init_y_rotation
      }
      if(!sph1_col_flag)
      {
        if(setup.nail1.rotation.y - nail1_init_y_rotation >= Math.PI/2) //For Sphere1 collision
        {
          setup.nail1.rotation.y = Math.PI/2 + nail1_init_y_rotation
        }
      }

      if(setup.nail1.rotation.y - nail1_init_y_rotation == Math.PI/2 && nail1_ang_v/Math.abs(nail1_ang_v) == 1)
      {
        if(!sph1_col_flag)
        {
          //console.log("Triggered")
          nail1_ang_v_flag *= -1
          nail1_init_ang += 0.3
          nail1_init_ang_aft_s12_coll = nail1_init_ang
          sph1_col_flag = true
          startAnimation2 = true

          var m_p = 1;
          var m_s = 20;
          var r_p = setup.rope_length - setup.nail1_axis_radius;
          var r_s = setup.sphere2_radius;

          //After considering moment of inertia of solid sphere etc...
          sphere2_v = Math.sqrt((10*m_p*g*r_p*Math.sin(nail1_init_ang_aft_s12_coll))/(7*m_s))
        }
      }

      if(startAnimation2)
      {
        animation_focus = setup.sphere2

        var r_s = setup.sphere2_radius;
        var retard = 0.02;

        sphere2_v  = Math.max(0, sphere2_v - (retard * deltaTime))
        sphere2_ang_v = sphere2_v/r_s

        setup.sphere2.position.x += (sphere2_v * deltaTime)

        if(setup.sphere2.position.x >= setup.floating_floor_breadth/2 - setup.sphere2_radius)
        {
          setup.sphere2.position.x = setup.floating_floor_breadth/2 - setup.sphere2_radius
        }
        else
        {
          setup.sphere2.rotation.z -= (sphere2_ang_v * deltaTime)
        }

        if(setup.sphere2.position.x >= setup.floating_floor_breadth/2 - setup.sphere2_radius)
        {
          if(!startAnimation3)
          {
            startAnimation3 = true
          }
        }
      }

      if(startAnimation3)
      {
        animation_focus = setup.rod

        setup.nail2.rotation.y = -1*setup.nail2.rotation.y
        nail2_init_y_rotation = -1*nail2_init_y_rotation

        var nail2_ang_v;

        //console.log(setup.nail2.rotation.y - nail2_init_y_rotation)

        //console.log((setup.nail2.rotation.y - nail2_init_y_rotation).toFixed(12))
        //console.log(nail2_init_ang.toFixed(12))
        //console.log(alt_flag)
        if(alt_flag == 0)
        {
          if((setup.nail2.rotation.y - nail2_init_y_rotation).toFixed(12) <= nail2_init_ang.toFixed(12))
          {
            nail2_ang_v_flag *= -1
            alt_flag = 1
          }
        }
        else if(alt_flag == 1)
        {
          if((setup.nail2.rotation.y - nail2_init_y_rotation).toFixed(12) >= (2*Math.PI - nail2_init_ang).toFixed(12))
          {
            nail2_ang_v_flag *= -1
            alt_flag = 0
          }
        }

        //console.log(nail2_ang_v_flag)
        nail2_ang_v = nail2_ang_v_flag*Math.sqrt(nail2_init_ang_v*nail2_init_ang_v - (2*g*(Math.cos(setup.nail2.rotation.y - nail2_init_y_rotation) - Math.cos(nail2_init_ang)))/(setup.rod_height - setup.nail2_axis_radius))
        //console.log(nail2_ang_v)

        //console.log(setup.nail2.rotation.y - nail2_init_y_rotation)
        setup.nail2.rotation.y += (nail2_ang_v * deltaTime)

        if(setup.nail2.rotation.y - nail2_init_y_rotation <= 0)
        {
          setup.nail2.rotation.y = nail2_init_y_rotation
        }
        if(setup.nail2.rotation.y - nail2_init_y_rotation >= 2*Math.PI)
        {
          setup.nail2.rotation.y = 2*Math.PI + nail2_init_y_rotation
        }
        //if(!sph3_col_flag)
        //{
        //  if(setup.nail2.rotation.y - nail2_init_y_rotation >= Math.PI) //For rod collision
        //  {
        //    setup.nail2.rotation.y = Math.PI + nail2_init_y_rotation
        //  }
        //}

        if(setup.nail2.rotation.y - nail2_init_y_rotation >= Math.PI && nail2_ang_v/Math.abs(nail2_ang_v) == 1)
        {
          if(!sph3_col_flag)
          {
            //console.log("Triggered")
            //nail2_ang_v_flag *= -1
            //console.log(setup.nail2.rotation.y - nail2_init_y_rotation )
            nail2_init_ang += 1
            nail2_init_ang_aft_rs3_coll = nail2_init_ang
            sph3_col_flag = true
            startAnimation4 = true

            var m_r = 1;
            var m_s = 0.4;
            var r_r = setup.rod_height - setup.nail2_axis_radius;
            var r_s = setup.sphere3_radius;

            //After considering moment of inertia of solid sphere etc...
            sphere3_v_h = -1*Math.sqrt((10*m_r*g*r_r*Math.sin(nail1_init_ang_aft_s12_coll))/(7*m_s))
            sphere3_v_v = 0
            sphere3_ang_v = 0
          }
        }

        if(setup.nail2.rotation.y - nail2_init_y_rotation >= Math.PI - 0.1 && setup.nail2.rotation.y - nail2_init_y_rotation <= Math.PI + 0.1)
        {
          var factor = 0.02
          nail2_init_ang  = Math.min(Math.PI, nail2_init_ang + factor*(Math.PI - nail2_init_ang))
          //console.log(nail2_init_ang)
        }

        if(setup.nail2.rotation.y - nail2_init_y_rotation - nail2_init_ang <= 0)
        {
          setup.nail2.rotation.y = nail2_init_y_rotation + nail2_init_ang
        }
        if(setup.nail2.rotation.y - nail2_init_y_rotation >= 2*Math.PI - nail2_init_ang)
        {
          setup.nail2.rotation.y = nail2_init_y_rotation + 2*Math.PI - nail2_init_ang
        }

        setup.nail2.rotation.y = -1*setup.nail2.rotation.y
        nail2_init_y_rotation = -1*nail2_init_y_rotation

      }

      if(startAnimation4)
      {
        animation_focus = setup.sphere3

        //Vertical and horizontal accelerations
        var v_a = -1*g
        var h_a = -0.1

        //Coefficient of restitution:
        var wall_e = 0.5
        var floor_e = 0.99
        var vert_box_e = 0.5

        if(setup.sphere3.position.y == setup.floor.position.y + setup.sphere3_radius+ setup.floor_depth/2)
        {
          //Bounce
          sphere3_v_v = -1 * floor_e * sphere3_v_v

          //Horizontal velocity reduction and rotation
          sphere3_v_h += (h_a * deltaTime)
          sphere3_ang_v = -1*(sphere3_v_h/setup.sphere3_radius)
        }

        if(setup.sphere3.position.x == 0.6*(setup.floor_breadth/2) - setup.sphere3_radius - setup.vert_box_width/2)
        {
          sphere3_v_h = -1 * vert_box_e * sphere3_v_h
          sphere3_ang_v = -1*(sphere3_v_v/setup.sphere3_radius)
          startAnimation5 = true
        }

        if(setup.sphere3.position.x == -0.8*(setup.floor_breadth/2) + setup.sphere3_radius + setup.wall_width/2)
        {
          sphere3_v_h = -1 * wall_e * sphere3_v_h
          sphere3_ang_v = (sphere3_v_v/setup.sphere3_radius)
        }

        sphere3_v_v += (v_a * deltaTime)

        if(stp_flag_v)
        {
          sphere3_v_v = 0
        }
        if(stp_flag_h)
        {
          sphere3_v_h = 0
        }
        
        if(sphere3_ang_v.toFixed(1) == 0.0)
        {
          sphere3_ang_v = 0
        }

        setup.sphere3.position.y += (sphere3_v_v * deltaTime)
        setup.sphere3.position.x += (sphere3_v_h * deltaTime)
        setup.sphere3.rotation.z += (sphere3_ang_v * deltaTime)

        //Required poximity sensors:
        //x --> 0.6*(setup.floor_breadth/2) - setup.sphere3_radius - setup.vert_box_width/2
        //x -->  -0.8*(setup.floor_breadth/2) + setup.sphere3_radius + setup.wall_width/2
        //y -->  setup.floor.position.y + setup.sphere3_radius+ setup.floor_depth/2

        //console.log(setup.sphere3.position.y, setup.floor.position.y + setup.sphere3_radius+ setup.floor_depth/2)

        if(setup.sphere3.position.x >= 0.6*(setup.floor_breadth/2) - setup.sphere3_radius - setup.vert_box_width/2 && setup.sphere3.position.y - (sphere3_v_v * deltaTime) <= -1.0 + setup.sphere3_radius + setup.vert_box_height + setup.floor_depth/2 - 0.1)
        {
          //console.log(setup.sphere3.position.y.toFixed(6), (-1.0 + setup.sphere3_radius + setup.vert_box_height + setup.floor_depth/2).toFixed(6))
          setup.sphere3.position.x = 0.6*(setup.floor_breadth/2) - setup.sphere3_radius - setup.vert_box_width/2
        }
        if(setup.sphere3.position.x <= -0.8*(setup.floor_breadth/2) + setup.sphere3_radius + setup.wall_width/2)
        {
          setup.sphere3.position.x = -0.8*(setup.floor_breadth/2) + setup.sphere3_radius + setup.wall_width/2
        }
        if(setup.sphere3.position.y <= setup.floor.position.y + setup.sphere3_radius+ setup.floor_depth/2)
        {
          setup.sphere3.position.y = setup.floor.position.y + setup.sphere3_radius+ setup.floor_depth/2
        }

        if(sphere3_v_v.toFixed(1) == 0.0 && setup.sphere3.position.y == setup.floor.position.y + setup.sphere3_radius+ setup.floor_depth/2)
        {
          stp_flag_v = true
        }
        if(sphere3_v_h.toFixed(1) == 0.0)
        {
          stp_flag_h = true
        }

      }

      if(startAnimation5)
      {
        animation_focus = setup.vert_box

        setup.nail4.rotation.y = -1*setup.nail4.rotation.y
        nail4_init_y_rotation = -1*nail4_init_y_rotation

        var nail4_ang_v;

        //console.log(nail4_init_ang)

        //console.log(setup.nail4.rotation.y - nail4_init_y_rotation)

        //console.log((setup.nail4.rotation.y - nail4_init_y_rotation).toFixed(12))
        //console.log(nail4_init_ang.toFixed(12))
        //console.log(alt_flag2)
        if((setup.nail4.rotation.y - nail4_init_y_rotation).toFixed(12) <= nail4_init_ang.toFixed(12))
        {
          nail4_ang_v_flag *= -1
        }

        //console.log(nail4_ang_v_flag)
        nail4_ang_v = nail4_ang_v_flag*Math.sqrt(nail4_init_ang_v*nail4_init_ang_v - (2*g*(Math.cos(setup.nail4.rotation.y - nail4_init_y_rotation) - Math.cos(nail4_init_ang)))/(setup.vert_box_height - setup.nail4_axis_radius))
        //console.log(nail4_ang_v)

        //console.log(setup.nail4.rotation.y - nail4_init_y_rotation)
        setup.nail4.rotation.y += (nail4_ang_v * deltaTime)

        if(setup.nail4.rotation.y - nail4_init_y_rotation <= 0)
        {
          setup.nail4.rotation.y = nail4_init_y_rotation
        }
        if(setup.nail4.rotation.y - nail4_init_y_rotation >= 2*Math.PI)
        {
          setup.nail4.rotation.y = 2*Math.PI + nail4_init_y_rotation
        }

        if(setup.nail4.rotation.y - nail4_init_y_rotation >= Math.PI/2) //For vert_box collision
        {
          setup.nail4.rotation.y = Math.PI/2 + nail4_init_y_rotation
        }

        if(setup.nail4.rotation.y - nail4_init_y_rotation == Math.PI/2 && nail4_ang_v/Math.abs(nail4_ang_v) == 1)
        {
          //console.log("Triggered")
          nail4_ang_v_flag *= -1
          //console.log(setup.nail4.rotation.y - nail4_init_y_rotation )
          nail4_init_ang = Math.min(Math.PI/2, nail4_init_ang + 0.8*(Math.PI/2 - nail4_init_ang))
        }

        if(setup.nail4.rotation.y - nail4_init_y_rotation - nail4_init_ang <= 0)
        {
          setup.nail4.rotation.y = nail4_init_y_rotation + nail4_init_ang
        }
        if(setup.nail4.rotation.y - nail4_init_y_rotation >= 2*Math.PI - nail4_init_ang)
        {
          setup.nail4.rotation.y = nail4_init_y_rotation + 2*Math.PI - nail4_init_ang
        }

        setup.nail4.rotation.y = -1*setup.nail4.rotation.y
        nail4_init_y_rotation = -1*nail4_init_y_rotation

      }

      if(setup.nail1.rotation.y - nail1_init_y_rotation >= Math.PI/2 - 0.1 && setup.nail1.rotation.y - nail1_init_y_rotation <= Math.PI/2 + 0.1)
      {
        var factor = 0.02
        nail1_init_ang  = Math.min(Math.PI/2, nail1_init_ang + factor*(Math.PI/2 - nail1_init_ang))
        //console.log(nail1_init_ang)
      }

      if(setup.nail1.rotation.y - nail1_init_y_rotation - nail1_init_ang <= 0)
      {
        setup.nail1.rotation.y = nail1_init_y_rotation + nail1_init_ang
      }
      if(setup.nail1.rotation.y - nail1_init_y_rotation >= Math.PI - nail1_init_ang)
      {
        setup.nail1.rotation.y = nail1_init_y_rotation + Math.PI - nail1_init_ang
      }

      //console.log(nail1_ang_v)
    }

    spotlight_moving.target = animation_focus

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