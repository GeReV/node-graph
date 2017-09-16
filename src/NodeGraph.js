import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import './NodeGraph.css';

import Node from './Node';

export default class NodeGraph extends Component {
  constructor() {
      super();
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.selectDragNode = this.selectDragNode.bind(this);
  }
  
  componentDidMount() {
    this.node = findDOMNode(this);
  }

  componentWillUnmount() {
    this.node = null;
  }

  selectDragNode(target) {
    while (target !== this.node) {
      if (target.classList.contains('Node')) {
        return target;
      }

      target = target.parentNode;
    }
  
    return null;
  }

  handleMouseDown = (e) => {
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
  };

  handleMouseUp = (e) => {
    if (this.dragging) {
      this.dragging.classList.remove('Node-dragging');

      this.dragging = null;

      this.initMouseX = null;
      this.initMouseY = null;

      e.preventDefault();
      e.stopPropagation();
    }
  };

  handleMouseMove = (e) => {
    const dragging = this.dragging;

    if (dragging) {
      const dX = e.clientX - this.initMouseX - this.node.offsetLeft;
      const dY = e.clientY - this.initMouseY - this.node.offsetTop;

      dragging.positionX = dragging.initPositionX + dX + this.node.offsetLeft;
      dragging.positionY = dragging.initPositionY + dY + this.node.offsetTop;

      dragging.style.transform = `translate3d(${dragging.positionX}px, ${dragging.positionY}px, 0)`;
    }
  };
  
  render() {
    return (
      <div 
        className="NodeGraph" 
        onMouseDown={this.handleMouseDown} 
        onMouseUp={this.handleMouseUp} 
        onMouseMove={this.handleMouseMove}
      >
        <Node />
        <Node />
      </div>
    );
  }
}
