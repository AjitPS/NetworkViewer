/*
 * Function
 * Generates the new lightweight Network graph, using cytoscapeJS.
 * @author: Ajit Singh.
 */
function generateCyJSNetwork(jsonFileName) {
    var jsonFile= jsonFileName; // the JSON file received from index.html.
    console.log("generateCyJSNetwork>> jsonFile from index.html: "+ jsonFile);

  //  try {
         var cyjs_networkView= window.open("networkGraph.html", "Network View", 
                    "height=600, width=1200, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, titlebar=yes, directories=yes, status=yes");
         cyjs_networkView.jsonFile= jsonFile; // JSON file path sent to networkGraph.html window.
}
