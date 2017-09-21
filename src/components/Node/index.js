import 'blissfuljs';
import { select, selectAll, event } from 'd3-selection';
import { drag } from 'd3-drag';

import styles from './styles.scss';

export default class Node {
  render(container) {
    const node = this.node = $.create('div', {
      className: styles.node,
      contents: [
        {
          tag: 'ul',
          className: styles.node_inputs,
          contents: [{ tag: 'li', className: styles.node_input }],
        },
        {
          tag: 'div',
          className: styles.node_contents,
        },
        {
          tag: 'ul',
          className: styles.node_outputs,
          contents: [{ tag: 'li', className: styles.node_output }],
        },
      ],
    });

    const boxDrag = drag()
      .on('start', this.dragstarted)
      .on('drag', this.dragged)
      .on('end', this.dragended);

    container.appendChild(this.node);

    select(this.node).call(boxDrag);

    const inputDrag = drag()
      .container(container)
      .on('start', inputDragStarted)
      .on('drag', inputDragged)
      .on('end', inputDragEnded);

    select(this.node).selectAll('.' + styles.node_input).call(inputDrag);

    function inputDragStarted() {
      event.sourceEvent.stopPropagation();

      this.path = select('svg')
        .append('path')
        .attr('stroke', '#fff')
        .attr('fill', 'none');
    }

    function inputDragged() {
      const rect = this.getBoundingClientRect();

      const contRect = container.getBoundingClientRect();

      const initX = rect.left - contRect.left;
      const initY = rect.top - contRect.top + rect.height / 2;

      this.path.attr('d', `M${initX},${initY}C${initX - 100},${initY} ${event.x + 100},${event.y} ${event.x},${event.y}`);
    }

    function inputDragEnded() {
      this.path.remove();
      this.path = null;
    }
  }

  dragstarted() {
    event.sourceEvent.stopPropagation();

    this.initX = this.x || 0;
    this.initY = this.y || 0;
    this.initMouseX = event.x;
    this.initMouseY = event.y;

    select(this).classed('dragging', true);
  }

  dragged() {
    this.x = this.initX + (event.x - this.initMouseX);
    this.y = this.initY + (event.y - this.initMouseY);

    this.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
  }

  dragended() {
    select(this).classed('dragging', false);
  }
}

Node.identifier = styles.node;
Node.input = styles.node_input;
