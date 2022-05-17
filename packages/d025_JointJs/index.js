// import 'jointjs';

(function render(){
    const namespace = joint.shapes;
    let graph = new joint.dia.Graph({}, { cellNamespace: namespace });
    let paper = new joint.dia.Paper({
        el: document.getElementById('jointdemo'),
        model: graph,
        width: 600,
        height: 100,
        gridSize: 1,
        cellViewNamespace: namespace,
    });

    let rect = new joint.shapes.standard.Rectangle();
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.attr({
        body: {
            fill: 'blue'
        },
        label: {
            text: 'Hello',
            fill: 'white'
        }
    });
    rect.addTo(graph);

    let rect2 = rect.clone();
    rect2.translate(300, 0);
    rect2.attr('label/text', 'World!');
    rect2.addTo(graph);

    let link = new joint.shapes.standard.Link();
    link.source(rect);
    link.target(rect2);
    link.addTo(graph);
}())
