var stats,scene,camera,renderer,controls;
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
	var geometry = new THREE.BoxGeometry(40,40,40);
	var textureLoader = new THREE.TextureLoader();
	/* var material = new THREE.MeshLambertMaterial({
		map:textureLoader.load('./img/crate.jpg')
	}); */
	var material1 = new THREE.MeshLambertMaterial({
		map:textureLoader.load('./img/crate.jpg'),
		side:THREE.DoubleSide
	});
	var material2 = new THREE.MeshLambertMaterial({
		map:textureLoader.load('./img/bricks.jpg')
	});
	var material3 = new THREE.MeshLambertMaterial({
		map:textureLoader.load('./img/clouds.jpg')
	});
	var material4 = new THREE.MeshLambertMaterial({
		map:textureLoader.load('./img/stone-wall.jpg')
	});
	var material5 = new THREE.MeshLambertMaterial({
		map:textureLoader.load('./img/water.jpg')
	});
	var material6 = new THREE.MeshLambertMaterial({
		map:textureLoader.load('./img/wood-floor.jpg')
	});
	var material7 = new THREE.MeshLambertMaterial({
		color:0xff0000
	});
	var video = document.getElementById('video');
	var videotexture = new THREE.VideoTexture( video );
	var material8 = new THREE.MeshLambertMaterial({
		map:videotexture,
		side:THREE.DoubleSide
	});
	var materials = [material1, material2/* , material3, material4, material5, material6 */, material7,material8];
	// var material = new THREE.MeshFaceMaterial(materials);
	var mesh = new THREE.Mesh(geometry,materials);
	mesh.position.set(20,20,20);
	mesh.name = "箱子";
	mesh.castShadow = true;
	scene.add(mesh);
	// console.log(scene.getObjectByName('箱子'));
	texture = textureLoader.load('./img/floor.jpg');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2,2);
	var planegeometry = new THREE.PlaneGeometry(200,200);
	var planematerial = new THREE.MeshLambertMaterial({
		map:texture,
		side:THREE.DoubleSide
	})
	var floor = new THREE.Mesh(planegeometry,planematerial);
	floor.position.y = -1;
	floor.rotation.x = Math.PI/2;
	floor.receiveShadow = true;
	floor.name = "地板";
	scene.add(floor);
	
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
	initAxesHelper();
	window.addEventListener('resize',onWindowResize,false);
}
function animate(){
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	stats.update();
	controls.update();
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
	if(intersects.length>0){console.log('cc:',intersects[0].object);}
	
}
document.addEventListener('mousedown',function(e){pickupObjects(e);});