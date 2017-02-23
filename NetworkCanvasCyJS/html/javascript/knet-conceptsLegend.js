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
      console.log("\t conceptTypes in this network: "+ conceptTypes +"\n");

      var conceptsHashmap= {};
      conceptTypes.forEach(function(conType,index){
          var conCount= conNodes.filterFn(function( ele ) {
              return ele.data('conceptType') === conType;
             }).size();
          // Push count of concepts of this Type to concepts hashmap
          conceptsHashmap[conType]= conCount;
      });
      console.log("conceptsHashmap: ");
      for(var con in conceptsHashmap) {
          console.log(con +": "+ conceptsHashmap[con]);
         }

        // update networkLegend_container as well
//        var evidence = '<td>';
        // loop
        // get total visible and total concept count per conceptType and show concept Type icon (with total visible count displayed within) and total count next to it.
        // Make the icon a clickable image that, on click, shows a dropdown with a button to show all by type (for this concept type).
//        evidence = evidence+'<div class="evidence_item evidence_item_'+evidence_elements[0]+'" title="'+evidence_elements[0]+'" ><span class="dropdown_box_open" id="evidence_box_open_'+values[1].replace(".","_")+evidence_elements[0]+'">'+((evidence_elements.length)-1)+'</span>';
//	evidence = evidence+'</td>';
        

   }
