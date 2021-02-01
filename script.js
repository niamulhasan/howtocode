var margin = {
    top: 20,
    right: 120,
    bottom: 20,
    left: 120
},
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;

var root = {
    "name": "Way to Learn coding",
    "type": "Created with ♥ by Niamul Hasan",
    "width": 120,
    "children": [{
        "name": "Web",
        "children": [{
            "name": "Web Design",
            "type": "known as Front-end",
            "children": [{
                "name": "HTML",
                "type": "• Language",
                "level": "• Easy",
                "info": "• must learn"
            },
            {
                "name": "CSS",
                "type": "• Language",
                "level": "• Easy",
                "info": "• must learn",
                "children": [
                    {
                        "name": "CSS3",
                        "type": "• Language",
                        "level": "• Easy",
                        "info": "• must learn",
                        "children": [
                            {
                                "name": "Bootstrap",
                                "type": "• Framework",
                                "level": "• Easy",
                                "info": "• must learn"
                            },
                            {
                                "name": "Tailwind CSS",
                                "type": "• Framework",
                                "level": "• Easy",
                                "info": "• optional"
                            }
                        ]
                    },
                    {
                        "name": "SCSS",
                        "type": "• Language",
                        "level": "• Easy",
                        "info": "• optional"
                    }
                ]
            },
            {
                "name": "JavaScript",
                "type": "• Language",
                "level": "• Hard",
                "info": "• beginners should learn a little",
                "children": [
                    {
                        "name": "ES6",
                        "type": "• Language",
                        "level": "• Hard",
                        "info": "• for advanced front-end",
                        "children": [
                            {
                                "name": "Angular",
                                "type": "• FW (TypeScript)",
                                "size": 2500,
                                "level": "• Hard",
                                "info": "• advanced",
                            },
                            {
                                "name": "React Js",
                                "type": "• Framework",
                                "level": "• Hard",
                                "info": "• advanced",
                            },
                            {
                                "name": "Vue Js",
                                "type": "• Framework",
                                "level": "• Hard",
                                "info": "• advanced",
                            }
                        ]
                    }
                ]
            }
            ]
        },
        {
            "name": "Web Development",
            "color": "#ff0000",
            "width": 120,
            "size": 1500,
            "type": "known as back-end",
            "children": [
                {
                    "name": "JavaScript",
                    "type": "• Language",
                    "level": "• Hard at beginning",
                    "info": "• Choose one",
                    "children": [
                        {
                            "name": "Node Js",
                            "type": "• Runtime",
                            "level": "• Must learn",
                        }
                    ]
                },
                {
                    "name": "PHP",
                    "type": "• Language",
                    "level": "• Easy as a first language",
                    "info": "• Choose one",
                    "children": [
                        {
                            "name": "Laravel",
                            "type": "• Framework"
                        }
                    ]
                },
                {
                    "name": "Python",
                    "type": "• Language",
                    "level": "• Easy as a first language",
                    "info": "• Choose one",
                    "children": [
                        {
                            "name": "dJango",
                            "type": "• Framework"
                        }
                    ]
                },
                {
                    "name": "Ruby",
                    "type": "• Language",
                    "children": [
                        {
                            "name": "Ruby on Rails",
                            "type": "• Framework"
                        }
                    ]
                },
                {
                    "name": "SQL",
                    "type": "• Language",
                    "level": "• Easy",
                    "info": "• Must Learn",
                },
                {
                    "name": "NoSql",
                    "type": "• Language",
                    "level": "• Easy but a bit different",
                    "info": "• Must Learn",
                    "children": [
                        {
                            "name": "Firebase"
                        },
                        {
                            "name": "MongoDB"
                        }
                    ]
                }
            ]
        }
        ]
    },
    {
        "name": "Android",
        "children": [
            {
                "name": "Android Studio",
                "width": 90,
                "children": [
                    {
                        "name": "XML"
                    },
                    {
                        "name": "Kotlin"
                    },
                    {
                        "name": "Java"
                    }
                ]
            },
            {
                "name": "Flutter",
                "children": [
                    {
                        "name": "Dart"
                    }
                ]
            },
            {
                "name": "React Native"
            }
        ]
    },
    {
        "name": "iOS",
        "children": [
            {
                "name": "xCode",
                "children": [
                    {
                        "name": "Swift"
                    }
                ]
            }
        ]
    }
    ]
};

