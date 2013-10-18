var ISEViewport = require( 'ise-viewport' );
var randomCubes = require( 'three-random-cubes' );
var EditorControls = require( 'ise-editor-controls' );
var THREE = require( 'three' );
var normalizeGeometry = require( 'three-normalize-geometry' );

var viewport = ISEViewport();
var controls = EditorControls( viewport.camera, viewport.container );
var scene = viewport.scene;

var material = new THREE.MeshPhongMaterial( {
  ambient: 0x555555,
  color: 0xcccccc,
  specular: 0x111111,
  shininess: 200
} );
// material.side = THREE.DoubleSide;

var renderer = viewport.renderer;
renderer.setClearColor( 0x000000 );

var loader = new THREE.STLLoader();
var clock = new THREE.Clock();
var mesh;

loader.addEventListener( 'load', function ( event ) {

  var geometry = event.content;

  geometry = normalizeGeometry( geometry, 'max', 700 );

  mesh = new THREE.Mesh( geometry, material );
  mesh.rotation.set( -Math.PI/2, 0, Math.PI/2 );
  scene.add( mesh );

  clock.start();
  viewport.preStack.push( {
    update: function() {
      mesh.rotateZ( 0.5 * clock.getDelta() );
    }
  } );

} );

// loader.load( 'cube.stl' );
loader.load( 'bridge.stl' );
// loader.load( 'https://dl.dropboxusercontent.com/u/3555625/3D_CHSR.stl' );
// loader.load( 'Nonzero_cubic.stl' );
// loader.load( 'long_nonzero.stl' );
// loader.load( 'long_zero.stl' );
