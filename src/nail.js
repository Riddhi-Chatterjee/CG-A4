import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui'

export class Nail
{
    constructor(position, axis_radius, head_radius, axis_length, head_length, scale)
    {
        this.axis_texture = new THREE.TextureLoader().load('/textures/metal.jpg'); 
        this.axis_material = new THREE.MeshPhongMaterial({map: this.axis_texture});
        this.axis_geometry = new THREE.CylinderGeometry(axis_radius, axis_radius, axis_length, 40, 40);
        this.axis = new THREE.Mesh(this.axis_geometry, this.axis_material);
        this.axis.position.set(position[0], position[1], position[2])
        this.axis.scale.set(scale[0], scale[1], scale[2])

        this.head_texture = new THREE.TextureLoader().load('/textures/metal.jpg'); 
        this.head_material = new THREE.MeshPhongMaterial({map: this.head_texture});
        this.head_geometry = new THREE.CylinderGeometry(head_radius, head_radius, head_length, 40, 40);
        this.head = new THREE.Mesh(this.head_geometry, this.head_material);
        this.head.position.y = axis_length/2;
        this.axis.add(this.head);

        return this.axis;
    }
}