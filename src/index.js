import Sigma from "sigma";
import * as nodeUtils from './initUtil.js';
import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

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
            labelThreshold: 25, 
            //drawLabels: true,
            minArrowSize: 10,

            minNodeSize: 1,
            maxNodeSize: 10,
            minEdgeSize: 10,
            maxEdgeSize: 15,
            enableEdgeHovering: true,
            // edgeHoverSizeRatio: 5
        }
    });

    //counter of clicks on nodes
    var count =0;
    //Variable to check labels
    var label = 0;
    // Bind the events:
    s.bind('clickNode', function(e) { 
        //When clicking on node open navigation sidebar
        openNav();

        //Count number of subsequent clicks on same node
        if (e.data.node.label == label) {
            //if same node is clicked add to count
            count++;
            //Label is the node label
            label = e.data.node.label;

            //console.log(count+" "+label);
        }
        else {
            //if a new node is clicked restart count
            count = 0;
            //Label is the node label
            label = e.data.node.label;
        }

        //if same node is clicked more than one subsequent times then close the nav and restart label and count
        if (count>0) {
            closeNav();
            label = 0;
            count = 0;
        }
       
        //var id = e.data.node.label;
        document.getElementById('node-info').innerHTML = "<a href='javascript:void(0)' class='closebtn' id='closebtn' onclick='closeNav()'>×</a><div class='search-container'><form action='#'><input type='text' placeholder='Search..' name='search' style='width:75%;'><button type='submit'><i class='fa fa-search'></i></button></form></div><a>" + e.data.node.label + "</a>";
        
        
        //count++;
        
        // console.log(e.type, e.data.node.label, e.data.captor);
    });

    //if background or edge is clicked then close the navbar
    s.bind('click', function(e) {

        closeNav();
    }); 
    count = 0;
    
    //double clicking on nodes does not zoom in
    s.bind('overNode', function(e) {
        s.settings('doubleClickEnabled', false);
      });
      
    //double clicking out of nodes does zoom in
    s.bind('outNode', function(e) {
        s.settings('doubleClickEnabled', true);
    });

    

    function openNav() {
        //document.getElementById("node-info").style.display = "";
        document.getElementById("node-info").style.width = "250px";
        document.getElementById("graph-container").style.marginLeft = "250px";
      }
      
      function closeNav() {
        //document.getElementById("node-info").style.display = "none";
        //document.getElementById("closebtn").style.display = "none";
        document.getElementById("node-info").style.width = "0";
        
        document.getElementById("graph-container").style.marginLeft= "0";
      }
}