import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Water } from 'three/examples/jsm/objects/Water2';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { skybox } from './skybox.js'

var origin = '{"water":[{"x":75,"y":25,"z":-25},{"x":125,"y":25,"z":-75},{"x":75,"y":25,"z":-75},{"x":125,"y":25,"z":-125},{"x":75,"y":25,"z":-125},{"x":25,"y":25,"z":-125},{"x":25,"y":25,"z":-25},{"x":25,"y":25,"z":-75},{"x":25,"y":25,"z":75},{"x":25,"y":25,"z":25},{"x":-25,"y":25,"z":75},{"x":-25,"y":25,"z":25},{"x":-25,"y":25,"z":-75},{"x":25,"y":25,"z":-175},{"x":75,"y":25,"z":-175}],"grass":[{"x":-475,"y":25,"z":-475},{"x":-475,"y":25,"z":-375},{"x":-475,"y":25,"z":-425},{"x":-425,"y":25,"z":-475},{"x":-425,"y":25,"z":-425},{"x":-425,"y":25,"z":-375},{"x":-425,"y":25,"z":-325},{"x":-475,"y":25,"z":-325},{"x":-475,"y":25,"z":-225},{"x":-425,"y":25,"z":-275},{"x":-475,"y":25,"z":-275},{"x":-425,"y":25,"z":-225},{"x":-375,"y":25,"z":-325},{"x":-375,"y":25,"z":-425},{"x":-375,"y":25,"z":-475},{"x":-375,"y":25,"z":-375},{"x":-325,"y":25,"z":-475},{"x":-325,"y":25,"z":-425},{"x":-325,"y":25,"z":-375},{"x":-375,"y":25,"z":-275},{"x":-475,"y":25,"z":-175},{"x":-275,"y":25,"z":-425},{"x":-175,"y":25,"z":-275},{"x":-275,"y":25,"z":-475},{"x":-175,"y":25,"z":-475},{"x":-175,"y":25,"z":-425},{"x":-175,"y":75,"z":-425},{"x":-225,"y":25,"z":-475},{"x":-225,"y":25,"z":-425},{"x":-275,"y":25,"z":-375},{"x":-225,"y":25,"z":-375},{"x":-275,"y":25,"z":-325},{"x":-325,"y":25,"z":-325},{"x":-325,"y":25,"z":-275},{"x":-375,"y":25,"z":-225},{"x":-425,"y":25,"z":-175},{"x":-475,"y":25,"z":-125},{"x":-125,"y":25,"z":-475},{"x":-475,"y":25,"z":475},{"x":-475,"y":25,"z":425},{"x":-475,"y":25,"z":375},{"x":-475,"y":25,"z":325},{"x":-475,"y":25,"z":275},{"x":-475,"y":25,"z":225},{"x":-475,"y":25,"z":175},{"x":-425,"y":25,"z":475},{"x":-475,"y":75,"z":425},{"x":-425,"y":25,"z":425},{"x":-425,"y":25,"z":375},{"x":-425,"y":25,"z":325},{"x":-425,"y":25,"z":275},{"x":-425,"y":25,"z":225},{"x":-375,"y":25,"z":275},{"x":-375,"y":25,"z":325},{"x":-375,"y":25,"z":375},{"x":-375,"y":25,"z":425},{"x":-375,"y":25,"z":475},{"x":-325,"y":25,"z":475},{"x":-325,"y":25,"z":425},{"x":-325,"y":25,"z":375},{"x":-325,"y":25,"z":325},{"x":-275,"y":25,"z":375},{"x":-275,"y":25,"z":425},{"x":-275,"y":25,"z":475},{"x":-225,"y":25,"z":475},{"x":-225,"y":25,"z":425},{"x":-175,"y":25,"z":475},{"x":-125,"y":25,"z":475},{"x":-175,"y":25,"z":425},{"x":-225,"y":25,"z":375},{"x":-275,"y":25,"z":325},{"x":-325,"y":25,"z":275},{"x":-375,"y":25,"z":225},{"x":-425,"y":25,"z":175},{"x":-475,"y":25,"z":125},{"x":475,"y":25,"z":475},{"x":475,"y":25,"z":425},{"x":475,"y":25,"z":375},{"x":475,"y":25,"z":325},{"x":475,"y":25,"z":275},{"x":475,"y":25,"z":225},{"x":475,"y":25,"z":175},{"x":475,"y":25,"z":125},{"x":425,"y":25,"z":175},{"x":425,"y":25,"z":475},{"x":425,"y":25,"z":425},{"x":425,"y":25,"z":375},{"x":425,"y":25,"z":275},{"x":425,"y":25,"z":325},{"x":425,"y":25,"z":225},{"x":375,"y":25,"z":225},{"x":375,"y":25,"z":275},{"x":375,"y":25,"z":325},{"x":375,"y":25,"z":375},{"x":375,"y":25,"z":425},{"x":375,"y":25,"z":475},{"x":325,"y":25,"z":475},{"x":325,"y":25,"z":425},{"x":325,"y":25,"z":375},{"x":325,"y":25,"z":325},{"x":325,"y":25,"z":275},{"x":275,"y":25,"z":275},{"x":275,"y":25,"z":325},{"x":275,"y":25,"z":375},{"x":275,"y":25,"z":425},{"x":275,"y":25,"z":475},{"x":225,"y":25,"z":475},{"x":225,"y":25,"z":425},{"x":225,"y":25,"z":375},{"x":225,"y":25,"z":325},{"x":175,"y":25,"z":375},{"x":175,"y":25,"z":425},{"x":175,"y":25,"z":475},{"x":125,"y":25,"z":475},{"x":125,"y":25,"z":425},{"x":325,"y":25,"z":225},{"x":375,"y":25,"z":175},{"x":425,"y":25,"z":125},{"x":475,"y":25,"z":75},{"x":75,"y":25,"z":475},{"x":475,"y":25,"z":-75},{"x":475,"y":25,"z":-125},{"x":475,"y":25,"z":-175},{"x":475,"y":25,"z":-225},{"x":475,"y":25,"z":-275},{"x":475,"y":25,"z":-325},{"x":475,"y":25,"z":-375},{"x":475,"y":25,"z":-425},{"x":475,"y":25,"z":-475},{"x":425,"y":25,"z":-475},{"x":375,"y":25,"z":-475},{"x":325,"y":25,"z":-475},{"x":275,"y":25,"z":-475},{"x":225,"y":25,"z":-475},{"x":175,"y":25,"z":-475},{"x":125,"y":25,"z":-475},{"x":75,"y":25,"z":-475},{"x":125,"y":25,"z":-425},{"x":175,"y":25,"z":-425},{"x":275,"y":25,"z":-425},{"x":225,"y":25,"z":-425},{"x":325,"y":25,"z":-425},{"x":375,"y":25,"z":-425},{"x":425,"y":25,"z":-425},{"x":425,"y":25,"z":-375},{"x":375,"y":25,"z":-375},{"x":325,"y":25,"z":-375},{"x":275,"y":25,"z":-375},{"x":225,"y":25,"z":-375},{"x":175,"y":25,"z":-375},{"x":225,"y":25,"z":-325},{"x":275,"y":25,"z":-325},{"x":325,"y":25,"z":-325},{"x":375,"y":25,"z":-325},{"x":425,"y":25,"z":-325},{"x":425,"y":25,"z":-275},{"x":375,"y":25,"z":-275},{"x":325,"y":25,"z":-275},{"x":275,"y":25,"z":-275},{"x":325,"y":25,"z":-225},{"x":375,"y":25,"z":-225},{"x":425,"y":25,"z":-225},{"x":425,"y":25,"z":-175},{"x":375,"y":25,"z":-175},{"x":425,"y":25,"z":-125},{"x":-75,"y":25,"z":475},{"x":-125,"y":25,"z":425},{"x":-175,"y":25,"z":375},{"x":-225,"y":25,"z":325},{"x":-275,"y":25,"z":275},{"x":-325,"y":25,"z":225},{"x":-375,"y":25,"z":175},{"x":-425,"y":25,"z":125},{"x":-475,"y":25,"z":75},{"x":-475,"y":25,"z":-75},{"x":-425,"y":25,"z":-125},{"x":-375,"y":25,"z":-175},{"x":-325,"y":25,"z":-225},{"x":-275,"y":25,"z":-275},{"x":-225,"y":25,"z":-325},{"x":-175,"y":25,"z":-375},{"x":-125,"y":25,"z":-425},{"x":-75,"y":25,"z":-475},{"x":175,"y":25,"z":175},{"x":125,"y":25,"z":175},{"x":125,"y":25,"z":125},{"x":125,"y":25,"z":75},{"x":75,"y":25,"z":125},{"x":75,"y":75,"z":125},{"x":25,"y":25,"z":175},{"x":25,"y":25,"z":125},{"x":-25,"y":25,"z":125},{"x":-25,"y":25,"z":175},{"x":-125,"y":25,"z":175},{"x":-75,"y":25,"z":175},{"x":-75,"y":25,"z":125},{"x":-75,"y":25,"z":75},{"x":-25,"y":25,"z":-25},{"x":-75,"y":25,"z":-25},{"x":-75,"y":25,"z":25},{"x":-125,"y":25,"z":-25},{"x":-75,"y":25,"z":-75},{"x":-25,"y":25,"z":-125},{"x":-25,"y":25,"z":-175},{"x":-25,"y":25,"z":-225},{"x":25,"y":25,"z":-225},{"x":75,"y":25,"z":-225},{"x":125,"y":25,"z":-225},{"x":225,"y":25,"z":-225},{"x":225,"y":25,"z":-175},{"x":225,"y":25,"z":-125},{"x":175,"y":25,"z":-125},{"x":175,"y":25,"z":-175},{"x":175,"y":25,"z":-225},{"x":125,"y":25,"z":-175}],"brick":[{"x":25,"y":25,"z":475},{"x":75,"y":25,"z":425},{"x":25,"y":25,"z":425},{"x":125,"y":25,"z":375},{"x":75,"y":25,"z":375},{"x":175,"y":25,"z":325},{"x":125,"y":25,"z":325},{"x":225,"y":25,"z":275},{"x":175,"y":25,"z":275},{"x":275,"y":25,"z":225},{"x":225,"y":25,"z":225},{"x":325,"y":25,"z":175},{"x":325,"y":25,"z":125},{"x":325,"y":25,"z":25},{"x":325,"y":25,"z":75},{"x":325,"y":25,"z":-25},{"x":325,"y":25,"z":-125},{"x":325,"y":25,"z":-75},{"x":325,"y":25,"z":-175},{"x":375,"y":25,"z":-125},{"x":375,"y":25,"z":-75},{"x":375,"y":25,"z":-25},{"x":375,"y":25,"z":25},{"x":375,"y":25,"z":75},{"x":375,"y":25,"z":125},{"x":425,"y":25,"z":75},{"x":425,"y":25,"z":25},{"x":425,"y":25,"z":-25},{"x":425,"y":25,"z":-75},{"x":475,"y":25,"z":25},{"x":475,"y":25,"z":-25},{"x":25,"y":25,"z":-475},{"x":-25,"y":25,"z":-475},{"x":25,"y":25,"z":-425},{"x":75,"y":25,"z":-425},{"x":-25,"y":25,"z":-425},{"x":-75,"y":25,"z":-425},{"x":-125,"y":25,"z":-375},{"x":-75,"y":25,"z":-375},{"x":-25,"y":25,"z":-375},{"x":25,"y":25,"z":-375},{"x":75,"y":25,"z":-375},{"x":125,"y":25,"z":-375},{"x":175,"y":25,"z":-325},{"x":125,"y":25,"z":-325},{"x":75,"y":25,"z":-325},{"x":-25,"y":25,"z":-325},{"x":25,"y":25,"z":-325},{"x":-75,"y":25,"z":-325},{"x":-125,"y":25,"z":-325},{"x":-175,"y":25,"z":-325},{"x":225,"y":25,"z":-275},{"x":175,"y":25,"z":-275},{"x":125,"y":25,"z":-275},{"x":25,"y":25,"z":-275},{"x":75,"y":25,"z":-275},{"x":-25,"y":25,"z":-275},{"x":-75,"y":25,"z":-275},{"x":-125,"y":25,"z":-275},{"x":-225,"y":25,"z":-275},{"x":-275,"y":25,"z":-225},{"x":-275,"y":25,"z":-175},{"x":-275,"y":25,"z":-125},{"x":-275,"y":25,"z":-75},{"x":-275,"y":25,"z":-25},{"x":-275,"y":25,"z":25},{"x":-275,"y":25,"z":75},{"x":-275,"y":25,"z":125},{"x":-275,"y":25,"z":175},{"x":-275,"y":25,"z":225},{"x":-325,"y":25,"z":175},{"x":-325,"y":25,"z":125},{"x":-325,"y":25,"z":75},{"x":-325,"y":25,"z":-25},{"x":-325,"y":25,"z":25},{"x":-325,"y":25,"z":-75},{"x":-325,"y":25,"z":-125},{"x":-325,"y":25,"z":-175},{"x":-375,"y":25,"z":-125},{"x":-375,"y":25,"z":-75},{"x":-375,"y":25,"z":-25},{"x":-375,"y":25,"z":25},{"x":-375,"y":25,"z":75},{"x":-375,"y":25,"z":125},{"x":-425,"y":25,"z":75},{"x":-425,"y":25,"z":25},{"x":-425,"y":25,"z":-25},{"x":-425,"y":25,"z":-75},{"x":-475,"y":25,"z":-25},{"x":175,"y":25,"z":225},{"x":125,"y":25,"z":225},{"x":75,"y":25,"z":225},{"x":25,"y":25,"z":225},{"x":-25,"y":25,"z":225},{"x":-75,"y":25,"z":225},{"x":-125,"y":25,"z":225},{"x":-175,"y":25,"z":225},{"x":-225,"y":25,"z":225},{"x":-225,"y":25,"z":275},{"x":-175,"y":25,"z":275},{"x":-125,"y":25,"z":275},{"x":-75,"y":25,"z":275},{"x":-25,"y":25,"z":275},{"x":25,"y":25,"z":275},{"x":75,"y":25,"z":275},{"x":125,"y":25,"z":275},{"x":75,"y":25,"z":325},{"x":25,"y":25,"z":325},{"x":-75,"y":25,"z":325},{"x":-25,"y":25,"z":325},{"x":-125,"y":25,"z":325},{"x":-175,"y":25,"z":325},{"x":-125,"y":25,"z":375},{"x":-75,"y":25,"z":375},{"x":-25,"y":25,"z":375},{"x":25,"y":25,"z":375},{"x":-25,"y":25,"z":425},{"x":-75,"y":25,"z":425},{"x":-25,"y":25,"z":475},{"x":-475,"y":25,"z":25},{"x":275,"y":25,"z":175},{"x":275,"y":25,"z":125},{"x":275,"y":25,"z":75},{"x":275,"y":25,"z":25},{"x":275,"y":25,"z":-25},{"x":275,"y":25,"z":-75},{"x":275,"y":25,"z":-125},{"x":275,"y":25,"z":-175},{"x":275,"y":25,"z":-225},{"x":-75,"y":25,"z":-125},{"x":-75,"y":25,"z":-175},{"x":-75,"y":25,"z":-225},{"x":-125,"y":25,"z":-225},{"x":-175,"y":25,"z":-175},{"x":-175,"y":25,"z":-225},{"x":-225,"y":25,"z":-225},{"x":-225,"y":25,"z":-175},{"x":-225,"y":25,"z":-125},{"x":-225,"y":25,"z":-75},{"x":-225,"y":25,"z":25},{"x":-225,"y":25,"z":-25},{"x":-225,"y":25,"z":75},{"x":-225,"y":25,"z":175},{"x":-175,"y":25,"z":175},{"x":-125,"y":25,"z":125},{"x":-175,"y":25,"z":125},{"x":-225,"y":25,"z":125},{"x":-175,"y":25,"z":75},{"x":75,"y":25,"z":175},{"x":-75,"y":75,"z":-425},{"x":-125,"y":75,"z":-425},{"x":-175,"y":125,"z":-425},{"x":-175,"y":75,"z":-375},{"x":-225,"y":75,"z":-425},{"x":-125,"y":75,"z":-375},{"x":-75,"y":75,"z":-375},{"x":-75,"y":75,"z":-325},{"x":-175,"y":75,"z":-325},{"x":-325,"y":75,"z":-375},{"x":-125,"y":75,"z":-325},{"x":-275,"y":75,"z":-375},{"x":-175,"y":125,"z":-375},{"x":-175,"y":175,"z":-375},{"x":-125,"y":125,"z":-375},{"x":-175,"y":125,"z":-325},{"x":-225,"y":75,"z":-325},{"x":-225,"y":125,"z":-325},{"x":-325,"y":75,"z":-325},{"x":-275,"y":75,"z":-325},{"x":-275,"y":125,"z":-375},{"x":-225,"y":75,"z":-375},{"x":-225,"y":125,"z":-375},{"x":-225,"y":175,"z":-375},{"x":-275,"y":75,"z":-425},{"x":-175,"y":75,"z":-475},{"x":-225,"y":75,"z":-475},{"x":-225,"y":125,"z":-425},{"x":-275,"y":75,"z":-475},{"x":-325,"y":75,"z":-425}],"door":[{"x":225,"y":25,"z":175},{"x":175,"y":25,"z":125},{"x":225,"y":25,"z":125},{"x":175,"y":25,"z":75},{"x":75,"y":25,"z":75},{"x":75,"y":25,"z":25},{"x":125,"y":25,"z":-25},{"x":175,"y":25,"z":-75},{"x":225,"y":25,"z":-75},{"x":175,"y":25,"z":25},{"x":225,"y":25,"z":25},{"x":-125,"y":25,"z":-75},{"x":-175,"y":25,"z":25},{"x":-125,"y":25,"z":75},{"x":-125,"y":25,"z":25},{"x":-175,"y":75,"z":25},{"x":-175,"y":25,"z":-25},{"x":-175,"y":25,"z":-125},{"x":-125,"y":25,"z":-125},{"x":-175,"y":25,"z":-75},{"x":-125,"y":25,"z":-175},{"x":225,"y":25,"z":-25},{"x":175,"y":25,"z":-25},{"x":225,"y":25,"z":75},{"x":125,"y":25,"z":25},{"x":-275,"y":125,"z":-425},{"x":-225,"y":175,"z":-425},{"x":-225,"y":125,"z":-475},{"x":-175,"y":125,"z":-475},{"x":-175,"y":175,"z":-425},{"x":-225,"y":225,"z":-375},{"x":-175,"y":225,"z":-375},{"x":-275,"y":175,"z":-375},{"x":-175,"y":75,"z":75},{"x":-175,"y":75,"z":125},{"x":-175,"y":125,"z":75},{"x":-175,"y":125,"z":25},{"x":-125,"y":75,"z":75},{"x":-175,"y":175,"z":75},{"x":-125,"y":125,"z":75},{"x":-125,"y":75,"z":25},{"x":-125,"y":125,"z":25},{"x":-175,"y":175,"z":25},{"x":-125,"y":175,"z":75},{"x":-175,"y":75,"z":-25},{"x":-225,"y":75,"z":25},{"x":-225,"y":75,"z":-25},{"x":-225,"y":75,"z":125},{"x":-225,"y":75,"z":75},{"x":-225,"y":125,"z":75},{"x":-225,"y":125,"z":25},{"x":-175,"y":225,"z":25},{"x":-225,"y":175,"z":25},{"x":-225,"y":125,"z":-25},{"x":-175,"y":125,"z":-25},{"x":-75,"y":75,"z":-475},{"x":-125,"y":75,"z":-475},{"x":-25,"y":75,"z":-475},{"x":-25,"y":75,"z":-375},{"x":-25,"y":75,"z":-425},{"x":-25,"y":75,"z":-325},{"x":-75,"y":125,"z":-325},{"x":-75,"y":125,"z":-375},{"x":-75,"y":125,"z":-425},{"x":-125,"y":125,"z":-425},{"x":-125,"y":175,"z":-375},{"x":-125,"y":225,"z":-375},{"x":-125,"y":125,"z":-325},{"x":-175,"y":175,"z":-325},{"x":125,"y":75,"z":-275},{"x":75,"y":75,"z":-275},{"x":25,"y":75,"z":-275},{"x":25,"y":75,"z":-325},{"x":75,"y":75,"z":-325},{"x":125,"y":75,"z":-325},{"x":125,"y":75,"z":-375},{"x":125,"y":75,"z":-425},{"x":125,"y":75,"z":-475},{"x":75,"y":75,"z":-475},{"x":25,"y":75,"z":-475},{"x":25,"y":75,"z":-425},{"x":25,"y":75,"z":-375},{"x":75,"y":75,"z":-375},{"x":75,"y":75,"z":-425},{"x":-75,"y":75,"z":-275},{"x":175,"y":75,"z":-325},{"x":175,"y":75,"z":-375},{"x":225,"y":75,"z":-375},{"x":175,"y":75,"z":-475},{"x":175,"y":75,"z":-425},{"x":225,"y":75,"z":-425},{"x":275,"y":75,"z":-475},{"x":275,"y":75,"z":-425},{"x":225,"y":75,"z":-475},{"x":175,"y":125,"z":-425},{"x":125,"y":125,"z":-375},{"x":75,"y":125,"z":-425},{"x":25,"y":125,"z":-375},{"x":25,"y":125,"z":-325},{"x":-25,"y":125,"z":-325},{"x":-25,"y":125,"z":-375},{"x":-25,"y":125,"z":-425},{"x":25,"y":125,"z":-425},{"x":75,"y":125,"z":-375},{"x":75,"y":125,"z":-325},{"x":125,"y":125,"z":-325},{"x":175,"y":125,"z":-325},{"x":175,"y":125,"z":-375},{"x":225,"y":125,"z":-375},{"x":225,"y":125,"z":-425},{"x":275,"y":125,"z":-425},{"x":125,"y":125,"z":-425},{"x":75,"y":175,"z":-375},{"x":-25,"y":175,"z":-375},{"x":25,"y":175,"z":-325},{"x":-75,"y":175,"z":-325},{"x":-25,"y":175,"z":-325},{"x":-75,"y":175,"z":-375},{"x":-125,"y":175,"z":-425},{"x":-75,"y":175,"z":-425},{"x":-25,"y":175,"z":-425},{"x":25,"y":175,"z":-375},{"x":125,"y":175,"z":-375},{"x":175,"y":175,"z":-375},{"x":175,"y":175,"z":-325},{"x":125,"y":175,"z":-325},{"x":125,"y":225,"z":-325},{"x":75,"y":175,"z":-325},{"x":25,"y":225,"z":-375},{"x":-75,"y":225,"z":-375},{"x":-25,"y":225,"z":-375},{"x":75,"y":225,"z":-375},{"x":125,"y":225,"z":-375},{"x":175,"y":225,"z":-375},{"x":125,"y":125,"z":-475},{"x":125,"y":175,"z":-425},{"x":175,"y":175,"z":-425},{"x":125,"y":225,"z":-425},{"x":175,"y":225,"z":-425},{"x":75,"y":175,"z":-425},{"x":75,"y":225,"z":-425},{"x":25,"y":175,"z":-425},{"x":25,"y":225,"z":-425},{"x":25,"y":125,"z":-475},{"x":75,"y":125,"z":-475},{"x":175,"y":125,"z":-475},{"x":225,"y":125,"z":-475},{"x":175,"y":175,"z":-475},{"x":125,"y":175,"z":-475},{"x":75,"y":175,"z":-475},{"x":-25,"y":125,"z":-475},{"x":-75,"y":125,"z":-475},{"x":-125,"y":125,"z":-475},{"x":-275,"y":125,"z":-475},{"x":-325,"y":75,"z":-475},{"x":-225,"y":75,"z":175},{"x":-275,"y":75,"z":175},{"x":-325,"y":75,"z":75},{"x":-275,"y":75,"z":75},{"x":-275,"y":75,"z":125},{"x":-325,"y":75,"z":125},{"x":-325,"y":75,"z":-25},{"x":-325,"y":75,"z":25},{"x":-275,"y":75,"z":-25},{"x":-275,"y":75,"z":25},{"x":-375,"y":75,"z":25},{"x":-375,"y":75,"z":75},{"x":-275,"y":125,"z":25},{"x":-325,"y":125,"z":25},{"x":-325,"y":125,"z":75},{"x":-275,"y":125,"z":75},{"x":-275,"y":125,"z":125},{"x":-225,"y":125,"z":125},{"x":-225,"y":175,"z":75},{"x":-275,"y":175,"z":75},{"x":-325,"y":175,"z":75},{"x":-275,"y":225,"z":75},{"x":-225,"y":225,"z":75},{"x":-225,"y":225,"z":25},{"x":-275,"y":175,"z":25},{"x":-275,"y":225,"z":25},{"x":-325,"y":125,"z":-375},{"x":-375,"y":75,"z":-375},{"x":-425,"y":75,"z":-375},{"x":-375,"y":75,"z":-425},{"x":-425,"y":75,"z":-425},{"x":-475,"y":75,"z":-375},{"x":-425,"y":125,"z":-375},{"x":-325,"y":125,"z":-425},{"x":-375,"y":125,"z":-425},{"x":-375,"y":125,"z":-375},{"x":-225,"y":275,"z":25}]}'
var rollOverGeo, rollOverMaterial, rollOverMesh
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var objects = [];
var isShiftDown = false
var cubeGeo, cubeMaterial
var cube

