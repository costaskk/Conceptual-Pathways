const BLUE = "#33ccff";

export function setNodes(nodes, g) {
    for (let i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        g.nodes.push({
            id: node["id"],
            label: node["title"],
            x: node["x"],
            y: node["y"],
            size: 10,
            color: node["colour"],
            description: node["description"]
        });
    }
    return nodes;
}

export function setEdges(nodes, g) {
    for (let i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        node["connecting_nodes"].forEach(connecting_node => connectNodes(node["id"], connecting_node, g));
    };
}

export function connectNodes(firstNodeId, secondNodeId, g) {
    g.edges.push({
        id: 'e' + firstNodeId + secondNodeId,
        source: firstNodeId,
        target: secondNodeId,
        size: 15,
        color: BLUE,
        type: 'line'
    });
}