/*
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
//            cyjs_networkView.onLoad();
            cyjs_networkView.focus();
            // clear the cytoscapeJS container <div>.
            cyjs_networkView.document.getElementById('cy').innerHTML= "";
            console.log("WindowAlreadyOpen>> cyjs_networkView.jsonFile= "+ cyjs_networkView.jsonFile);
//            cyjs_networkView.location.reload(); // reload the window
*/
//            cyjs_networkView.document.location.reload(true); // reload the graph window using new graph.

            // trigger the Load() event of the Network Graph window to call the function that generates 
            // the network graph to generate a new one using the new JSON file (dataset).
//            $(cyjs_networkView).trigger('load');

            // re-generate the network graph using the new JSON dataset (file) in the already open window.
//            generateNetworkGraph(cyjs_networkView.jsonFile);

            // close the window to reopen it later using new JSON dataset (file).
            cyjs_networkView.close();
           }
//         else {
/*           cyjs_networkView= window.open("networkGraph.html", "Network View", 
                    "height=600, width=1200, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, titlebar=yes, directories=yes, status=yes");*/
           cyjs_networkView= window.open("networkGraph.html", "Network View", 
                    "fullscreen=yes, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, titlebar=yes, status=yes");
           // Pass the JSON file path to a global variable in the new window.
           cyjs_networkView.jsonFile= jsonFile;
           console.log("OpenNewWindow>> cyjs_networkView.jsonFile= "+ cyjs_networkView.jsonFile);
//          }

        // Embed the Network Viewer in the 'Network View' tab on the page.
/*        var output ="<div id='buttonBox'>" +
        			"<a title='Maximise' href='javascript:;' id='maximiseNetwork' class='networkButtons' type='button'></a>" +
//        			"<a title='Download network' onclick="+ downloadJSON() +"id='downloadNetworkTab' class='networkButtons' type='button'></a>" +
	        		"<a title='Open in new window' href='javascript:;' id='newNetworkWindow' class='networkButtons' type='button'></a>" +
	        		"<span id='networkViewerHelp' class='networkButtons hint-big' title='Network Viewer Help'></span>" +
	        	"</div>" +
        		
        		"<div id='modalShadow'></div>" +
        		"<div class='modalBox'>" +	//placeholder to stop page length changing when modalBox is opened.
	        		"<div id='modalBox' class='modalBox'>" +	//modal box is moved to center of window and resizes with it
	        			"<a title='Restore' href='javascript:;' id='restoreNetwork' class='networkButtons'></a>" +
		        		"<iframe id= 'networkGraph_iframe' src=\"networkGraph.html\" onload=\"makeNetworkGraph()\"></iframe>"+
	        		"</div>" +
				"</div>";
	
	$('#NetworkCanvas').html(output);
	
	$("#newNetworkWindow").click(function(){
           cyjs_networkView= window.open("networkGraph.html", "Network View", 
                    "fullscreen=yes, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, titlebar=yes, status=yes");
	});
	
	$('#maximiseNetwork').click(function() {
		$('#modalBox').addClass("modalBoxVisible");
		//$('#restoreNetwork').show();
		$('#modalShadow').show();
	});
	
        function makeNetworkGraph() {
         console.log("makeNetworkGraph>> jsonFile from index.html: "+ jsonFile);
//         document.getElementById('networkGraph_iframe').contentWindow.generateNetworkGraph(jsonFile);
         $('#networkGraph_iframe').contentWindow.generateNetworkGraph(jsonFile);
        }

        function downloadJSON() {
//         document.getElementById('networkGraph_iframe').contentWindow.exportAsJson();
         $('#networkGraph_iframe').contentWindow.exportAsJson();
        }

	function closeModalBox(){
		$('#modalBox').removeClass("modalBoxVisible");
		//$('#restoreNetwork').hide();
		$('#modalShadow').hide();
	}
	
	$('#restoreNetwork, #modalShadow, #legend_picture').click(function(){
			closeModalBox();
	}).find('#legend_frame').click(function (e) {
		  e.stopPropagation();
	});	
	
	$('#modalShadow').click(function(){
			closeModalBox();
	});
	
	
	$(document).keyup(function(e) {
        if (e.keyCode == 27){
        	closeModalBox();
        }
	});*/
        
}
