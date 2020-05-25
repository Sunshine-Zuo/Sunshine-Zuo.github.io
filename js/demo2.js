var scene = new THREE.Scene();
var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);
var pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(200,200,200);
scene.add(pointlight);
var geometry = new THREE.BufferGeometry();
var vertices = new Float32Array([0,0,0, 50,0,0, 0,100,0, 0,0,0, 0,0,100, 50,0,0]);
var attribute = new THREE.BufferAttribute(vertices,3);
geometry.attributes.position = attribute;
var normals = new Float32Array([
  0, 0, 1, //顶点1法向量
  0, 0, 1, //顶点2法向量
  0, 0, 1, //顶点3法向量

  0, 1, 0, //顶点4法向量
  0, 1, 0, //顶点5法向量
  0, 1, 0, //顶点6法向量
]);
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);
/* var colors = new Float32Array([
  1, 0, 0, //顶点1颜色
  0, 1, 0, //顶点2颜色
  0, 0, 1, //顶点3颜色

  1, 1, 0, //顶点4颜色
  0, 1, 1, //顶点5颜色
  1, 0, 1, //顶点6颜色
]);
geometry.attributes.color = new THREE.BufferAttribute(colors,3); */
// var material = new THREE.MeshBasicMaterial({color:0xff0000,side:THREE.DoubleSide});
// var material = new THREE.PointsMaterial({vertexColors:THREE.VertexColors,size:10.0});
// var material = new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});
var material = new THREE.MeshLambertMaterial({color: 0xffff00});
var mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(0, 0, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
var axisHelper = new THREE.AxisHelper(250);
scene.add(axisHelper);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);//设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
//执行渲染操作   指定场景、相机作为参数
// renderer.render(scene, camera);
var controls = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
function render() {
	renderer.render(scene,camera);//执行渲染操作
	// mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
	requestAnimationFrame(render);//请求再次执行渲染函数render
}
render();