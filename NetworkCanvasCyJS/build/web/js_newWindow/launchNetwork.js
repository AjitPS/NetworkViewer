/*
 * Generates a lightweight Network graph, using cytoscapeJS and jQuery.
 * @author: Ajit Singh.
 */

function activateButton(option){
$('.resultViewer:visible').fadeOut(0,function(){
		$('.button_off').attr('class','button_on');
		$('#'+option).fadeIn();
		$('#'+option+'_button').attr('class','button_off');
	});
}

//  document.getElementById('resultsTable').innerHTML = table;

function generateOldNetwork(url,list){
	//OndexServlet?mode=network&list=POPTR_0003s06140&keyword=acyltransferase
	$.post(url, list, function(response, textStatus){
	var oxl = response.split(":")[1];

	var output ="<div id='buttonBox'>" +
        			"<a title='Maximise' href='javascript:;' id='maximiseNetwork' class='networkButtons' type='button'></a>" +
        			"<a title='Download network' href="+data_url + oxl +" target=_blank id='downloadNetworkTab' class='networkButtons' type='button'></a>" +
	        		"<a title='Open in new window' href='javascript:;' id='newNetworkWindow' class='networkButtons' type='button'></a>" +
	        		"<span id='networkViewerHelp' class='networkButtons hint-big' title='Network Viewer Help'></span>" +
	        	"</div>" +

        		"<div id='modalShadow'></div>" +
        		"<div class='modalBox'>" +	//placeholder to stop page length changing when modalBox is opened.
	        		"<div id='modalBox' class='modalBox'>" +	//modal box is moved to center of window and resizes with it
	        			"<a title='Restore' href='javascript:;' id='restoreNetwork' class='networkButtons'></a>" +
		        		"<div id='OndexWebContainer'>" +
			        		"<div id='OndexWebApplet'></div>" +
		        		"</div>" +
		        		legendHtmlContainer +
	        		"</div>" +
				"</div>" +
				"<div id='networkHelpBox'>" +
				"<h2>Network Viewer Help</h2>" +
				"<ul>" +
				"<li>The Ondex knowledge network has been generated and is displayed in the Ondex Web applet. Alternatively it can be downloaded and opened in the Ondex desktop application</li>" +
 				"<li>If you see an error and the network is not loading make sure <a href=http://www.java.com/en/download target=_blank>Java7 Update55+</a> is installed and <a href=http://ondex.rothamsted.ac.uk target=_blank>http://ondex.rothamsted.ac.uk</a> is added to the Exception Site List in the java control panel.</li>" +
 				"</div>";

    //output += legendHtmlContainer;

	$('#NetworkCanvas').html(output);

/*	$('#networkViewerHelp').click(function() {
		$('#networkHelpBox').slideToggle(300);
	});

	$('#networkHelpBox').click(function() {
		$('#networkHelpBox').slideToggle(300);
	})

	$("#newNetworkWindow").click(function(){
		var w = window.open('html/networkViewer.html?oxl='+oxl,'NetworkWindow','resizable=yes,dependent=yes,status=no,toolbar=no,menubar=no,scrollbars=no,menubar=no');
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
	});*/

	activateButton('NetworkCanvas');
	});
}

