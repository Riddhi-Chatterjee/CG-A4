import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui'
import { Nail } from "./nail.js";

export class Setup
{
    constructor()
    {
        this.animationSetup = new THREE.Object3D(); //Only this is to be added to the scene

        this.sphere1_radius = 0.1;
        this.sphere1_texture = new THREE.TextureLoader().load('/textures/sphere.jpg'); 
        this.sphere1_material = new THREE.MeshPhongMaterial({map: this.sphere1_texture, emissive: 0xffffff, emissiveIntensity: 0.1});
        this.sphere1_geometry = new THREE.SphereGeometry(this.sphere1_radius, 40, 40);
        this.sphere1 = new THREE.Mesh(this.sphere1_geometry, this.sphere1_material);

        this.sphere2_radius = 0.1;
        this.sphere2_texture = new THREE.TextureLoader().load('/textures/sphere.jpg'); 
        this.sphere2_material = new THREE.MeshPhongMaterial({map: this.sphere2_texture, emissive: 0xffffff, emissiveIntensity: 0.1});
        this.sphere2_geometry = new THREE.SphereGeometry(this.sphere2_radius, 40, 40);
        this.sphere2 = new THREE.Mesh(this.sphere2_geometry, this.sphere2_material);
        
        this.sphere3_radius = 0.1;
        this.sphere3_texture = new THREE.TextureLoader().load('/textures/sphere.jpg'); 
        this.sphere3_material = new THREE.MeshPhongMaterial({map: this.sphere3_texture, emissive: 0xffffff, emissiveIntensity: 0.1});
        this.sphere3_geometry = new THREE.SphereGeometry(this.sphere3_radius, 40, 40);
        this.sphere3 = new THREE.Mesh(this.sphere3_geometry, this.sphere3_material);

        this.floating_floor_length = 0.5;
        this.floating_floor_breadth = 1.5;
        this.floating_floor_depth = 0.025;
        this.floating_floor_texture = new THREE.TextureLoader().load('/textures/floating_floor.jpg');
        this.floating_floor_material = new THREE.MeshPhongMaterial({map: this.floating_floor_texture});
        this.floating_floor_geometry = new THREE.BoxGeometry(this.floating_floor_breadth, this.floating_floor_depth, this.floating_floor_length, 80, 80, 80);
        this.floating_floor = new THREE.Mesh(this.floating_floor_geometry, this.floating_floor_material);

        this.floor_length = 6.0;
        this.floor_breadth = 6.0;
        this.floor_depth = 0.025;
        this.floor_texture = new THREE.TextureLoader().load('/textures/marble_floor.jpg');
        this.floor_material = new THREE.MeshPhongMaterial({map: this.floor_texture});
        this.floor_geometry = new THREE.BoxGeometry(this.floor_breadth, this.floor_depth, this.floor_length, 80, 80, 80);
        this.floor = new THREE.Mesh(this.floor_geometry, this.floor_material);

        this.vert_box_width = 0.06;
        this.vert_box_height = 1.0;
        this.vert_box_length = 1.0;
        this.vert_box_texture = new THREE.TextureLoader().load('/textures/rod_cuboid.jpg');
        this.vert_box_material = new THREE.MeshPhongMaterial({map: this.vert_box_texture});
        this.vert_box_geometry = new THREE.BoxGeometry(this.vert_box_width, this.vert_box_height, this.vert_box_length);
        this.vert_box = new THREE.Mesh(this.vert_box_geometry, this.vert_box_material);

        this.wall_width = 0.06;
        this.wall_height = 2.0;
        this.wall_length = 2.0;
        this.wall_texture = new THREE.TextureLoader().load('/textures/wall.jpg');
        this.wall_material = new THREE.MeshPhongMaterial({map: this.wall_texture});
        this.wall_geometry = new THREE.BoxGeometry(this.wall_width, this.wall_height, this.wall_length);
        this.wall = new THREE.Mesh(this.wall_geometry, this.wall_material);

        this.nail1_axis_radius = 0.005
        this.nail1_head_radius = 0.02
        this.nail1_axis_length = 0.04
        this.nail1_head_length = 0.005
        this.nail1 = (new Nail([0.0,0.0,0.0], this.nail1_axis_radius, this.nail1_head_radius, this.nail1_axis_length, this.nail1_head_length, [1.0,1.0,1.0])).axis

        this.nail2_axis_radius = 0.01
        this.nail2_head_radius = 0.02
        this.nail2_axis_length = 0.04
        this.nail2_head_length = 0.005 
        this.nail2 = (new Nail([0.0,0.0,0.0], this.nail2_axis_radius, this.nail2_head_radius, this.nail2_axis_length, this.nail2_head_length, [1.0,1.0,1.0])).axis

        this.nail3_axis_radius = 1.1*(this.vert_box_width/2);
        this.nail3_head_radius = 1.5*(this.vert_box_width/2);
        this.nail3_axis_length = this.vert_box_length/2;
        this.nail3_head_length = 0.01;
        this.nail3 = (new Nail([0.0,0.0,0.0], this.nail3_axis_radius, this.nail3_head_radius, this.nail3_axis_length, this.nail3_head_length, [1.0,1.0,1.0])).axis

        this.nail4_axis_radius = 1.1*(this.vert_box_width/2);
        this.nail4_head_radius = 1.5*(this.vert_box_width/2);
        this.nail4_axis_length = this.vert_box_length/2;
        this.nail4_head_length = 0.01;
        this.nail4 = (new Nail([0.0,0.0,0.0], this.nail4_axis_radius, this.nail4_head_radius, this.nail4_axis_length, this.nail4_head_length, [1.0,1.0,1.0])).axis

        this.rod_radius = 0.01
        this.rod_height = 0.75
        this.rod_texture = new THREE.TextureLoader().load('/textures/rod_cuboid.jpg');
        this.rod_material = new THREE.MeshPhongMaterial({map: this.rod_texture});
        this.rod_geometry = new THREE.CylinderGeometry(this.rod_radius, this.rod_radius, this.rod_height, 40, 40);
        this.rod = new THREE.Mesh(this.rod_geometry, this.rod_material);

        this.rope_radius = 0.005
        this.rope_length = 1
        this.rope_texture = new THREE.TextureLoader().load('/textures/rope.jpg');
        this.rope_material = new THREE.MeshPhongMaterial({map: this.rope_texture, emissive: 0xffffff, emissiveIntensity: 0.05});
        this.rope_geometry = new THREE.CylinderGeometry(this.rope_radius, this.rope_radius, this.rope_length, 40, 40);
        this.rope = new THREE.Mesh(this.rope_geometry, this.rope_material);

        this.setPosOri();
        this.addDependencies();

        //############################ Prototype code start ################################

        this.sphere1_BB = new THREE.Sphere(this.sphere1.position, this.sphere1_radius)
        this.sphere2_BB = new THREE.Sphere(this.sphere2.position, this.sphere2_radius)
        this.sphere3_BB = new THREE.Sphere(this.sphere3.position, this.sphere3_radius)

        this.rope.add(this.sphere1_BB)
        this.floating_floor.add(this.sphere2_BB)
        this.animationSetup.add(this.sphere3_BB)

        //var helper = new THREE.BoundingBoxHelper(<someobject>, 0xff0000);
        //helper.update();
//
        //this.<parent_object_in_scene_graph>.add(helper)

        //############################ Prototype code end ################################
    }

