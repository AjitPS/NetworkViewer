/*
 * Function
 * Generates the new lightweight Network graph, using cytoscapeJS.
 * @author: Ajit Singh.
 */
function generateCyJSNetwork(jsonFileName){
    var json_File= jsonFileName; // the JSON file generated on the server.
    console.log("generateCyJSNetwork>> jsonFile: "+ json_File);

  //  try {
         var cyjs_networkView= window.open("NewNetworkViewer.html", "Network View", 
                    "height=600, width=1200, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, titlebar=yes, directories=yes, status=yes");
         var networkDoc= cyjs_networkView.document;

         var cyjsPageStart= '<html>';
         var cyjsHead= /*'<head>'*/ '<link href="css/cyjsNetworkViewer_Style.css" rel="stylesheet" />' +
                '<meta charset=utf-8 />'+
                '<script src="libs/jquery-1.11.2.min.js"></script>'+
                '<script src="libs/cytoscape.min.js"></script>'+
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
                '<title>Network View - Cytoscape.js</title>'; // </head>';
        var cyjsBody= '<body>';
        var cyjsNetworkButton= '<b>Network Graph using CytoscapeJS</b><br/><br/><div>'+
                'Show Network: <input type="button" id="showNetGraph" value="Show Network" onclick="generateNetworkGraph();" title="Show network graph using cytoscapeJS">';
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


        // Using DOPM manipulation via createELement and appendChild instead of the insecure document.write().
//        networkDoc.open();

//        cyjs_networkView.onload= function() {
        var docHTML= networkDoc.createElement("<html></html>");
        var docHead= networkDoc.createElement("<head></head>");
        var docBody= networkDoc.createElement("<body></body");
// e.g. 1: 
/*        var node = networkDoc.createElement("LI");
        var textnode = networkDoc.createTextNode("Water");
        node.appendChild(textnode);
        document.getElementById("myList").appendChild(node);
*/

// e.g. 2: 
/*        // HTML string
        var s = '<li>text</li>';
        var div = document.createElement('div');
        div.innerHTML = s;
        var elements = div.childNodes;
*/        
        
// e.g. 3: 
/*<html>
  <head>
    <script type = "text/javascript">
      var date = new Date();
      var month = date.getMonth() + 1;
      if (month >= 3 && month <= 5)
      {
        var NewScript = document.createElement("script");
        NewScript.type = "text/javascript";
        NewScript.src = "source1.js";
        var NewStyles = document.createElement("link");
        NewStyles.rel = "stylesheet";
        NewStyles.type = "text/css";
        NewStyles.href = "css1.css";
        document.head.appendChild(NewScript);
        document.head.appendChild(NewStyles);
      }
      else
      {
        var NewScript = document.createElement("script");
        NewScript.type = "text/javascript";
        NewScript.src = "source2.js";
        var NewStyles = document.createElement("link");
        NewStyles.rel = "stylesheet";
        NewStyles.type = "text/css";
        NewStyles.href = "css2.css";
        document.head.appendChild(NewScript);
        document.head.appendChild(NewStyles);
      }
    </script>
  </head>
  <body>
  <!-- MY CONTENT GOES HERE -->
  </body>
</html>*/        
        // TO DO        
        cyjs_networkView.document.createElement("head");
        cyjs_networkView.document.createElement("body");
//        cyjs_networkView.document.body.innerHTML(cyjsPageStart);
        cyjs_networkView.document.getElementsByTagName("head")[0].innerHTML(cyjsHead); // required scripts and libraries
//        cyjs_networkView.document.body.innerHTML(cyjsBody);
        cyjs_networkView.document.body.innerHTML(cyjsNetworkButton);
        cyjs_networkView.document.body.innerHTML(cyjsLayouts); // layout options
        cyjs_networkView.document.body.innerHTML(cyjsFunctionality); // other functionality
        cyjs_networkView.document.body.innerHTML(cyjsGraph); // the cytoscapeJS graph container
        cyjs_networkView.document.body.innerHTML(cyjsItemInfoDialog);
        cyjs_networkView.document.body.innerHTML(cyjsLegend); // graph legend
        cyjs_networkView.document.body.innerHTML(cyjsItemInfo); // item info
        cyjs_networkView.document.body.innerHTML(cyjsFooter);
//        cyjs_networkView.document.body.innerHTML(cyjsPageEnd);
        cyjs_networkView.document.close();
//        };

/*        }
    catch(err) { 
          var errorMsg= err.stack(); 
          console.log("Error: \n"+"Details: "+ errorMsg);
         }*/
  }
