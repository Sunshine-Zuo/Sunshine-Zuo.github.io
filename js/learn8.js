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

var texture = new THREE.TextureLoader().load('./img/biaoyu.png',function(map){
	var back = new THREE.Mesh(new THREE.PlaneGeometry(80,20,16,4),new THREE.MeshBasicMaterial({color:'#000'}));
	back.position.z = -0.2;
	scene.add(back);
	var linemat = new THREE.LineBasicMaterial({color:'#ffe54c'});
	for(var i=0;i<=80;i+=2.5){
		var lingeo = new THREE.Geometry();
		lingeo.vertices.push(new THREE.Vector3(-40+i,10,-0.1),new THREE.Vector3(-40+i,-10,-0.1))
		var line = new THREE.Line(lingeo,linemat);
		scene.add(line);
	}
	for(var i=0;i<=20;i+=2.5){
		var lingeo = new THREE.Geometry();
		lingeo.vertices.push(new THREE.Vector3(-40,-10+i,-0.1),new THREE.Vector3(40,-10+i,-0.1))
		var line = new THREE.Line(lingeo,linemat);
		scene.add(line);
	}
	var box = new THREE.Mesh(new THREE.PlaneGeometry(70,12),new THREE.MeshBasicMaterial({map:map,transparent:true,side:THREE.DoubleSide}));
	scene.add(box);
});
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
var texture2 = new THREE.TextureLoader().load('./img/jiantou.png',function(map){
	var border1 = new THREE.Mesh(new THREE.PlaneGeometry(72,4),new THREE.MeshBasicMaterial({map:map,transparent:true,side:THREE.DoubleSide}));
	border1.position.y=8;
	scene.add(border1);
	var border2 = new THREE.Mesh(new THREE.PlaneGeometry(72,4),new THREE.MeshBasicMaterial({map:map,transparent:true,side:THREE.DoubleSide}));
	border2.position.y=-8;
	border2.rotateZ(Math.PI);
	scene.add(border2);
})
texture2.wrapS = THREE.RepeatWrapping;
texture2.wrapT = THREE.RepeatWrapping;
texture2.repeat.x = 20;
var texture3 = new THREE.TextureLoader().load('./img/jiantou.png',function(map){
	var border3 = new THREE.Mesh(new THREE.PlaneGeometry(12,4),new THREE.MeshBasicMaterial({map:map,transparent:true,side:THREE.DoubleSide}));
	border3.position.x=-38;
	border3.rotateZ(Math.PI/2);
	scene.add(border3);
	var border4 = new THREE.Mesh(new THREE.PlaneGeometry(12,4),new THREE.MeshBasicMaterial({map:map,transparent:true,side:THREE.DoubleSide}));
	border4.position.x=38;
	border4.rotateZ(-Math.PI/2);
	scene.add(border4);
})
texture3.wrapS = THREE.RepeatWrapping;
texture3.wrapT = THREE.RepeatWrapping;
texture3.repeat.x = 3.5;
var cube1 = new THREE.Mesh(new THREE.PlaneGeometry(4,4),new THREE.MeshLambertMaterial({color:"#008700"}));
cube1.position.set(-38,8,0);
scene.add(cube1);
var cube2 = new THREE.Mesh(new THREE.PlaneGeometry(4,4),new THREE.MeshLambertMaterial({color:"#008700"}));
cube2.position.set(38,8,0);
scene.add(cube2);
var cube3 = new THREE.Mesh(new THREE.PlaneGeometry(4,4),new THREE.MeshLambertMaterial({color:"#008700"}));
cube3.position.set(-38,-8,0);
scene.add(cube3);
var cube4 = new THREE.Mesh(new THREE.PlaneGeometry(4,4),new THREE.MeshLambertMaterial({color:"#008700"}));
cube4.position.set(38,-8,0);
scene.add(cube4);

var orbitControl = new THREE.OrbitControls(camera,render.domElement);
var clock = new THREE.Clock();
function animate(){
	var delta = clock.getDelta();
	stats.update();
	texture.offset.x+=0.001;
	texture2.offset.x+=0.02;
	texture3.offset.x+=0.02;
	orbitControl.update();
	requestAnimationFrame(animate);
	render.render(scene,camera);
}
animate();