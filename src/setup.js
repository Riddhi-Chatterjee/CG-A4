import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui'

export class Setup
{
    constructor()
    {
        this.animationSetup = new THREE.Object3D();
    }
}