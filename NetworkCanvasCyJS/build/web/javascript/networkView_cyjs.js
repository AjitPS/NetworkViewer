/**
 * @author Ajit Singh
 * @name Network View example
 * @description example code for Network View using Javascript, jQuery, CytoscapeJS, JQuery UI, cxtmenu, 
 * QTip, multi-select (using Shift + click), JSON, WebCola.js & other layout algorithms.
 * @returns
 **/
window.onload= function () {
     // Generate the Network Graph after the page load event.
     generateNetworkGraph(window.jsonFile);
    };

// Generate the network graph using a new JSON dataset (file) when the graph is refreshed by the user.
//window.opener.location.reload= function () {
/*window.location.reload= function () {
     console.log("reload>> window.jsonFile= "+ window.jsonFile);
     // Generate the Network Graph after the page load event.
     generateNetworkGraph(window.jsonFile);
    };*/

function generateNetworkGraph(jsonFileName) {
   var json_File= jsonFileName;
   console.log("Received json_File: file path: "+ json_File);

   // Include this file's contents on the page at runtime using jQuery and a callback function.
/*   $.getScript(json_File, function() {*/
   jQuery.getScript(json_File, function() {
     console.log(json_File +" file included...");
     // Initialize the cytoscapeJS container for Network View.
     initializeNetworkView();

     // Highlight nodes with hidden, connected nodes using Shadowing.
     blurNodesWithHiddenNeighborhood();

     // Re-set the default (WebCola) layout.
     setDefaultLayout();
   });

  }

/*
   // Event occurring when the cytoscapeJS container <div> is dragged.
   function dragCyContainer() {
//    console.log("cy container dragged.");
    // resize the cytoscapeJS container.
    $('#cy').cytoscape('get').pan();
   }*/

