/**
 * @author Ajit Singh
 * @name Network View example
 * @description example code for Network View using Javascript, jQuery, CytoscapeJS, JQuery UI, cxtmenu, 
 * QTip, multi-select (using Shift + click), JSON, CoLa.js & other layout algorithms.
 * @returns
 **/
window.onload= function () {
     // Generate the Network Graph after the page load event.
     generateNetworkGraph(window.jsonFile);
    };

// Generate the network graph using a new JSON dataset (file) when the graph is refreshed by the user.
/*window.opener.location.reload= function () {
     // Generate the Network Graph after the page load event.
     generateNetworkGraph(window.jsonFile);
    };*/

function generateNetworkGraph(jsonFileName) {
   var json_File= jsonFileName;
   console.log("Received json_File: file path: "+ json_File);

   // Include this file's contents on the page at runtime using jQuery and a callback function.
   jQuery.getScript(json_File, function() {
     console.log(json_File +" file included...");
     // Initialize the cytoscapeJS container for Network View.
     initializeNetworkView();
   });

  }

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

/*
   // Event occurring when the cytoscapeJS container <div> is dragged.
   function dragCyContainer() {
//    console.log("cy container dragged.");
    // resize the cytoscapeJS container.
    $('#cy').cytoscape('get').pan();
   }*/

  /** Define the default layout for the network, using CoLa layout from Cola.js (similar to the "Gem" layout in 
    * Ondex Web). */
   var defaultNetworkLayout= {
    name: 'cola', // CoLa layout, using Cola.v3.min.js & Cola.adaptor.js (Ondex Web: Gem)
    animate: animate_layout, // true, // false, 
    animationDuration: 500, 
    fit: true, padding: 10 /*30*/ /*2*/, // padding around the simulation
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    refresh: 1, // number of ticks per frame; higher is faster but more jerky
    maxSimulationTime: 4000, // 8000, // max length in ms to run the layout
    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    // layout event callbacks
    ready: function() {}, // on layoutready
    stop: function() {}, // on layoutstop
    // positioning options
    randomize: false, // use random node positions at beginning of layout
    avoidOverlap: true,
    handleDisconnected: true, // if true, avoids disconnected components from overlapping
    nodeSpacing: function( node ){ return 10; /*20;*/ }, // for extra spacing around nodes
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
    infinite: false, // overrides all other options for a forces-all-the-time mode
   };

