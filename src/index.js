import Sigma from "sigma";
import * as nodeUtils from './initUtil.js';

var i, s, g = {nodes: [], edges: []};

                    
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
            minArrowSize: 10,
            minNodeSize: 1,
            maxNodeSize: 10,
            minEdgeSize: 10,
            maxEdgeSize: 20,
            enableEdgeHovering: true,
            // edgeHoverSizeRatio: 5
        }
    });

    // Bind the events:
    s.bind('clickNode', function(e) { 
        openNav();
        document.getElementById('node-info').innerHTML = "<a href='javascript:void(0)' class='closebtn' id='closebtn' onclick='closeNav()'>×</a><a>" + e.data.node.label + "</a>";

        // console.log(e.type, e.data.node.label, e.data.captor);
    });

    //double clicking on nodes does not zoom in
    s.bind('overNode', function(e) {
        s.settings('doubleClickEnabled', false);
      });
      
    //double clicking out of nodes does zoom in
    s.bind('outNode', function(e) {
        s.settings('doubleClickEnabled', true);
    });

    function openNav() {
        document.getElementById("node-info").style.width = "250px";
        document.getElementById("graph-container").style.marginLeft = "250px";
      }
      
      function closeNav() {
        document.getElementById("node-info").style.display = "none";
        document.getElementById("node-info").style.width = "0";
        
        document.getElementById("graph-container").style.marginLeft= "0";
      }
}