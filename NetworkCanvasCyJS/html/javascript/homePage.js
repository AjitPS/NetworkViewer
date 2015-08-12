/*
 * Generates the new lightweight Network graph, using cytoscapeJS.
 * @author: Ajit Singh.
 */
var cyjs_networkView= false;

function generateCyJSNetwork(jsonFileName) {
    var jsonFile= jsonFileName; // the JSON file received from index.html.
    console.log("generateCyJSNetwork>> jsonFile from index.html: "+ jsonFile);
  //  try {
         if(cyjs_networkView && !cyjs_networkView.closed) {
            // If the window is already open.
            // close the window to reopen it later using new JSON dataset (file).
            cyjs_networkView.close();
           }
//         else {
/*           cyjs_networkView= window.open("networkGraph.html", "Network View", 
                    "fullscreen=yes, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, titlebar=yes, status=yes"); */

           // Pass the JSON file path to a global variable in the new window.
//           cyjs_networkView.jsonFile= jsonFile;
//           console.log("OpenNewWindow>> cyjs_networkView.jsonFile= "+ cyjs_networkView.jsonFile);
//          }

        // Embed the Network Viewer in the 'Network View' tab on the page.
        var output ="<div id='buttonBox'>" +
        			"<a title='Maximise' href='javascript:;' id='maximiseNetwork' class='networkButtons' type='button'></a>" +
//        			"<a title='Download network' onclick="+ downloadJSON() +"id='downloadNetworkTab' class='networkButtons' type='button'></a>" +
	        		"<a title='Open in new window' href='javascript:;' id='newNetworkWindow' class='networkButtons' type='button'></a>" +
	        		"<span id='networkViewerHelp' class='networkButtons hint-big' title='Network Viewer Help'></span>" +
	        	"</div>" +
        		
        		"<div id='modalShadow'></div>" +
        		"<div class='modalBox'>" +	//placeholder to stop page length changing when modalBox is opened.
	        		"<div id='modalBox' class='modalBox'>" +	//modal box is moved to center of window and resizes with it
	        			"<a title='Restore' href='javascript:;' id='restoreNetwork' class='networkButtons'></a>" +
                                        "<div id='new_networkViewer'><object type='text/html' data='networkGraph.html'  style='width:100%; height: 100%;' onload='makeNetworkGraph(jsonFile)'></object></div>"+
	        		"</div>" +
				"</div>";
//        console.log("cyjs_networkView iframe.contentWindow: "+ cyjs_networkView.contentWindow);

	$('#NetworkCanvas').html(output);
        console.log("new_NetworkViewer div added...");

        // Using Ajax & jQuery to load the body and head fragments of the networkGraph.html page.
        console.log("Fetch 'head' of networkGraph.html...");
        $('head').load("networkGraph.html #head", function( response, status, xhr ) {
//        $('head').load("networkGraph.html #head", function() {
          console.log("GetHead of networkGraph.html... status= "+ status);
          if(status === "error" ) {
             console.log("GetHead of networkGraph.html>> Sorry but there was an error: "+ xhr.status + " " + xhr.statusText);
            }
          else if(status === "success") {
          console.log("Now, fetch 'body' of networkGraph.html..."+ status);
        $("#new_Network_Viewer").load("networkGraph.html #body", function( response, status, xhr ) {
//        $("#new_Network_Viewer").load("networkGraph.html #body", function() {
          console.log("GetBody of networkGraph.html... status= "+ status);
          if(status === "error" ) {
             console.log("GetBody of networkGraph.html>> Sorry but there was an error: "+ xhr.status + " " + xhr.statusText);
            }
          else if(status === "success") { // Using ajaxSuccess() instead of ajaxComplete() event.
             // Generate the Network Graph.
             generateNetworkGraph(jsonFile);
            }
        });
            }
        });

	$("#newNetworkWindow").click(function(){
           /*cyjs_networkView= */window.open("networkGraph.html", "Network View", 
                    "fullscreen=yes, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, titlebar=yes, status=yes");
	});
	
	$('#maximiseNetwork').click(function() {
		$('#modalBox').addClass("modalBoxVisible");
		//$('#restoreNetwork').show();
		$('#modalShadow').show();
	});

        function makeNetworkGraph(jsonFile) {
         console.log("makeNetworkGraph>> jsonFile from index.html: "+ jsonFile);
//         document.getElementById('networkGraph_iframe').contentWindow.generateNetworkGraph(jsonFile);
//         $('#networkGraph_iframe').contentWindow.generateNetworkGraph(jsonFile);
         $('#new_NetworkViewer').contentWindow.generateNetworkGraph(jsonFile);
        }

        function downloadJSON() {
//         document.getElementById('networkGraph_iframe').contentWindow.exportAsJson();
         /*$('#networkGraph_iframe').contentWindow.*/ //exportAsJson();
         $('#new_NetworkViewer').contentWindow.exportAsJson();
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
	});

}
