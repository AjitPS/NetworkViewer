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
        			"<a title='Download network' href="+jsonFile +" target=_blank id='downloadNetworkTab' class='networkButtons' type='button'></a>" +
	        		"<a title='Open in new window' href='javascript:;' id='newNetworkWindow' class='networkButtons' type='button'></a>" +
	        		"<span id='networkViewerHelp' class='networkButtons hint-big' title='Network Viewer Help'></span>" +
	        	"</div>" +
        		
        		"<div id='modalShadow'></div>" +
        		"<div class='modalBox'>" +	//placeholder to stop page length changing when modalBox is opened.
	        		"<div id='modalBox' class='modalBox'>" +	//modal box is moved to center of window and resizes with it
	        			"<a title='Restore' href='javascript:;' id='restoreNetwork' class='networkButtons'></a>" +
		        		"<div id='OndexWebContainer'>" +
//                                        "<div id='new_networkViewer'><object type='text/html' data='networkGraph.html' style='width:100%; height: 96%;' onload='makeNetworkGraph(jsonFile)'></object></div>"+
                                        "<iframe name='new_networkViewer'></iframe>"+
		        		"</div>" +
//		        		legendHtmlContainer +
	        		"</div>" +
				"</div>"/* +
				"<div id='networkHelpBox'>" +
				"<h2>Network Viewer Help</h2>" +
				"<ul>" +
				"<li>The network graph has been generated & is displayed using cytoscapeJS.</li></ul>" +
 				"</div>"*/;
//        console.log("cyjs_networkView iframe.contentWindow: "+ cyjs_networkView.contentWindow);

	$('#NetworkCanvas').html(output);
        console.log("new_NetworkViewer div added...");

        // Using Ajax & jQuery to load the body and head fragments of the networkGraph.html page.
/*        console.log("Fetch 'head' of networkGraph.html...");
        $('head').load("networkGraph.html #head", function( response, status, xhr ) {
//        $('head').load("networkGraph.html #head", function() {
          console.log("GetHead of networkGraph.html... status= "+ status);
          if(status === "error" ) {
             console.log("GetHead of networkGraph.html>> Sorry but there was an error: "+ xhr.status + " " + xhr.statusText);
            }*/
//          console.log("GetHead of networkGraph.html... response= "+ response);
/*          else if(status === "success") {
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
            }*/
/*        });*/

        makeNetworkGraph(jsonFile);

	$('#networkViewerHelp').click(function() {
		$('#networkHelpBox').slideToggle(300);
	});
	
	$('#networkHelpBox').click(function() {
		$('#networkHelpBox').slideToggle(300);
	})
	
	$("#newNetworkWindow").click(function(){
           var cyjs_networkView= window.open("networkGraph.html", "Network View", 
                    "fullscreen=yes, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, titlebar=yes, status=yes");
           // Pass the JSON file path to a global variable in the new window.
           cyjs_networkView.jsonFile= jsonFile;
           console.log("OpenNewNetworkWindow>> cyjs_networkView.jsonFile= "+ cyjs_networkView.jsonFile);
	});
	
	$('#maximiseNetwork').click(function() {
		$('#modalBox').addClass("modalBoxVisible");
		//$('#restoreNetwork').show();
		$('#modalShadow').show();
	});

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

//	activateButton('NetworkCanvas');
}

        function makeNetworkGraph(jsonFile) {
         console.log("makeNetworkGraph>> jsonFile from index.html: "+ jsonFile);
//         $('#new_networkViewer').contentWindow.generateNetworkGraph(jsonFile);
//         generateNetworkGraph(jsonFile);
/*         var cyjs_networkView= $('#new_networkViewer').load("networkGraph.html");
         // Pass the JSON file path to a global variable in the new window.
         cyjs_networkView.jsonFile= jsonFile;
         console.log("makeNetworkGraph>> cyjs_networkView.jsonFile= "+ cyjs_networkView.jsonFile);*/
         // Set iframe source.
         $('#new_networkViewer').src= "networkGraph.html";
         // Call function inside iframe once it's ready.
/*         $("#new_networkViewer").load(function () {                        
        frames["new_networkViewer"].document.body.innerHTML = htmlValue;
    });*/
         var doc= null;
         if($('#new_networkViewer')[0].contentDocument) // For Firefox or Chrome
            doc= $('#new_networkViewer')[0].contentDocument;
         else if($('#new_networkViewer')[0].contentWindow) // For IE
                 doc= $('#new_networkViewer')[0].contentWindow.document;
//         $('#new_networkViewer')[0].contentWindow.generateNetworkGraph(jsonFile);
         doc.generateNetworkGraph(jsonFile);
        }

        function downloadJSON() {
//         document.getElementById('networkGraph_iframe').contentWindow.exportAsJson();
//         $('#new_networkViewer').contentWindow.exportAsJson()
         exportAsJson();
        }