    setPosOri()
    {
        this.floor.position.set(0.0,-1.0,0.0);

        this.wall.position.set(-0.8*(this.floor_breadth/2), this.floor_depth/2 + this.wall_height/2, 0.0);

        this.nail4.rotation.x = Math.PI/2;
        this.nail4.position.set(0.6*(this.floor_breadth/2), this.floor_depth/2 + this.nail4_axis_radius, this.vert_box_length/2 - this.nail4_axis_length/2);

        this.vert_box.position.set(0.0, -1.0*(this.nail4_axis_length/2), -1*this.vert_box_height/2 + this.nail4_axis_radius);

        this.nail3.rotation.x = Math.PI
        this.nail3.position.set(0.0, -1*this.vert_box_length/2, 0.0)

        this.sphere3.position.set(0.6*(this.floor_breadth/2), -1.0 + this.sphere3_radius + this.vert_box_height + this.floor_depth/2, 0.0)

        this.nail2.position.set(0.6*(this.floor_breadth/2), -1.0 + this.sphere3_radius + this.vert_box_height + this.floor_depth/2, 0.0)
        this.nail2.rotation.x = Math.PI/2
        this.nail2.position.x += (this.sphere3_radius + this.rod_radius)
        this.nail2.position.y += this.rod_height - this.nail2_axis_radius

        this.rod.rotation.x = Math.PI/2
        this.rod.position.z = this.nail2_axis_radius - this.rod_height/2

        this.floating_floor.position.set(0.6*(this.floor_breadth/2), -1.0 + this.sphere3_radius + this.vert_box_height + this.floor_depth/2, 0.0)
        this.floating_floor.position.y += 2*(this.rod_height - this.nail2_axis_radius) - this.floating_floor_depth/2 - 2*this.sphere2_radius
        this.floating_floor.position.x -= (this.floating_floor_breadth/2 - this.sphere3_radius)

        this.sphere2.position.set(this.sphere2_radius - this.floating_floor_breadth/2, this.sphere2_radius + this.floating_floor_depth/2)

        this.nail1.rotation.x = Math.PI/2
        this.nail1.position.set(0.6*(this.floor_breadth/2), -1.0 + this.sphere3_radius + this.vert_box_height + this.floor_depth/2, 0.0)
        this.nail1.position.y += 2*(this.rod_height - this.nail2_axis_radius) - this.floating_floor_depth/2 - 2*this.sphere2_radius
        this.nail1.position.x -= (this.floating_floor_breadth/2 - this.sphere3_radius)
        this.nail1.position.y += (this.rope_length - this.nail1_axis_radius + this.floating_floor_depth/2 + this.sphere2_radius)
        this.nail1.position.x -= (this.floating_floor_breadth/2 + this.sphere1_radius)
        this.nail1.rotation.y = -Math.PI/2

        this.rope.rotation.x = -Math.PI/2
        this.rope.position.set(0.0, 0.0, this.rope_length/2 - this.nail1_axis_radius)

        this.sphere1.position.set(0.0, -this.rope_length/2, 0.0)

    }

    addDependencies()
    {
        const AxesHelper = new THREE.AxesHelper();

        this.animationSetup.add(this.floor);

        this.floor.add(this.wall);

        this.floor.add(this.nail4);

        this.nail4.add(this.vert_box);

        this.nail4.add(this.nail3);

        this.animationSetup.add(this.sphere3);

        this.animationSetup.add(this.nail2);

        this.nail2.add(this.rod);

        this.animationSetup.add(this.floating_floor);

        this.floating_floor.add(this.sphere2);

        this.animationSetup.add(this.nail1);

        this.nail1.add(this.rope);

        this.rope.add(this.sphere1);
    }

}