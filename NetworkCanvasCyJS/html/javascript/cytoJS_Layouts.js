/**
 * @author Ajit Singh
 * @name Network View layouts
 * @description code for Network View using CytoscapeJS layouts such as breadthfirst, grid, cose, circle 
 * & concentric & third party layout algorithms such as WebCola, arbor, springy, spread & dagre (tree).
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

  // Relayout: Set default (WebCola) layout for the network graph.
  function setDefaultLayout() {
   console.log("cytoscapeJS container (cy) initialized... now set Default Layout (only on visible elements)...");
   // Get the cytoscape instance as a Javascript object from JQuery.
   var cy= $('#cy').cytoscape('get'); // now we have a global reference to `cy`
   var eles= cy.$(':visible'); // get only the visible elements.
   setColaLayout(eles);
//   setTimeout(setColaLayout, 200);
  }

  /** Define the default layout for the network, using WebCola layout from Cola.js (similar to the "Gem" layout in 
    * Ondex Web). */
   var defaultNetworkLayout= {
    name: 'cola', animate: animate_layout, refresh: 1, maxSimulationTime: 4000,
    ungrabifyWhileSimulating: false, fit: true, padding: 10, 
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    ready: function(){}, stop: function(){},
    // positioning options
    randomize: false, avoidOverlap: true, handleDisconnected: true,
    nodeSpacing: function( node ){ return 10; },
    flow: undefined, alignment: undefined,
//    edgeLength: undefined, // sets edge length directly in simulation
//    edgeSymDiffLength: 50/*undefined*//*20*/ /*13*/, // symmetric diff edge length in simulation
//    edgeJaccardLength: undefined, // jaccard edge length in simulation
    unconstrIter: 10/*undefined*/, // unconstrained initial layout iterations
    userConstIter: 20/*undefined*/, // initial layout iterations with user-specified constraints
    allConstIter: 20/*undefined*/, // initial layout iterations with all constraints including non-overlap
    // infinite layout options
    infinite: false
   };

   var defaultNetworkLayout2= {
    name: 'cola', // WebCola layout, using Cola.v3.min.js & Cola.adaptor.js (Ondex Web: Gem)
    refresh: 1/*0.1*/ /*0.5*/, animate: animate_layout, fit: true, padding: 10/*30*/, 
    boundingBox: undefined, // animationDuration: 4000,
    maxSimulationTime: 4000/*8000*/, // max length in ms to run the layout
    ungrabifyWhileSimulating: false, ready: function() {}, stop: function() {},
    randomize: false, 
    avoidOverlap: true, // avoidOverlaps: true,
    handleDisconnected: true, 
//    nodeSpacing: function( node ){ return 10/*20*/; },
    flow: undefined, alignment: undefined,
//    edgeLength: undefined/*20*/ /*13*/,
//    edgeSymDiffLength: undefined/*20*/ /*13*/, // symmetric diff edge length in simulation
//    edgeJaccardLength: undefined/*20*/ /*13*/, // jaccard edge length in simulation
//    gravity: 15, shake: 10/*30*/,
//    nodeRepulsion: 400000/*400*/, //numIter: 10 /*100*/, 
    // iterations of cola algorithm; uses default values on undefined
    unconstrIter: 10,
    userConstIter: 10,// undefined, //3
    allConstIter: 10, //3
//    edgeElasticity: 20, // roots: undefined,
//    coolingFactor: 0.95 // to enable clustering.
//    maxIter: 10, horizontalNodeSpacing: 75, verticalNodeSpacing: 75,
    // infinite layout options
    infinite: false
   };

   var defaultNetworkLayout_new= {
    name: 'cola', animate: animate_layout, refresh: 1, maxSimulationTime: 4000,
    ungrabifyWhileSimulating: false, fit: true, padding: 10,
//    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    ready: function(){}, stop: function(){},
    // positioning options
    randomize: false, avoidOverlaps: true, handleDisconnected: true,
    flow: undefined, alignment: undefined,
//    nodeSpacing: function( node ){ return 10; },
//    symmetricDiffLinkLengths: 10,
    jaccardLinkLengths: 250,
//    linkDistance: 500
    // iterations of cola algorithm; uses default values on undefined
    unconstrIter: 10,
    userConstIter: 15,//10
    allConstIter: 20, //10
    // infinite layout options
    infinite: false
   };

   var defaultNetworkLayout_2016= {
    name: 'cola', animate: animate_layout, 
    nodeSpacing: 10/*5*/, edgeLengthVal: 45, randomize: false, 
//    fit: true, avoidOverlaps: true, handleDisconnected: true,
    maxSimulationTime: 4000/*1500*/, avoidOverlap: true
   };

