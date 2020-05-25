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
// var orbitControl = new THREE.OrbitControls(camera,render.domElement);

var box = new THREE.Mesh(new THREE.BoxGeometry(10,10,10),new THREE.MeshLambertMaterial({color:'#f000ff'}));
scene.add(box);
var box2 = new THREE.Mesh(new THREE.BoxGeometry(10,10,10),new THREE.MeshLambertMaterial({color:'#f000ff'}));
box2.position.set(20,0,0);
scene.add(box2);
var trackballControls = new THREE.TrackballControls(camera,render.domElement);

var clock = new THREE.Clock();
function animate(){
	var delta = clock.getDelta();
	trackballControls.update(delta);
	stats.update();
	// orbitControl.update();
	TWEEN.update();
	requestAnimationFrame(animate);
	render.render(scene,camera);
}
animate();

var selectedBox = null;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
function handleMousedown(e){
	e.preventDefault();
	if(e.button==0){//左键
		pickupObjects(e);
	}
}
function pickupObjects(e){
	//将鼠标点击位置的屏幕坐标转成threejs中的标准坐标
	mouse.x = (e.clientX/window.innerWidth)*2 -1;
	mouse.y = -(e.clientY/window.innerHeight)*2 + 1;
	//从相机发射一条射线，经过鼠标点击位置
	raycaster.setFromCamera(mouse,camera);
	//计算射线穿过的对象，可能有多个对象，因此返回的是一个数组，按离相机远近排列
	let intersects = raycaster.intersectObjects(scene.children);
	if(intersects.length>0){
		if(intersects[0].object.isMesh){
			intersects[0].object.material.color.set('#ff0000');
			if(selectedBox!=null){
				selectedBox.material.color.set('#f000ff');
			}
			selectedBox = intersects[0].object;
			jump(intersects[0].object);
		}
		// console.log('cc:',intersects[0].object);
	}
}
document.addEventListener('mousedown',function(e){handleMousedown(e)});

function jump(obj){
	var position = {y:obj.position.y};
	var target = {y:obj.position.y+10};
	var position2 = {y:obj.position.y};
	var target2 = {y:obj.position.y+10};
	var tweenTo = new TWEEN.Tween(position).to(target,500).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(){
		obj.position.y = position.y;
	});
	
	var tweenBack = new TWEEN.Tween(target2).to(position2,500).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(){
		obj.position.y = target2.y;
	});
	tweenTo.chain(tweenBack);
	tweenTo.start();
}