function init(){
	var scene = new THREE.Scene();
	// scene.fog = new THREE.Fog('#fff',0.01,1000);
	scene.fog = new THREE.FogExp2('#fff',0.003);
	var render = new THREE.WebGLRenderer();
	render.setClearColor('#eeeeee');
	render.setSize(window.innerWidth,window.innerHeight);
	render.shadowMap.enabled = true;
	var axes = new THREE.AxesHelper(200);
	scene.add(axes);
	
	var planegeometry = new THREE.PlaneGeometry(200,200,1,1);
	// var planematerial = new THREE.MeshBasicMaterial({color:'#cccccc'});
	var planematerial = new THREE.MeshLambertMaterial({color:'#fff'});
	var plane = new THREE.Mesh(planegeometry,planematerial);
	plane.rotation.x = -Math.PI/2;
	plane.position.set(15,0,0);
	plane.receiveShadow = true;
	scene.add(plane);
	
	var cubegeometry = new THREE.BoxGeometry(4,4,4);
	// var cubematerial = new THREE.MeshBasicMaterial({color:"#7777ff",wireframe:true});
	var cubematerial = new THREE.MeshLambertMaterial({color:'#ff0000'})
	var cube = new THREE.Mesh(cubegeometry,cubematerial);
	cube.position.set(-4,3,0);
	cube.castShadow = true;
	scene.add(cube);
	
	var spheregeometry = new THREE.SphereGeometry(10,20,20);
	var sphere = new THREE.Mesh(spheregeometry,cubematerial);
	sphere.position.set(10,10,0);
	sphere.castShadow = true;
	scene.add(sphere);
	
	var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,10000);
	camera.position.set(200,300,300);
	camera.lookAt(0,0,0);
	var spotlight = new THREE.SpotLight("#fff");
	spotlight.position.set(-40,60,-10);
	spotlight.castShadow = true;
	spotlight.shadow.camera.near = 0.5;
	spotlight.shadow.camera.far = 200;
	spotlight.shadow.camera.left = -50;
	spotlight.shadow.camera.right = 50;
	spotlight.shadow.camera.top = 100;
	spotlight.shadow.camera.bottom = -100;
	scene.add(spotlight);
	
	var stats;
	function initStats(){
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.right = '0px';
		stats.domElement.style.width = '80px';
		stats.domElement.style.height = '48px';
		document.getElementById("container").appendChild(stats.domElement);
	}
	var controls = {rotationSpeed:0.02,bouncingSpeed:0.04}
	var gui = new dat.GUI();
	gui.add(controls,'rotationSpeed',0,0.5);
	gui.add(controls,'bouncingSpeed',0,0.5);
	
	document.getElementById("container").appendChild(render.domElement);
	var step = 0;
	function renderScene(){
		stats.update();
		cube.rotation.x += controls.rotationSpeed;
		cube.rotation.y += controls.rotationSpeed;
		cube.rotation.z += controls.rotationSpeed;
		step+=controls.bouncingSpeed;
		sphere.position.x = 20+(20*Math.cos(step));
		sphere.position.y = 10+(10*Math.abs(Math.sin(step)));
		requestAnimationFrame(renderScene);
		render.render(scene,camera);
	}
	initStats();
	renderScene();
}
init();