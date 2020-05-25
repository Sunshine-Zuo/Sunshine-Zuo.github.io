var render = new THREE.WebGLRenderer({antialias:true});
render.setClearColor('#eeeeee');
render.setSize(window.innerWidth,window.innerHeight);
render.shadowMap.enabled = true;
document.getElementById("container").appendChild(render.domElement);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,10000);
camera.position.set(100,300,300);
camera.lookAt(0,0,0);
var ambientLight = new THREE.AmbientLight('#fff',0.4);
scene.add(ambientLight);

var axes = new THREE.AxesHelper(200);
scene.add(axes);
var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.right = '0px';
stats.domElement.style.width = '80px';
stats.domElement.style.height = '48px';
document.getElementById("container").appendChild(stats.domElement);
var orbitControl = new THREE.OrbitControls(camera,render.domElement);

var cube = new THREE.Mesh(new THREE.BoxGeometry(10,10,10),new THREE.MeshPhysicalMaterial({color:'#aac3ff'}));
cube.position.y = 5;
scene.add(cube);
var floor = new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshStandardMaterial({color:'#ddd'}));
floor.rotation.x = -Math.PI/2;
scene.add(floor);
/* var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight ); */
var rectLight = new THREE.RectAreaLight( 0xffffff, 1,  10, 10 );
rectLight.position.set( 15, 5, 0 );
rectLight.lookAt(cube.position);
// rectLight.rotateY(Math.PI);
scene.add( rectLight );
var rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { side: THREE.DoubleSide } ) );
rectLightMesh.scale.x = rectLight.width;
rectLightMesh.scale.y = rectLight.height;
rectLight.add( rectLightMesh );

var rectLight2 = new THREE.RectAreaLight( 0xffffff, 1,  10, 10 );
rectLight2.position.set( 15, 5, 0 );
rectLight2.lookAt(cube.position);
// rectLight.rotateY(Math.PI);
scene.add( rectLight2 );
var rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { side: THREE.DoubleSide } ) );
rectLightMesh.scale.x = rectLight2.width;
rectLightMesh.scale.y = rectLight2.height;
rectLight2.add( rectLightMesh );

var rectLight3 = new THREE.RectAreaLight( 0xffffff, 1,  10, 10 );
rectLight3.position.set( 5, 5, 0 );
rectLight3.lookAt(cube.position);
rectLight3.rotateY(Math.PI);
scene.add( rectLight3 );
var rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { side: THREE.DoubleSide } ) );
rectLightMesh.scale.x = rectLight3.width;
rectLightMesh.scale.y = rectLight3.height;
rectLight3.add( rectLightMesh );
// var rectLightMeshBack = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { color: '#080808' } ) );
// rectLightMesh.add( rectLightMeshBack );

var step = 0;
function animate(){
	stats.update();
	orbitControl.update();
	rectLight.position.set(15*Math.cos(step+=0.005),5,15*Math.sin(step+=0.01));
	rectLight.lookAt(cube.position);
	rectLight2.position.set(15*Math.cos(step+=0.005),5,15*Math.sin(step+=0.01));
	rectLight2.lookAt(cube.position);
	rectLight2.rotateY(Math.PI);
	requestAnimationFrame(animate);
	render.render(scene,camera);
}
animate();