var originCubePosition = JSON.parse(origin)


var currentCube = ''

var createPreview = function () {
    scene.remove(rollOverMesh)
    rollOverGeo = new THREE.BoxGeometry(50, 50, 50);
    rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    scene.add(rollOverMesh);
}

var createWater = function () {
    createPreview();
    cubeGeo = new THREE.BoxGeometry(50, 50, 50);
    cubeMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('../dist/textures/water/Water_2_M_Normal.jpg') });
    currentCube = 'water'
}

var createGrass = function () {
    createPreview();
    cubeGeo = new THREE.BoxGeometry(50, 50, 50);
    cubeMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('../dist/textures/grass/grass.jpg') });
    currentCube = 'grass'
}

var createBrick = function () {
    createPreview();
    cubeGeo = new THREE.BoxGeometry(50, 50, 50);
    cubeMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('../dist/textures/brick/brick_diffuse.jpg') });
    currentCube = 'brick'
}
//MC材质大门
var createDoor = function () {
    createPreview();
    cubeGeo = new THREE.BoxGeometry(50, 50, 50);
    var texture = new THREE.TextureLoader().load('../dist/textures/minecraft/door_spruce_lower.png');
    texture.magFilter = THREE.NearestFilter;//指定纹理的放大方式, nearestFilter最邻近过滤
    cubeMaterial = new THREE.MeshLambertMaterial({ map: texture });
    currentCube = 'door'
}

