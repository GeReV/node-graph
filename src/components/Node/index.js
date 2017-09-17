import 'blissfuljs';

import styles from './styles.scss';

export default class Node {
  render(container) {
    this.node = $.create('div', {
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

    container.appendChild(this.node);
  }
}

Node.identifier = styles.node;
