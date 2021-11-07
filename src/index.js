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
            maxNodeSize: 20,
            minEdgeSize: 30,
            maxEdgeSize: 30,
            enableEdgeHovering: true,
            // edgeHoverSizeRatio: 5
        }
    });
}