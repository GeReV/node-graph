import * as d3 from 'd3';

import styles from './styles.scss';

import Node from '../Node';

function addEventListener(target, type, fn) {
  target.addEventListener(type, fn, false);
}

export default class NodeGraph {
  selectDragNode(target, identifier) {
    while (target !== this.node) {
      if (target.classList.contains(identifier)) {
        return target;
      }

      target = target.parentNode;
    }

    return null;
  }

  createDrag(e) {
    let target;

    target = this.selectDragNode(e.target, Node.input);

    if (target) {
      const graph = this.graph;

      const rect = target.getBoundingClientRect();

      const path = graph.selectAll('path').data([1]).enter().append('path').attr('class', styles.path);

      console.log(path);

      return {
        start() {
          //
        },
        stop() {
          path.remove();
        },
        move(x, y) {
          path.attr(
            'd',
            () => `M${this.initPositionX},${this.initPositionY}C${this.initPositionX - 100},${this.initPositionY} ${x + 100},${y} ${x},${y}`
          );
        },
        initMouseX: e.clientX,
        initMouseY: e.clientY,
        initPositionX: rect.x,
        initPositionY: rect.y + rect.height / 2,
      };
    }

    target = this.selectDragNode(e.target, Node.identifier);

    if (target) {
      return {
        start() {
          target.classList.add('Node-dragging');
        },
        stop() {
          target.classList.remove('Node-dragging');
        },
        move(x, y) {
          target.positionX = x;
          target.positionY = y;
          target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        },
        initMouseX: e.clientX,
        initMouseY: e.clientY,
        initPositionX: target.positionX || 0,
        initPositionY: target.positionY || 0,
      };
    }

    return null;
  }

  render(container) {
    this.node = document.createElement('div');
    this.node.classList.add(styles.nodegraph);

    addEventListener(this.node, 'mousedown', e => {
      this.drag = this.createDrag(e);

      if (this.drag) {
        this.drag.start();

        e.preventDefault();
        e.stopPropagation();
      }
    });
    addEventListener(this.node, 'mouseup', e => {
      if (this.drag) {
        this.drag.stop();
        this.drag = null;

        e.preventDefault();
        e.stopPropagation();
      }
    });
    addEventListener(this.node, 'mousemove', e => {
      const dragging = this.drag;

      if (dragging) {
        const dX = e.clientX - dragging.initMouseX - this.node.offsetLeft;
        const dY = e.clientY - dragging.initMouseY - this.node.offsetTop;

        const positionX = dragging.initPositionX + dX + this.node.offsetLeft;
        const positionY = dragging.initPositionY + dY + this.node.offsetTop;

        dragging.move.call(dragging, positionX, positionY);
      }
    });

    const node = new Node();

    node.render(this.node);

    container.appendChild(this.node);

    this.graph = d3.select(this.node).append('svg')
    .attr('class', styles.graph)
    .attr('width', '100%')
    .attr('height', '100%');
  }
}