// Set WebCola layout (default).
  function setColaLayout(eles) {
   console.log("setColaLayout()>> animate_layout= "+ animate_layout);
//   var d3cola = cola.d3adaptor().linkDistance(50);
   // run the default (WebCola) layout algorithm.
//   eles.layout(/*defaultNetworkLayout_new*/defaultNetworkLayout);
   eles.layout(defaultNetworkLayout_2016);
//   eles.layout({ name:'cola', animate: animate_layout }); // basic

//   cy.reset(); // reset the graph's zooming & panning properties.
//   cy.fit();
  }

  // Set Circle layout.
  function setCircleLayout(eles) {
   console.log("setCircleLayout()>> animate_layout= "+ animate_layout);
   var circleNetworkLayout= {
      name: 'circle', // Circle layout (Ondex Web: Circular)
      padding: 10/*30*/, avoidOverlap: true, boundingBox: undefined, handleDisconnected: true,
      animate: animate_layout, fit: true, counterclockwise: false,
      radius: 3 /*undefined*/,
//      startAngle: 3/2 * Math.PI,
      rStepSize: 2
   };
   eles.layout(circleNetworkLayout); // run the Circle layout.
  }

  // Set Cose layout.
  /* Slow and performance-hampering for larger networks */
  function setCoseLayout(eles) {
   console.log("setCoseLayout()>> animate_layout= "+ animate_layout);
   var coseNetworkLayout= {
    name: 'cose', // CytoscapeJS Cose layout
    animate: animate_layout /*true*/, /*animationDuration: 500,*/
//    maxSimulationTime: 8000/*20000*/,
    refresh: 0.1, edgeElasticity : 20, fit: true, gravity : 15, shake: 10/*30*/,
    handleDisconnected: true, avoidOverlap: true,
//    nodeRepulsion: 400000, numIter: 10 /*100*/, 
//    boundingBox: undefined, ready: function() {} /*undefined*/, stop: function() {} /*undefined*/, 
    roots: undefined, padding: 10/*30*/, 
    randomize: false/*true*/, //edgeLength: undefined/*13*/, /*idealEdgeLength: 13, */
    nodeSpacing: 20,/*function( node ){ return 20; },*/ // for extra spacing around nodes
//    debug: false, nestingFactor: 5, 
//    /*nodeOverlap: 10,*/ coolingFactor: 0.95, initialTemp: 200, minTemp: 1.0
    coolingFactor: 0.95 // to enable clustering.
   };
   var coseNetworkLayout2= {
    name: 'cose', // CytoscapeJS CoSE layout
    animate: animate_layout /*true*/,
    idealEdgeLength: 100, nodeOverlap: 20
   };
   eles.layout(coseNetworkLayout2); // run the CoSE layout algorithm.
  }

  // Set CoSE-Bilkent layout.
  function setCoseBilkentLayout(eles) {
   console.log("setCoseLayout()>> animate_layout= "+ animate_layout);
   var coseBilkentNetworkLayout= {
    name: 'cose-bilkent'
   };
   eles.layout(coseBilkentNetworkLayout);
  }

  // Set Concentric layout.
  function setConcentricLayout(eles) {
   console.log("setConcentricLayout()>> animate_layout= "+ animate_layout);
   var concentricNetworkLayout= {
    name: 'concentric', fit: true, padding: 10, 
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
   var concentricNetworkLayout2= {
    name: 'concentric', 
    concentric: function(node){ // returns numeric value for each node, placing higher nodes in levels towards the centre
     return node.degree(); },
    levelWidth: function(nodes){ // the variation of concentric values in each level
     return 2 },
    animate: animate_layout /*false*/
   };
   eles.layout(concentricNetworkLayout); // run the Concentric layout.
  }

  // Set Breadthfirst layout (may not work for networks with multiple roots/ starting points).
  function setBreadthfirstLayout(eles) {
   console.log("setBreadthfirstLayout()>> animate_layout= "+ animate_layout);
   var bfNetworkLayout= {
      name: 'breadthfirst', // Breadth first layout (Ondex Web: Hierarchial)
      fit: true, directed: true, padding: 10, circle: false, boundingBox: undefined, avoidOverlap: true, 
      handleDisconnected: true, maximalAdjustments: 0, animate: animate_layout, 
      spacingFactor: 1.75, // positive spacing factor, larger= more space between nodes.
      roots: undefined, // '#n12', 
      ready: undefined, stop: undefined,
      nodeSpacing: 20
   };
   var bfNetworkLayout2= {
      name: 'breadthfirst', // Breadth first layout (Ondex Web: Hierarchial)
      directed: true, padding: 10, animate: animate_layout
   };
   eles.layout(bfNetworkLayout2); // run the Breadthfirst layout.
  }

// Set Arbor layout.
  function setArborLayout(eles) {
   console.log("setArborLayout()>> animate_layout= "+ animate_layout);
   var arborNetworkLayout= {
    name: 'arbor', // Arbor layout using Arbor.js (Ondex Web: Kamada Kawai).
    animate: animate_layout, fit: true, //animationDuration: 4000, 
//    maxSimulationTime: 8000 /*1.7976931348623157E+10308 // (infinite, constant simulation) */, 
    padding: 10/*30*/, boundingBox: undefined, //simulationBounds: undefined, 
    ungrabifyWhileSimulating: false, 
    ready: undefined/*function() {}*/, stop: undefined/*function() {}*/, 
    avoidOverlap: true, handleDisconnected: true, randomize: false, //liveUpdate: true /*false*/, 
    // forces used by arbor (use arbor default on undefined)
    stiffness: undefined/*600*/, // the rigidity of the edges 
    repulsion: undefined/*400000*/ /*3000*/ /*1000*/, // the force repelling nodes from each other (to avoid overlap).
    friction: 0.3 /*1.0*/ /*20*/, // the amount of damping (should allow for clustering) in the system.
    gravity: true, // attracting nodes to the origin (can be true for 'center' and false for 'none').
    fps: undefined/*30*/, // frames per second
    precision: undefined /*1*/ /*100*/, // accuracy vs. speed in force calculations (0: fast but jittery, 1: smooth but CPU-intensive)
    // static numbers or functions that dynamically return what these values should be for each element
    // e.g. nodeMass: function(n){ return n.data('weight') }
    nodeSpacing: 10/*20*/, // for extra spacing around nodes
    stepSize: 0.1/*1*/, // size of timestep in simulation
//    dt: undefined, // the timestep to use for stepping the simulation
    // function that returns true if the system is stable to indicate that the layout can be stopped
    stableEnergy: /*function() { return false; } */function( energy ) {
     var e = energy;
     return (e.max <= 0.5) || (e.mean <= 0.3);
    },
    // infinite layout options
    infinite: false
   };
   eles.layout(arborNetworkLayout); // run the Arbor layout algorithm.
  }

  // Set Dagre layout.
  function setTreeLayout(eles) {
   console.log("setTreeLayout()>> animate_layout= "+ animate_layout);
   var dagreNetworkLayout= {
    name: 'dagre', // Dagre layout, using the Ranking algorithm from dagre.js (Ondex Web: RadialTree).
    // dagre algorithm options, uses default value on undefined
    nodeSep: undefined, // the separation between adjacent nodes in the same rank
    edgeSep: undefined, // the separation between adjacent edges in the same rank
    rankSep: undefined, // the separation between adjacent nodes in the same rank
    rankDir: undefined, // 'TB' for top to bottom flow, 'LR' for left to right
    minLen: function( edge ){ return 1; }, // number of ranks to keep between the source and target of the edge
    edgeWeight: function( edge ){ return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges
    // general layout options
    fit: true, padding: 10/*30*/, animate: animate_layout /*false*/, 
//    animationDuration: 500, // duration of animation in ms if enabled
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, handleDisconnected: true, 
//    maxSimulationTime: 4000/*8000*/
    ready: function(){}, stop: function(){} //, edgeLength: 10
   };
   eles.layout(dagreNetworkLayout); // run the Dagre layout algorithm.
  }

  // Set Grid layout.
  function setGridLayout(eles) {
   console.log("setGridLayout()>> animate_layout= "+ animate_layout);
   var gridNetworkLayout= {
    name: 'grid', // CytoscapeJS Grid layout
    fit: true, padding: 10/*30*/, boundingBox: undefined, avoidOverlap: true, handleDisconnected: true, 
    animate: animate_layout /*false*/,
//      animationDuration: 1000 /*500*/, 
//    maxSimulationTime: 4000/*8000*/
    rows: undefined, // force num of rows in the grid
    columns: undefined, // force num of cols in the grid
    position: function( node ){}, // returns { row, col } for element
    ready: undefined, stop: undefined,
    nodeSpacing: 20//, edgeLength: 10
   };
   eles.layout(gridNetworkLayout); // run the Grid layout.
  }

  // Set Spread layout, using foograph.js & rhill-voronoi-core.js.
  function setSpreadLayout(eles) {
   console.log("setSpreadLayout()>> animate_layout= "+ animate_layout);
   var spreadNetworkLayout= {
    name: 'spread',
    animate: animate_layout, ready: undefined, stop: undefined,
    fit: true, padding: 10, 
    minDist: 20, // Minimum distance between nodes
    expandingFactor: -1.0, // If the network does not satisfy the minDist criteria then it expands 
    // the network by this amount.
    // If it is set to -1.0 the amount of expansion is automatically calculated based on the minDist,
    // the aspect ratio & the number of nodes.
    maxFruchtermanReingoldIterations: 50, // Maximum number of initial force-directed iterations
    maxExpandIterations: 4, // Maximum number of expanding iterations
    boundingBox: undefined
   };
   var spreadNetworkLayout2= {
    name: 'spread', minDist: 20/*40*/,
    animate: animate_layout
   };
   eles.layout(spreadNetworkLayout2); // run the Spread layout.
  }

  // Set Springy layout.
  /* Not suitable for larger networks */
  function setSpringyLayout(eles) {
   console.log("setSpringyLayout()>> animate_layout= "+ animate_layout);
   var springyNetworkLayout= {
    name: 'springy', // Springy layout, uses springy.js (OndexWeb: ForceDirected).
    animate: animate_layout, fit: true, padding: 10, maxSimulationTime: 4000, 
    ungrabifyWhileSimulating: false, 
    boundingBox: undefined, random: false, infinite: false, 
    ready: undefined, stop: undefined, 
    avoidOverlap: true, handleDisconnected: true,
    nodeSpacing: 10, // for extra spacing around nodes
//    edgeLength: undefined/*10*/, flow: undefined, alignment: undefined, 
//    gravity: 15, //shake: 30,
    // springy forces
    stiffness: 400, repulsion: 400, damping: 0.5 
   };
   var springyNetworkLayout2= {
    name: 'springy', // Springy layout, uses springy.js (OndexWeb: ForceDirected).
    animate: animate_layout, fit: true, avoidOverlap: true, minDist: 20
   };
   eles.layout(springyNetworkLayout2); // run the Springy layout algorithm.
  }