var exportCubePosition = function () {
    const ary = {
        'grass': [],
        'water': [],
        'brick': [],
        'door': [],
    }
    objects.forEach(obj => {
        switch (obj.name) {
            case 'ground':
                break;
            default:
                ary[obj.name].push(obj.position)
                break;
        }
    })
}

// // init

// create box
var info = document.createElement('div');
document.body.appendChild(info)
console.log(info.class);
info.class = 'info'
info.style.display = 'flex'
info.style.position = 'absolute';
info.style.top = '10px';
info.style.width = '200px';
info.style.height = '50px'
info.style.background = '#ccc'
info.style.textAlign = 'center';
info.style.zIndex = 99;
var waterElement = document.createElement('button')
waterElement.id = 'waterCube'
waterElement.onclick = createWater
waterElement.innerHTML = 'waterCube'
info.appendChild(waterElement);

var grassElement = document.createElement('button')
grassElement.id = 'grassCube'
grassElement.onclick = createGrass
grassElement.innerHTML = 'grassCube'

info.appendChild(grassElement);

var brickElement = document.createElement('button')
brickElement.id = 'brickCube'
brickElement.onclick = createBrick
brickElement.innerHTML = 'brickCube'
info.appendChild(brickElement);

var doorElement = document.createElement('button')
doorElement.id = 'doorCube'
doorElement.onclick = createDoor
doorElement.innerHTML = 'doorCube'
info.appendChild(doorElement);

