import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import './Node.css';

export default class Node extends Component {
  componentDidMount() {
    this.node = findDOMNode(this);
  }

  componentWillUnmount() {
    this.node = null;
  }

  render() {
    return (
      <div className="Node">
        <ul className="Node-inputs">
            <li className="Node-input" />
            <li className="Node-input" />
        </ul>
        <div className="Node-content" />
        <ul className="Node-outputs">
            <li className="Node-output" />
        </ul>
      </div>
    );
  }
}