function initializeNetworkView() {
// On startup
$(function() { // on dom ready
  var networkJSON= graphJSON; // using the dynamically included graphJSON object directly.
  var metadataJSON= allGraphData; // using the dynamically included metadata JSON object directly.
/*
  console.log("networkJSON: "+ networkJSON +"\n \n metadataJSON: "+ metadataJSON +"\n");

  // Display 'networkJSON' elements.nodes data in console.
  for(var j = 0; j < networkJSON.nodes.length; j++) {
      console.log("JSON node.data (id, type, value, pid): "+ 
              networkJSON.nodes[j].data.id +", "+ networkJSON.nodes[j].data.conceptType +", "+ 
              networkJSON.nodes[j].data.value +", "+ networkJSON.nodes[j].data.pid +
              " ; Size, Shape, Colour, conceptDisplay: "+ networkJSON.nodes[j].data.conceptSize +" , "+ 
              networkJSON.nodes[j].data.conceptShape +" , "+ networkJSON.nodes[j].data.conceptColor +
              " , "+ networkJSON.nodes[j].data.conceptDisplay);
     }
  console.log("\n \n");
  for(var k = 0; k < networkJSON.edges.length; k++) {
      console.log("JSON edge.data (id, label, From, To, Color, Size, relationDisplay): "+ 
              networkJSON.edges[k].data.id +", "+ networkJSON.edges[k].data.label +", "+ 
              networkJSON.edges[k].data.source +", "+ networkJSON.edges[k].data.target +", "+ 
              networkJSON.edges[k].data.relationColor +", "+ networkJSON.edges[k].data.relationSize +
              ", "+ networkJSON.edges[k].data.relationDisplay);
     }
  console.log("\n \n");

  // Display concept accessions from JSON metadata.
  for(var j=0; j < metadataJSON.ondexmetadata.concepts.length; j++) {
      displayAccessionsString= "";
      console.log("JSON concept.data (id, ofType): "+ metadataJSON.ondexmetadata.concepts[j].id +", "+ 
              metadataJSON.ondexmetadata.concepts[j].ofType +"\n"+"Concept accessions: ");
      for(var k=0; k < metadataJSON.ondexmetadata.concepts[j].coaccessions.length; k++) {
          displayAccessionsString= displayAccessionsString + 
                  metadataJSON.ondexmetadata.concepts[j].coaccessions[k].elementOf +": "+ 
                  metadataJSON.ondexmetadata.concepts[j].coaccessions[k].accession +", ";
         }
      console.log(displayAccessionsString.substring(0, displayAccessionsString.length-2));
     }
  console.log("\n \n");

  // Display url mappings (for html accessions) imported from url_mappings.json config file.
  for(var k = 0; k < url_mappings.html_acc.length; k++){
      console.log("url_mappings (cv, weblink, cc_restriction): "+ url_mappings.html_acc[k].cv +", "+ 
              url_mappings.html_acc[k].weblink +", "+ url_mappings.html_acc[k].cc_restriction);
     }
  console.log("\n \n");
*/

   // Define the stylesheet to be used for nodes & edges in the cytoscape.js container.
   var networkStylesheet= cytoscape.stylesheet()
      .selector('node')
        .css({
          'content': //'data(value)',
                     function(ele) {
                      var label= '';
                      if(ele.data('value').indexOf('<span') > -1) { // Strip html content from text.
                         var txtLabel= '<html>'+ ele.data('value') +'</html>';
                         label= jQuery(txtLabel).text();
                        }
                      else {
                         label= ele.data('value');
                        }
                      return label;
                     },
     //     'text-valign': 'center', // to have 'content' displayed in the middle of the node.
          'text-background-color': //'black',
                   function(ele) { // text background color
                    var labelColor= '';
                    if(ele.data('value').indexOf('<span') > -1) {
                       labelColor= 'gold';
                      }
                    else {
                       labelColor= 'black';
                      }
                    return labelColor;
                   },
          'text-background-opacity': //'0', // default: '0' (disabled).
                   function(ele) { // text background opacity
                    var textBackgroundOpacity= '0';
                    if(ele.data('value').indexOf('<span') > -1) {
                       textBackgroundOpacity= '1';
                      }
                    return textBackgroundOpacity;
                   },
          'text-wrap': 'wrap', // for manual and/or autowrapping the label text.
          'border-style': //'solid', // node border, can be 'solid', 'dotted', 'dashed' or 'double'.
                          function(ele) {
                              var node_borderStyle= 'solid';
                              try { // Check if the node was flagged or not
                              if(ele.data('flagged') === "true") {
                                 node_borderStyle= 'double'; // can be 'solid', 'dotted', 'dashed' or 'double'.
//                                 console.log("node Flagged= "+ ele.data('flagged') +" , node_borderStyle: "+ node_borderStyle);
                                }
                              }
                              catch(err) { console.log(err.stack); }
                              return node_borderStyle;
                          },
          'border-width': //'1px',
                          function(ele) {
                              var node_borderWidth= '1px';
                              try { // Check if the node was flagged or not
                              if(ele.data('flagged') === "true") {
                                 node_borderWidth= '3px';
//                                 console.log("node Flagged= "+ ele.data('flagged') +" , node_borderWidth: "+ node_borderWidth);
                                }
                              }
                              catch(err) { console.log(err.stack); }
                              return node_borderWidth;
                          },
          'border-color': //'black',
                          function(ele) {
                              var node_borderColor= 'black';
                              try { // Check if the node was flagged or not
                              if(ele.data('flagged') === "true") {
                                 node_borderColor= 'navy';
//                                 console.log("node Flagged= "+ ele.data('flagged') +" , node_borderColor: "+ node_borderColor);
                                }
                              }
                              catch(err) { console.log(err.stack); }
                              return node_borderColor;
                          },
          'font-size': '8px', // '30px',
//          'min-zoomed-font-size': '8px',
          // Set node shape, color & display (visibility) depending on settings in the JSON var.
          'shape': 'data(conceptShape)', // 'triangle'
          'width': 'data(conceptSize)', // '18px',
          'height': 'data(conceptSize)', // '18px',
          'background-color': 'data(conceptColor)', // 'gray'
          /** Using 'data(conceptColor)' leads to a "null" mapping error if that attribute is not defined 
           * in cytoscapeJS. Using 'data[conceptColor]' is hence preferred as it limits the scope of 
           * assigning a property value only if it is defined in cytoscapeJS as well. */
          'display': 'data(conceptDisplay)', // display: 'element' (show) or 'none' (hide).
          'text-opacity': '0' // to make the label invisible by default.
         })
      .selector('edge')
        .css({
          'content': 'data(label)', // label for edges (arrows).
          'font-size': '8px',
//          'min-zoomed-font-size': '8px',
          'curve-style': 'unbundled-bezier', /* options: bezier (curved) (default), unbundled-bezier (curved with manual control points), haystack (straight edges) */
          'control-point-step-size': '10px', //'1px' // specifies the distance between successive bezier edges.
          'control-point-distance': '20px', /* overrides control-point-step-size to curves single edges as well, in addition to parallele edges */
          'control-point-weight': '50'/*'0.7'*/, // '0': curve towards source node, '1': curve towards target node.
          // 'width': use mapData() mapper to allow for curved edges for inter-connected nodes.
          'width': 'data(relationSize)', // 'mapData(relationSize, 70, 100, 2, 6)', // '3px',
          'line-color': 'data(relationColor)', // 'gray',
          'line-style': 'solid', // 'solid' or 'dotted' or 'dashed'
          'target-arrow-shape': 'triangle',
          'target-arrow-color': 'gray',
          'display': 'data(relationDisplay)', // display: 'element' (show) or 'none' (hide).
          'text-opacity': '0' // to make the label invisible by default.
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
        .css({ // settings for highlighting nodes in case of single click or Shift+click multi-select event.
          'border-width': '4px',
          'border-color': '#CCCC33' // '#333'
        })
      .selector('.BlurNode')
        .css({ // settings for using shadow effect on nodes when they have hidden, connected nodes.
              'shadow-blur': '25', // disable for larger network graphs, use x & y offset(s) instead.
              'shadow-color': 'black', // 'data(conceptColor)',
//            'shadow-offset-x': '5',
//            'shadow-offset-y': '2',
              'shadow-opacity': '0.9'

              // settings for overlay effect.
/*              'overlay-color': 'data(conceptColor)',
              'overlay-padding': '1.5px',
              'overlay-opacity': '0.5' */
        });

// Initialise a cytoscape container instance as a Javascript object.
/* var cy= cytoscape({
  container: document.getElementById('cy'),
  elements: networkJSON,
  layout: defaultNetworkLayout,
  ready: function() { console.log('ready'); window.cy= this; }
});*/

// Initialise a cytoscape container instance on the HTML DOM using JQuery.
$('#cy').cytoscape({
  container: document.getElementById('cy'),

  /* Using the cytoscape-css-renderer extension (plugin) to allow node & edge labels to use HTML 
   * content instead of just plain text. */
//  'renderer': { name: "css" }, // default renderer: 'canvas'.

  style: networkStylesheet,

  // Using the JSON data to create the nodes.
  elements: networkJSON,
  
  // Layout of the Network.
//  layout: defaultNetworkLayout,

  // these options hide parts of the graph during interaction such as panning, dragging, etc. to enable faster rendering for larger graphs.
//  hideLabelsOnViewport: true,
//  hideEdgesOnViewport: true,

  // this is an alternative that uses a bitmap during interaction.
  textureOnViewport: false, // true,
  /* the colour of the area outside the viewport texture when initOptions.textureOnViewport === true can
   * be set by: e.g., outside-texture-bg-color: white, */

  // interpolate on high density displays instead of increasing resolution.
  pixelRatio: 1,

  // interaction options:
  // Zoom settings
  zoomingEnabled: true, // zooming: both by user and programmatically.
//  userZoomingEnabled: true, // user-enabled zooming.
  zoom: 1, // the initial zoom level of the graph before the layout is set.
//  minZoom: 1e-50,
//  maxZoom: 1e50,
  /* mouse wheel sensitivity settings to enable a more gradual Zooming process. A value between 0 and 1 
   * reduces the sensitivity (zooms slower) & a value greater than 1 increases the sensitivity. */
  wheelSensitivity: 0.05,

  panningEnabled: true, // panning: both by user and programmatically.
//  userPanningEnabled: true, // user-enabled panning.

  // for Touch-based gestures.
//  selectionType: (isTouchDevice ? 'additive' : 'single'),
  touchTapThreshold: 8,
  desktopTapThreshold: 4,
  autolock: false,
  autoungrabify: false,
  autounselectify: false,

  // a "motion blur" effect that increases perceived performance for little or no cost.
  motionBlur: true,

  ready: function() {
   window.cy= this;
  }
});

// Get the cytoscape instance as a Javascript object from JQuery.
var cy= $('#cy').cytoscape('get'); // now we have a global reference to `cy`

// Pan & zooms the graph to fit all the elements (concept nodes) in the graph.
// cy.fit();

// cy.boxSelectionEnabled(true); // enable box selection (highlight & select multiple elements for moving via mouse click and drag).
cy.boxSelectionEnabled(false); // to disable box selection & hence allow Panning, i.e., dragging the entire graph.

// Set requisite background image for each concept (node) instead of using cytoscapeJS shapes.
/*
 cy.nodes().forEach(function( ele ) {
  var conType= ele.data('conceptType');
  var imgName= 'Gene'; // default
  if(conType === "Biological_Process") {
     imgName= 'Biological_process';
    }
  else if(conType === "Cellular_Component") {
       imgName= 'Cellular_component';
      }
  else if(conType === "Gene") {
       imgName= 'Gene';
      }
  else if(conType === "Protein Domain") {
     imgName= 'Protein_domain';
    }
  else if(conType === "Pathway") {
     imgName= 'Pathway';
    }
  else if(conType === "Reaction") {
     imgName= 'Reaction';
    }
  else if(conType === "Publication") {
     imgName= 'Publication';
    }
  else if(conType === "Protein") {
     imgName= 'Protein';
    }
  else if(conType === "Quantitative Trait Locus") {
     imgName= 'QTL';
    }
  else if(conType === "Enzyme") {
     imgName= 'Enzyme';
    }
  else if(conType === "Molecular_Function") {
     imgName= 'Molecular_function';
    }
  else if((conType === "Enzyme_Classification") || (conType === "Enzyme Classification")) {
     imgName= 'Enzyme_classification';
    }
  else if(conType === "Trait Ontology") {
     imgName= 'Trait_ontology';
    }
  else if(conType === "Scaffold") {
     imgName= 'Scaffold';
    }
  else if((conType === "Compound") || (conType === "SNP")) {
     imgName= 'Compound';
    }
  else if(conType === "Phenotype") {
     imgName= 'Phenotype';
    }
  var eleImage= 'image/'+ imgName +'.png';
//  var eleImage= data_url +'image/'+ imgName +'.png';

  // Add these properties to this element's JSON.
  ele.data('nodeImage', eleImage);
//  console.log("data.nodeImage "+ ele.data('nodeImage'));
 });

 // Update the stylesheet for the Network Graph to show background images for Nodes.
 cy.style().selector('node').css({ // Show actual background images.
           'background-image': 'data(nodeImage)',
           'background-fit': 'none' // can be 'none' (for original size), 'contain' (to fit inside node) or 'cover' (to cover the node).
          }).update();
*/

/** Add a Qtip message to all the nodes & edges using QTip displaying their Concept Type & value when a 
 * node/ edge is clicked.
 * Note: Specify 'node' or 'edge' to bind an event to a specific type of element.
 * e.g, cy.elements('node').qtip({ }); or cy.elements('edge').qtip({ }); */
cy.elements().qtip({
  content: function() {
      var qtipMsg= "";
      try {
      if(this.isNode()) {
//         qtipMsg= "ID: "+ this.id() +", Type: "+ this.data('conceptType') +", Value: "+ this.data('value');
         qtipMsg= "Concept: "+ this.data('value') +", type: "+ this.data('conceptType') +", PID: "+ 
                  this.data('pid') +" , flagged: "+ this.data('flagged') +"<br>"+"Annotation: "+ 
                  this.data('annotation');
        }
      else if(this.isEdge()) {
              qtipMsg= "Relation: "+ this.data('label') +", From: "+ this.data('source') +", To: "+ 
                      this.data('target');
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
       info= "Concept selected: "+ thisElement.data('value') +", type: "+ thisElement.data('conceptType')
               +", PID: "+ thisElement.data('pid');
       // Also update the Item Info table & display it.
       showItemInfo(thisElement);
      }
      else if(thisElement.isEdge()) {
//              info= "Relation selected: id: "+ thisElement.id() +", Relation Label: "+ thisElement.data('label');
              info= "Relation selected: "+ thisElement.data('label') +", From: "+ 
                      thisElement.data('source') +", To: "+ thisElement.data('target');
             }
       // Also update the Item Info table & display it.
       showItemInfo(thisElement);
      }
      catch(err) { info= "Selected element is neither a Concept nor a Relation"; }
    console.log(info);
   });
// cxttap - normalised right click or 2-finger tap event.

/*
  // On a 'touchmove' or 'mouseover' event, show edges signifying the number of nodes connected to this node.
  cy.on('tapdragover', function (e) {
    var thisElement= e.cyTarget;
    try {
      if(thisElement.isNode() && thisElement.hasClass('BlurNode')) {
         var eleID= thisElement.id();
         // Get hidden, connected relations (edges) for this concept (node), that are not visible.
//         var neighbor_edges= cy.edges().sources(thisElement).filter('node[relationDisplay = "none"]');
         // Get all the connected relations (edges) for this concept (node).
         var neighbor_edges= thisElement.connectedEdges();

         // Find and show hidden relations starting from this concept to other concepts.
         var neighbor_relationDisplay, neighbor_relationSource;
         neighbor_edges.forEach(function( ele ) {
             neighbor_relationSource= ele.data('source');
             neighbor_relationDisplay= ele.data('relationDisplay');
//             if(neighbor_relationSource === eleID && neighbor_relationDisplay === "none") {
             if(neighbor_relationDisplay === "none") {
//                console.log("\n tapdragover>> thisElement.id: "+ eleID +"; neighbor_Edge: id: "+ ele.id() +" , isVisible: "+ ele.visible());
                // Get the hidden concepts (nodes) connected to this relation (edge).
                var hiddenConnectedNodes= ele.connectedNodes().filter('node[conceptDisplay = "none"]');
                hiddenConnectedNodes.forEach(function( el ) {
//                console.log("\t hiddenConnectedNodes>> Node id: "+ el.id() +"; value: "+ el.data('value') +" , isVisible: "+ el.visible());
                    if(el.id() !== eleID && (!(el.visible()))) {
                      // Show the hidden, connected concept (node).
                      el.style({'display': 'element', 'opacity': '0.01' });
                    }
                });
                // Show the hidden, connected relation (edge) as well.
                if(!(ele.visible())) {
//                   ele.style({'display': 'element', 'opacity': '0.75', 'curve-style': 'haystack', 'target-arrow-shape': 'none', 'control-point-weight': '1', 'content': '', 'haystack-radius': '0' });
                   ele.style({'display': 'element', 'opacity': '0.75' });
                  }
               }
            });

          // Using cytoscapeJS, set a circle layout on the neighborhood & make the neighboring hidden nodes & edges transparent.
          var eleBBox= thisElement.boundingBox(); // cy.extent(); // get the bounding box of thie selected concept (node) for the layout to run around it.
          // Define the neighborhood's layout.
          var mini_circleLayout= { name: 'circle', radius: 2, boundingBox: eleBBox,
              avoidOverlap: true, fit: true, handleDisconnected: true, padding: 10, animate: false, 
              counterclockwise: false, rStepSize: 1, ready: undefined, stop: function() { cy.center(); cy.fit(); } };
          // Set the layout only using the hidden concepts (nodes).
          thisElement.neighborhood().filter('node[conceptDisplay = "none"]').layout(mini_circleLayout);
//             neighbor_edges.connectedNodes().filter('node[conceptDisplay = "none"]').layout(mini_circleLayout);
         }
      }
    catch(err) { console.log("tapdragover event: Error: "+ err.stack); }
  });

  // On a 'touchmove' or 'mouseout' event, remove css style changes, if any, from nodes and edges.
  cy.on('tapdragout', function (e) {
    var thisElement= e.cyTarget;
    try {
      if(thisElement.isNode() && thisElement.hasClass('BlurNode')) {
         resetRelationCSS(thisElement);
        }
     }
    catch(err) { console.log("tapdragout event: Error: "+ err.stack); }
  });

  // Remove css style changes occurring from a 'tapdragover' ('mouseover') event, if any, from nodes and edges.
  function resetRelationCSS(thisElement) {
//      console.log("resetRelationCSS>> concept ID: "+ thisElement.id() +" , value: "+ thisElement.data('value') +" , isVisible: "+ thisElement.visible());

      // Get all the connected relations (edges) for this concept (node).
      var neighbor_edges= thisElement.connectedEdges();
      neighbor_edges.forEach(function( ele ) {
          if(ele.style('opacity') === '0.75') {
//             console.log("neighbor_edge: id: "+ ele.id() +" , source: "+ ele.data('source') +" , isVisible: "+ ele.visible());
             // Get the hidden concepts (nodes) connected to this relation (edge).
             var hiddenConnectedNodes= ele.connectedNodes();
             hiddenConnectedNodes.forEach(function( el ) {
                 if(el.style('opacity') === '0.01') {
//                    console.log("neighbor_node: id: "+ el.id() +" , value: "+ el.data('value') +" , isVisible: "+ el.visible());
                    el.removeStyle(); // remove all overridden style properties from this Concept.
                   }
             });
             // remove all overridden style properties from this Relation too.
             ele.removeStyle();
            }
         });
  }
*/

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
             // Show Item Info Pane.
             openItemInfoPane();

             // Display Item Info.
             showItemInfo(this);
            }
        },
            
        {
         content: 'Show Links',
         select: function() {
             if(this.isNode()) {
                var selectedNode= this;
                // Remove css style changes occurring from a 'tapdragover' ('mouseover') event.
//                resetRelationCSS(selectedNode);

                // Show concept neighborhood.
//                selectedNode.neighborhood().nodes().show();
//                selectedNode.neighborhood().edges().show();
                selectedNode.connectedEdges().connectedNodes().show();
                selectedNode.connectedEdges().show();

                // Remove shadow effect from the nodes that had hidden nodes in their neighborhood.
                removeNodeBlur(this);

                try { // Relayout the graph.
//                  rerunGraphLayout(/*selectedNode.neighborhood()*/selectedNode.connectedEdges().connectedNodes());
                  // Set a circle layout on the neighborhood.
                  var eleBBox= selectedNode.boundingBox(); // get the bounding box of thie selected concept (node) for the layout to run around it.
                  // Define the neighborhood's layout.
                  var mini_circleLayout= { name: 'circle', radius: 2/*0.01*/, boundingBox: eleBBox,
                      avoidOverlap: true, fit: true, handleDisconnected: true, padding: 10, animate: false, 
                      counterclockwise: false, rStepSize: 1/*0.01*/, ready: /*undefined*/function() { cy.center(); cy.fit(); /*cy.resize();*/ }, 
                      stop: undefined/*function() { cy.center(); cy.fit(); }*/ };

                  // Set the layout only using the hidden concepts (nodes).
//                  console.log("Node neighborhood.filter(visible) size: "+ selectedNode.neighborhood().filter('node[conceptDisplay = "none"]').length);
//                  if(selectedNode.neighborhood().length > 5/*2*/) {
                     selectedNode.neighborhood().filter('node[conceptDisplay = "none"]').layout(mini_circleLayout);
//                    }
                 }
                catch(err) { console.log("Error occurred while setting layout on selected element's neighborhood: "+ err.stack); }
               }
           }
        },

        {
         content: 'Hide',
         select: function() {
             this.hide(); // hide the selected 'node' or 'edge' element.
            }
        },

        {
         content: 'Hide by Type',
         select: function() { // Hide all concepts (nodes) of the same type.
             if(this.isNode()) {
                var thisConceptType= this.data('conceptType');
                console.log("Hide Concept by Type: "+ thisConceptType);
                cy.nodes().forEach(function( ele ) {
                 if(ele.data('conceptType') === thisConceptType) {
                    ele.hide();
                   }
                });
                // Relayout the graph.
                rerunLayout();
               }
             else if(this.isEdge()) { // Hide all relations (edges) of the same type.
                var thisRelationType= this.data('label');
                console.log("Hide Relation (by Label type): "+ thisRelationType);
                cy.edges().forEach(function( ele ) {
                 if(ele.data('label') === thisRelationType) {
                    ele.hide();
                   }
                });
                // Relayout the graph.
                rerunLayout();
               }
           }
        },

        {
         content: 'Show Selections',
         select: function() {
             $("#infoDialog").dialog(); // initialize a dialog box.
             // Display details of all the selected elements: nodes & edges.
             var selections= "";
             cy.nodes().forEach(function( ele ) {
                if(ele.selected()) {
                   selections += ele.data('conceptType') +" : "+ ele.data('value') +" , PID: "+ ele.data('pid') + "<br/><br/>";
                  }
             });

             cy.edges().forEach(function( ele ) {
                if(ele.selected()) {
                   selections += "Relation: "+ ele.data('label') +" , From: "+ ele.data('source') +" , To: "+ ele.data('target') +"<br/>";
                  }
             });
             console.log("ShowSelections (Shift+click): selections= "+ selections);
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
//    itemFontSize: 6, //8,
    zIndex: 9999 // the z-index of the ui div
 };

cy.cxtmenu(contextMenu); // set Context Menu for all the core elements.

/* // JQuery Context Menu plugin.
// $.contextMenu({
 jQuery.contextMenu({
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


 // Show the popup Info. dialog box.
 $('#infoDialog').click(function() {
   $('#infoDialog').slideToggle(300);
  });

}); // on dom ready
}

  var cy= $('#cy').cytoscape('get'); // now we have a global reference to `cy`

  // Show or Hide the Item Info table.
  /** NOT USED ANYMORE. */
  function showOrHideItemInfoTable() {
   var iiTable= document.getElementById("itemInfo_Table");
//   console.log("showOrHideItemInfoTable clicked... current Table.display: "+ iiTable.style.display);
   if(iiTable.style.display === "none" || iiTable.style.display === "") {
      iiTable.style.display= "inline";
     }
   else {
      iiTable.style.display= "none";
     }
//   console.log("current Table.display changed to: "+ iiTable.style.display);
  }

  // Reset: Re-position the network graph.
  function resetGraph() {
   cy.reset(); // reset the graph's zooming & panning properties.
   cy.fit();
//   cy.pan({ x: 100, y: 100 });
//   cy.center();
  }

/*
  // Reset: Re-position the network graph.
  function onlyResetGraph() {
   cy.reset(); // reset the graph's zooming & panning properties.
  }

  // Reset: Re-position the network graph.
  function centerGraph() {
   cy.center();
  }

  // Reset: Re-position the network graph.
  function panGraph() {
   cy.pan({ x: 50, y: 50 });
  }

  // Reset: Re-position the network graph.
  function fitGraph() {
   cy.fit();
  }

  // Reset: Re-position the network graph.
  function zoomGraph() {
   cy.zoom({
     level: 7.0, // zoom level
     renderedPosition: { x: 50, y: 50 }
    });
  }
*/

  // Search the graph for a concept using BFS: breadthfirst search
  function findConcept(conceptName) {
   console.log("Search for concept value: "+ conceptName);
   var foundID;
   cy.nodes().forEach(function( ele ) {
       if(ele.data('conceptDisplay') === 'element') {
          if(ele.data('value').indexOf(conceptName) > -1) {
             console.log("Search found: "+ ele.data('value'));
             foundID= ele.id(); // the found node

             // select the matched concept.
             cy.$('#'+foundID).select();
            }
        }
      });
  }

 // Export the graph as a JSON object in a new Tab and allow users to save it.
  function exportAsJson() {

   var exportJson= cy.json(); // get JSON object for the network graph.

   // Display in a new blank browser tab.
//   window.open().document.write(exportJson); // for text data
   window.open('data:application/json;' + (window.btoa?'base64,'+btoa(JSON.stringify(exportJson)):JSON.stringify(exportJson))); // for JSON data
  }
  
  // Export the graph as a .png image and allow users to save it.
  function exportAsImage() {
   // Export as .png image
   var png64= cy.png(); // .setAttribute('crossOrigin', 'anonymous');

   // Display the exported image in a new blank browser window instead of having it in the same window.
   window.open(png64,'Image','width=1200px,height=600px,resizable=1');
  }

  // Show concept neighbourhood.
/*  function showNeighbourhood() {
   console.log("Show neighborhood: Display concepts in the neighbourhood of the selected concept (node)...");
   var selectedNodes= cy.nodes(':selected');
   selectedNodes.neighborhood().nodes().show();
   selectedNodes.neighborhood().edges().show();

   // Remove shadow effect from the nodes that had hidden nodes in their neighborhood.
   selectedNodes.forEach(function( ele ) {
    removeNodeBlur(ele);
   });

  }*/
  
  // Show all concepts & relations.
  function showAll() {
   cy.elements('node').show(); // show all nodes using eles.show().
   cy.elements('edge').show(); // show all edges using eles.show().
   // Relayout the graph.
   rerunLayout();

   // Remove shadows around nodes, if any.
   cy.nodes().forEach(function( ele ) {
       removeNodeBlur(ele);
      });
  }
  
  // Show/ Hide labels for concepts and relations.
 /* function showOrHideLabels() {
   console.log("cy.hideLabelsOnViewport= "+ cy.hideLabelsOnViewport);
   if(cy.hideLabelsOnViewport === "false") {
      cy.hideLabelsOnViewport= "true";
     }
   else {
      cy.hideLabelsOnViewport= "false";
     }
  }*/

  /** Item Info.: display information about the selected concept(s)/ relation(s) including attributes, 
   * co-accessions and evidences.
   * @type type
   */
   function showItemInfo(selectedElement) {
    var itemInfo= "";
    var metadataJSON= allGraphData; // using the dynamically included metadata JSON object directly.
/*    console.log("Display Item Info. for id: "+ selectedElement.id() +", isNode ?= "+ 
            selectedElement.isNode() +", isEdge ?= "+ selectedElement.isEdge());*/
    try {
         // Display the Item Info table in its parent div.
         document.getElementById("itemInfo_Table").style.display= "inline";
         // Display item information in the itemInfo <div> in a <table>.
         var table= document.getElementById("itemInfo_Table").getElementsByTagName('tbody')[0]; // get the Item Info. table.
         // Clear the existing table body contents.
         table.innerHTML= "";
         if(selectedElement.isNode()) {
            var row= table.insertRow(0); // create a new, empty row.
            // Insert new cells in this row.
            var cell1= row.insertCell(0);
            var cell2= row.insertCell(1);
            // Store the necessary data in the cells.
            cell1.innerHTML= "Concept Type:";
            cell2.innerHTML= selectedElement.data('conceptType'); // concept Type
            // Concept 'value'.
            row= table.insertRow(1);
            cell1= row.insertCell(0);
            cell2= row.insertCell(1);
            cell1.innerHTML= "Value:";
            cell2.innerHTML= selectedElement.data('value');
            // Concept 'PID'.
            row= table.insertRow(2);
            cell1= row.insertCell(0);
            cell2= row.insertCell(1);
            cell1.innerHTML= "PID:";
            cell2.innerHTML= selectedElement.data('pid');
            // Concept 'Annotation'.
            row= table.insertRow(3);
            cell1= row.insertCell(0);
            cell2= row.insertCell(1);
            cell1.innerHTML= "Annotation:";
            cell2.innerHTML= selectedElement.data('annotation');
            // Get all metadata for this concept from the metadataJSON variable.
            for(var j=0; j < metadataJSON.ondexmetadata.concepts.length; j++) {
                if(selectedElement.id() === metadataJSON.ondexmetadata.concepts[j].id) {
                    // Concept 'elementOf'.
                    row= table.insertRow(table.rows.length/* - 1*/); // new row.
                    cell1= row.insertCell(0);
                    cell2= row.insertCell(1);
                    cell1.innerHTML= "Source:";
                    cell2.innerHTML= metadataJSON.ondexmetadata.concepts[j].elementOf;

                    // Get evidence information.
                    var evidences= "";
                    row= table.insertRow(table.rows.length); // new row.
                    cell1= row.insertCell(0);
                    cell2= row.insertCell(1);
                    cell1.innerHTML= "Evidence:";
                    for(var k=0; k < metadataJSON.ondexmetadata.concepts[j].evidences.length; k++) {
                        if(metadataJSON.ondexmetadata.concepts[j].evidences[k] !== "") {
                           evidences= evidences + metadataJSON.ondexmetadata.concepts[j].evidences[k] +", ";
                          }
                       }
                    cell2.innerHTML= evidences.substring(0, evidences.length-2);

                    // Get all Synonyms (concept names).
                    var all_concept_names= "";
                    row= table.insertRow(table.rows.length); // new row.
                    cell1= row.insertCell(0);
                    cell2= row.insertCell(1);
                    cell1.innerHTML= "<b>Synonyms:</b>";
                    for(var k=0; k < metadataJSON.ondexmetadata.concepts[j].conames.length; k++) {
                        if(metadataJSON.ondexmetadata.concepts[j].conames[k].name !== "") {
                           all_concept_names= all_concept_names + metadataJSON.ondexmetadata.concepts[j].conames[k].name +"<br/>";
                          }
                       }
                    cell2.innerHTML= all_concept_names; // all synonyms.

                    // Get concept attributes.
                    row= table.insertRow(table.rows.length); // new row.
                    cell1= row.insertCell(0);
                    cell1.innerHTML= "<b>Attributes:</b>"; // sub-heading
                    for(var k=0; k < metadataJSON.ondexmetadata.concepts[j].attributes.length; k++) {
                        if((metadataJSON.ondexmetadata.concepts[j].attributes[k].attrname !== "size")
                            && (metadataJSON.ondexmetadata.concepts[j].attributes[k].attrname !== "visible")) {
                            row= table.insertRow(table.rows.length/* - 1*/); // new row.
                            cell1= row.insertCell(0);
                            cell2= row.insertCell(1);
                            attrName= metadataJSON.ondexmetadata.concepts[j].attributes[k].attrname;
                            attrValue= metadataJSON.ondexmetadata.concepts[j].attributes[k].value;
                            // For Taxonomy ID, display url (created via config>> url_mappings.json).
                            if((attrName === "TAXID") || (attrName === "TX")) {
                               for(var u=0; u < url_mappings.html_acc.length; u++) {
                                   if((url_mappings.html_acc[u].cv === attrName) || (url_mappings.html_acc[u].cv === "TX")) {
                                      attrUrl= url_mappings.html_acc[u].weblink + attrValue; // Taxonomy ID url.
                                      // open attribute url in new blank tab.
//                                        attrValue= "<a href=\""+ attrUrl +"\" target=\"_blank\">"+ attrValue +"</a>";
                                      attrValue= "<a href=\""+ attrUrl +"\" onclick=\"window.open(this.href,'_blank');return false;\">"+ attrValue +"</a>";
                                     }
                                  }
                              }
                            // For Aminoacid sequence (AA).
                            else if(attrName === "AA") {
                                    attrName= "Aminoacid sequence (AA)";
                                    aaSeq= attrValue.match(/.{1,10}/g); // split into string array of 10 characters each.
                                    counter= 0;
                                    // Have monospaced font for AA sequence.
//                                    attrValue= "<font size=\"1\">";
                                    attrValue= "<span style= \"font-family: 'Courier New', Courier, monospace\">";
                                    for(var p=0; p < aaSeq.length; p++) {
                                        attrValue= attrValue + aaSeq[p] +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                                        counter= counter + 1;
                                        if(counter%3 === 0) {
                                           attrValue= attrValue +"<br/>";
                                          }
                                       }
//                                    attrValue= attrValue +"</font>";
                                    attrValue= attrValue +"</span>";
                                   }
                            cell1.innerHTML= attrName;
                            cell2.innerHTML= attrValue;
                           }
                        }

                    // Get concept accessions.
                    row= table.insertRow(table.rows.length); // new row.
                    cell1= row.insertCell(0);
                    cell1.innerHTML= "<b>Accessions:</b>"; // sub-heading
                    for(var k=0; k < metadataJSON.ondexmetadata.concepts[j].coaccessions.length; k++) {
                        row= table.insertRow(table.rows.length/* - 1*/); // new row.
                        cell1= row.insertCell(0);
                        cell2= row.insertCell(1);
                        accessionID= metadataJSON.ondexmetadata.concepts[j].coaccessions[k].elementOf;
                        co_acc= metadataJSON.ondexmetadata.concepts[j].coaccessions[k].accession;
                        for(var u=0; u < url_mappings.html_acc.length; u++) {
                            if(url_mappings.html_acc[u].cv === accessionID) {
                               coAccUrl= url_mappings.html_acc[u].weblink + co_acc; // co-accession url.
                               // open attribute url in new blank tab.
//                               attrValue= "<a href=\""+ coAccUrl +"\" target=\"_blank\">"+ co_acc +"</a>";
                               co_acc= "<a href=\""+ coAccUrl +"\" onclick=\"window.open(this.href,'_blank');return false;\">"+ co_acc +"</a>";
                              }
                            }
                        cell1.innerHTML= accessionID;
                        cell2.innerHTML= co_acc;
                       }
                   }
               }
           }
        else if(selectedElement.isEdge()) {
                var row= table.insertRow(0);
                // Insert new cells in this row.
                var cell1= row.insertCell(0);
                var cell2= row.insertCell(1);
                // Store the necessary data in the cells.
                cell1.innerHTML= "Relation Label:";
                cell2.innerHTML= selectedElement.data('label'); // relation label
                // Relation 'source'.
                row= table.insertRow(1);
                cell1= row.insertCell(0);
                cell2= row.insertCell(1);
                cell1.innerHTML= "From:";
                cell2.innerHTML= selectedElement.data('source'); // relation source ('fromConcept').
                // Relation 'target'.
                row= table.insertRow(2);
                cell1= row.insertCell(0);
                cell2= row.insertCell(1);
                cell1.innerHTML= "To:";
                cell2.innerHTML= selectedElement.data('target'); // relation target ('toConcept').
                // Get all metadata for this relation from the metadataJSON variable.
                for(var j=0; j < metadataJSON.ondexmetadata.relations.length; j++) {
                    if(selectedElement.id() === metadataJSON.ondexmetadata.relations[j].id) {
                       // Get evidence information.
                       var relationEvidences= "";
                       row= table.insertRow(table.rows.length); // new row.
                       cell1= row.insertCell(0);
                       cell2= row.insertCell(1);
                       cell1.innerHTML= "Evidence:";
                       for(var k=0; k < metadataJSON.ondexmetadata.relations[j].evidences.length; k++) {
                           if(metadataJSON.ondexmetadata.relations[j].evidences[k] !== "") {
                              relationEvidences= relationEvidences + metadataJSON.ondexmetadata.relations[j].evidences[k] +", ";
                             }
                          }
                       cell2.innerHTML= relationEvidences.substring(0, relationEvidences.length-2);

                        // Get relation attributes.
                        row= table.insertRow(table.rows.length); // new row.
                        cell1= row.insertCell(0);
                        cell1.innerHTML= "<b>Attributes:</b>"; // sub-heading
                        for(var k=0; k < metadataJSON.ondexmetadata.relations[j].attributes.length; k++) {
                            if((metadataJSON.ondexmetadata.relations[j].attributes[k].attrname !== "size")
                               && (metadataJSON.ondexmetadata.relations[j].attributes[k].attrname !== "visible")) {
                                row= table.insertRow(table.rows.length/* - 1*/); // new row.
                                cell1= row.insertCell(0);
                                cell2= row.insertCell(1);
                                cell1.innerHTML= metadataJSON.ondexmetadata.relations[j].attributes[k].attrname;
                                cell2.innerHTML= metadataJSON.ondexmetadata.relations[j].attributes[k].value;
                               }
                           }
                       }
                   }
               }
        }
    catch(err) {
          itemInfo= "Selected element is neither a Concept nor a Relation"; 
          itemInfo= itemInfo +"<br/>Error details:<br/>"+ err.stack; // error details
          console.log(itemInfo);
         }
//    $("#infoDialog").html(itemInfo); // display in the dialog box.
   }

  // Re-run the entire graph's layout.
  function rerunLayout() {
   // Get the cytoscape instance as a Javascript object from JQuery.
   var cy= $('#cy').cytoscape('get'); // now we have a global reference to `cy`
   var selected_elements= cy.$(':visible'); // get only the visible elements.

  // Re-run the graph's layout, but only on the visible elements.
   rerunGraphLayout(selected_elements);
  }

  // Re-run the graph's layout, but only on the visible elements.
  function rerunGraphLayout(eles) {
   if(document.getElementById("default").checked) {
      setColaLayout(eles);
     }
   else if(document.getElementById("circle").checked) {
           setCircleLayout(eles);
          }
   else if(document.getElementById("cose").checked) {
           setCoseLayout(eles);
          }
   else if(document.getElementById("arbor").checked) {
           setArborLayout(eles);
          }
   else if(document.getElementById("dagre").checked) {
           setTreeLayout(eles);
          }
   else if(document.getElementById("breadthfirst").checked) {
           setBreadthfirstLayout(eles);
          }
   else if(document.getElementById("springy").checked) {
           setSpringyLayout(eles);
          }
/*   else if(document.getElementById("spread").checked) {
           setSpreadLayout(eles);
          }*/
   else if(document.getElementById("grid").checked) {
           setGridLayout(eles);
          }
   else if(document.getElementById("concentric").checked) {
           setConcentricLayout(eles);
          }
//   console.log("Re-run layout complete...");
  }

 // Open the Item Info pane when the "Item Info" option is selected for a concept or relation.
 function openItemInfoPane() {
//  myLayout.show('east', true); // to unhide (show) and open the pane.
//  myLayout.open('east'); // open the (already unhidden) Item Info pane.

  myLayout.slideOpen('east'); // open the (already unhidden) Item Info pane.
 }

  // Show shadow effect on nodes with connected, hidden elements in their neighborhood.
  function blurNodesWithHiddenNeighborhood() {
    var cy= $('#cy').cytoscape('get'); // now we have a global reference to `cy`

    cy.nodes().forEach(function( ele ) {
    var thisElement= ele;
    var eleID, connected_hiddenNodesCount= 0;
    try { // Retrieve the nodes in this element's neighborhood.
//         var neighborhood_nodes= thisElement.neighborhood().nodes();

         eleID= thisElement.id(); // element ID.
         // Retrieve the directly connected nodes in this element's neighborhood.
         var connected_edges= thisElement.connectedEdges();
         // Get all the relations (edges) with this concept (node) as the source.
//         var connected_edges= thisElement.connectedEdges().filter('edge[source = '+eleID+']');

         var connected_hidden_nodes= connected_edges.connectedNodes().filter('node[conceptDisplay = "none"]');
         // Find the number of hidden, connected nodes.
         connected_hiddenNodesCount= connected_hidden_nodes.length;

         if(connected_hiddenNodesCount > 1) {
            // Show shadow around nodes that have hidden, connected nodes.
            thisElement.addClass('BlurNode');
          }
      }
    catch(err) { 
          console.log("Error occurred while adding Shadow to concepts with connected, hidden elements. \n"+"Error Details: "+ err.stack);
         }
   });
  }

  // Remove shadow effect from nodes, if it exists.
  function removeNodeBlur(ele) {
    var thisElement= ele;
    try {
      if(thisElement.hasClass('BlurNode')) {
         // Remove any shadow created around the node.
         thisElement.removeClass('BlurNode');
        }
/*      thisElement.neighborhood().nodes().style({'opacity': '1'});
      thisElement.neighborhood().edges().style({'opacity': '1'});*/
     }
    catch(err) {
          console.log("Error occurred while removing Shadow from concepts with connected, hidden elements. \n"+"Error Details: "+ err.stack);
         }
  }

  // Show all node labels.
  function showConceptLabels() {
   var cy= $('#cy').cytoscape('get'); // now we have a global reference to `cy`
   if(document.getElementById("show_ConceptLabels").checked) {
      console.log("Show Concept labels...");
      cy.nodes().style({'text-opacity': '1'});
     }
   else {
      console.log("Hide Concept labels...");
      cy.nodes().style({'text-opacity': '0'});
      // Also hide labels on Genes.
      document.getElementById("show_GeneLabels").checked= false;
      showGeneLabels();
     }
  }

  // Show all edge labels.
  function showRelationLabels() {
   var cy= $('#cy').cytoscape('get'); // now we have a global reference to `cy`
   if(document.getElementById("show_RelationLabels").checked) {
      console.log("Show Relation labels...");
      cy.edges().style({'text-opacity': '1'});
     }
   else {
      console.log("Hide Relation labels...");
      cy.edges().style({'text-opacity': '0'});
     }
  }

  // Show labels only on Genes.
  function showGeneLabels() {
   var cy= $('#cy').cytoscape('get'); // now we have a global reference to `cy`
   if(document.getElementById("show_GeneLabels").checked) {
      console.log("Show labels on Genes...");
      cy.nodes().forEach(function( ele ) {
         var conType= ele.data('conceptType');
         if(conType === "Gene") {
            ele.style({'text-opacity': '1'});
           }
        });
    }
   else {
      console.log("Hide labels on Genes...");
      cy.nodes().forEach(function( ele ) {
         var conType= ele.data('conceptType');
         if(conType === "Gene") {
            ele.style({'text-opacity': '0'});
           }
        });
     }
  }

