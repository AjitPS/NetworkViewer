/*
 * Function
 * Generates the new lightweight Network graph, using cytoscapeJS.
 * @author: Ajit Singh.
 */
function generateCyJSNetwork(jsonFileName){
    var json_File= jsonFileName; // the JSON file generated on the server.
    console.log("generateCyJSNetwork>> jsonFile: "+ json_File);

    try {
         var cyjs_networkView= window.open("cyjs_networkView.html", "Network View", 
                    "height=600, width=1200, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, titlebar=yes, directories=yes, status=yes");
         var cyjsPageStart= '<html>';
         var cyjsHead= '<head><link href="css/cyjsNetworkViewer_Style.css" rel="stylesheet" />' +
                '<meta charset=utf-8 />'+
                '<script src="libs/jquery-1.11.2.min.js"></script>'+
                '<script src="libs/cytoscape.min.js"></script>'+
//                '<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>'+
//		'<script src="http://cytoscape.github.io/cytoscape.js/api/cytoscape.js-latest/cytoscape.min.js"></script>'+
                '<script src="libs/jquery-ui.js"></script>'+
                '<script src="libs/cytoscape-cxtmenu.js"></script>'+
                '<script src="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.min.js"></script>'+
                '<link href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.min.css" rel="stylesheet" type="text/css" />'+
                '<script src="https://cdn.rawgit.com/cytoscape/cytoscape.js-qtip/70964f0306e770837dbe2b81197c12fdc7804e38/cytoscape-qtip.js"></script>'+
                '<script src="http://medialize.github.io/jQuery-contextMenu/src/jquery.contextMenu.js" type="text/javascript"></script>'+
                '<link href="http://medialize.github.io/jQuery-contextMenu/src/jquery.contextMenu.css" rel="stylesheet" type="text/css" />'+
                '<script src="http://medialize.github.io/jQuery-contextMenu/src/jquery.ui.position.js" type="text/javascript"></script>'+
                '<script src="libs/cola.v3.min.js"></script>'+
                '<script src="libs/cola.adaptor.js"></script>'+
                '<script src="libs/arbor.js"></script>'+
                '<script src="libs/dagre.js"></script>'+
                '<script src="libs/springy.js"></script>'+
                '<script type="text/javascript" src="config/url_mappings.json"></script>'+
                '<script src="javascript/networkView_cyjs.js"></script>'+
                '<title>Network View - Cytoscape.js</title></head>';
        var cyjsBody= '<body>';
        var cyjsNetworkButton= '<b>Network Graph using CytoscapeJS</b><br/><br/><div>'+
                'Show Network: <input type="button" id="showNetGraph" value="Show Network" onclick="generateNetworkGraph("'+ json_File +'");" title="Show network graph using cytoscapeJS">';
        var cyjsLayouts= '</div><hr><div id=layouts_container><table id=layouts_table cellspacing=1>'+
                '<thead><u>Layouts:</u></thead><tr>'+
                    '<td align=center><input type="radio" name="layoutButton" id="default" value="Default layout" onclick="setDefaultLayout();" checked>Default (CoLa)</td>'+
                    '<td align=center><input type="radio" name="layoutButton" id="circle" value="Circle layout" onclick="setCircleLayout();">Circular</td>'+
                    '<td align=center><input type="radio" name="layoutButton" id="arbor" value="Arbor layout" onclick="setArborLayout();">Arbor</td>'+
                    '<td align=center><input type="radio" name="layoutButton" id="cose" value="Cose layout" onclick="setCoseLayout();">Cose</td>'+
                    '<td align=center><input type="radio" name="layoutButton" id="dagre" value="Tree layout" onclick="setTreeLayout();">Tree</td>'+
                    '<td align=center><input type="radio" name="layoutButton" id="breadthfirst" value="Breadthfirst layout" onclick="setBreadthfirstLayout();">Breadthfirst</td>'+
                    '<td align=center><input type="radio" name="layoutButton" id="springy" value="Springy layout" onclick="setSpringyLayout();">Springy</td>'+
                    '<td align=center><input type="radio" name="layoutButton" id="grid" value="Grid layout" onclick="setGridLayout();">Grid</td>'+
                '</tr></table></div><br/>';
        var cyjsFunctionality= '<div>Annotate relations by attribute: <input type="button" value="Annotate" disabled onclick="annotateByAttribute();" title="Annotate relations by any attribute">'+
                    'Search for concept: <input type="text" id="txtSearch" placeholder="Search..." /> <input type="button" value="Search" onclick="findConcept(document.getElementById("txtSearch").value);" title="Search by concept name">'+
                    'Reset graph: <input type="button" value="Reset" onclick="resetGraph();" title="Re-fit, pan and zoom the graph">'+
                '</div><br/><div>'+
                    'Show concept neighbourhood: <input type="button" value="Show Neighbourhood" onclick="showNeighbourhood();" title="Display concept neighbourhood">'+
                    'Export graph JSON: <input type="button" value="Export JSON" onclick="exportAsJson();" title="Export the Network graph as a JSON object and show it in a new Tab">'+
                    'Export graph Image: <input type="button" value="Export Image" onclick="exportAsImage();" title="Export the Network graph as a .png image (generated below)">'+
                '</div><br/>';
        var cyjsGraph= '<div id="cy"></div><br/>';
        var cyjsItemInfoDialog= '<div id="infoDialog"></div><br/>';
        var cyjsLegend= '<div id=legend_picture><div id=legend_container><table id=legend_frame cellspacing=1>'+
                            '<tr><td align=center><img src=image/Gene.png></td>'+
                		'<td align=center><img src=image/Protein.png></td>'+
                		'<td align=center><img src=image/Pathway.png></td>'+
                		'<td align=center><img src=image/Compound.png></td>'+
                		'<td align=center><img src=image/Enzyme.png></td>'+
                		'<td align=center><img src=image/Reaction.png></td>'+
                		'<td align=center><img src=image/Publication.png></td>'+
                            '</tr><tr><td align=center><font size=1.8px>Gene</font></td>'+
                		'<td align=center><font size=1.8px>Protein</font></td>'+
                		'<td align=center><font size=1.8px>Pathway</font></td>'+
                		'<td align=center><font size=1.8px>SNP</font></td>'+
                		'<td align=center><font size=1.8px>Enzyme</font></td>'+
                		'<td align=center><font size=1.8px>Reaction</font></td>'+
                		'<td align=center><font size=1.8px>Publication</font></td>'+
                            '</tr><tr><td align=center></td></tr><tr>'+
                                '<td align=center><img src=image/Phenotype.png></td>'+
                		'<td align=center><img src=image/Bioogical_proccess.png></td>'+
                		'<td align=center><img src=image/Cellular_component.png></td>'+
                		'<td align=center><img src=image/Protein_domain.png></td>'+
                		'<td align=center><img src=image/Trait_ontology.png></td>'+
                		'<td align=center><img src=image/Molecular_function.png></td>'+
                		'<td align=center><img src=image/Enzyme_clasification.png></td>'+
                            '</tr><tr><td align=center><font size=1.8px>Phenotype</font></td>'+
                		'<td align=center><font size=1.8px>Biol. Proccess</font></td>'+
                		'<td align=center><font size=1.8px>Cell. Component</font></td>'+
                		'<td align=center><font size=1.8px>Protein Domain</font></td>'+
                		'<td align=center><font size=1.8px>Trait Ontology</font></td>'+
                		'<td align=center><font size=1.8px>Mol. Function</font></td>'+
                		'<td align=center><font size=1.8px>Enzyme Classification</font></td>'+
                            '</tr></table></div></div><br/><br/>';
        var cyjsItemInfo= '<div id="itemInfo" class="infoDiv">'+
                        '<table id="itemInfo_Table" class="infoTable" cellspacing=1>'+
                            '<thead><th>Item Info:</th><th>information about selected concept(s) or relation(s)</th></thead>'+
                            '<tbody></tbody></table></div><br/><br/>';
        var cyjsFooter= '<div id="pageFooter"><b>QTLNetMiner</b>: Network View example using Cytoscape.js</div>';
        var cyjsPageEnd= '</body></html>';

        console.log("NetworkButton code: "+ cyjsNetworkButton +"\n"+"Other functionality (Search) code: "+ cyjsFunctionality);
        // Show the new Network Viewer in a new window.
        cyjs_networkView.document.write(cyjsPageStart);
        cyjs_networkView.document.write(cyjsHead); // required scripts and libraries
        cyjs_networkView.document.write(cyjsBody);
        cyjs_networkView.document.write(cyjsNetworkButton);
        cyjs_networkView.document.write(cyjsLayouts); // layout options
        cyjs_networkView.document.write(cyjsFunctionality); // other functionality
        cyjs_networkView.document.write(cyjsGraph); // the cytoscapeJS graph container
        cyjs_networkView.document.write(cyjsItemInfoDialog);
        cyjs_networkView.document.write(cyjsLegend); // graph legend
        cyjs_networkView.document.write(cyjsItemInfo); // item info
        cyjs_networkView.document.write(cyjsFooter);
        cyjs_networkView.document.write(cyjsPageEnd);
        }
    catch(err) { 
          var errorMsg= err.stack(); 
          console.log("Error: \n"+"Details: "+ errorMsg);
         }
  }
