var scene = new THREE.Scene();
var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);
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

/* var geometry = new THREE.SphereGeometry(100,30,30);
var material = new THREE.PointsMaterial({color:0x0000ff,size:3});
var point = new THREE.Points(geometry,material);
scene.add(point); */
/* var geometry = new THREE.SphereGeometry(100,60,60);
var material = new THREE.LineBasicMaterial({color:0x0000ff});
var line = new THREE.Line(geometry,material);
scene.add(line); */
var geometry = new THREE.SphereGeometry(100,60,60);
var material = new THREE.LineBasicMaterial({color:0x0000ff,dashSize:10,gapSize:5});
var line = new THREE.LineSegments(geometry,material);
// line.computeLineDistances();
scene.add(line);

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