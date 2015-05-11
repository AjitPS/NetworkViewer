/*
 * Function
 * Generates the new lightweight Network graph, using cytoscapeJS.
 * @author: Ajit Singh.
 */
var cyjs_networkView= false;

function generateCyJSNetwork(jsonFileName) {
    var jsonFile= jsonFileName; // the JSON file received from index.html.
//    console.log("generateCyJSNetwork>> jsonFile from index.html: "+ jsonFile);

  //  try {
         if(cyjs_networkView && !cyjs_networkView.closed) {
            // If the window is already open.
/*            cyjs_networkView.jsonFile= jsonFile; // re-assign the JSON file path.
            cyjs_networkView.focus();
            console.log("WindowAlreadyOpen>> cyjs_networkView.jsonFile= "+ cyjs_networkView.jsonFile);
            // clear the cytoscapeJS container <div>.
            cyjs_networkView.document.getElementById('cy').innerHTML= "";

//            cyjs_networkView.document.location.reload(true); // reload the graph window using new graph.

            // trigger the Load() event of the Network Graph window to call the function that generates 
            // the network graph to generate a new one using the new JSON file (dataset).
//            $(cyjs_networkView).trigger('load');

            // re-generate the network graph using the new JSON dataset (file) in the already open window.
//            generateNetworkGraph(cyjs_networkView.jsonFile);
*/
            // close the window to reopen it later using new JSON dataset (file).
            cyjs_networkView.close();
           }
//         else {
           cyjs_networkView= window.open("networkGraph.html", "Network View", 
                    "height=600, width=1200, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, titlebar=yes, directories=yes, status=yes");
           // Pass the JSON file path to a global variable in the new window.
           cyjs_networkView.jsonFile= jsonFile;
           console.log("OpenNewWindow>> cyjs_networkView.jsonFile= "+ cyjs_networkView.jsonFile);
//          }
}
