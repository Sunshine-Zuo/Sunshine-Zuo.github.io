var stats,scene,camera,renderer,orbitControls,dragControls,selectedObject,person;
var front=back=left=right=up=false;//键盘前后左右
var mouseleftpress=mousemiddlepress=mouserightpress=false;//鼠标左中右
var testobj;
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
	camera.up = new THREE.Vector3(0,1,0);
	camera.position.set(400,400,400);
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
function initOrbitControls(){
	orbitControls = new THREE.OrbitControls(camera,renderer.domElement);
	// controls.enableDamping = true;//是否开启惯性
	// controls.dampingFactor = 0.5;//惯性因子
	// controls.maxPolarAngle = Math.PI*4;//最大旋转角度 默认Math.PI
}
function initDragControls(){
	// var transformControls = new THREE.TransformControls(camera, renderer.domElement);
	// scene.add(transformControls);
	// 过滤不是 Mesh 的物体,例如辅助网格对象
	var objects = [];
	for (var i = 0; i < scene.children.length; i++) {
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
	scene.add(cube1);
}
function initPerson(){
	var head = new THREE.Mesh(new THREE.SphereGeometry(20,30,30),new THREE.MeshBasicMaterial({
		color:0x23dc99,
		transparent:false,
		opacity:0.2}));
	head.name = "头";
	var lefteye = new THREE.Mesh(new THREE.SphereGeometry(6,20,20),new THREE.MeshBasicMaterial({color:0x000000}));
	lefteye.position.set(0,12,15);
	lefteye.name = "左眼";
	var righteye = new THREE.Mesh(new THREE.SphereGeometry(6,20,20),new THREE.MeshBasicMaterial({color:0x000000}));
	righteye.position.set(15,12,0);
	righteye.name = "右眼";
	var viewpoint = new THREE.Mesh(new THREE.SphereGeometry(2,14,14),new THREE.MeshBasicMaterial({
		color:0xff0000,
		transparent:true,
		opacity:0}))
	viewpoint.position.set(30,12,30);
	viewpoint.name="视点";
	var viewpointWorldposition = new THREE.Vector3();
	viewpoint.getWorldPosition(viewpointWorldposition);
	person = new THREE.Object3D();
	person.name = "人";
	scene.add(person);
	person.add(camera,viewpoint,head,lefteye,righteye);
	camera.position.set(4,12,4);
	camera.lookAt(person.children[1].position);
	// person.rotateY(Math.PI/4);
	// person.position.x = -200;
}
function initTestObj(){
	testobj = createBasicCube(0,0,0,10,10,10);
	scene.add(testobj);
}

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
function init(){
	initStats();
	initScene();
	initLight();
	initCamera();
	initContent();
	initPerson();
	initRenderer();
	// initDragControls();
	initAxesHelper();
	// initOrbitControls();
	window.addEventListener('resize',onWindowResize,false);
	initTestObj();
}
function animate(){
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	stats.update();
	// orbitControls.update();
	TWEEN.update();
	myupdate();
}
init();
animate();

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var lastX,currentX,lastY,currentY;
function mouseDown(e){
	e.preventDefault();
	if(e.button==0){//左键
		mouseleftpress = true;
		//将鼠标点击位置的屏幕坐标转成threejs中的标准坐标
		mouse.x = (e.clientX/window.innerWidth)*2 -1;
		mouse.y = -(e.clientY/window.innerHeight)*2 + 1;
		//从相机发射一条射线，经过鼠标点击位置
		raycaster.setFromCamera(mouse,camera);
		//计算射线穿过的对象，可能有多个对象，因此返回的是一个数组，按离相机远近排列
		var intersects = raycaster.intersectObjects(scene.children);
		if(intersects.length>0){
			var object = intersects[0].object;
			selectedObject=object;
		}else{
			selectedObject=null;
		}
	}else if(e.button==1){//中键
		mousemiddlepress = true;
	}else if(e.button==2){//右键
		mouserightpress = true;
		lastX = currentX = e.clientX;
		lastY = currentY = e.clientY;
		
		var direction = new THREE.Vector3();
		camera.getWorldDirection(direction);
		console.log('前：',direction.normalize());
		direction.projectOnPlane(new THREE.Vector3(0,1,0));
		console.log('后：',direction);
	}
}
function mouseUp(e){
	if(e.button==0){
		mouseleftpress=false;
	}else if(e.button==1){
		mousemiddlepress=false;
	}else if(e.button==2){
		mouserightpress=false;
	}
}
function mouseMove(e){
	if(mouserightpress){
		lastX = currentX;
		currentX = e.clientX;
		if(lastX!=currentX){
			person.rotateOnAxis(new THREE.Vector3(0,1,0),Math.PI/180*(currentX-lastX)*0.08);
		}
		lastY = currentY;
		currentY = e.clientY;
		if(lastY!=currentY){
			person.rotateOnAxis(new THREE.Vector3(-1,0,1),-Math.PI/180*(currentY-lastY)*0.08);
		}
	}
}
function mouseWheel(e){
	if(e.wheelDelta){
		if(e.wheelDelta>0){
			if(camera.position.x<6){
			camera.position.x+=1;
			camera.position.z+=1;
			}
		}
		if(e.wheelDelta<0){
			if(camera.position.x>1){
			camera.position.x-=1;
			camera.position.z-=1;
			}
		}
	}
}
function personJump(){
	// var tweento = new TWEEN.Tween(testobj.position).to({z:100},1000).easing(TWEEN.Easing.Quadratic.Out).start();
	var tweento = new TWEEN.Tween(person.position).to({y:40},500).easing(TWEEN.Easing.Quadratic.Out);
	var tweenback = new TWEEN.Tween(person.position).to({y:0},500).easing(TWEEN.Easing.Quadratic.In);
	tweento.chain(tweenback).start();
}
document.addEventListener('mousedown',function(e){mouseDown(e);});
document.addEventListener('mouseup',function(e){mouseUp(e);});
document.addEventListener('mousemove',function(e){mouseMove(e);});
document.addEventListener('mousewheel',function(e){mouseWheel(e);});
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
		case 32://space
		if(!up){
			personJump();
		}
		up = true;
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
		case 32://space
		up = false;
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

function myupdate(){
	var direction = new THREE.Vector3();
	camera.getWorldDirection(direction);
	direction.projectOnPlane(new THREE.Vector3(0,1,0));//让人物只能在水平面移动
	
	if(front){person.position.add(direction.multiplyScalar(2))}
	if(back){person.position.add(direction.negate().multiplyScalar(2))}
	if(left){
		direction.applyAxisAngle(new THREE.Vector3(0,1,0),Math.PI/2);
		person.position.add(direction.multiplyScalar(2));
	}
	if(right){
		direction.applyAxisAngle(new THREE.Vector3(0,1,0),-Math.PI/2);
		person.position.add(direction.multiplyScalar(2));
	}
}