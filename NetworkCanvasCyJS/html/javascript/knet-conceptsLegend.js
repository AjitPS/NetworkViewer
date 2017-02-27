  // Dynamically populate interactive concept legend.
  function populateConceptLegend() {
      var cy= $('#cy').cytoscape('get');
      var conNodes= cy.nodes();
      var conceptTypes= []; // get a unique Array with all concept Types in current network.
      conNodes.forEach(function( ele ) {
          if(conceptTypes.indexOf(ele.data('conceptType')) === -1 ) {
             conceptTypes.push(ele.data('conceptType'));
            }
      });
//      console.log("\t conceptTypes in this network: "+ conceptTypes +"\n");

      var conceptsHashmap= {};
      conceptTypes.forEach(function(conType,index){
          var conCount= conNodes.filterFn(function( ele ) {
              return ele.data('conceptType') === conType;
             }).size();
          // Push count of concepts of this Type to concepts hashmap
          conceptsHashmap[conType]= conCount;
      });
/*      console.log("conceptsHashmap: ");
      for(var con in conceptsHashmap) { console.log(con +": "+ conceptsHashmap[con]); }*/

      // update knetLegend.
      var knetLegend= '<b><u>Show by type:</u></b> ';
   //   var cnt= 0;
      // Show concept Type icons (with total count displayed alongside).
      for(var con in conceptsHashmap) {
          knetLegend= knetLegend +'<input type="image" id="'+ con +/*'" class="knetLegend_'+ con +*/'" title="Show All '+ con +'(s)" src="image_legend/'+ con +'.png'+'" style="vertical-align:middle" onclick="showByType(this.id);">'+ conceptsHashmap[con] +'&nbsp;&nbsp;&nbsp;';
        /*  cnt= cnt+1;
          if(cnt%10===0) { knetLegend= knetLegend +'<br/>'; }*/
         }
         console.log(knetLegend);
	$('#knetLegend').html(knetLegend); // update knetLegend
   }

 function showByType(conType) {
  var cy= $('#cy').cytoscape('get');
  console.log("ShowByType: "+ conType);
  cy.nodes().forEach(function( ele ) {
      if(ele.data('conceptType') === conType) {
         ele.removeClass('HideThis');
         ele.addClass('ShowItAll');
      //   ele.connectedEdges().connectedNodes().show();
      //   ele.connectedEdges().show();
         showLinks(ele);
        }
    });
  updateKnetStats(); // Refresh network Stats.
 }