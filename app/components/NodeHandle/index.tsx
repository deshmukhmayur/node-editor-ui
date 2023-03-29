import { Connection, Handle } from 'reactflow';
import styled from 'styled-components';

interface NodeHandleProps {
  $top: string;
  $height: string;
  $width: string;
  $borderRadius: string;
  $backgroundColor: string;
  $borderColor: string;
  $borderWidth: string;
  $borderStyle: string;
}

function CustomHandle(props: any) {
  return (
    <Handle
      isValidConnection={(connection: Connection) =>
        (connection.sourceHandle === connection.targetHandle) ||
        connection.targetHandle === 'any'
      }
      {...props}
    />
  );
}

const NodeHandle = styled(CustomHandle)<Partial<NodeHandleProps>>`
  top: ${({ $top }) => $top};
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border: ${({ $borderWidth, $borderStyle, $borderColor }) =>
    `${$borderWidth} ${$borderStyle} ${$borderColor}`};
`;

NodeHandle.defaultProps = {
  $top: '10%',
  $height: '.5rem',
  $width: '.5rem',
  $borderRadius: '50%',
  $backgroundColor: '#ddd',
  $borderColor: '#777',
  $borderWidth: '1px',
  $borderStyle: 'solid',
};

export default NodeHandle;