function generateCyJSNetwork(jsonFileName) {
    // Add notification to the loading div.
    $("#loadingNetworkDiv").html("Loading, please wait...");

    var jsonFile= jsonFileName; // the JSON file received from index.html.
    console.log("generateCyJSNetwork>> input dataset: "+ jsonFile);

    try {
/*	var knetviewer_menu="<div class='knetviewer-menu'><span class='menu-block'>" +
          "<input type='image' id='showAll' src='image/showAll.png' onclick='showAll();' title='Display all concept & relations in the Network' onmouseover='onHover('showAll');' onmouseout='offHover('showAll');'>" +
          "<input type='image' id='relayoutNetwork' src='image/relayoutNetwork.png' onclick='rerunLayout();' title='Re-run the graph Layout' onmouseover='onHover('relayoutNetwork');' onmouseout='offHover('relayoutNetwork');'>" +
          "<input type='image' id='maximizeOverlay' src='image/maximizeOverlay.png' title='Toggle full screen' onmouseover='onHover('maximizeOverlay');' onmouseout='offHover('maximizeOverlay');'>" +
          "</span><span class='menu-block'>" +
          "Layout: <select id='layouts_dropdown' onChange='rerunGraphLayout($('#cy').cytoscape('get').$(':visible'));'>" +
                 "<option value='Cose_layout' selected='selected' title='using CoSE layout algorithm (useful for larger networks with clustering)'>Default (CoSE)</option>" +
                 "<option value='ngraph_force_layout' title='works well on planar graphs'>ngraph_force</option>" +
                 "<option value='Circle_layout'>Circular</option>" +
                 "<option value='Concentric_layout'>Concentric</option>" +
                 "<option value='Cose_Bilkent_layout' title='using CoSE-Bilkent layout (with node clustering, but performance-intensive for larger networks)'>CoSE-Bilkent</option>" +
             "</select>" +
          "Animation:<input type='checkbox' name='layoutAnimation_Chkbx' id='animateLayout' value='Enable Layout Animation' onclick='setLayoutAnimationSetting();' checked title='Check to enable layout Animation and uncheck to disable.'>" +
          "Search: <input type='text' id='txtSearch' placeholder='Search...' /> <input type='button' value='Search' onclick='findConcept(document.getElementById('txtSearch').value);' title='Search by concept name'>" +
          "<u>Labels:</u> Concepts:<input type='checkbox' name='showConceptLabels_Chkbx' id='show_ConceptLabels' value='Concepts' onclick='showConceptLabels();' ondblclick='showConceptLabels();' onmousedown='showConceptLabels();' title='Check to show Concept labels.'>" +
          "Relations:<input type='checkbox' name='showRelationLabels_Chkbx' id='show_RelationLabels' value='Relations' onclick='showRelationLabels();' ondblclick='showRelationLabels();' onmousedown='showRelationLabels();' title='Check to show Relation labels.'>" +
          "<input type='image' id='exportNetworkJSON' src='image/exportNetworkJSON.png' onclick='exportAsJson();' title='Export the network as a JSON object' onmouseover='onHover('exportNetworkJSON');' onmouseout='offHover('exportNetworkJSON');'>" +
          "</span><span class='menu-block'>" +
          "<input type='image' id='resetNetwork' src='image/resetNetwork.png' onclick='resetGraph();' title='Reposition (reset and re-fit) the graph' onmouseover='onHover('resetNetwork');' onmouseout='offHover('resetNetwork');'>" +
          "<input type='image' id='saveImage' src='image/saveImage.png' onclick='exportAsImage();' title='Export the Network as a .png image' onmouseover='onHover('saveImage');' onmouseout='offHover('saveImage');'>" +
          "Label size: <select id='changeLabelFont' onChange='changeLabelFontSize(this.value);'>" +
              "<option value='8'>8px</option>" +
              "<option value='12'>12px</option>" +
              "<option value='16' selected='selected'>16px</option>" +
              "<option value='20'>20px</option>" +
              "<option value='24'>24px</option>" +
              "<option value='28'>28px</option>" +
              "<option value='32'>32px</option>" +
              "<option value='36'>36px</option>" +
              "<option value='40'>40px</option>" +
              "<option value='44'>44px</option>" +
              "<option value='48'>48px</option>" +
              "<option value='52'>52px</option>" +
          "</select>" +
        "</span></div>";

        // The core cytoscapeJS container
        var cy_container= "<div id='cy'></div>";

        var infoDialog= "<div id='infoDialog'></div><br/>"; // popup

        var knetLegend="<div id=legend_picture><div id=legend_container><table id=legend_frame cellspacing=1>"+ 
                    "<tr><td align=center><img src=image/Gene.png></td>"+ 
                	"<td align=center><img src=image/Protein.png></td>"+ 
                	"<td align=center><img src=image/Pathway.png></td>"+ 
                	"<td align=center><img src=image/Compound.png></td>"+ 
                	"<td align=center><img src=image/Enzyme.png></td>"+ 
                	"<td align=center><img src=image/Reaction.png></td>"+ 
                	"<td align=center><img src=image/QTL.png></td>"+ 
                	"<td align=center><img src=image/Publication.png></td>"+ 
                    "</tr><tr>"+ 
                        "<td align=center><font size=1.8px>Gene</font></td>"+ 
                	"<td align=center><font size=1.8px>Protein</font></td>"+ 
                	"<td align=center><font size=1.8px>Pathway</font></td>"+ 
                	"<td align=center><font size=1.8px>SNP</font></td>"+ 
                	"<td align=center><font size=1.8px>Enzyme</font></td>"+ 
                	"<td align=center><font size=1.8px>Reaction</font></td>"+ 
                	"<td align=center><font size=1.8px>QTL</font></td>"+ 
                	"<td align=center><font size=1.8px>Publication</font></td>"+ 
                    "</tr><tr><td align=center></td></tr><tr>"+ 
                        "<td align=center><img src=image/Phenotype.png></td>"+ 
                	"<td align=center><img src=image/Biological_process.png></td>"+ 
                	"<td align=center><img src=image/Cellular_component.png></td>"+ 
                	"<td align=center><img src=image/Protein_domain.png></td>"+ 
                	"<td align=center><img src=image/Trait_ontology.png></td>"+ 
                	"<td align=center><img src=image/Molecular_function.png></td>"+ 
                	"<td align=center><img src=image/Trait.png></td>"+ 
                	"<td align=center><img src=image/Enzyme_classification.png></td>"+ 
                    "</tr><tr><td align=center><font size=1.8px>Phenotype</font></td>"+ 
                	"<td align=center><font size=1.8px>Biol. Process</font></td>"+ 
                	"<td align=center><font size=1.8px>Cell. Component</font></td>"+ 
                	"<td align=center><font size=1.8px>Protein Domain</font></td>"+ 
                	"<td align=center><font size=1.8px>Trait Ontology</font></td>"+ 
                	"<td align=center><font size=1.8px>Mol. Function</font></td>"+ 
                	"<td align=center><font size=1.8px>Trait</font></td>"+ 
                	"<td align=center><font size=1.8px>Enzyme Classification</font></td>"+ 
                    "</tr></table>"+ 
            "</div>"+ 
        "</div>";

        // Item Info
        var itemInfoPane= "<div class='ui-layout-east'><div id='itemInfo' class='infoDiv'>"+
            "<b>Item Information:</b><button id='btnCloseItemInfoPane'>Close</button><br/><br/>"+
            "<table id='itemInfo_Table' class='infoTable' cellspacing=1>"+
                "<thead><th>Item Info:</th><th>Information about selected concept(s) or relation(s)</th></thead>"+
                "<tbody></tbody></table></div></div>";

        var knet= "<div class='ui-layout-center'>"+ cy_container + infoDialog + knetLegend +"</div>";

        var output = "<div id='knetviewer-tab' class='resultViewer'><div id='knetviewer-target'>"+ knetviewer_menu + knet + itemInfoPane +"</div></div>";
	$('#NetworkCanvas').html(output);
        */

        $("#knetviewer-menu").css("display","block"); // show the KNETviewer menubar.

        // Register jquery-ui select menu to KNETviewer menubar
//        $("#changeLabelVisibility").selectmenu();
        
        // Show loader.
        showNetworkLoader();

        // Generate the Network Graph after the page load event.
        generateNetworkGraph(jsonFile);
        
        // Remove loader.
        removeNetworkLoader();

        // Remove the preloader message for the new Network Viewer
	$("#loadingNetworkDiv").replaceWith('<div id="loadingNetworkDiv"></div>');
        
        activateButton('NetworkCanvas');
       }
    catch(err) {
          var errorMsg= err.stack;
          console.log("Error: <br/>"+"Details: "+ errorMsg);
         }
}
