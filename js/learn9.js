/**
 * 动画
 */
var render = new THREE.WebGLRenderer({antialias:true});
render.setClearColor('#eeeeee');
render.setSize(window.innerWidth,window.innerHeight);
render.shadowMap.enabled = true;
document.getElementById("container").appendChild(render.domElement);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,2000);
camera.position.set(0,10,0);
// camera.lookAt(0,0,0);
var ambientLight = new THREE.AmbientLight('#ccc',0.4);
scene.add(ambientLight);
var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
pointLight.position.set(0,0,250);
scene.add( pointLight );

// var axes = new THREE.AxesHelper(50);
// scene.add(axes);
var gridHelper = new THREE.GridHelper( 1000, 100 );
scene.add( gridHelper );
var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.right = '0px';
stats.domElement.style.width = '80px';
stats.domElement.style.height = '48px';
document.getElementById("container").appendChild(stats.domElement);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	render.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );

var ccc = new THREE.Mesh(new THREE.BoxGeometry(6,6,6),new THREE.MeshBasicMaterial({color:"#f00"}));
ccc.position.set(0,3,-100);
ccc.name = '传送门1';
scene.add(ccc);


var cubeGroup = new THREE.Group();
for(var i=0;i<100;i++){
	var g = new THREE.BoxGeometry(Math.random()*50+10,Math.random()*50+10,Math.random()*50+10);
	var m = new THREE.MeshPhongMaterial({color:"#"+Math.random().toString(16).substring(2,8)});
	var mesh = new THREE.Mesh(g,m);
	mesh.name = "方块"+i;
	mesh.position.set(Math.random()*1000-500,Math.random()*500,Math.random()*1000-500,)
	cubeGroup.add(mesh);
}
scene.add(cubeGroup);

var vec = new THREE.Vector3();
var doMoveForward = function ( distance ) {
	vec.setFromMatrixColumn( camera.matrix, 0 );
	vec.crossVectors( camera.up, vec );
	camera.position.addScaledVector( vec, distance );
};
var doMoveRight = function ( distance ) {
	vec.setFromMatrixColumn( camera.matrix, 0 );
	camera.position.addScaledVector( vec, distance );
};
var moveForward=moveLeft=moveBackward=moveRight=false;
var onKeyDown = function ( event ) {
	switch ( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = true;
			moveBackward = false;
			break;
		case 37: // left
		case 65: // a
			moveLeft = true;
			moveRight = false;
			break;
		case 40: // down
		case 83: // s
			moveBackward = true;
			moveForward = false;
			break;
		case 39: // right
		case 68: // d
			moveRight = true;
			moveLeft = false;
			break;
		case 32: // space
			// if ( canJump === true ) velocity.y += 350;
			// canJump = false;
			break;
		case 13: // enter
			break;
	}
};
var onKeyUp = function ( event ) {
	switch ( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = false;
			break;
		case 37: // left
		case 65: // a
			moveLeft = false;
			break;
		case 40: // down
		case 83: // s
			moveBackward = false;
			break;
		case 39: // right
		case 68: // d
			moveRight = false;
			break;
	}
};		
var mouse_down_right = false;
var onMouseDown = function(e){
	switch ( e.button ) {
		case 0: //left
		handleMouseLeft(e);
		break;
		case 1: //middle
		break;
		case 2: //right
		mouse_down_right = true;
		render.domElement.requestPointerLock();
		break;
	}
}
var onMouseUp = function(e){
	switch ( e.button ) {
		case 0: //left
		break;
		case 1: //middle
		break;
		case 2: //right
		mouse_down_right = false;
		document.exitPointerLock();
		break;
	}
}
var selectedObject = null;
var euler = new THREE.Euler( 0, 0, 0, 'YXZ' );
var PI_2 = Math.PI/2;
var onMouseMove = function(e){
	if(selectedObject){
		selectedObject.material.transparent = false;
		selectedObject.material.opacity = 1;
		selectedObject = null;
		document.getElementById('container').classList.remove('cursor01');
	}
	var intersects = getIntersects(e,cubeGroup);
	if(intersects.length>0){
		
		selectedObject = intersects[0].object;
		selectedObject.material.transparent = true;
		selectedObject.material.opacity = 0.5;
		document.getElementById('container').classList.add('cursor01');
	}
	
	if ( mouse_down_right === false ) return;
	var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
	var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
	euler.setFromQuaternion( camera.quaternion );
	euler.y -= movementX * 0.002;
	euler.x -= movementY * 0.002;
	euler.x = Math.max( - PI_2, Math.min( PI_2, euler.x ) );
	camera.quaternion.setFromEuler( euler );
}
var onMouseWheel = function(e){
	if(e.wheelDelta>0&&camera.fov<55){
		camera.fov+=1;
		camera.updateProjectionMatrix ();
	}else if(e.wheelDelta<0&&camera.fov>35){
		camera.fov-=1;
		camera.updateProjectionMatrix ();
	}
	
}
var handleMouseLeft = function(e){
	var intersects = getIntersects(e);
	if(intersects.length>0){
		if(intersects[0].object.isMesh&&intersects[0].object.name == '传送门1'){
			scene.remove(cubeGroup);
			scene.remove(gridHelper);
			console.log('aaa');
		}
	}
}
document.addEventListener('keydown', onKeyDown, false );
document.addEventListener('keyup', onKeyUp, false );				
document.addEventListener('mousedown',onMouseDown, false);
document.addEventListener('mouseup',onMouseUp, false);
document.addEventListener('mousemove',onMouseMove, false);
document.addEventListener('mousewheel',onMouseWheel, false);

var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector3();
function getIntersects(e,obj){
	obj = obj||scene;
	// var x = (e.layerX/window.innerWidth)*2 -1;
	// var y = -(e.layerY/window.innerHeight)*2 + 1;
	var x = ((e.layerX-document.body.scrollLeft)/window.innerWidth)*2 -1;
	var y = -((e.layerY-document.body.scrollTop)/window.innerHeight)*2 + 1;
	mouseVector.set(x,y,0.5);
	raycaster.setFromCamera(mouseVector,camera);
	return raycaster.intersectObject(obj,true);
}

var clock = new THREE.Clock();
function animate(){
	// ccc.scale.addScalar(0.01);
	var delta = clock.getDelta();
	stats.update();
	if(moveForward){
		doMoveForward(100*delta);
	}
	if(moveBackward){
		doMoveForward(-100*delta);
	}
	if(moveLeft){
		doMoveRight(-100*delta);
	}
	if(moveRight){
		doMoveRight(100*delta);
	}
	requestAnimationFrame(animate);
	render.render(scene,camera);
}
animate();