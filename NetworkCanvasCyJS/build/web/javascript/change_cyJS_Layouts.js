/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
    animate: animate_layout, // true, // false, 
    animationDuration: 500, 
    fit: true, padding: 2 /*30*/ /*10*/, // padding around the simulation
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    refresh: 1, // number of ticks per frame; higher is faster but more jerky
    maxSimulationTime: 8000, // 4000, // max length in ms to run the layout
    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    // layout event callbacks
    ready: function() {}, // on layoutready
    stop: function() {}, // on layoutstop
    // positioning options
    randomize: false, // use random node positions at beginning of layout
    avoidOverlap: true,
    handleDisconnected: true, // if true, avoids disconnected components from overlapping
    nodeSpacing: function( node ){ return 20; /*10;*/ }, // for extra spacing around nodes
    flow: undefined, // use DAG/ tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
    alignment: undefined, // relative alignment constraints on nodes, e.g. function( node ){ return { x: 0, y: 1 } }
    // different methods of specifying edge length, each can be a constant numerical value or a function like `function( edge ){ return 2; }`
    edgeLength: undefined /*10*/, // sets edge length directly in simulation
    /*linkDistance: 2, */
    edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
    edgeJaccardLength: undefined, // jaccard edge length in simulation
    // iterations of the cola algorithm; uses default values on undefined
    unconstrIter: undefined, // unconstrained initial layout iterations
    userConstIter: undefined, // initial layout iterations with user-specified constraints
    allConstIter: undefined, // initial layout iterations with all constraints including non-overlap
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
    animate: animate_layout /*true*/, animationDuration: 500, avoidOverlap: true, handleDisconnected: true, 
    fit: true, boundingBox: undefined, ready: function() {}, stop: function() {}, 
    roots: undefined, padding: 30 /*5*/, /*randomize: true, debug: false, nodeRepulsion: 400000, 
    numIter: 100, idealEdgeLength: 10, nodeOverlap: 10, edgeElasticity: 100, nestingFactor: 5, 
    gravity: 250, initialTemp: 200, coolingFactor: 0.95, minTemp: 1.0,*/ edgeLength: 10 };
   cy.layout(coseNetworkLayout); // run the CoSE layout algorithm.
  }

  // Set Arbor layout.
  function setArborLayout() {
   console.log("setArborLayout()>> animate_layout= "+ animate_layout);
   var arborNetworkLayout= {
    name: 'arbor', // Arbor layout using Arbor.js (Ondex Web: Kamada Kawai).
    animate: animate_layout /*true*/, animationDuration: 500, 
    maxSimulationTime: 5000 /* 1.7976931348623157E+10308 // (infinite, constant simultaion) */, 
    fit: true, padding: 30, boundingBox: undefined, ungrabifyWhileSimulating: false, ready: undefined, 
    stop: undefined, avoidOverlap: true, handleDisconnected: true, 
//    liveUpdate: false, 
    // forces used by arbor (use arbor default on undefined)
    stiffness: undefined /*400*/, 
    repulsion: 10000 /*undefined*/, // to avoid overlap
    friction: undefined /*100*/, gravity: true, fps: undefined, precision: undefined /*10*/,
    // static numbers or functions that dynamically return what these values should be for each element
    // e.g. nodeMass: function(n){ return n.data('weight') }
    nodeMass: undefined,
    stepSize: 0.1, // smoothing of arbor bounding box
    // function that returns true if the system is stable to indicate that the layout can be stopped
    stableEnergy: /*function() { return false; } */function( energy ) {
     var e = energy; 
     return (e.max <= 0.5) || (e.mean <= 0.3);
    },
    // infinite layout options
    infinite: false,
    idealEdgeLength: 10 /*undefined*/
   };
   cy.layout(arborNetworkLayout); // run the Arbor layout algorithm.
  }

  // Set Springy layout.
  function setSpringyLayout() {
   console.log("setSpringyLayout()>> animate_layout= "+ animate_layout);
   var springyNetworkLayout= {
    name: 'springy', // Springy layout, uses springy.js (OndexWeb: ForceDirected).
    animate: animate_layout /*false*/, animationDuration: 500, maxSimulationTime: 1000, 
    ungrabifyWhileSimulating: false, fit: true, padding: 30, avoidOverlap: true, handleDisconnected: true, 
    boundingBox: undefined, random: false, infinite: false, ready: undefined, stop: undefined, 
    // springy forces
    stiffness: 400, repulsion: 400 /*1000*/, // to avoid overlap
    damping: 0.5,
    edgeLength: 10
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
      radius: 2, /*function() { return 2; }, */ /*undefined*/
      rStepSize: 10,
      startAngle: 3/2 * Math.PI
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
      animationDuration: 500, 
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
    animate: animate_layout /*false*/, animationDuration: 500,
    rows: undefined, // force num of rows in the grid
    columns: undefined, // force num of cols in the grid
    position: function( node ){}, // returns { row, col } for element
    ready: undefined, stop: undefined,
    edgeLength: 10
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
