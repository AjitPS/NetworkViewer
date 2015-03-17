# NetworkViewer
NetworkView demo

@author Ajit Singh [Rothamsted]

@description A network view example implemented using CytoscapeJS along with its cxtmenu plugin, JQuery UI, Qtip, event handlers and layout libraries such as CoLa, Arbor, dagre, springy & Cose. The example, as of 01/03/2015, illustrates key features of cytoscapeJS for network view such as:

1) Nodes (concepts) and Edges (relations) using custom data, shape, size and colour.
2) CoLa layout (a force-directed layout using the CoLa algorithm, similar to the Gem layout in Ondex Web).
3) A circular context menu using the cytoscape cxtmenu plugin. [Radial Sub-menus added to cxtmenu plugin in Dec. 2014, will be added to this example soon]
4) Event handling on node and edge elemnts.
5) Show all/ hide elements (nodes or edges).
6) Selecting multiple elements using Shift + click. The selections made can be displayed via the context menu --> "Show selections" which shows a list of all the selected elements in a JQuery UI dialog.
7) Panning (dragging) the entire network via a mouse drag event.
8) Item Info. dialog pop up upon clicking a node or edge and selecting "Item Info." from the circular context menu.
& more.
9) All nodes & edges data is retrieved from a file containing data in JSON format in multiple JSON objects.

New features [17-03-2015]:
1) Code now deployed on local GlassFish server to replicate the javascript and jquery GET process as in production software.
2) Node shape and colour is now not restricted to those available in CytoscapeJS. Instead, nodes use real-life images which can be substituted with actual images for genes, enzymes, proteins, etc. in the future.
3) Other layouts have also been implemented including force-directed algorithm-based layouts: CoLa, Arbor, Springy, Cose and Dagre (Tree) and basic layouts such as circular and breadthfirst. Users now have the CoLa layout set as default but can choose and toggle between other layouts to have their Network Graph refreshed dynamically.
4) "Hide by Type" functionality now added,in addition to the individual "Hide" functionality,to now allow users to hide a group of concepts (nodes) of similar "Concept Type",e.g.,hiding all proteins at once.
5) "Show neighbourhood" functionality now added,in addition to the "Show All" functionality,to now allow users to re-display all the nodes and relations immediately connected to a particular concept (node).
6) "Search" functionality now added to allow users to search for a concept (node) by name and all the matches found are then highlighted in the Network Graph.
7) "Export PNG" functionality now added to allow users to save the generated Network Graph as an image which is displayed in .png format in a new browser pop-up window.
8) "Export JSON" functionality now added to allow users to save the generated Network Graph's JSON data which is generated in a new browser pop-up window.
9) "Reset" feature added in the circular context menu to allow users to re-size (pan and center) and re-render the Network Graph.


Other features currently under development:
1) Modifying the Touch API to enable "taphold"/ additive events which will enable Touch-based gesture recognition and allow users to use this Network View component on tablets and outher touch devices.
2) Item Info. window under development to allow users to click concept(s) or relation(s) and get all its metadata (including external url's) in a new <div>. 
3) "Annotate" feature which will allow users to re-size relations (edges) based on a particular attribute (such as Score, z-index, P-value, etc.).
4) Radial sub-menus yet to de developed for the circular context menu.
5) Show/ Hide labels feature (for nodes and edges) yet to be added.
