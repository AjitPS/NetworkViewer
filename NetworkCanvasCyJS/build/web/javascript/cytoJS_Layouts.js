/**
 * @author Ajit Singh
 * @name Network View layouts
 * @description code for Network View using CytoscapeJS layouts such as breadthfirst, grid, cose, circle 
 * and concentric and third party layout algorithms such as CoLa, arbor, springy and dagre (tree).
 * @returns
 **/
   var animate_layout= true; // global variable for layout animation setting (default: true).

   function setLayoutAnimationSetting() { // Toggle layout animation On/ Off.
    if(document.getElementById("animateLayout").checked) {
       animate_layout= true;
      }
    else {
     animate_layout= false;
    }
    console.log("setLayoutAnimationSetting()>> checkbox checked: "+ document.getElementById("animateLayout").checked +" --> animate_layout= "+ animate_layout);
   }

  /** Define the default layout for the network, using CoLa layout from Cola.js (similar to the "Gem" layout in 
    * Ondex Web). */
   var defaultNetworkLayout= {
    name: 'cola', // CoLa layout, using Cola.v3.min.js & Cola.adaptor.js (Ondex Web: Gem)
    fit: true, animate: animate_layout, // true, // false, 
//    animationDuration: 5000, // 4000
    padding: 10 /*2*/ /*30*/, // padding around the simulation
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    refresh: 1, // number of ticks per frame; higher is faster but more jerky
    maxSimulationTime: 8000, // 4000 // 10000, // 15000, // max length in ms to run the layout
    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    // layout event callbacks
    ready: function() {}, // on layoutready
    stop: function() {}, // on layoutstop
    // positioning options
    randomize: false, // use random node positions at beginning of layout
    avoidOverlaps: true, // avoidOverlap: true,
    handleDisconnected: true, // if true, avoids disconnected components from overlapping
    nodeSpacing: function( node ){ return 20; /*75*/ /*10*/ }, // for extra spacing around nodes
    flow: undefined, // use DAG/ tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
    alignment: undefined, // relative alignment constraints on nodes, e.g. function( node ){ return { x: 0, y: 1 } }
    // different methods of specifying edge length, each can be a constant numerical value or a function like `function( edge ){ return 2; }`
    edgeLength: undefined /*13*/ /*130*/ /*10*/, // sets edge length directly in simulation
//    gravity: 15/*5*/, shake: 30,
    edgeSymDiffLength: undefined /*13*/, // symmetric diff edge length in simulation
    edgeJaccardLength: undefined /*13*/, // jaccard edge length in simulation
    // iterations of the cola algorithm; uses default values on undefined
    unconstrIter: undefined, //10 // unconstrained initial layout iterations
    userConstIter: undefined, //3 // initial layout iterations with user-specified constraints
    allConstIter: undefined, //3 // initial layout iterations with all constraints including non-overlap
//    maxIter: 10,
/*    horizontalNodeSpacing: 75,
    verticalNodeSpacing: 75,*/
    // infinite layout options
    infinite: false // overrides all other options for a forces-all-the-time mode
   };

  // Relayout: Set default (CoLa) layout.
  function setDefaultLayout() {
   console.log("setDefaultLayout()>> animate_layout= "+ animate_layout);
   cy.layout(defaultNetworkLayout); // run the default (CoLa) layout algorithm.
  }

  // Set Cose layout.
  /* Slow and performance-hampering */
  function setCoseLayout() {
   console.log("setCoseLayout()>> animate_layout= "+ animate_layout);
   var coseNetworkLayout= {
    name: 'cose', // CytoscapeJS Cose layout
    animate: animate_layout /*true*/, /*animationDuration: 500,*/ avoidOverlap: true, 
    handleDisconnected: true, maxSimulationTime: 8000/*20000*/,
    fit: true, boundingBox: undefined, ready: function() {} /*undefined*/, stop: function() {} /*undefined*/, 
    roots: undefined, padding: 30, randomize: false/*true*/, 
    edgeLength: undefined/*13*/, /*idealEdgeLength: 13, */
    nodeSpacing: function( node ){ return 20; /*75*/ /*10*/ }, // for extra spacing around nodes
    debug: false, nodeRepulsion: 400000, numIter: 10 /*100*/, edgeElasticity: 100, nestingFactor: 5, 
    /*nodeOverlap: 10,*/ gravity: 15 /*250*/, shake: 30, coolingFactor: 0.95, initialTemp: 200, 
    minTemp: 1.0
   };
   cy.layout(coseNetworkLayout); // run the CoSE layout algorithm.
  }

  // Set Arbor layout.
  function setArborLayout() {
   console.log("setArborLayout()>> animate_layout= "+ animate_layout);
   var arborNetworkLayout= {
    name: 'arbor', // Arbor layout using Arbor.js (Ondex Web: Kamada Kawai).
    fit: true, animate: animate_layout /*true*/, //animationDuration: 4000/*15000*/ /*500*/, 
    maxSimulationTime: 5000/*8000*/ /*20000*/ /*1.7976931348623157E+10308 // (infinite, constant simultaion) */, 
    padding: 30/*[ 50, 50, 50, 50 ]*/, boundingBox: undefined, /*simulationBounds: undefined, */
    ungrabifyWhileSimulating: false, ready: undefined/*function() {}*/, stop: undefined/*function() {}*/, 
//    avoidOverlap: true, handleDisconnected: true, liveUpdate: true /*false*/, randomize: false,
    // forces used by arbor (use arbor default on undefined)
    stiffness: undefined/*600*/, // the rigidity of the edges 
    repulsion: undefined/*400000*/ /*3000*/ /*1000*/, // the force repelling nodes from each other (to avoid overlap).
    friction: undefined /*20*/, // the amount of damping in the system
    gravity: true, // attracting nodes to the origin (can be true for 'center' and false for 'none').
//    shake: 30,
    fps: undefined, // frames per second
    precision: undefined /*1*/ /*100*/, // accuracy vs. speed in force calculations (0: fast but jittery, 1: smooth but CPU-intensive)
//    springTension: 512, 
    // static numbers or functions that dynamically return what these values should be for each element
    // e.g. nodeMass: function(n){ return n.data('weight') }
    nodeSpacing: function( node ){ return 20; /*75*/ /*10*/ }, // for extra spacing around nodes
    stepSize: 0.1/*1*/, // size of timestep in simulation
//    dt: undefined, // the timestep to use for stepping the simulation
//    nodeMass: undefined/*15*/, edgeLength: undefined/*10*/,
    // function that returns true if the system is stable to indicate that the layout can be stopped
    stableEnergy: /*function() { return false; } */function( energy ) {
     var e = energy;
     return (e.max <= 0.5) || (e.mean <= 0.3);
    },
    // infinite layout options
    infinite: false
   };
   cy.layout(arborNetworkLayout); // run the Arbor layout algorithm.
  }
    
  // Set Springy layout.
  function setSpringyLayout() {
   console.log("setSpringyLayout()>> animate_layout= "+ animate_layout);
   var springyNetworkLayout= {
    name: 'springy', // Springy layout, uses springy.js (OndexWeb: ForceDirected).
    animate: animate_layout /*false*/, /*animationDuration: 4000, */ maxSimulationTime: 4000, 
    ungrabifyWhileSimulating: false, fit: true, padding: 30, 
    boundingBox: undefined, random: false, infinite: false, 
    ready: undefined /*function() {} */, stop: undefined /*function() {} */, 
 /*   avoidOverlap: true, handleDisconnected: true, refresh: 1, */
//    nodeSpacing: function( node ){ return 20; /*75*/ }, // for extra spacing around nodes
//    edgeLength: undefined/*10*/, flow: undefined, alignment: undefined, 
    // springy forces
    stiffness: 400, repulsion: 400/*400000*/ /*1000*/ /*3000*/, // to avoid overlap
    damping: 0.5//,
//    gravity: 15/*5*/, /*shake: 30,*/ randomize: false
   };
   cy.layout(springyNetworkLayout); // run the Springy layout algorithm.
  }

  // Set Dagre layout.
  function setTreeLayout() {
   console.log("setTreeLayout()>> animate_layout= "+ animate_layout);
   var dagreNetworkLayout= {
    name: 'dagre', // Dagre layout, using the Ranking algorithm from dagre.js (Ondex Web: RadialTree).
    // dagre algorithm options, uses default value on undefined
    nodeSep: undefined, // the separation between adjacent nodes in the same rank
    edgeSep: undefined, // the separation between adjacent edges in the same rank
    rankSep: undefined, // the separation between adjacent nodes in the same rank
    rankDir: undefined, // 'TB' for top to bottom flow, 'LR' for left to right
    minLen: function( edge ){ return 1; }, // number of ranks to keep between the source and target of the edge
    // general layout options
    fit: true, padding: 30, animate: animate_layout /*false*/, animationDuration: 500, // duration of animation in ms if enabled
    avoidOverlap: true, handleDisconnected: true, 
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    ready: function(){}, stop: function(){},
    edgeLength: 10
   };
   cy.layout(dagreNetworkLayout); // run the Dagre layout algorithm.
  }

  // Set Circle layout.
  function setCircleLayout() {
   console.log("setCircleLayout()>> animate_layout= "+ animate_layout);
   var circleNetworkLayout= {
      name: 'circle', // Circle layout (Ondex Web: Circular)
      /*directed: true, roots: undefined, */
      padding: 30, avoidOverlap: true, boundingBox: undefined, /*handleDisconnected: true,*/
      animate: animate_layout /*false*/, fit: true, counterclockwise: false,
      radius: 3 /*function() { return 2; }*/ /*undefined*/,
      rStepSize: 2//,
//      startAngle: 3/2 * Math.PI
   };
   cy.layout(circleNetworkLayout); // run the Circle layout.
  }

  // Set Breadthfirst layout.
  function setBreadthfirstLayout() {
   console.log("setBreadthfirstLayout()>> animate_layout= "+ animate_layout);
   var bfNetworkLayout= {
      name: 'breadthfirst', // Breadth first layout (Ondex Web: Hierarchial)
      fit: true, directed: true, padding: 30 /*10*/, circle: false, boundingBox: undefined, avoidOverlap: true, 
      handleDisconnected: true, maximalAdjustments: 0, animate: animate_layout /*false*/, 
      animationDuration: 1000 /*500*/, 
      spacingFactor: 1.75, // positive spacing factor, larger= more space between nodes.
      roots: undefined, // '#n12', 
      ready: undefined, stop: undefined,
      edgeLength: 10
   };
   cy.layout(bfNetworkLayout); // run the Breadthfirst layout.
  }

  // Set Grid layout.
  function setGridLayout() {
   console.log("setGridLayout()>> animate_layout= "+ animate_layout);
   var gridNetworkLayout= {
    name: 'grid', // CytoscapeJS Grid layout
    fit: true, padding: 30, boundingBox: undefined, avoidOverlap: true, handleDisconnected: true, 
    animate: animate_layout /*false*/, animationDuration: 1000 /*500*/,
    rows: undefined, // force num of rows in the grid
    columns: undefined, // force num of cols in the grid
    position: function( node ){}, // returns { row, col } for element
    ready: undefined, stop: undefined/*,
    edgeLength: 10*/
   };
   cy.layout(gridNetworkLayout); // run the Grid layout.
  }

  // Set Concentric layout.
  function setConcentricLayout() {
   console.log("setConcentricLayout()>> animate_layout= "+ animate_layout);
   var concentricNetworkLayout= {
    name: 'concentric', fit: true, padding: 30, 
    startAngle: 3/2 * Math.PI, // the position of the 1st node
    counterclockwise: false, // whether the layout should go anticlockwise (true) or clockwise (false)
    minNodeSpacing: 10, boundingBox: undefined, avoidOverlap: true, height: undefined, width: undefined, 
    concentric: function(){ // returns numeric value for each node, placing higher nodes in levels towards the centre
     return this.degree(); },
    levelWidth: function(nodes){ // the variation of concentric values in each level
     return 0.5 /*nodes.maxDegree() / 4*/; },
    animate: animate_layout /*false*/, animationDuration: 500, ready: undefined, stop: undefined,
    radius: 5 /*undefined*/
   };
   cy.layout(concentricNetworkLayout); // run the CoSE layout algorithm.
  }
