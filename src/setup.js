import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui'

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

        

        this.addDependencies();
    }

    addDependencies()
    {

    }

}