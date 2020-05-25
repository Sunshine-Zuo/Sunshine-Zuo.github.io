var stats,scene,camera,renderer,controls,dragControls,selectedObject;
var front=back=left=right=false;
function initStats(){
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.right = '0px';
	stats.domElement.style.width = '80px';
	stats.domElement.style.height = '48px';
	document.body.appendChild(stats.domElement);
}
function initScene(){
	scene = new THREE.Scene();
	// console.log('12:',scene);
	// scene.fog = new THREE.Fog(scene.background,3000,5000);
}
function initCamera(){
	camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,10000);
	camera.position.set(500,500,500);
	camera.lookAt(0,0,0);
}
function initRenderer(){
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth,window.innerHeight);
	renderer.setClearColor(0x4682B4,1.0);
	renderer.shadowMap.enabled = true;
	document.body.appendChild(renderer.domElement);
}
function initControls(){
	controls = new THREE.OrbitControls(camera,renderer.domElement);
	// controls.enableDamping = true;//是否开启惯性
	// controls.dampingFactor = 0.5;//惯性因子
	// controls.maxPolarAngle = Math.PI*4;//最大旋转角度 默认Math.PI
}
function initDragControls(){
	// var transformControls = new THREE.TransformControls(camera, renderer.domElement);
	// scene.add(transformControls);
	// 过滤不是 Mesh 的物体,例如辅助网格对象
	var objects = [];
	for (let i = 0; i < scene.children.length; i++) {
		if (scene.children[i].isMesh) {
			objects.push(scene.children[i]);
		}
	}
	// console.log(11,objects);
	dragControls = new THREE.DragControls(objects, camera, renderer.domElement);

}
function initLight(){
	var ambientlight = new THREE.AmbientLight(0xffffff,0.6);
	scene.add(ambientlight);
	var directionallight = new THREE.DirectionalLight(0xffffff,0.8);
	directionallight.position.set(0,100,100);//默认照向0,0,0
	directionallight.castShadow = true;
	directionallight.shadow.camera.near = 0.5;
	directionallight.shadow.camera.far = 200;
	directionallight.shadow.camera.left = -50;
	directionallight.shadow.camera.right = 50;
	directionallight.shadow.camera.top = 100;
	directionallight.shadow.camera.bottom = -100;
	scene.add(directionallight);
}
function initAxesHelper(){
	var axesHelper = new THREE.AxesHelper(200);
	axesHelper.name = "辅助坐标";
	scene.add(axesHelper);
}
function initContent(){//在这个函数内部创建物体
	var cube1 = createBasicCube(80,10,10,20,20,20);
	cube1.name = "箱子1";
	var cube2 = createBasicCube(60,10,10,20,20,20,0xff0c33);
	cube2.name = "箱子2";
	var cube3 = createBasicCube(0,0,0,30,60,1,0x440c33);
	cube3.name = "门板1";
	var mesh = new THREE.Mesh(new THREE.BoxGeometry(40,20,20),new THREE.MeshBasicMaterial({color:0x0000ff}));
	// scene.add(mesh);
	var group = new THREE.Group();
	group.add(mesh);
	scene.add(group);
	mesh.position.z = 10;
	group.position.z = 10;
	scene.updateMatrixWorld(true);
	// console.log('position:',mesh.position);
	var worldposition = new THREE.Vector3();
	mesh.getWorldPosition(worldposition);
	// console.log('worldposition:',worldposition);
}

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
function init(){
	initStats();
	initScene();
	initCamera();
	initContent();
	initLight();
	initRenderer();
	initControls();
	initDragControls();
	initAxesHelper();
	window.addEventListener('resize',onWindowResize,false);
}
function animate(){
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	stats.update();
	controls.update();
	TWEEN.update();
	myupdate();
}
init();
animate();

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
function pickupObjects(e){
	e.preventDefault();
	//将鼠标点击位置的屏幕坐标转成threejs中的标准坐标
	mouse.x = (e.clientX/window.innerWidth)*2 -1;
	mouse.y = -(e.clientY/window.innerHeight)*2 + 1;
	//从相机发射一条射线，经过鼠标点击位置
	raycaster.setFromCamera(mouse,camera);
	//计算射线穿过的对象，可能有多个对象，因此返回的是一个数组，按离相机远近排列
	let intersects = raycaster.intersectObjects(scene.children);
	if(intersects.length>0){
		var object = intersects[0].object;
		console.log(object);
		if(object.type == 'Mesh'){
			selectedObject=object;
			controls.enabled = false;
		}else{
			selectedObject=null;
		}
	}
}
function moveSelectedObjects(e){
	
}
document.addEventListener('mousedown',function(e){pickupObjects(e);});
document.addEventListener('mouseup',function(e){
	// console.log(selectedObject);
	selectedObject=null;
	controls.enabled = true;
});
document.addEventListener('mousemove',function(e){moveSelectedObjects(e);});
document.addEventListener('keydown',function(e){
	switch (e.keyCode){
		case 65://a
		left = true;
		break;
		case 68://d
		right = true;
		break;
		case 83://s
		back = true;
		break;
		case 87://w
		front = true;
		break;
	}
});
document.addEventListener('keyup',function(e){
	switch (e.keyCode){
		case 65://a
		left = false;
		break;
		case 68://d
		right = false;
		break;
		case 83://s
		back = false;
		break;
		case 87://w
		front = false;
		break;
	}
});
/**
 * 创建一个盒子模型并添加到场景中，返回模型对象
 * @param {Object} x 位置坐标x
 * @param {Object} y 位置坐标y
 * @param {Object} z 位置坐标z
 * @param {Object} l 长
 * @param {Object} w 宽
 * @param {Object} h 高
 * @param {Object} c 16进制表示的颜色值
 * 材质默认为MeshLambertMaterial
 */
function createBasicCube(x,y,z,l,w,h,c){
	var geometry = new THREE.BoxGeometry(l||10,w||10,h||10);
	var material = new THREE.MeshPhongMaterial({color:c||0x666666});
	var Mesh = new THREE.Mesh(geometry,material);
	Mesh.position.x = x||0;
	Mesh.position.y = y||0;
	Mesh.position.z = z||0;
	scene.add(Mesh);
	return Mesh;
}
/**
 * 使用tween将模型移动到指定位置
 * @param {Object} obj 要移动的模型对象
 * @param {Object} target 要改变的位置属性
 * @param {Object} interval 花费的时间
 */
function moveTo(obj,target,interval){
	new TWEEN.Tween(obj.position).to(target,interval).onUpdate(function(){
		obj.position = target;
	}).start();
}
function rotateTo(obj,target,interval){
	new TWEEN.Tween(obj.rotation).to(target,interval).onUpdate(function(){
		obj.rotation = target;
	}).start();
}

function myupdate(){
	var aa = new THREE.Vector3();
	camera.getWorldDirection(aa);
	if(front){camera.position.add(aa.multiplyScalar(6))}
	if(back){camera.position.add(aa.negate())}
	if(left){camera.autoRotate=true}
	if(right){camera.autoRotate=false}
}