function initializeNetworkView() {
// On startup
$(function() { // on dom ready
  var networkJSON= graphJSON; // using the dynamically included graphJSON object directly.
  var metadataJSON= allGraphData; // using the dynamically included metadata JSON object directly.

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

   // Define the stylesheet to be used for nodes & edges in the cytoscape.js container.
   var networkStylesheet= cytoscape.stylesheet()
      .selector('node')
        .css({
          'content': 'data(value)', // '<html>'+ 'data(value)' +'</html>',
                    // function() { return "<html>"+ this.data('value') +"</html>"; },
     //     'text-valign': 'center', // to have 'content' displayed in the middle of the node.
          'outline-colour': 'black', // text outline color
          'border-style': 'solid', // node border
          'border-width': '1px',
          'font-size': '30px',
//          'min-zoomed-font-size': '8px',
          // Set node shape, color & display (visibility) depending on settings in the JSON var.
          'shape': 'data(conceptShape)', // 'triangle'
          // 'width' & 'height': use mapData() mapper.
          'width': 'data(conceptSize)', // '18px',
          'height': 'data(conceptSize)', // '18px',
          'background-color': 'data(conceptColor)', // 'gray'
          /** Using 'data(conceptColor)' leads to a "null" mapping error if that attribute is not defined 
           * in cytoscapeJS. Using 'data[conceptColor]' is hence preferred as it limits the scope of 
           * assigning a property value only if it is defined in cytoscapeJS as well. */
          'display': 'data(conceptDisplay)' // display: 'element' (show) or 'none' (hide).
         })
      .selector('edge')
        .css({
          'content': 'data(label)', // label for edges (arrows).
          'font-size': '30px',
//          'min-zoomed-font-size': '8px',
          'curve-style': 'unbundled-bezier', // default. /* options: bezier (curved), unbundled-bezier (curved with manual control points), haystack (straight edges) */
          'control-point-step-size': '1px', // specifies the distance between successive bezier edges.
          'control-point-weight': '0.7', // '0': curve towards source node, '1': curve towards target node.
          // 'width': use mapData() mapper to allow for curved edges for inter-connected nodes.
          'width': 'data(relationSize)', // '1px', // 'mapData(70, 70, 100, 2, 6)', // '3px',
          'line-color': 'data(relationColor)', // 'gray',
          'line-style': 'solid', // 'solid' or 'dotted' or 'dashed'
          'target-arrow-shape': 'triangle',
          'target-arrow-color': 'gray',
          'display': 'data(relationDisplay)' // display: 'element' (show) or 'none' (hide).
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
      .css({ // settings for highlight nodes in case of single click or Shift+click multi-select event.
        'border-width': '3px',
        'border-color': '#CCCC33' // '#333'
      });

// Initialise a cytoscape container instance as a Javascript object.
/* var cy= cytoscape({
  container: document.getElementById('cy'),
  elements: networkJSON,
  layout: defaultNetworkLayout,
  ready: function() { console.log('ready'); window.cy= this; }
});*/

// Initialise a cystoscape container instance on the HTML DOM using JQuery.
$('#cy').cytoscape({
  container: document.getElementById('cy'),

  /* Using the cytoscape-css-renderer extension (plugin) to allow node & edge labels to use HTML 
   * content instead of just plain text. */
//  'renderer': { name: "css" }, // default renderer: 'canvas'.

  style: networkStylesheet,

  // Using the JSON data to create the nodes.
  elements: networkJSON,
  
  // Layout of the Network.
  layout: defaultNetworkLayout,

  // these options hide parts of the graph during interaction.
//  hideEdgesOnViewport: true,
//  hideLabelsOnViewport: true,

  // this is an alternative that uses a bitmap during interaction.
  textureOnViewport: false, // true,
  /* the colour of the area outside the viewport texture when initOptions.textureOnViewport === true can
   * be set by: e.g., outside-texture-bg-color: white, */

  // interpolate on high density displays instead of increasing resolution.
  pixelRatio: 1,

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

  // a "motion blur" effect that increases perceived performance for little or no cost.
  motionBlur: true,
  
  // for Touch-based gestures.
//  selectionType: (isTouchDevice ? 'additive' : 'single'),
  touchTapThreshold: 8,
  desktopTapThreshold: 4,

  ready: function() {
//   console.log('ready');
   window.cy= this;
  }
});

// Get the cystoscape instance as a Javascript object from JQuery.
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
  var eleImage= 'image/new_images/'+ imgName +'.png';
//  var eleImage= data_url +'image/new_images/'+ imgName +'.png';

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
         qtipMsg= "Concept Type: "+ this.data('conceptType') +", Value: "+ this.data('value') +", PID: "+ 
                  this.data('pid') +"<br>"+"Annotation: "+ this.data('annotation');
        }
      else if(this.isEdge()) {
              qtipMsg= "ID: "+ this.id() +", Relation Label: "+ this.data('label');
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
       info= "Concept selected: "+ thisElement.data('conceptType') +", value: "+ thisElement.data('value') +
               ", PID: "+ thisElement.data('pid');
      }
      else if(thisElement.isEdge()) {
              info= "Relation selected: id: "+ thisElement.id() +", Relation Label: "+ thisElement.data('label');
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
         select: // showItemInfo(this)
            function() {
             var itemInfo= "";
/*             var selectedConceptsCount= 0;
             var selectedRelationsCount= 0;
             var selectedElements= new Array();*/
             try {
             // Display item information in the itemInfo <div> in a <table>.
             var table= document.getElementById("itemInfo_Table").getElementsByTagName('tbody')[0]; // get the Item Info. table.
             // Clear the existing table body contents.
             table.innerHTML= "";
/*             cy.nodes().forEach(function( ele ) {
                if(ele.selected()) {
                   selectedConceptsCount= selectedConceptsCount + 1;
                   selectedElements.push(ele.id()); // add to array of selected Elements.
                  }
             });

             cy.edges().forEach(function( ele ) {
                if(ele.selected()) {
                   selectedRelationsCount= selectedRelationsCount + 1;
                   if(selectedConceptsCount === 0) { // If no concepts were selected.
                      selectedElements.push(ele.id()); // add to array of selected Elements.
                     }
                  }
             });
             console.log("Item Info.: selectedConceptsCount= "+ selectedConceptsCount +" , selectedRelationsCount= "+ selectedRelationsCount);
             for(i=0; i< selectedElements.length; i++) {
                 console.log(selectedElements[i] +" , ");
                }
             if((selectedConceptsCount>0) && (selectedRelationsCount>0)) {
                // Cannot display Item Info. for multiple concepts and relations at the same time.
                itemInfo= "Cannot display Item Info. for multiple concepts and relations at the same time !"+
                        "<br/>To view item info for multiple graph elements, select either multiple Concepts or Relations."; 
                console.log(itemInfo);
               }
             else {
              if(selectedConceptsCount>0) {
                 // Show concept(s) Item Info.
                 for(i=0; i< selectedElements.length; i++) {
                var row= table.insertRow(0); // create a new, empty row.
                // Insert new cells in this row.
                var cell1= row.insertCell(0);
                var cell2= row.insertCell(1);
                // Store the necessary data in the cells.
                cell1.innerHTML= "Concept Type:";
                cell2.innerHTML= this.data('conceptType'); // concept Type
                // Concept 'value'.
                row= table.insertRow(1);
                cell1= row.insertCell(0);
                cell2= row.insertCell(1);
                cell1.innerHTML= "Value:";
                cell2.innerHTML= this.data('value');
                // Concept 'PID'.
                row= table.insertRow(2);
                cell1= row.insertCell(0);
                cell2= row.insertCell(1);
                cell1.innerHTML= "PID:";
                cell2.innerHTML= this.data('pid');
                // Concept 'Annotation'.
                row= table.insertRow(3);
                cell1= row.insertCell(0);
                cell2= row.insertCell(1);
                cell1.innerHTML= "Annotation:";
                cell2.innerHTML= this.data('annotation');
                // Get all metadata for this concept from the metadataJSON variable.
                for(var j=0; j < metadataJSON.ondexmetadata.concepts.length; j++) {
                    if(this.id() === metadataJSON.ondexmetadata.concepts[j].id) {
                       // Concept 'elementOf'.
                       row= table.insertRow(table.rows.length); // new row.
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

                       // Get concept attributes.
                       row= table.insertRow(table.rows.length); // new row.
                       cell1= row.insertCell(0);
                       cell1.innerHTML= "<b>Attributes:</b>"; // sub-heading
                       for(var k=0; k < metadataJSON.ondexmetadata.concepts[j].attributes.length; k++) {
                           if((metadataJSON.ondexmetadata.concepts[j].attributes[k].attrname !== "size")
                               && (metadataJSON.ondexmetadata.concepts[j].attributes[k].attrname !== "visible")) {
                               row= table.insertRow(table.rows.length); // new row.
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
//                                         attrValue= "<a href=\""+ attrUrl +"\" target=\"_blank\">"+ attrValue +"</a>";
                                         attrValue= "<a href=\""+ attrUrl +"\" onclick=\"window.open(this.href,'_blank');return false;\">"+ attrValue +"</a>";
                                        }
                                     }
                                 }
                               // For Aminoacid sequence (AA).
                               else if(attrName === "AA") {
                                       attrName= "Aminoacid sequence (AA)";
                                       aaSeq= attrValue.match(/.{1,10}/g); // split into string array of 10 characters each.
                                       counter= 0;
                                       attrValue= "<font size=\"1\">";
                                       for(var p=0; p < aaSeq.length; p++) {
                                           attrValue= attrValue + aaSeq[p] +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                                           counter= counter + 1;
                                           if(counter%3 === 0) {
                                              attrValue= attrValue +"<br/>";
                                             }
                                          }
//                                       attrValue= attrValue +"</font>";
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
                           row= table.insertRow(table.rows.length); // new row.
                           cell1= row.insertCell(0);
                           cell2= row.insertCell(1);
                           accessionID= metadataJSON.ondexmetadata.concepts[j].coaccessions[k].elementOf;
                           co_acc= metadataJSON.ondexmetadata.concepts[j].coaccessions[k].accession;
                           for(var u=0; u < url_mappings.html_acc.length; u++) {
                               if(url_mappings.html_acc[u].cv === accessionID) {
                                  coAccUrl= url_mappings.html_acc[u].weblink + co_acc; // co-accession url.
                                  // open attribute url in new blank tab.
//                                  attrValue= "<a href=\""+ coAccUrl +"\" target=\"_blank\">"+ co_acc +"</a>";
                                  co_acc= "<a href=\""+ coAccUrl +"\" onclick=\"window.open(this.href,'_blank');return false;\">"+ co_acc +"</a>";
                                 }
                               }
                           cell1.innerHTML= accessionID;
                           cell2.innerHTML= co_acc;
                          }
                      }
                   }
               }
                }
              else {
               // Show relation(s) Item Info.
              }
             }*/

             if(this.isNode()) {
                var row= table.insertRow(0); // create a new, empty row.
                // Insert new cells in this row.
                var cell1= row.insertCell(0);
                var cell2= row.insertCell(1);
                // Store the necessary data in the cells.
                cell1.innerHTML= "Concept Type:";
                cell2.innerHTML= this.data('conceptType'); // concept Type
                // Concept 'value'.
                row= table.insertRow(1);
                cell1= row.insertCell(0);
                cell2= row.insertCell(1);
                cell1.innerHTML= "Value:";
                cell2.innerHTML= this.data('value');
                // Concept 'PID'.
                row= table.insertRow(2);
                cell1= row.insertCell(0);
                cell2= row.insertCell(1);
                cell1.innerHTML= "PID:";
                cell2.innerHTML= this.data('pid');
                // Concept 'Annotation'.
                row= table.insertRow(2);
                cell1= row.insertCell(0);
                cell2= row.insertCell(1);
                cell1.innerHTML= "Annotation:";
                cell2.innerHTML= this.data('annotation');
                // Get all metadata for this concept from the metadataJSON variable.
                for(var j=0; j < metadataJSON.ondexmetadata.concepts.length; j++) {
                    if(this.id() === metadataJSON.ondexmetadata.concepts[j].id) {
                       // Concept 'elementOf'.
                       row= table.insertRow(table.rows.length); // new row.
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

                       // Get concept attributes.
                       row= table.insertRow(table.rows.length); // new row.
                       cell1= row.insertCell(0);
                       cell1.innerHTML= "<b>Attributes:</b>"; // sub-heading
                       for(var k=0; k < metadataJSON.ondexmetadata.concepts[j].attributes.length; k++) {
                           if((metadataJSON.ondexmetadata.concepts[j].attributes[k].attrname !== "size")
                               && (metadataJSON.ondexmetadata.concepts[j].attributes[k].attrname !== "visible")) {
                               row= table.insertRow(table.rows.length); // new row.
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
//                                         attrValue= "<a href=\""+ attrUrl +"\" target=\"_blank\">"+ attrValue +"</a>";
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
//                                       attrValue= "<font size=\"1\">";
                                       attrValue= "<span style= \"font-family: 'Courier New', Courier, monospace\">";
                                       for(var p=0; p < aaSeq.length; p++) {
                                           attrValue= attrValue + aaSeq[p] +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                                           counter= counter + 1;
                                           if(counter%3 === 0) {
                                              attrValue= attrValue +"<br/>";
                                             }
                                          }
//                                       attrValue= attrValue +"</font>";
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
                           row= table.insertRow(table.rows.length); // new row.
                           cell1= row.insertCell(0);
                           cell2= row.insertCell(1);
                           accessionID= metadataJSON.ondexmetadata.concepts[j].coaccessions[k].elementOf;
                           co_acc= metadataJSON.ondexmetadata.concepts[j].coaccessions[k].accession;
                           for(var u=0; u < url_mappings.html_acc.length; u++) {
                               if(url_mappings.html_acc[u].cv === accessionID) {
                                  coAccUrl= url_mappings.html_acc[u].weblink + co_acc; // co-accession url.
                                  // open attribute url in new blank tab.
//                                  attrValue= "<a href=\""+ coAccUrl +"\" target=\"_blank\">"+ co_acc +"</a>";
                                  co_acc= "<a href=\""+ coAccUrl +"\" onclick=\"window.open(this.href,'_blank');return false;\">"+ co_acc +"</a>";
                                 }
                               }
                           cell1.innerHTML= accessionID;
                           cell2.innerHTML= co_acc;
                          }
                      }
                   }
               }
             else if(this.isEdge()) {
                     var row= table.insertRow(0);
                     // Insert new cells in this row.
                     var cell1= row.insertCell(0);
                     var cell2= row.insertCell(1);
                     // Store the necessary data in the cells.
                     cell1.innerHTML= "Relation Label:";
                     cell2.innerHTML= this.data('label'); // relation label
                     // Relation 'source'.
                     row= table.insertRow(1);
                     cell1= row.insertCell(0);
                     cell2= row.insertCell(1);
                     cell1.innerHTML= "From:";
                     cell2.innerHTML= this.data('source'); // relation source ('fromConcept').
                     // Relation 'target'.
                     row= table.insertRow(2);
                     cell1= row.insertCell(0);
                     cell2= row.insertCell(1);
                     cell1.innerHTML= "To:";
                     cell2.innerHTML= this.data('target'); // relation target ('toConcept').
                     // Get all metadata for this relation from the metadataJSON variable.
                     for(var j=0; j < metadataJSON.ondexmetadata.relations.length; j++) {
                         if(this.id() === metadataJSON.ondexmetadata.relations[j].id) {
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

                            // Get relation 'attributes'.
                            row= table.insertRow(table.rows.length); // new row.
                            cell1= row.insertCell(0);
                            cell1.innerHTML= "<b>Attributes:</b>"; // sub-heading
                            for(var k=0; k < metadataJSON.ondexmetadata.relations[j].attributes.length; k++) {
                                if((metadataJSON.ondexmetadata.relations[j].attributes[k].attrname !== "size")
                                    && (metadataJSON.ondexmetadata.relations[j].attributes[k].attrname !== "visible")) {
                                   row= table.insertRow(table.rows.length); // new row.
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
            }
        },

        {
         content: 'Show All',
         select: function() {
             cy.elements('node').show(); // show all nodes using eles.show().
             cy.elements('edge').show(); // show all edges using eles.show().
            }
        },

        {
         content: 'Hide',
         select: function() {
             this.hide(); // hide the selected 'node' element.
            }
        },

        {
         content: 'Hide by Type',
         select: function() { // Hide all concepts (nodes) of the same type.
             var thisConceptType= this.data('conceptType');
             console.log("Hide by Type: this.Type: "+ thisConceptType);
             cy.nodes().forEach(function( ele ) {
              if(ele.data('conceptType') === thisConceptType) {
                 ele.hide();
                }
             });
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
    itemFontSize: 6, //8,
    zIndex: 9999 // the z-index of the ui div
 };

cy.cxtmenu(contextMenu); // set Context Menu for all the core elements.

/* // JQuery Context Menu plugin.
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
    stableEnergy: function() { return false; } /*function( energy ) {
     var e = energy; 
     return (e.max <= 0.5) || (e.mean <= 0.3);
    }*/,
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
  function showNeighbourhood() {
   console.log("Show neighborhood: Display concepts in the neighbourhood of the selected concept (node)...");
   cy.nodes(':selected').neighborhood().nodes().show();
//   cy.nodes(':selected').neighborhood().edges().show();
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
/*    itemInfo= window.open("ItemInfo.html", "itemInfoWindow", "height=200, width=400, location=no, 
                 toolbar=no, menubar=no, scrollbars=no, resizable=no, titlebar=no, directories=no, status=no");
    var nodeInfo= "<div>Concept Type: "+ selectedElement.data('conceptType') +"<br/> Value: "+ selectedElement.data('value') +
                    "<br/> <br/><u>Properties:</u> <br/> id: "+ selectedElement.id() +"<br/> Shape: "+ selectedElement.data('conceptShape') +
                    "<br/> Color: "+ selectedElement.data('conceptColor') +"</div>";
    // Show Item info. in a new window.
    itemInfo.document.write("<html><body><b><u>Node details</u></b><br/>"+ nodeInfo +"</body></html>"); */
    var itemInfo= "";
    console.log("Display Item Info. for id: "+ selectedElement.id());
/*  $("#infoDialog").dialog(); // initialize a dialog box.
*/
    try {
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
  