   // Define the default layout for the network.
   var defaultNetworkLayout= {
    name: 'cola', // Cola layout, using Cola.v3.min.js & Cola.adaptor.js (Ondex Web: Gem)
    animate: true, fit: true, padding: 10, // padding around the simulation
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    refresh: 1, // number of ticks per frame; higher is faster but more jerky
    maxSimulationTime: 4000, // max length in ms to run the layout
    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    // layout event callbacks
    ready: function(){}, // on layoutready
    stop: function(){}, // on layoutstop
    // positioning options
    randomize: false, // use random node positions at beginning of layout
    avoidOverlap: true,
    handleDisconnected: true, // if true, avoids disconnected components from overlapping
    nodeSpacing: function( node ){ return 10; }, // extra spacing around nodes
    flow: undefined, // use DAG/ tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
    alignment: undefined, // relative alignment constraints on nodes, e.g. function( node ){ return { x: 0, y: 1 } }
    // different methods of specifying edge length, each can be a constant numerical value or a function like `function( edge ){ return 2; }`
    edgeLength: undefined, // sets edge length directly in simulation
    edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
    edgeJaccardLength: undefined, // jaccard edge length in simulation
    // iterations of the cola algorithm; uses default values on undefined
    unconstrIter: undefined, // unconstrained initial layout iterations
    userConstIter: undefined, // initial layout iterations with user-specified constraints
    allConstIter: undefined, // initial layout iterations with all constraints including non-overlap
    // infinite layout options
    infinite: false // overrides all other options for a forces-all-the-time mode

/*       name: 'breadthfirst', // Breadth first layout (Ondex Web: Hierarchial)
      fit: true, directed: true, padding: 10, circle: false, boundingBox: undefined, avoidOverlap: true, 
      maximalAdjustments: 0, animate: false, animationDuration: 500, roots: undefined, // '#n12', 
      ready: undefined, stop: undefined */

/*    name: 'arbor', // Arbor layout using Arbor.js (Ondex Web: Kamada Kawai).
    animate: true, maxSimulationTime: 5000, fit: true, padding: 30, boundingBox: undefined, 
    ungrabifyWhileSimulating: false, ready: undefined, stop: undefined,
    // forces used by arbor (use arbor default on undefined)
    repulsion: undefined, stiffness: undefined, friction: undefined, gravity: true, fps: undefined, 
    precision: undefined,
    // static numbers or functions that dynamically return what these values should be for each element
    // e.g. nodeMass: function(n){ return n.data('weight') }
    nodeMass: undefined, edgeLength: undefined,
    stepSize: 0.1, // smoothing of arbor bounding box
    // function that returns true if the system is stable to indicate that the layout can be stopped
    stableEnergy: function( energy ) {
     var e = energy; 
     return (e.max <= 0.5) || (e.mean <= 0.3);
    },
    // infinite layout options
    infinite: false */

/*    name: 'springy', // Springy layout, uses springy.js (OndexWeb: ForceDirected).
    animate: true, maxSimulationTime: 4000, ungrabifyWhileSimulating: false, fit: true, padding: 30, 
    boundingBox: undefined, random: false, infinite: false, ready: undefined, stop: undefined, 
    // springy forces
    stiffness: 400, repulsion: 400, damping: 0.5 */

/*      name: 'circle', // Circle layout (Ondex Web: Circular)
      directed: true, roots: '#n12', padding: 10, avoidOverlap: true */

/*    name: 'dagre', // Dagre layout, using the Ranking algorithm from dagre.js (Ondex Web: RadialTree).
    // dagre algorithm options, uses default value on undefined
    nodeSep: undefined, // the separation between adjacent nodes in the same rank
    edgeSep: undefined, // the separation between adjacent edges in the same rank
    rankSep: undefined, // the separation between adjacent nodes in the same rank
    rankDir: undefined, // 'TB' for top to bottom flow, 'LR' for left to right
    minLen: function( edge ){ return 1; }, // number of ranks to keep between the source and target of the edge
    // general layout options
    fit: true, padding: 30, animate: false, animationDuration: 500, // duration of animation in ms if enabled
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    ready: function(){}, stop: function(){} */

 /*     name: 'cose', // CytoscapeJS Cose layout
      roots: '#n12', padding: 5 */

/*    name: 'grid', // CytoscapeJS Grid layout
    fit: true, padding: 30, boundingBox: undefined, avoidOverlap: true, animate: false, animationDuration: 500,
    rows: undefined, // force num of rows in the grid
    columns: undefined, // force num of cols in the grid
    position: function( node ){}, // returns { row, col } for element
    ready: undefined, stop: undefined */
   };
