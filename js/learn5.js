/**
 * 精灵 粒子
 */
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

var meshNormalMaterial = new THREE.MeshNormalMaterial({ side:THREE.DoubleSide });
/* var material = new THREE.SpriteMaterial(material);
for(var x=-5;x<5;x++){
	for(var y=-5;y<5;y++){
		var sprite = new THREE.Sprite(material);
		sprite.position.set(x*10,y*10,0);
		scene.add(sprite);
	}
} */
/* var g = new THREE.Geometry();
var m = new THREE.PointsMaterial({size:4,vertexColors:true,color:0xffffff});
for(var x=-5;x<5;x++){
	for(var y=-5;y<5;y++){
		var p = new THREE.Vector3(x*10,y*10,0);
		g.vertices.push(p);
		g.colors.push(new THREE.Color(Math.random()*0x00ffff));
	}
}
var cloud = new THREE.Points(g,m);
scene.add(cloud); */
/* var geo = new THREE.Geometry();
var material = new THREE.PointsMaterial({size:5,transparent:true,opacity:0.8,vertexColors:THREE.VertexColors,sizeAttenuation:false});
for(var i=0;i<15000;i++){
	var particle = new THREE.Vector3(Math.random()*500-250,Math.random()*500-250,Math.random()*500-250);
	geo.vertices.push(particle);
	var color = new THREE.Color(0x00ff00);
	var target = {};
	color.getHSL(target);
	color.setHSL(target.h,target.s,Math.random()*target.l);
	// color.setHSL(color.getHSL().h,color.getHSL().s,Math.random()*color.getHSL().l);
	geo.colors.push(color)
}
var points = new THREE.Points(geo,material);
scene.add(points); */
var textureLoader = new THREE.TextureLoader();
var sprite1 = textureLoader.load( './img/snowflake1.png' );
var sprite2 = textureLoader.load( './img/snowflake2.png' );
var sprite3 = textureLoader.load( './img/snowflake3.png' );
var sprite4 = textureLoader.load( './img/snowflake4.png' );
var sprite5 = textureLoader.load( './img/snowflake5.png' );
var geo1 = new THREE.Geometry();
for(var i=0;i<1000;i++){
	geo1.vertices.push(new THREE.Vector3(Math.random()*1000-500,Math.random()*1000-500,Math.random()*1000-500));
}
var geo2 = new THREE.Geometry();
for(var i=0;i<1000;i++){
	geo2.vertices.push(new THREE.Vector3(Math.random()*1000-500,Math.random()*1000-500,Math.random()*1000-500));
}
var geo3 = new THREE.Geometry();
for(var i=0;i<1000;i++){
	geo3.vertices.push(new THREE.Vector3(Math.random()*1000-500,Math.random()*1000-500,Math.random()*1000-500));
}
var geo4 = new THREE.Geometry();
for(var i=0;i<1000;i++){
	geo4.vertices.push(new THREE.Vector3(Math.random()*1000-500,Math.random()*1000-500,Math.random()*1000-500));
}
var geo5 = new THREE.Geometry();
for(var i=0;i<1000;i++){
	geo5.vertices.push(new THREE.Vector3(Math.random()*1000-500,Math.random()*1000-500,Math.random()*1000-500));
}
var material1 = new THREE.PointsMaterial({size:25,transparent:false,opacity:0.9,sizeAttenuation:false,blending: THREE.SubtractiveBlending,map:sprite1});
var material2 = new THREE.PointsMaterial({size:25,transparent:false,opacity:0.9,sizeAttenuation:false,blending: THREE.SubtractiveBlending,map:sprite2});
var material3 = new THREE.PointsMaterial({size:25,transparent:false,opacity:0.9,sizeAttenuation:false,blending: THREE.SubtractiveBlending,map:sprite3});
var material4 = new THREE.PointsMaterial({size:25,transparent:false,opacity:0.9,sizeAttenuation:false,blending: THREE.SubtractiveBlending,map:sprite4});
var material5 = new THREE.PointsMaterial({size:25,transparent:false,opacity:0.9,sizeAttenuation:false,blending: THREE.SubtractiveBlending,map:sprite5});
material1.color.set('#'+Math.random().toString(16).substring(2,8));//随机颜色
var points1 = new THREE.Points(geo1,material1);
scene.add(points1);
material2.color.set('#'+Math.random().toString(16).substring(2,8));//随机颜色
var points2 = new THREE.Points(geo2,material2);
scene.add(points2);
material3.color.set('#'+Math.random().toString(16).substring(2,8));//随机颜色
var points3 = new THREE.Points(geo3,material3);
scene.add(points3);
material4.color.set('#'+Math.random().toString(16).substring(2,8));//随机颜色
var points4 = new THREE.Points(geo4,material4);
scene.add(points4);
material5.color.set('#'+Math.random().toString(16).substring(2,8));//随机颜色
var points5 = new THREE.Points(geo5,material5);
scene.add(points5);

function animate(){
	stats.update();
	orbitControl.update();
	var vertices = points5.geometry.vertices;
	vertices.forEach(function(v){
		// console.log(v);
		if(v.y<=-500){
			v.y=500;
		}else{
			v.y-=2;
		}
	})
	points5.updateMatrix();
	requestAnimationFrame(animate);
	render.render(scene,camera);
}
animate();