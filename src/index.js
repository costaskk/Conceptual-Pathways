import Graph from 'graphology';

import Sigma from "sigma";
// const sigma = require('sigma');

var i, s, g = {nodes: [], edges: []};
                    
/*This is a javascript function, for fetching files, you can refer here: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch */
fetch("./nodes.json")
    .then(fetchNodes)
    .then(setNodes)
    .then(setEdges)
    .then(instantiateSigma);

function fetchNodes(response) {
    return response.json();
}

function setNodes(nodes) {
    for (i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        g.nodes.push({
            id: node["id"],
            label: node["title"],
            x: node["x"],
            y: node["y"],
            size: 10,
            color: '#990000'
        });
    }
    return nodes;
}

function setEdges(nodes) {
    for (i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        node["connecting_nodes"].forEach(connecting_node => connectNodes(node["id"], connecting_node));
    };
}

function connectNodes(firstNodeId, secondNodeId) {
    g.edges.push({
        id: 'e' + firstNodeId + secondNodeId,
        source: firstNodeId,
        target: secondNodeId,
        size: 10,
        color: '#990000',
        type: 'arrow'
    });
}

function instantiateSigma() {
    s = new Sigma({
        graph: g,
        
        renderer: {
            container: document.getElementById('graph-container'),
            type: 'canvas'
        },
        settings: {
            minArrowSize: 10,
            minNodeSize: 1,
            maxNodeSize: 10,
            minEdgeSize: 0.1,
            maxEdgeSize: 2,
            enableEdgeHovering: true,
            edgeHoverSizeRatio: 2
        }
    });
}