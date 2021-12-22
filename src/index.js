window.$ = window.jQuery = require('jquery');
import Sigma from "sigma";
import * as nodeUtils from './initUtil.js';
require('bootstrap/dist/css/bootstrap.css');
import 'bootstrap';

var i, s, g = {nodes: [], edges: []};
// $('#exampleModal').modal({
//     keyboard: false
//   })

  $('#exampleModal').on('show.bs.modal', function (e) {
    console.log("mpike");
  })
                    
/*This is a javascript function, for fetching files, you can refer here: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch */
fetch("./nodes.json")
    .then(fetchNodes)
    .then(response => nodeUtils.setNodes(response, g))
    .then(nodes => nodeUtils.setEdges(nodes, g))
    .then(initialiseSigma);

function fetchNodes(response) {
    return response.json();
}

function initialiseSigma() {
    var container = document.getElementById('graph-container');
    s = new Sigma({
        graph: g,
        
        renderer: {
            container: container,
            type: 'canvas'
        },
        settings: {
            //labels show up only when specified zoom in
            //labelThreshold: 25, 
            minArrowSize: 1,
            minNodeSize: 1,
            maxNodeSize: 10,
            minEdgeSize: 5,
            maxEdgeSize: 5,
            //enableEdgeHovering: true,
        }
    });

    // Bind the events:
    s.bind('clickNode', function(e) {
        console.log(e);
        // modal.show()
        // $('#exampleModal').modal('show');
        //$('#exampleModal').find('input[id="bookId"]').val(e.data.node.description);
        document.getElementById("title").innerHTML = e.data.node.label;
        document.getElementById("desc").innerHTML = e.data.node.description;

        // $('#exampleModal').html( "PUTSARARASRARARA" ); // my_label inside modal
        $('#exampleModal').modal('show')  
        

    });

    //if background is clicked then close the navbar
    s.bind('clickStage', function(e) {
    });

    //if edge is clicked then close the navbar
    s.bind('clickEdge', function(e) {
    });

    //double clicking on nodes does not zoom in
    s.bind('overNode', function(e) {
        s.settings('doubleClickEnabled', false);
      });
    s.bind('outNode', function(e) {
        s.settings('doubleClickEnabled', true);
    });
}