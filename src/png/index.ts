const { createCanvas } = require('canvas')

const LOAD_COLORS = [
  '#007300',
  '#008b00',
  '#678b00',
  '#8f8b00',
  '#aea81a',
  '#d4ce0a',
  '#d49e0a',
  '#d47e0a',
  '#d4640a',
  '#d4410a',
  '#cf1e0a',
]

export default function png(data) {
  const canvas = createCanvas(1000, 1000);
  const ctx = canvas.getContext('2d');
  const links = prepare(data);
  ctx.lineWidth = 5;
  links.forEach(({ load, points }) => {
    ctx.strokeStyle = LOAD_COLORS[load];
    ctx.beginPath()
    points.forEach(({ x, y }, i) => {
      ctx.lineTo(x, y)
      if (i!==0) {
        ctx.stroke()
      }
    })
    ctx.closePath()
  })
  return canvas.toDataURL('image/png')
}

function normal(min, max, val) {
  return Math.ceil(980 * (val - min) / (max - min)) + 10;
}

function prepare(data) {
  const { graph, loads } = data;
  const links = graph.links;
  let minX = 1e100;
  let minY = 1e100;
  let maxX = 0;
  let maxY = 0;
  links.forEach((link) => {
    link.geometry.coordinates.forEach(([x, y]) => {
      minX = Math.min(minX, x)
      minY = Math.min(minY, y)
      maxX = Math.max(maxX, x)
      maxY = Math.max(maxY, y)
    })
  });
  return links.map((link) => {
    const loadItem = loads.find(({ link_id }) => link.id === link_id); 
    const load = loadItem ? loadItem.load : 0;
    return {
      load,
      points: link.geometry.coordinates.map(coord => {
        return {
          x: normal(minX, maxX, coord[0]),
          y: normal(minY, maxY, coord[1]),
        }
      })
    }
  });
}