var doorElement = document.createElement('button')
doorElement.id = 'export'
doorElement.onclick = exportCubePosition
doorElement.innerHTML = 'export'
info.appendChild(doorElement);


var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);//设置透视投影的相机
camera.position.set(500, 800, 1300);//设置相机坐标
camera.lookAt(new THREE.Vector3());//设置视野的中心坐标

var scene = new THREE.Scene();
var ratio = window.innerWidth / window.innerHeight;
var renderer = new THREE.WebGLRenderer();
var controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xCCCCCC, 1.0);


var clock = new THREE.Clock();


// var material = new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2, transparent: true });
// //创建一个线条材质，线条颜色黑色，透明度0.2
// var line = new THREE.LineSegments(geometry, material);
// scene.add(line);

const gui = new GUI();

var cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
camera.add(cameralight);
scene.add(camera);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(- 1, 1, 1);
scene.add(directionalLight);



//final update loop
var MyUpdateLoop = function () {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(MyUpdateLoop);
};
requestAnimationFrame(MyUpdateLoop);

//this fucntion is called when the window is resized
var MyResize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    console.log("resizing")
};
//link the resize of the window to the update of the camera
window.addEventListener('resize', MyResize);

scene.background = skybox();

var groundGeometry = new THREE.PlaneBufferGeometry(1000, 1000);
groundGeometry.name = 'PlaneBufferGeometry'
var groundMaterial = new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0.4 });
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.name = 'ground'
groundGeometry.rotateX(- Math.PI / 2);
// groundMaterial.wireframe = true
objects.push(ground);
scene.add(ground)
for (const key in originCubePosition) {
    switch (key) {
        case 'water':
            createWater()
            break;
        case 'grass':
            createGrass()
            break;
        case 'brick':
            createBrick()
            break;
        case 'door':
            createDoor()
            break;

        default:
            break;
    }
    originCubePosition[key].forEach(position => {
        // var cube_Geo = new THREE.BoxGeometry(50, 50, 50);
        // var cube_Material = new THREE.MeshLambertMaterial({ color: 0xfeb74c });
        var cube = new THREE.Mesh(cubeGeo, cubeMaterial);
        cube.position.x = position.x
        cube.position.y = position.y
        cube.position.z = position.z
        cube.name = key
        objects.push(cube);

        scene.add(cube)
    })
}

function onDocumentMouseMove(event) {
    event.preventDefault();//取消事件的默认动作
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0 && rollOverMesh) {
        var intersect = intersects[0];
        rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
        rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    }
    render();

}

function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        var intersect = intersects[0];
        if (isShiftDown) {
            if (intersect.object != ground) {
                scene.remove(intersect.object);
                objects.splice(objects.indexOf(intersect.object), 1);
            }
        } else {
            var voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
            voxel.position.copy(intersect.point).add(intersect.face.normal);
            voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
            voxel.castShadow = true
            scene.add(voxel);
            objects.push(voxel);
            // originCubePosition[currentCube].push(voxel.position)

        }
        render();

    }

}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 16: isShiftDown = true; break;

    }
}
function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 16: isShiftDown = false; break;

    }
}

function render() {

    renderer.render(scene, camera);


}


document.addEventListener('mousemove', onDocumentMouseMove, false);//鼠标移动事件
document.addEventListener('pointerdown', onDocumentMouseDown, false);//鼠标点击事件
document.addEventListener('keydown', onDocumentKeyDown, false);//对shift按键的控制
document.addEventListener('keyup', onDocumentKeyUp, false);//对shift按键的控制
console.log("done");
console.log(originCubePosition);