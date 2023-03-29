import React from 'react';
import { NodeProps, Position } from 'reactflow';
import NodeHandle from '../NodeHandle';
import styles from './BaseNode.module.css';
import styled from 'styled-components';

interface BaseNodeProps extends NodeProps, React.PropsWithChildren {
  id: string;
  nodeName: string;
  nodeHeaderBgColor?: string;
  nodeHandleBgColor?: string;
  nodeHeaderColor?: string;
  selected: boolean;
  className: string;
}

function BaseNode({
  id,
  type,
  nodeName,
  nodeHandleBgColor,
  selected,
  className,
  children,
}: BaseNodeProps) {
  const nodeType = type ?? 'baseNode';
  const name = nodeName ?? 'Base Node';

  return (
    <article
      data-node-type={nodeType}
      data-selected={selected}
      className={className}
    >
      <header>
        <label>{name}</label>
        <NodeHandle
          id={nodeType}
          type="source"
          position={Position.Right}
          $top="1.25rem"
          $backgroundColor={nodeHandleBgColor}
        />
      </header>
      {children}
    </article>
  );
}

export default styled(BaseNode).attrs(() => ({
  className: styles['node'],
}))`
  --node-header-bg-color: ${(props) => props.nodeHeaderBgColor};
  --node-header-color: ${(props) => props.nodeHeaderColor};
`;
