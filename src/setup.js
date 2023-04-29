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

        this.sphere1_texture = new THREE.TextureLoader().load('/textures/sphere.jpg'); 
        this.sphere1_material = new THREE.MeshPhongMaterial({map: this.sphere1_texture});
        this.sphere1_geometry = new THREE.SphereGeometry();
        this.sphere1 = new THREE.Mesh(this.sphere1_geometry, this.sphere1_material);

        this.sphere2_texture = new THREE.TextureLoader().load('/textures/sphere.jpg'); 
        this.sphere2_material = new THREE.MeshPhongMaterial({map: this.sphere2_texture});
        this.sphere2_geometry = new THREE.SphereGeometry();
        this.sphere2 = new THREE.Mesh(this.sphere2_geometry, this.sphere2_material);
        
        this.sphere3_texture = new THREE.TextureLoader().load('/textures/sphere.jpg'); 
        this.sphere3_material = new THREE.MeshPhongMaterial({map: this.sphere3_texture});
        this.sphere3_geometry = new THREE.SphereGeometry();
        this.sphere3 = new THREE.Mesh(this.sphere3_geometry, this.sphere3_material);

        this.nail1 = (new Nail([0.0,0.0,0.0], 0.01, 0.015, 0.02, 0.005, [1.0,1.0,1.0])).axis
        this.nail2 = (new Nail([0.0,0.0,0.0], 0.01, 0.015, 0.02, 0.005, [1.0,1.0,1.0])).axis
        this.nail3 = (new Nail([0.0,0.0,0.0], 0.01, 0.015, 0.02, 0.005, [1.0,1.0,1.0])).axis
        this.nail4 = (new Nail([0.0,0.0,0.0], 0.01, 0.015, 0.02, 0.005, [1.0,1.0,1.0])).axis

        this.floating_floor_texture = new THREE.TextureLoader().load('/textures/floating_floor.jpg');
        this.floating_floor_material = new THREE.MeshPhongMaterial({map: this.floating_floor_texture});
        this.floating_floor_geometry = new THREE.BoxGeometry();
        this.floating_floor = new THREE.Mesh(this.floating_floor_geometry, this.floating_floor_material);

        this.floor_length = 6.0;
        this.floor_breadth = 6.0;
        this.floor_depth = 0.025
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

        this.rod_texture = new THREE.TextureLoader().load('/textures/rod_cuboid.jpg');
        this.rod_material = new THREE.MeshPhongMaterial({map: this.rod_texture});
        this.rod_geometry = new THREE.CylinderGeometry();
        this.rod = new THREE.Mesh(this.rod_geometry, this.rod_material);

        this.rope_texture = new THREE.TextureLoader().load('/textures/rope.jpg');
        this.rope_material = new THREE.MeshPhongMaterial({map: this.rope_texture});
        this.rope_geometry = new THREE.CylinderGeometry();
        this.rope = new THREE.Mesh(this.rope_geometry, this.rope_material);

        this.setPosOri();
        this.addDependencies();
    }

    setPosOri()
    {
        this.floor.position.set(0.0,-1.0,0.0);
        this.wall.position.set(-0.8*(this.floor_breadth/2), this.floor_depth/2 + this.wall_height/2, 0.0);
    }

    addDependencies()
    {
        const AxesHelper = new THREE.AxesHelper();

        this.animationSetup.add(this.floor);

        this.floor.add(this.wall);

        
    }

}