import 'blissfuljs';

import styles from './styles.scss';

import Node from '../Node';

export default class NodeGraph {
  selectDragNode(target) {
    while (target !== this.node) {
      if (target.classList.contains(Node.identifier)) {
        return target;
      }

      target = target.parentNode;
    }

    return null;
  }

  render(container) {
    this.node = $.create('div', {
      className: styles.nodegraph,
      events: {
        mousedown: e => {
          const target = this.selectDragNode(e.target);

          if (target) {
            this.dragging = target;

            target.initPositionX = target.positionX || 0;
            target.initPositionY = target.positionY || 0;

            target.classList.add('Node-dragging');

            this.initMouseX = e.clientX;
            this.initMouseY = e.clientY;

            e.preventDefault();
            e.stopPropagation();
          }
        },
        mouseup: e => {
          if (this.dragging) {
            this.dragging.classList.remove('Node-dragging');

            this.dragging = null;

            this.initMouseX = null;
            this.initMouseY = null;

            e.preventDefault();
            e.stopPropagation();
          }
        },
        mousemove: e => {
          const dragging = this.dragging;

          if (dragging) {
            const dX = e.clientX - this.initMouseX - this.node.offsetLeft;
            const dY = e.clientY - this.initMouseY - this.node.offsetTop;

            dragging.positionX = dragging.initPositionX + dX + this.node.offsetLeft;
            dragging.positionY = dragging.initPositionY + dY + this.node.offsetTop;

            dragging.style.transform = `translate3d(${dragging.positionX}px, ${dragging.positionY}px, 0)`;
          }
        },
      },
    });

    const node = new Node();

    node.render(this.node);

    container.appendChild(this.node);
  }
}
