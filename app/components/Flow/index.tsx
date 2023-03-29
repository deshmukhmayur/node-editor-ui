import React, { useCallback, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  NodeTypes,
  Panel,
  useStoreApi,
} from 'reactflow';
import 'reactflow/dist/base.css';
import Toolbar from '../Toolbar';
import nodes from '../Nodes';

const nodeTypes = nodes.reduce((nodeTypes, node) => {
  return {
    [node.type]: node.component,
    ...nodeTypes
  };
}, {} as NodeTypes);

const initialNodes: Node<any>[] = [];

const initialEdges: Edge<any>[] = [];

export default function Flow() {
  const reactFlowWrapper = useRef<any>();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const store = useStoreApi();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onChange = (id: string, data: any) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id !== id) {
          return n;
        }
        return {
          ...n,
          data: {
            ...n.data,
            ...data,
          },
        };
      })
    );
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const nodeType = event.dataTransfer.getData('application/nodeType');
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    newNode(nodeType, position);
  };

  const newNode = (nodeType: string, position?: { x: number; y: number }) => {
    console.log('creating new node:', { nodeType });
    setNodes((nds) =>
      nds.concat({
        id: nanoid(),
        position: position ?? { x: 100, y: 100 },
        data: {
          onChange: onChange,
        },
        type: nodeType,
      })
    );
  };

  const printState = () => {
    const { nodeInternals } = store.getState();
    console.log(Array.from(nodeInternals.values()));
  };

  return (
    <>
      <div style={{ height: '100dvh', width: '100dvw' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Background style={{ backgroundColor: '#f1f1f1' }} lineWidth={2} />
          <Controls />
          <Panel position={'top-left'}>
            <Toolbar />
          </Panel>
          <Panel position="top-right">
            <button onClick={printState}>Debug</button>
          </Panel>
        </ReactFlow>
      </div>
    </>
  );
}
