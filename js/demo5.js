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
var axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

var geometry = new THREE.BoxGeometry(50, 100, 50);
var material = new THREE.MeshLambertMaterial({
  color: 0x0000ff
});
var mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0,0,0)
scene.add(mesh);
// 设置产生投影的网格模型
mesh.castShadow = true;


//创建一个平面几何体作为投影面
var planeGeometry = new THREE.PlaneGeometry(300, 300);
var planeMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff,
	side:THREE.DoubleSide
});
// 平面网格模型作为投影面
var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh); //网格模型添加到场景中
planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
planeMesh.position.y = -60; //设置网格模型y坐标
// 设置接收阴影的投影面
planeMesh.receiveShadow = true;

/* // 方向光
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 设置光源位置
directionalLight.position.set(0, 100, 0);
directionalLight.lookAt(scene.position);
directionalLight.target = mesh;
scene.add(directionalLight);
// 设置用于计算阴影的光源对象
directionalLight.castShadow = true;
// 设置计算阴影的区域，最好刚好紧密包围在对象周围
// 计算阴影的区域过大：模糊  过小：看不到或显示不完整
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 300;
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 200;
directionalLight.shadow.camera.bottom = -100;
// 设置mapSize属性可以使阴影更清晰，不那么模糊
directionalLight.shadow.mapSize.set(1024,1024) */
var spotLight = new THREE.SpotLight(0xffffff);
// 设置聚光光源位置
spotLight.position.set(50, 90, 50);
// 设置聚光光源发散角度
spotLight.angle = Math.PI /6
scene.add(spotLight); //光对象添加到scene场景中
// 设置用于计算阴影的光源对象
spotLight.castShadow = true;
// 设置计算阴影的区域，注意包裹对象的周围
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 300;
spotLight.shadow.camera.fov = 20;

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