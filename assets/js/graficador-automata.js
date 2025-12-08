// Variables globales de D3
let svg, simulation, linkSelection, nodeSelection;
const width = 800,
  height = 500,
  nodeRadius = 13;

// Inicializar el gráfico (Llamar al cargar la página)
const initGraph = () => {
  const container = d3.select("#graph-container");
  container.html(""); // Limpiar

  // Hacemos el SVG responsivo al 100% del contenedor padre
  svg = container
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("background", "white")
    .style("border-radius", "10px");

  // Definir flechas
  svg
    .append("defs")
    .selectAll("marker")
    .data(["end"])
    .enter()
    .append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", nodeRadius + 5)
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", "#999");

  // Simulación
  simulation = d3
    .forceSimulation(automataData.nodes)
    .force(
      "link",
      d3
        .forceLink(automataData.links)
        .id((d) => d.id)
        .distance(180)
    )
    .force("charge", d3.forceManyBody().strength(-500))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide(40));

  // Dibujar Enlaces
  const linkGroup = svg.append("g").attr("class", "links");
  linkSelection = linkGroup
    .selectAll("path")
    .data(automataData.links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("id", (d) => `link-${d.source.id}-${d.target.id}`) // ID para animar
    .attr("fill", "none")
    .attr("stroke", "#999")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow)");

  // Dibujar Etiquetas de Enlaces
  const labelGroup = svg.append("g").attr("class", "labels");
  labelGroup
    .selectAll("text")
    .data(automataData.links)
    .enter()
    .append("text")
    .attr("dy", -5)
    .append("textPath")
    .attr("xlink:href", (d) => `#link-${d.source.id}-${d.target.id}`)
    .attr("startOffset", "50%")
    .style("text-anchor", "middle")
    .style("font-size", "10px")
    .style("fill", "#555")
    .text((d) => d.label);

  // Dibujar Nodos
  const nodeGroup = svg.append("g").attr("class", "nodes");
  nodeSelection = nodeGroup
    .selectAll("g")
    .data(automataData.nodes)
    .enter()
    .append("g")
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  // Círculo base
  nodeSelection
    .append("circle")
    .attr("r", nodeRadius)
    .attr("id", (d) => `node-${d.id}`) // ID para animar
    .attr("fill", "white")
    .attr("stroke", (d) => (d.isStart ? "#00afb9" : "#333"))
    .attr("stroke-width", (d) => (d.isStart ? 3 : 2));

  // Doble círculo para aceptación
  nodeSelection
    .filter((d) => d.isFinal)
    .append("circle")
    .attr("r", nodeRadius - 4)
    .attr("fill", "none")
    .attr("stroke", "#00afb9");

  // Texto del nodo
  nodeSelection
    .append("text")
    .attr("dy", 5)
    .attr("text-anchor", "middle")
    .style("font-family", "monospace")
    .style("pointer-events", "none")
    .text((d) => d.id);

  // Actualización (Tick)
  simulation.on("tick", () => {
    linkSelection.attr("d", (d) => {
      const r = nodeRadius + 2;
      if (d.source.id === d.target.id) {
        const x = d.source.x,
          y = d.source.y - r;
        return `M${x - 5},${y} C${x - 30},${y - 60} ${x + 30},${y - 60} ${
          x + 5
        },${y}`;
      }
      const endPoint = calculateIntersection(d.source, d.target, r);
      const dx = endPoint.x - d.source.x,
        dy = endPoint.y - d.source.y;
      const dr = Math.sqrt(dx * dx + dy * dy) * 1.5; // Curva suave
      return `M${d.source.x},${d.source.y} A${dr},${dr} 0 0,1 ${endPoint.x},${endPoint.y}`;
    });
    nodeSelection.attr("transform", (d) => `translate(${d.x},${d.y})`);
  });
}

// Auxiliares
const calculateIntersection = (source, target, radius) => {
  const dx = target.x - source.x,
    dy = target.y - source.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  return {
    x: target.x - (dx / dist) * radius,
    y: target.y - (dy / dist) * radius,
  };
}

const dragstarted = (event, d) => {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

const dragged = (event, d) => {
  d.fx = event.x;
  d.fy = event.y;
}

const dragended = (event, d) => {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

// --- FUNCIÓN DE ANIMACIÓN PÚBLICA ---
// Recibe una lista de IDs de estados: ["q0", "q1", "q2", ...]
const iluminarRecorrido = async (listaEstados) => {
  // 1. Resetear estilos previos
  d3.selectAll("circle").attr("stroke", "#333").attr("stroke-width", 2);
  d3.selectAll(".link").attr("stroke", "#999").attr("stroke-width", 2);

  if (!listaEstados || listaEstados.length === 0) return;

  // 2. Iterar e iluminar
  for (let i = 0; i < listaEstados.length; i++) {
    const estadoActual = listaEstados[i];
    const estadoSiguiente = listaEstados[i + 1];

    // Iluminar nodo actual
    const nodo = d3.select(`#node-${estadoActual}`);
    nodo
      .transition()
      .duration(200)
      .attr("stroke", "#4CAF50")
      .attr("stroke-width", 4)
      .attr("fill", "#e8f5e9");

    // Si hay un siguiente estado, iluminar la flecha que los une
    if (estadoSiguiente) {
      await new Promise((r) => setTimeout(r, 300)); // Esperar viendo el nodo

      const linkId = `#link-${estadoActual}-${estadoSiguiente}`;

      d3.select(`path[id^='link-${estadoActual}-${estadoSiguiente}']`)
        .transition()
        .duration(300)
        .attr("stroke", "#2196F3")
        .attr("stroke-width", 4);

      await new Promise((r) => setTimeout(r, 300)); // Esperar viendo la flecha

      // Apagar nodo anterior (opcional, o dejarlo prendido como "rastro")
      nodo.transition().duration(200).attr("fill", "white");

      // Apagar flecha
      d3.select(`path[id^='link-${estadoActual}-${estadoSiguiente}']`)
        .transition()
        .duration(200)
        .attr("stroke", "#999")
        .attr("stroke-width", 2);
    }
  }
}

// Función para limpiar visualmente
const limpiarGrafo = () => {
  d3.selectAll("circle")
    .attr("fill", "white")
    .attr("stroke", "#333")
    .attr("stroke-width", 2);
  d3.selectAll(".link").attr("stroke", "#999").attr("stroke-width", 2);
  // Re-pintar nodo start
  d3.select("#node-q0").attr("stroke", "black").attr("stroke-width", 3);
}

// Iniciar al cargar
document.addEventListener("DOMContentLoaded", initGraph);
