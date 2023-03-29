import React from 'react';
import { CSSProperties } from 'react';
import nodes from '../Nodes';

const styles: { [x: string]: CSSProperties} = {
  ul: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
  },
  button: {
    background: '#fff',
    border: 'unset',
    borderLeft: '.5rem solid var(--identifying-color)',
    padding: '.5rem 1rem',
    width: '100%',
    textAlign: 'left',
    marginBottom: '.25rem',
    cursor: 'grab'
  },
};

export default function Toolbar() {
  const onDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData('application/nodeType', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <>
      <ul style={styles.ul}>
        {nodes.map((node) => (
          <li key={node.type}>
            <button style={{...styles.button, ...node.styles}} draggable onDragStart={(event) => onDragStart(event, node.type)}>
              {node.label}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
