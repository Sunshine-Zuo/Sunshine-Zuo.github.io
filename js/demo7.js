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

/* var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
//参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
var arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI);
//getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
var points = arc.getPoints(50);//分段数50，返回51个顶点
// setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
geometry.setFromPoints(points);
//材质对象
var material = new THREE.LineBasicMaterial({
  color: 0x000000
});
//线条模型对象
var line = new THREE.Line(geometry, material);
scene.add(line); //线条对象添加到场景中 */
/* var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
var R = 100; //圆弧半径
var N = 50; //分段数量
// 批量生成圆弧上的顶点数据
for (var i = 0; i <= N; i++) {
  var angle = 2 * Math.PI / N * i;
  var x = R * Math.sin(angle);
  var y = R * Math.cos(angle);
  geometry.vertices.push(new THREE.Vector3(x, y, 0));
}
// 插入最后一个点，line渲染模式下，产生闭合效果
// geometry.vertices.push(geometry.vertices[0])
//材质对象
var material = new THREE.LineBasicMaterial({
  color: 0x000000
});
//线条模型对象
var line = new THREE.Line(geometry, material);
scene.add(line); //线条对象添加到场景中 */
/* var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
var p1 = new THREE.Vector3(50, 0, 0); //顶点1坐标
var p2 = new THREE.Vector3(0, 70, 0); //顶点2坐标
//顶点坐标添加到geometry对象
geometry.vertices.push(p1, p2);
var material = new THREE.LineBasicMaterial({
  color: 0xffff00,
});//材质对象
//线条模型对象
var line = new THREE.Line(geometry, material);
scene.add(line); //线条对象添加到场景中 */
/* var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
// 三维样条曲线  Catmull-Rom算法
var curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-50, 20, 90),
  new THREE.Vector3(-10, 40, 40),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(70, 0, 80)
]);
//getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
var points = curve.getPoints(100); //分段数100，返回101个顶点
// setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
geometry.setFromPoints(points); */
/* var path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-10, -50, -50),
  new THREE.Vector3(10, 0, 0),
  new THREE.Vector3(8, 50, 50),
  new THREE.Vector3(-5, 0, 100)
]); */
/* var path = new THREE.LineCurve3(new THREE.Vector3(0, 100, 0), new THREE.Vector3(0, 0, 0));
// path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
var geometry = new THREE.TubeGeometry(path, 400, 2, 25); */
/* // 创建多段线条的顶点数据
var p1 = new THREE.Vector3(-85.35, -35.36)
var p2 = new THREE.Vector3(-50, 0, 0);
var p3 = new THREE.Vector3(0, 50, 0);
var p4 = new THREE.Vector3(50, 0, 0);
var p5 = new THREE.Vector3(85.35, -35.36);
// 创建线条一：直线
let line1 = new THREE.LineCurve3(p1,p2);
// 重建线条2：三维样条曲线
var curve = new THREE.CatmullRomCurve3([p2, p3, p4]);
// 创建线条3：直线
let line2 = new THREE.LineCurve3(p4,p5);
var CurvePath = new THREE.CurvePath();// 创建CurvePath对象
CurvePath.curves.push(line1, curve, line2);// 插入多段线条
//通过多段曲线路径创建生成管道
//通过多段曲线路径创建生成管道，CCurvePath：管道路径
var geometry = new THREE.TubeGeometry(CurvePath, 100, 5, 25, false);
//材质对象
var material = new THREE.LineBasicMaterial({
  color: 0x0ff00f
});
//线条模型对象
var line = new THREE.Line(geometry, material);
scene.add(line); //线条对象添加到场景中 */
/* var points = [
    new THREE.Vector2(50,60),
    new THREE.Vector2(25,0),
    new THREE.Vector2(50,-60)
];
var geometry = new THREE.LatheGeometry(points,30);
var material=new THREE.MeshPhongMaterial({
    color:0x0000ff,//三角面颜色
    side:THREE.DoubleSide//两面可见
});//材质对象
// material.wireframe = true;//线条模式渲染(查看细分数)
var mesh=new THREE.Mesh(geometry,material);//旋转网格模型对象
scene.add(mesh);//旋转网格模型添加到场景中 */
var shape = new THREE.Shape();
/**四条直线绘制一个矩形轮廓*/
shape.moveTo(0,0);//起点
shape.lineTo(0,20);//第2点
shape.lineTo(20,20);//第3点
shape.lineTo(20,0);//第4点
shape.lineTo(0,0);//第5点
/**创建轮廓的扫描轨迹(3D样条曲线)*/
var curve = new THREE.SplineCurve3([
   new THREE.Vector3( -10, -50, -50 ),
   new THREE.Vector3( 10, 0, 0 ),
   new THREE.Vector3( 8, 50, 50 ),
   new THREE.Vector3( -5, 0, 100)
]);
var geometry = new THREE.ExtrudeGeometry(//拉伸造型
   shape,//二维轮廓
   //拉伸参数
   {
       bevelEnabled:false,//无倒角
       extrudePath:curve,//选择扫描轨迹
       steps:50//扫描方向细分数
   }
);
var material=new THREE.LineBasicMaterial({
    color:0x0000ff,
    // size:5.0//点对象像素尺寸
});//材质对象
var mesh=new THREE.Mesh(geometry,material);//点模型对象
scene.add(mesh);//点模型添加到场景中

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