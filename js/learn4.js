/**
 * 使用ThreeBSP来组合模型
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
/* var g1 = new THREE.BoxGeometry(10,10,10);
var g2 = new THREE.BoxGeometry(60,60,2);
// var m1 = new THREE.Mesh(g1,meshNormalMaterial);
// var m2 = new THREE.Mesh(g2,meshNormalMaterial);
// scene.add(m1);
// scene.add(m2);
var bsp1 = new ThreeBSP(g1);
var bsp2 = new ThreeBSP(g2);
// var bsp = bsp2.subtract(bsp1);
var bsp = bsp2.union(bsp1);
// var bsp = bsp2.intersect(bsp1);
var result = bsp.toMesh(meshNormalMaterial);
result.geometry.computeVertexNormals();
scene.add(result); */
var cylinder = new THREE.CylinderGeometry(50,50,5,40);//圆柱
var box = new THREE.BoxGeometry(40,5,40);//立方体
//材质对象
var material=new THREE.MeshPhongMaterial({color:0x0000ff});
//网格模型对象
var cylinderMesh=new THREE.Mesh(cylinder,material);//圆柱
var boxMesh=new THREE.Mesh(box,material);//立方体
//包装成ThreeBSP对象
var cylinderBSP = new ThreeBSP(cylinderMesh);
var boxBSP = new ThreeBSP(boxMesh);
var result = cylinderBSP.subtract(boxBSP);
//ThreeBSP对象转化为网格模型对象
var mesh = result.toMesh();
scene.add(mesh);//网格模型添加到场景中

function animate(){
	stats.update();
	orbitControl.update();
	requestAnimationFrame(animate);
	render.render(scene,camera);
}
animate();