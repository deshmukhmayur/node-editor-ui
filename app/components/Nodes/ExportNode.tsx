import { useState } from 'react';
import { Connection, NodeProps, Position, useEdges, useNodes } from 'reactflow';
import Button from '../Button';
import NodeHandle from '../NodeHandle';
import BaseNode from './BaseNode';

export default function ExportNode(props: NodeProps) {
  const [generatedOutput, setOutput] = useState('');
  const edges = useEdges();
  const nodes = useNodes();

  const incomingEdges = edges.filter((edge) => edge.target === props.id);

  const getDirectConnections = (nodeId: string) => {
    return edges
      .filter((edge) => edge.target === nodeId)
      .map((edge) => edge.source);
  };

  const getConnectedNodes = (nodeId: string) => {
    let connectedNodes: string[] = [];
    const connections = getDirectConnections(nodeId);
    if (connections.length > 0) {
      connections.forEach((connection) => {
        if (!connectedNodes.includes(connection)) {
          connectedNodes.push(connection);
          const otherNodes = getConnectedNodes(connection);
          connectedNodes.push(...otherNodes);
        }
      });
    }
    return connectedNodes;
  };

  const getAllConnectedNodes = () => {
    if (incomingEdges.length === 0) {
      return;
    }
    const connectedNodeIds = incomingEdges.map(edge => getConnectedNodes(edge.target)).flat();
    console.log(connectedNodeIds);

    return connectedNodeIds.reduce((acc, nodeId) => {
      const node = nodes.find((nd) => nd.id === nodeId);
      if (!node) {
        return acc;
      }
      return {
        [node.type as string]: node.data,
        ...acc,
      };
    }, {} as Object);
  };

  const generateJSON = () => {
    const output = getAllConnectedNodes();
    setOutput(JSON.stringify(output ?? {}, null, 2));
  };

  return (
    <BaseNode nodeName="Export" {...props}>
      <div>
        <Button type="submit" onClick={generateJSON}>
          Generate JSON
        </Button>
        <NodeHandle
          id="any"
          type="target"
          position={Position.Left}
          $top="1.125rem"
          isValidConnection={(connection: Connection) => true}
        />
      </div>
      <div>
        <pre
          style={{
            backgroundColor: '#eee',
            margin: '0',
            maxHeight: '10rem',
            overflowX: 'hidden',
            whiteSpace: 'pre-wrap',
            overflowY: 'auto',
          }}
        >
          {generatedOutput}
        </pre>
      </div>
    </BaseNode>
  );
}
