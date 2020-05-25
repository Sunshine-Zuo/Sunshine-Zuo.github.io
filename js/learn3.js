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

/* var geometry = new THREE.PlaneGeometry(200,200,10,10);
var meshMaterial = new THREE.MeshNormalMaterial({side:THREE.DoubleSide});
var wireframeMaterial = new THREE.MeshBasicMaterial({wireframe:true});
var plane = THREE.SceneUtils.createMultiMaterialObject(geometry,[meshMaterial,wireframeMaterial]);
scene.add(plane); */
/* var geometry = new THREE.CircleGeometry( 50, 30,0,Math.PI );
var material = new THREE.MeshBasicMaterial( { color: 0xffff00,wireframe:true } );
var circle = new THREE.Mesh( geometry, material );
scene.add( circle ); */
/* var geometry = new THREE.RingGeometry( 10, 50, 32, 8);
// var material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
// var mesh = new THREE.Mesh( geometry, material );
var meshMaterial = new THREE.MeshNormalMaterial({side:THREE.DoubleSide});
var wireframeMaterial = new THREE.MeshBasicMaterial({wireframe:true});
var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry,[meshMaterial,wireframeMaterial]);
scene.add( mesh ); */
/* var x = 0, y = 0;

var heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

var geometry = new THREE.ShapeGeometry( heartShape );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var mesh = new THREE.Mesh( geometry, material ) ;
scene.add( mesh ); */
/* var geometry = new THREE.SphereGeometry( 25, 32, 32,0,Math.PI,Math.PI*1/6,Math.PI*4/6 );
var material = new THREE.MeshNormalMaterial( {side:THREE.DoubleSide} );
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere ); */
/* var geometry = new THREE.CylinderGeometry( -15, 15, 20, 32, 1, true, 0, Math.PI );
var material = new THREE.MeshNormalMaterial( {side:THREE.DoubleSide} );
var cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder ); */
/* var geometry = new THREE.TorusGeometry( 100, 3, 5, 4, Math.PI );
var material = new THREE.MeshNormalMaterial( { side:THREE.DoubleSide } );
var torus = new THREE.Mesh( geometry, material );
scene.add( torus ); */
/* var geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16, 1, 2 );
var geometry = new THREE.IcosahedronGeometry(10,2);
var material = new THREE.MeshNormalMaterial();
var torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot ); */
/* var geometry = new THREE.BoxGeometry(10,10,10);
var edges = new THREE.EdgesGeometry( geometry );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var box = new THREE.Mesh( edges, material );
scene.add( box ); */
var points = [];
for ( var i = 0; i < 31.4; i +=3 ) {
	points.push( new THREE.Vector2( Math.abs(10*Math.sin(i*6)), i ));
}
var geometry = new THREE.LatheGeometry( points );
var material = new THREE.MeshNormalMaterial({ side:THREE.DoubleSide });
var lathe = new THREE.Mesh( geometry, material );
scene.add( lathe );

function animate(){
	stats.update();
	orbitControl.update();
	requestAnimationFrame(animate);
	render.render(scene,camera);
}
animate();