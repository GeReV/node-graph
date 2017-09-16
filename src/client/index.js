import NodeGraph from '../components/NodeGraph';

const root = document.querySelector('#root');

// if (module.hot) {
//   module.hot.accept('./Root', () => {
//     // eslint-disable-next-line global-require,import/newline-after-import
//     const RootComponent = require('./Root').default;
//     mount(RootComponent);
//   });
// }

const graph = new NodeGraph();

graph.render(root);
