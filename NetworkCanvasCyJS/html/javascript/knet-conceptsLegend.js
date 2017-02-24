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
      for(var con in conceptsHashmap) {
          console.log(con +": "+ conceptsHashmap[con]);
         }*/

      // update networkLegend_container.
      var conStats= "";
      var knetLegend= "<div id='knetLegend'>";
      // Show concept Type icons (with total count displayed within).
      var cnt= 0;
      for(var con in conceptsHashmap) {
          knetLegend= knetLegend +'<div class="knetLegend_'+ con +'" title="'+ con +'">'+ conceptsHashmap[con] +"</div>";
          conStats= conStats + con +": "+ conceptsHashmap[con] +", \t\t";
          cnt= cnt+1;
          if(cnt%8===0) { knetLegend= knetLegend+ '<br/>'; }
         }
      knetLegend= knetLegend +"</div>";
//      $('#networkLegend_container').empty();
//      $('#networkLegend_container').replace(knetLegend);
	$('#countsLegend span').text(conStats.substring(0,conStats.length-1)); // update

//        var evidence = '<td>';
        // Show concept Type icons (with total count displayed within).
        // Make the icon a clickable image that, on click, shows a dropdown with a button to show all by type (for this concept type).
//        evidence = evidence+'<div class="evidence_item evidence_item_'+evidence_elements[0]+'" title="'+evidence_elements[0]+'" ><span class="dropdown_box_open" id="evidence_box_open_'+values[1].replace(".","_")+evidence_elements[0]+'">'+((evidence_elements.length)-1)+'</span>';
//	evidence = evidence+'</td>';
        

   }
