@author Ajit Singh [Rothamsted Research]

@description A network viewer for visualizing directed network graphs implemented using CytoscapeJS along with its cxtmenu plugin, JQuery UI, Qtip, event handlers and layout libraries such as CoLa, Arbor, dagre, springy & Cose. The example, as of 01/03/2015, illustrates key features of cytoscapeJS for network view such as:

* Nodes (concepts) and Edges (relations) using custom data, shape, size and colour.
* CoLa layout (a force-directed layout using the CoLa algorithm, similar to the Gem layout in Ondex Web).
* A circular context menu using the cytoscape cxtmenu plugin. [Radial Sub-menus added to cxtmenu plugin in Dec. 2014, will be added to this example soon]
* Event handling on node and edge elements.
* Show all/ hide elements (nodes or edges).
* Selecting multiple elements using Shift + click. The selections made can be displayed via the context menu --> "Show selections" which shows a list of all the selected elements in a JQuery UI dialog.
* Panning (dragging) the entire network via a mouse drag event.
* Item Info. dialog pop up upon clicking a node or edge and selecting "Item Info." from the circular context menu.
* All nodes & edges data is retrieved from a file containing data in JSON format in multiple JSON objects.


### New features [17-04-2015]:

* Code now deployed on local GlassFish server to replicate the Ajax GET process as in production software.
* Node shape and colour is now not restricted to those available in CytoscapeJS. Instead, nodes use real-life images which can be substituted with actual images for genes, enzymes, proteins, etc. in the future.
* Other layouts have also been implemented including force-directed algorithm-based layouts: CoLa, Arbor, Springy, Cose and Dagre (Tree) and basic layouts such as circular and breadthfirst. Users now have the CoLa layout set as default but can choose and toggle between other layouts to have their Network Graph refreshed dynamically.
* "Hide by Type" functionality now added,in addition to the individual "Hide" functionality,to now allow users to hide a group of concepts (nodes) of similar "Concept Type",e.g.,hiding all proteins at once.
* "Show neighbourhood" functionality now added,in addition to the "Show All" functionality,to now allow users to re-display all the nodes and relations immediately connected to a particular concept (node).
* "Search" functionality now added to allow users to search for a concept (node) by name and all the matches found are then highlighted in the Network Graph.
* "Export PNG" functionality now added to allow users to save the generated Network Graph as an image which is displayed in .png format in a new browser pop-up window.
* "Export JSON" functionality now added to allow users to save the generated Network Graph's JSON data which is generated in a new browser pop-up window.
* "Reset" feature added in the circular context menu to allow users to re-size (pan and center) and re-render the Network Graph.
* Graph generated in a new window and users can tweak the code to choose the source JSON file.
* Item Info. table added which displays detailed metadata about a node/ edge (including external url's and various attribute scores) when right clicked.


### New features [02-06-2015]:

* All layouts now only use the visible graph elements (nodes & edges) while rendering. Showing or hiding elements re-renders the layout automatically with the now-visible elements. This also increases initialisation performance for large networks with many initially-hidden elements.
* Item Info. table/ window re-designed using Split Panes,via jquery-ui-layout,that enable users to display or hide the north, east and south Panes while having only the network (center pane) visible by default.
* Code for handling Touch gestures modified to enable Touch-based gesture recognition and allow users to use this Network View component on tablets and other touch devices.
* New Concentric and Spread layouts (using foograph and rhill-voronoi-core) have been implemented.
* WebCola, Arbor, Springy and Cose layouts fixed to enable better clustering of connected nodes. 
* "Relayout" feature added to allow users to refresh the layout.
* Node shape and colour reverted to using options available in CytoscapeJS for better performance for larger networks. New node types added (QTL and Scaffold).
* Toggle layout animation on/ off feature added (useful for faster rendering in case the network graph is too large).


### Other features currently under development:

* Radial sub-menus yet to de developed for the circular context menu.
* "Annotate edges by attribute" feature which will allow users to re-size relations (edges) based on a particular attribute (such as Score, z-index, P-value, etc.).
* Item Info. window: Modify to allow multi-select nodes/ edges and view their Item Info. in a comparison table. 
* Show/ Hide labels feature (for nodes and edges) yet to be added.
