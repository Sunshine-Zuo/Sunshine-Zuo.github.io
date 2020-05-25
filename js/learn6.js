/**
 * 加载外部模型
 */
var render = new THREE.WebGLRenderer({antialias:true});
render.setClearColor('#eeeeee');
render.setSize(window.innerWidth,window.innerHeight);
render.shadowMap.enabled = true;
document.getElementById("container").appendChild(render.domElement);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,2000);
camera.position.set(0,0,250);
camera.lookAt(0,0,0);
var ambientLight = new THREE.AmbientLight('#ccc',0.4);
scene.add(ambientLight);
var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
pointLight.position.set(0,0,250);
scene.add( pointLight );

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

function onProgress( xhr ) {
	if ( xhr.lengthComputable ) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
	}
}
function onError() {}
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('./img/uv_grid_opengl.jpg');
var object;
var objLoader = new THREE.OBJLoader();
objLoader.load('./model/male02/male02.obj',function(obj){
	object = obj;
	object.traverse(function(child){
		if(child.isMesh){
			child.material.map = texture;
			// child.material = new THREE.MeshPhongMaterial({map:texture})
		}
	})
	object.position.set(0,-95,0)
	scene.add(object);
},onProgress,onError)

/* new THREE.MTLLoader().setPath('./model/male02/').load('male02.mtl',function(materials){
	materials.preload();
	new THREE.OBJLoader().setMaterials(materials).setPath('./model/male02/').load('male02.obj',function(obj){
		obj.position.y = -95;
		scene.add(obj);
	},onProgress,onError)
}) */
/* new THREE.OBJLoader().setPath('./model/male02/').load('male02.obj',function(obj){
	var m = new THREE.PointsMaterial({color:'#f000ff',size:2,opacity:0.8,transparent:true,blending:THREE.SubtractiveBlending});
	var p = new THREE.Points(obj,m);
	// obj.position.y = -95;
	scene.add(p);
},onProgress,onError) */
function animate(){
	stats.update();
	orbitControl.update();
	requestAnimationFrame(animate);
	render.render(scene,camera);
}
animate();