/**
 * @author Ajit Singh
 * @name Network View example
 * @description example code for Network View using Javascript, jQuery, CytoscapeJS, JQuery UI, cxtmenu, QTip, 
 * multi-select (using Shift + click), Cola.js & JSON.
 * @returns
 **/
$(function(){ // on dom ready

  /** A JSON-like variable used to generate the example nodes and edges. */
  var networkJSON= {
      /** Nodes are actual concepts that we intend to use for the network. These may be Genes, Phenotypes, Enzymes, 
       * Compounds, Cellular components, Publications, Biological Processes, Pathways, Reactions, Proteins, 
       * Protein Domains, Trait Ontologies, Enzyme Classifications or Molecular Functions. */
      nodes: [
        { data: { id: 'n1', value: 'AT5G4893i' , conceptType: 'Gene', conceptShape: 'triangle', conceptColor: 'cyan', visibleDisplay: 'element' } , group: 'nodes' },
        { data: { id: 'n2', value: 'AT5G1470i' , conceptType: 'Gene', conceptShape: 'triangle', conceptColor: 'cyan', visibleDisplay: 'element' } , group: 'nodes' },
        { data: { id: 'n3', value: 'Lignin formation' , conceptType: 'Compound', conceptShape: 'heptagon', conceptColor: 'teal', visibleDisplay: 'element' } , group: 'nodes' },
        { data: { id: 'n4', value: 'Lignin content' , conceptType: 'TraitOntology', conceptShape: 'pentagon', conceptColor: 'yellow', visibleDisplay: 'element' } , group: 'nodes' },
        { data: { id: 'n5', value: 'PMID:17237352' , conceptType: 'Publication', conceptShape: 'rectangle', conceptColor: 'orange', visibleDisplay: 'element' } , group: 'nodes' },
        { data: { id: 'n6', value: 'PMID:15161961' , conceptType: 'Publication', conceptShape: 'rectangle', conceptColor: 'orange', visibleDisplay: 'element' } , group: 'nodes' },
        { data: { id: 'n7', value: 'PMID:17163881' , conceptType: 'Publication', conceptShape: 'rectangle', conceptColor: 'orange', visibleDisplay: 'element' } , group: 'nodes' },
        { data: { id: 'n8', value: 'PMID:20511296' , conceptType: 'Publication', conceptShape: 'rectangle', conceptColor: 'orange', visibleDisplay: 'element' } , group: 'nodes' },
        { data: { id: 'n9', value: 'PMID:21251001' , conceptType: 'Publication', conceptShape: 'rectangle', conceptColor: 'orange', visibleDisplay: 'element' } , group: 'nodes' },
        { data: { id: 'n10', value: 'AT5G1470' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red', visibleDisplay: 'element' } , group: 'nodes' },
        { data: { id: 'n11', value: 'POPTR_0001s34880' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red', visibleDisplay: 'element' } , group: 'nodes' },
        { data: { id: 'n12', value: 'POPTR_0001s34880' , conceptType: 'Gene', conceptShape: 'triangle', conceptColor: 'cyan', visibleDisplay: 'element' } , group: 'nodes' },
        { data: { id: 'n13', value: 'NmrA' , conceptType: 'ProteinDomain', conceptShape: 'pentagon', conceptColor: 'grey', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n14', value: 'Polysacc_synt_2' , conceptType: 'ProteinDomain', conceptShape: 'pentagon', conceptColor: 'grey', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n15', value: 'adh_short' , conceptType: 'ProteinDomain', conceptShape: 'pentagon', conceptColor: 'grey', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n16', value: '3Beta_HSD' , conceptType: 'ProteinDomain', conceptShape: 'pentagon', conceptColor: 'grey', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n17', value: 'Epimerase' , conceptType: 'ProteinDomain', conceptShape: 'pentagon', conceptColor: 'grey', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n18', value: 'AT5G48930' , conceptType: 'CellularComponent', conceptShape: 'pentagon', conceptColor: 'lightGreen', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n19', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n20', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n21', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n22', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n23', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n24', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n25', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n26', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n27', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red', visibleDisplay: 'none' } , group: 'nodes' },
        { data: { id: 'n28', value: 'A1' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red', visibleDisplay: 'none' } , group: 'nodes' }
      ], 

      /** Edges (relations) define how nodes (concepts) are inter-linked using 'source' & 'target' attributes. */
      edges: [
        { data: { id: 'n1n2', source: 'n1', target: 'n2', label: 'linked to' } , group: 'edges' },
        { data: { id: 'n1n3', source: 'n1', target: 'n3' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n1n4', source: 'n1', target: 'n4' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n1n5', source: 'n1', target: 'n5' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n1n6', source: 'n1', target: 'n6' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n1n7', source: 'n1', target: 'n7' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n1n8', source: 'n1', target: 'n8' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n1n9', source: 'n1', target: 'n9' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n2n3', source: 'n2', target: 'n3' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n2n10', source: 'n2', target: 'n10' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n10', source: 'n11', target: 'n10' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n12n11', source: 'n12', target: 'n11' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n13', source: 'n11', target: 'n13' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n14', source: 'n11', target: 'n14' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n15', source: 'n11', target: 'n15' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n16', source: 'n11', target: 'n16' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n17', source: 'n11', target: 'n17' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n1n18', source: 'n1', target: 'n18' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n19', source: 'n11', target: 'n19' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n20', source: 'n11', target: 'n20' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n21', source: 'n11', target: 'n21' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n22', source: 'n11', target: 'n22' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n23', source: 'n11', target: 'n23' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n24', source: 'n11', target: 'n24' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n25', source: 'n11', target: 'n25' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n26', source: 'n11', target: 'n26' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n27', source: 'n11', target: 'n27' , label: 'linked to' } , group: 'edges' },
        { data: { id: 'n11n28', source: 'n11', target: 'n28' , label: 'linked to' } , group: 'edges' }
      ]
    };

    // Display 'networkJSON' elements.nodes data in console.
/*    for(var j = 0; j < networkJSON.nodes.length; j++){
        console.log("JSON node.data (id, value, conceptType, conceptShape, conceptColor): "+ 
                networkJSON.nodes[j].data.id +" , "+ networkJSON.nodes[j].data.value +" , "+ 
                networkJSON.nodes[j].data.conceptType +" , "+ networkJSON.nodes[j].data.conceptShape +" , "+ 
                networkJSON.nodes[j].data.conceptColor);
       }*/

   // Define the stylesheet to be used for nodes & edges in the cytoscape.js container.
   var networkStylesheet= cytoscape.stylesheet()
      .selector('node')
        .css({
          'content': 'data(value)',
     //     'text-valign': 'center', // to have 'content' displayed in the middle of the node.
          'outline-colour': 'black', // text outline color
          'border-style': 'solid', // node border
          'border-width': '1px',
          'font-size': '8px',
          // Set node shape, color & display (visibility) depending on settings in the JSON var.
          'shape': 'data(conceptShape)', // 'triangle',
          'width': '30px',
          'height': '30px',
          'background-color': 'data(conceptColor)',
          'display': 'data(visibleDisplay)' // display: 'element' (show) or 'none' (hide).
         })
      .selector('edge')
        .css({
          'content': 'data(label)', // label for edges (arrows).
          'font-size': '8px',
          'curve-style': 'bezier', /* default value: bezier; options: bezier, unbundled-bezier, haystack (straight edges) */
          'width': '3px', // use mapData() mapper to allow for curved edges for inter-connected nodes.
          'line-color': 'gray',
          'line-style': 'solid',
          'target-arrow-shape': 'triangle',
          'target-arrow-color': 'gray'
        })
      .selector('.highlighted')
        .css({
          'background-color': '#61bffc',
          'line-color': '#61bffc',
          'target-arrow-color': '#61bffc',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.5s'
        })
      .selector(':selected')
      .css({ // settings for highlight nodes in case of Shift+click multi-select.
        'border-width': '3px',
        'border-color': '#333'
      });

   /** Define the default layout for the network, using CoLa layout from Cola.js (similar to the "Gem" layout in 
    * Ondex Web). */
   var defaultNetworkLayout= {
    name: 'cola', // CoLa layout, using Cola.v3.min.js & Cola.adaptor.js (Ondex Web: Gem)
    animate: true, fit: true, padding: 10, // padding around the simulation
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    refresh: 1, // number of ticks per frame; higher is faster but more jerky
    maxSimulationTime: 4000, // max length in ms to run the layout
    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    // layout event callbacks
    ready: function() {}, // on layoutready
    stop: function() {}, // on layoutstop
    // positioning options
    randomize: false, // use random node positions at beginning of layout
    avoidOverlap: true,
    handleDisconnected: true, // if true, avoids disconnected components from overlapping
    nodeSpacing: function( node ){ return 10; }, // for extra spacing around nodes
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

// Other Layouts:
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

// Initialise a cystoscape container instance as a Javascript object.
/* var cy= cytoscape({
  container: document.getElementById('cy'),
  elements: networkJSON,
  layout: defaultNetworkLayout,
  ready: function() { console.log('ready'); window.cy= this; }
});*/

// Initialise a cystoscape container instance on the HTML DOM using JQuery.
$('#cy').cytoscape({
  container: document.getElementById('cy'),

  style: networkStylesheet,

  // Using the JSON data to create the nodes.
  elements: networkJSON,
  
  // Layout of the Network.
  layout: defaultNetworkLayout,
  
  ready: function() {
//   console.log('ready');
   window.cy= this;
  }
});

// Get the cystoscape instance as a Javascript object from JQuery.
var cy= $('#cy').cytoscape('get'); // now we have a global reference to `cy`

// Pan & zooms the graph to fit all the elements (concept nodes) in the graph.
//cy.fit();

// cy.boxSelectionEnabled(true); // enable box selection (highlight & select multiple elements for moving via mouse click and drag).
cy.boxSelectionEnabled(false); // to disable box selection & hence allow Panning, i.e., dragging the entire graph.

/** Add a Qtip message to all the nodes & edges using QTip displaying their Concept Type & value..
 * Note: Specify 'node' or 'edge' to bind an event to a specific type of element.
 * e.g, cy.elements('node').qtip({ }); or cy.elements('edge').qtip({ }); */
cy.elements().qtip({
  content: function() {
      var qtipMsg= "";
      try {
      if(this.isNode()) {
         qtipMsg= "Concept: "+ this.data('conceptType') +", Value: "+ this.data('value'); // this.id();
        }
      else if(this.isEdge()) {
              qtipMsg= "Relation ID: "+ this.id();
             }
      }
      catch(err) { qtipMsg= "Selected element is neither a Concept nor a Relation"; }
      return qtipMsg;
     },
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 12,
      height: 6
    }
  }
});

/** Event handling: mouse 'tap' event on all the elements of the core (i.e., the cytoscape container).
 * Note: Specify 'node' or 'edge' to bind an event to a specific type of element.
 * e.g, cy.on('tap', 'node', function(e){ }); or cy.on('tap', 'edge', function(e){ }); */
 cy.on('tap', function(e) {
    var thisElement= e.cyTarget;
    var info= "";
    try {
    if(thisElement.isNode()) {
       info= "Element clicked: "+ thisElement.data('conceptType') +": "+ thisElement.data('value');
      }
      else if(thisElement.isEdge()) {
              info= "Element clicked: Relation id= "+ thisElement.id();
             }
      }
      catch(err) { info= "Selected element is neither a Concept nor a Relation"; }
    console.log(info);
   });

 /** Popup (context) menu: a circular Context Menu for each Node (concept) & Edge (relation) using the 'cxtmenu' jQuery plugin. */
 var contextMenu= {
    menuRadius: 75, // 100, // the radius of the circular menu in pixels

    // Use selector: '*' to set this circular Context Menu on all the elements of the core.
    /** Note: Specify selector: 'node' or 'edge' to restrict the context menu to a specific type of element. e.g, 
     * selector: 'node', // to have context menu only for nodes.
     * selector: 'edge', // to have context menu only for edges. */
    selector: '*',
    commands: [ // an array of commands to list in the menu
        {
         content: 'Item Info',
         select: function() {
        /*     itemInfo= window.open("ItemInfo.html", "itemInfoWindow", 
                    "height=200, width=400, location=no, toolbar=no, menubar=no, scrollbars=no, resizable=no, titlebar=no, directories=no, status=no");
             var nodeInfo= "<div>Concept Type: "+ this.data('conceptType') +"<br/> Value: "+ this.data('value') +
                     "<br/> <br/><u>Properties:</u> <br/> id: "+ this.id() +"<br/> Shape: "+ this.data('conceptShape') +
                     "<br/> Color: "+ this.data('conceptColor') +"</div>";
             // Show Item info. in a new window.
             itemInfo.document.write("<html><body><b><u>Node details</u></b><br/>"+ nodeInfo +"</body></html>");*/
             var itemInfo= "";
             $("#infoDialog").dialog();
             try {
             if(this.isNode()) {
                itemInfo= "Concept Type: "+ this.data('conceptType') +"<br/> Value: "+ this.data('value') +
                     "<br/> <br/><u>Properties:</u> <br/> id: "+ this.id() +"<br/> Shape: "+ 
                     this.data('conceptShape') +"<br/> Color: "+ this.data('conceptColor');
               }
             else if(this.isEdge()) {
                     itemInfo= "Relation id= "+ this.id();
                    }
             }
             catch(err) { itemInfo= "Selected element is neither a Concept nor a Relation"; }
             $("#infoDialog").html(itemInfo);
            }
        },
            
        {
         content: 'Show All',
         select: function() {
             cy.elements('node').show(); // show all nodes.
             cy.elements('edge').show(); // show all edges
            }
        },

        {
         content: 'Hide',
         select: function() {
             this.hide(); // hide the selected 'node' element.
            }
        },
            
        {
         content: 'Relayout',
         select: function() {
             cy.reset(); // reset the graph's zooming & panning properties.
            }
        },
            
        {
         content: 'Show Selections',
         select: function() {
             $("#infoDialog").dialog();
             // Display details of all the selected elements: nodes & edges.
             var selections= "";
             cy.nodes().forEach(function( ele ) {
                if(ele.selected()) {
                   selections += "Concept (node): id= "+ ele.id() +" ; "+ ele.data('conceptType') +" : "+ ele.data('value') +
                           "<br/>";
                  }
             });

             cy.edges().forEach(function( ele ) {
                if(ele.selected()) {
                   console.log("Element: Edge id= "+ ele.id() +" is "+ (ele.selected() ? 'selected':'not selected'));
                   selections += "Relation (edge) id= "+ ele.id() +"<br/>";
                  }
             });
             $("#infoDialog").html(selections);
            }
        }
    ], 
    fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
    activeFillColor: 'rgba(92, 194, 237, 0.75)', // the colour used to indicate the selected command
    activePadding: 2, // 20, // additional size in pixels for the active command
    indicatorSize: 15, // 24, // the size in pixels of the pointer to the active command
    separatorWidth: 3, // the empty spacing in pixels between successive commands
    spotlightPadding: 3, // extra spacing in pixels between the element and the spotlight
    minSpotlightRadius: 5, // 24, // the minimum radius in pixels of the spotlight
    maxSpotlightRadius: 10, // 38, // the maximum radius in pixels of the spotlight
    itemColor: 'white', // the colour of text in the command's content
    itemTextShadowColor: 'black', // the text shadow colour of the command's content
    zIndex: 9999 // the z-index of the ui div
 };

cy.cxtmenu(contextMenu); // set Context Menu for all the core elements.

/* // JQuery Context Menu plugin.
 $.contextMenu({
// $('#cy').contextMenu({
// cy.elements('node').contextMenu({
   selector: '#cy', 
   callback: function(key, options) {
    var msg= "Clicked: " + key + " on " + $(this).text();
    console.log(msg); 
   },
   items: {
       "cxtChange": {name: "Change"},
       "cxtHide": {name: "Hide"},
       "sep1": "---------",
       "cxtShow": {
                "name": "Show", 
                "items": {
                    "cxtShow-key1": {"name": "Immediate Neighbours by concept class"},
                    "cxtShow-key2": {
                        "name": "Layouts", 
                        "items": {
                            "innerFold2-key1": {"name": "Arbor"},
                            "innerFold2-key2": {"name": "Circle"},
                            "innerFold2-key3": {"name": "Cose"}
                        }
                    },
                    "cxtShow-key3": {"name": "Immediate Neighbourhood"},
                    "cxtShow-key4": {"name": "Relations to other visible concepts"}
                }
            },
      }
  }); */

 // Show the Item Info. window.
/* $('#itemInfo').click(function() {
   $('#itemInfo').slideToggle(300);
  });*/
}); // on dom ready

