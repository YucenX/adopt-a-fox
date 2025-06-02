import {useCallback, useEffect} from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
    type OnConnect, useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from '../nodes';
import { initialEdges, edgeTypes } from '../edges';
import {initStreamlit, sendJsonToPython, setFrameHeight} from "../utils/streamlit.ts";

export default function FlowComponent() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );
  const { fitView } = useReactFlow();

  useEffect(() => {
    initStreamlit();
    setFrameHeight(1000);

  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      fitView({duration: 100}); // center and zoom
    }, 100); // or 1000ms if needed

    return () => clearTimeout(timeout);
  }, [fitView]);

  const handleClick = () => {
    sendJsonToPython({
      img: "https://img.pokemondb.net/sprites/home/normal/delphox.png"
    });
    console.log(window.innerHeight, window.innerWidth);
  }

  return (
    <>
      <button onClick={handleClick}>SEND DATA TO STREAMLIT!</button>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </>
  );
}
