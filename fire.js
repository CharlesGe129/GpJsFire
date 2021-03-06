// @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
var accelorate = 0.5;

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
// set the scene size
var WIDTH = 680,
    HEIGHT = 500;

// set some camera attributes
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $container = $('#container');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.Camera(VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);
var scene = new THREE.Scene();

// the camera starts at 0,0,0 so pull it back
camera.position.z = 300;

// start the renderer - set the clear colour
// to a full black
renderer.setClearColor(new THREE.Color(0, 1));
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
$container.append(renderer.domElement);

// create the particle variables
var particleCount = 2500,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture(
            "partical.png"
        ),
        blending: THREE.AdditiveBlending,
        transparent: true
    });

// now create the individual particles
for (var p = 0; p < 1800; p++) {

    // create a particle with random
    // position values, -250 -> 250
    var pX = getNumberInNormalDistribution(0, 70),
        pY = getNumberInNormalDistribution(0, 5),
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vertex(
            new THREE.Vector3(pX, pY, -250)
        );
    // create a velocity vector
    particle.velocity = new THREE.Vector3(
        0, // x
        0, // y
        0); // z

    // add it to the geometry
    particles.vertices.push(particle);
}
// now create the individual particles
for (var p = 1800; p < particleCount; p++) {

    // create a particle with random
    // position values, -250 -> 250
    var pX = getNumberInNormalDistribution(0, 70),
        pY = getNumberInNormalDistribution(0, 5),
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vertex(
            new THREE.Vector3(pX, pY, pZ)
        );
    // create a velocity vector
    particle.velocity = new THREE.Vector3(
        0, // x
        0, // y
        0); // z

    // add it to the geometry
    particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial);

particleSystem.sortParticles = true;

// add it to the scene
scene.addChild(particleSystem);

// animation loop

function update() {
    //var allPosition = getAllPosition();

    // add some rotation to the system
    //particleSystem.rotation.y += 0.02;

    var pCount = particleCount;
    while (pCount--) {
        // get the particle
        var particle = particles.vertices[pCount];

        // check if we need to reset

        // update the velocity
        if (pCount >= 1800) {
            vx = Math.random() * .02 - 0.01;
            vy = Math.random() * .02 - 0.01;
            vz = Math.random() * .01;
            particle.velocity.x = (particle.position.x > 0 ? particle.velocity.x+vx : particle.velocity.x-vx);
            particle.velocity.y = (particle.position.y > 0 ? particle.velocity.y+vy : particle.velocity.y-vy);
            particle.velocity.z += vz;

            if (particle.position.z > 250) {
                particle.position.x = getNumberInNormalDistribution(0, 70);
                particle.position.y = getNumberInNormalDistribution(0, 5);
                particle.position.z = -250;
                particle.velocity.x = 0;
                particle.velocity.y = 0;
                particle.velocity.z = 0;
            }
        }

        // and the position
        particle.position.addSelf(
            particle.velocity);
    }

    // flag to the particle system that we've
    // changed its vertices. This is the
    // dirty little secret.
    particleSystem.geometry.__dirtyVertices = true;

    renderer.render(scene, camera);

    // set up the next call
    requestAnimFrame(update);
}

function getAllPosition() {
    var all = [];
    for (var i=0; i<particleCount; i++) {
        var a = Math.random()*200-100;
        var b = Math.random()*200-100;
        var c = getYbyX(b);
        all.push([a, b, c]);
    }
    return all;
}

requestAnimFrame(update);