var i = 0,
    duration = 750,
    rectW = 70,
    rectH = 30;

var tree = d3.layout.tree().nodeSize([100, 40]);
var diagonal = d3.svg.diagonal()
    .projection(function (d) {
        return [d.x + (d.width ? d.width : rectW) / 2, d.y + rectH / 2];
    });

var svg = d3.select("#body").append("svg").attr("width", 1000).attr("height", 1000)
    .call(zm = d3.behavior.zoom().scaleExtent([1, 3]).on("zoom", redraw)).append("g")
    .attr("transform", "translate(" + 350 + "," + 20 + ")");

//necessary so that zoom knows where to zoom and unzoom from
zm.translate([350, 20]);

root.x0 = 0;
root.y0 = height / 2;

function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

root.children.forEach(collapse);
update(root);

d3.select("#body").style("height", "800px");

function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
        d.y = d.depth * 180;
    });

    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function (d) {
            return d.id || (d.id = ++i);
        });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + source.x0 + "," + source.y0 + ")";
        })
        .on("click", click);

    nodeEnter.append("rect")
        .attr("width", function (d) { return d.width ? d.width : rectW; })
        .attr("height", rectH)
        .attr("stroke", "#4cb7c3")
        .attr("stroke-width", 1)
        .style("fill", function (d) {
            return d._children ? "#42c9b5" : "#1f2029";
        });

    nodeEnter.append("text")
        .attr("x", function (d) { return d.width ? d.width / 2 : rectW / 2; })
        .attr("y", rectH / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.name;
        });

    nodeEnter.append("text")
        .attr("x", function (d) { return d.width ? d.width / 2 : rectW / 2; })
        .attr("y", rectH + 10)
        .attr("fill", "#fff")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .text(function (d) {
            return d.type;
        });
    nodeEnter.append("text")
        .attr("x", function (d) { return d.width ? d.width / 2 : rectW / 2; })
        .attr("y", rectH + 24)
        .attr("fill", "#fff")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .text(function (d) {
            return d.level;
        });
    nodeEnter.append("text")
        .attr("x", function (d) { return d.width ? d.width / 2 : rectW / 2; })
        .attr("y", rectH + 38)
        .attr("fill", "#fff")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .text(function (d) {
            return d.info;
        });

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    nodeUpdate.select("rect")
        .attr("width", function (d) { return d.width ? d.width : rectW; })
        .attr("height", rectH)
        .attr("stroke", "#ed7b40")
        .attr("stroke-width", 1)
        .attr('color', 'red')
        .style('border-radius', '5px')
        .style("fill", function (d) {
            return d._children ? "#46485d" : "#ed7b40";
        });


    nodeUpdate.select("text")
        .style("fill-opacity", 1)
        .style("fill", function (d) {
            return d._children ? "#4cb8c2" : "#fff";
        })
        .style('font-weight', function (d) { return d._children ? 'bold' : 'normal' })

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + source.x + "," + source.y + ")";
        })
        .remove();

    nodeExit.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        //.attr("width", bbox.getBBox().width)""
        //.attr("height", bbox.getBBox().height)
        .attr("stroke", "white")
        .attr("stroke-width", 1);

    nodeExit.select("text");

    // Update the links…
    var link = svg.selectAll("path.link")
        .data(links, function (d) {
            return d.target.id;
        });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
        .attr("d", function (d) {
            var o = {
                x: source.x0,
                y: source.y0
            };
            return diagonal({
                source: o,
                target: o
            });
        });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
            var o = {
                x: source.x,
                y: source.y
            };
            return diagonal({
                source: o,
                target: o
            });
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}

//Redraw for zoom
function redraw() {
    //console.log("here", d3.event.translate, d3.event.scale);
    svg.attr("transform",
        "translate(" + d3.event.translate + ")"
        + " scale(" + d3.event.scale + ")");
}