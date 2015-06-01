/*
 * Define panes for the split panes, created using jQuery-ui-layout and handle their events.
 * @author: Ajit Singh.
 */
var myLayout;

$(document).ready(function () {
    // myLayout= $('body').layout(); -- syntax with No Options
    myLayout= $('body').layout({
        //      reference only - these options are NOT required because 'true' is the default
		closable: true,
                resizable: true,
                slidable: true, // when closed, pane can 'slide' open over other panes - closes on mouse-out
		livePaneResizing: true,

                // some resizing/toggling settings
   	        north__initClosed: true,
//	        north__initHidden: true,
//		north__slidable: false,	// OVERRIDE the pane-default of 'slidable=true'
		north__togglerLength_closed: '50%', //'100%', // toggle-button is full-width of resizer-bar
//		north__spacing_closed: 20, // resizer-bar size when closed (20= big resizer bar) (default: zero height)

//		south__resizable: false, // OVERRIDE the pane-default of 'resizable=true'
   	        south__initClosed: true,
//	        south__initHidden: true,
//		south__spacing_open: 0, // no resizer-bar when open (zero height)
//		south__spacing_closed: 20, // resizer-bar when closed (20= big resizer bar) (default: zero height)

		// some pane-size settings
   	        east__initClosed: true,
//	        east__initHidden: true,
                east__size: 400,
		east__minSize: 300,
		east__maxSize: 0.5, // 50% of layout width

                center__minWidth: 600, //800 // min. width for the center pane.
//                center__contentSelector: ".cy", // inner div to auto-size so only it scrolls, not the entire pane!
//                center__contentIgnoreSelector: "span", // 'paneSelector' for content to 'ignore' when measuring room for content

		showDebugMessages: true // log and/or display messages from debugging & testing code
               });
    
    myLayout
 	    // add event to the 'Close' button in the Item Info. pane dynamically.
            .bindButton('#btnCloseItemInfoPane', 'close', 'east')
	    // Also, add event to the 'Show' button in the Center pane dynamically.
	    .bindButton('#showItemInfoPane', 'open', 'east')
           ;

    /*
     * DISABLE TEXT-SELECTION WHEN DRAGGING (or even trying to drag.)
     * this functionality will be included in RC30.80
     */
    $.layout.disableTextSelection= function(){
      var $d= $(document), 
              s= 'textSelectionDisabled', x= 'textSelectionInitialized';

      if($.fn.disableSelection) {
         if (!$d.data(x)) // document hasn't been initialized yet
             $d.on('mouseup', $.layout.enableTextSelection ).data(x, true);
         if (!$d.data(s))
             $d.disableSelection().data(s, true);
        }
      //console.log('$.layout.disableTextSelection');
    };

    $.layout.enableTextSelection= function() {
     var $d= $(document), s= 'textSelectionDisabled';
     if($.fn.enableSelection && $d.data(s))
        $d.enableSelection().data(s, false);
     //console.log('$.layout.enableTextSelection');
    };

    $(".ui-layout-resizer")
        .disableSelection() // affects only the resizer element
	.on('mousedown', $.layout.disableTextSelection ); // affects entire document
});
