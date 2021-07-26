/* 

*/




// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Composites = Matter.Composites,
  Common = Matter.Common,
  Bodies = Matter.Bodies,
  MouseConstraint = Matter.MouseConstraint,
  Constraint = Matter.Constraint,
  Vertices = Matter.Vertices,
  Mouse = Matter.Mouse;

// create an engine
var engine = Engine.create();

var width_ = 800;
var height_ = 600;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: width_,
      height: height_,
      showVelocity: true,
      wireframes: true
    }
});


// create two boxes and a ground----------------
var boxR = Bodies.rectangle(width_, height_ / 2, 40, height_, {
    isStatic: true,
    friction: 0,
    restitution: 0.8
});
var boxL = Bodies.rectangle(0, height_ / 2, 40, height_, {
    isStatic: true,
    friction: 0,
    restitution: 0.8
});
//   var circle = Bodies.circle(90, 90, 10, {
//     friction: 0,
//     restitution: 0.8
//   });
var ground = Bodies.rectangle(width_ / 2, height_, width_, 100, {
    isStatic: true,
    angle: 0,
    friction: 0,
    restitution: 0.8
    });
var ceiling = Bodies.rectangle(width_ / 2, 0, width_, 40, {
    isStatic: true,
    angle: 0,
    friction: 0,
    restitution: 0.8
    });
//-------------------------------------
var x = [];
var y = [];
var zahyou = [];
var radius = 20;
var angle_upper_limit = 30;

//table with smooth edges-----------------------
zahyou.push({ x: 200 + radius, y: height_ - 100 });
zahyou.push({ x: -radius, y: height_ - 100 });
for (var i = angle_upper_limit; i > 0; i--) {
  x.push(radius * Math.cos((i * 3 * 2 * Math.PI) / 360) + 200);
  y.push(radius * Math.sin((-i * 3 * 2 * Math.PI) / 360) + 100);
}

for (var i = 180; i < 180 + angle_upper_limit; i++) {
  x.push(radius * Math.cos((i * 3 * 2 * Math.PI) / 360) + 0);
  y.push(radius * Math.sin((i * 3 * 2 * Math.PI) / 360) + 100);
}

for (var i = 0; i < x.length; i++) {
  zahyou.push(Matter.Vector.create(x[i], y[i]));
}

var tmp = Matter.Vertices.create(zahyou);
//decomp.makeCCW(zahyou);

var bodyC = Matter.Bodies.fromVertices(width_ / 2, height_ / 2 + 100, tmp, {
  friction: 0,
  restitution: 0.8,
});
Matter.Body.setStatic(bodyC, true);


var BoxA = Bodies.rectangle((width_ * 2) / 4 + 160, 220, 20, 20, {
  isStatic: false,
  friction: 0,
  restitution: 0,
  density: 0.005,
});
var BoxB = Bodies.rectangle((width_ * 2) / 4 + 30, 250, 100, 20, {
  isStatic: false,
  friction: 0,
  restitution: 0,
  density: 0.0005
});

//add circle
var Circles = [];
var number_of_circ = 0;
function draw_circle() {
    Circles.push(
        Bodies.circle(150, 50, 20, {
            isStatic: false,
            restitution: 0.7,
            friction: 0.02,
            frictionAir: 0,
            density: 0.01,
        })
        );
    World.add(engine.world, Circles[number_of_circ]);
    number_of_circ++;
    //console.log(number_of_circ)
}

//remove circle
function remove_circle() {
    Matter.Composite.remove(engine.world, Circles)
}

//add boxes
var Boxes = [];
var number_of_box = 0;
function draw_rectangle() {
  Boxes.push(
    Bodies.rectangle(350, 50, 50, 50, {
      isStatic: false,
      restitution: 0.7,
      friction: 0.02,
      frictionAir: 0,
      density: 0.01,
    })
  );
  World.add(engine.world, Boxes[number_of_box]);
  number_of_box++;
}

//remove boxes
function remove_boxes() {
    Matter.Composite.remove(engine.world, Boxes)
}

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
        }
});

World.add(engine.world, [ground, ceiling, boxR, boxL]);

World.add(engine.world, mouseConstraint);

engine.world.gravity.y = 0.5;

// keep the mouse in sync with rendering
render.mouse = mouse;
// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

// runner
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);
engine.constraintIterations = 20;
