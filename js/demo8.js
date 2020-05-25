var scene = new THREE.Scene();
var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);
var pointlight = new THREE.PointLight(0xffff);
pointlight.position.set(300,0,300);
scene.add(pointlight);
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

// var geometry = new THREE.PlaneGeometry(204, 102); //矩形平面
// var geometry = new THREE.BoxGeometry(100, 100, 100);
var geometry = new THREE.SphereGeometry(60, 25, 25);
// TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
var textureLoader = new THREE.TextureLoader();
// 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
textureLoader.load('./img/icon01.png', function(texture) {
  var material = new THREE.MeshLambertMaterial({
    // color: 0x0000ff,
    // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
    map: texture,//设置颜色贴图属性值
		side:THREE.DoubleSide
  }); //材质对象Material
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  scene.add(mesh); //网格模型添加到场景中
})

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);//设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
//执行渲染操作   指定场景、相机作为参数
// renderer.render(scene, camera);
var controls = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
function render() {
	renderer.render(scene,camera);//执行渲染操作
	// personGroup.rotateY(0.01);//每次绕y轴旋转0.01弧度
	requestAnimationFrame(render);//请求再次执行渲染函数render
}
render();