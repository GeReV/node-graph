import { select, event } from 'd3-selection';
import { zoom } from 'd3-zoom';

import styles from './styles.scss';

import Node from '../Node';

export default class NodeGraph {
  constructor(container) {
    this.container = container;

    this.render();
  }

  render() {
    this.node = document.createElement('div');
    this.node.classList.add(styles.nodegraph);

    const z = zoom()
      .scaleExtent([0.25, 10])
      .on('zoom', this.zoomed.bind(this));

    const node = new Node();

    node.render(this.node);

    this.container.appendChild(this.node);

    select(this.container).call(z);

    this.graph = select(this.node)
      .append('svg')
      .attr('class', styles.graph)
      .attr('width', '100%')
      .attr('height', '100%');
  }

  zoomed() {
    this.node.style.transform = `translate(${event.transform.x}px, ${event.transform.y}px) scale(${event.transform.k})`;
  }
}
