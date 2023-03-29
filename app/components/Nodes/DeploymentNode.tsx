import { NodeProps, Position } from 'reactflow';
import NodeHandle from '../NodeHandle';
import BaseNode from './BaseNode';

interface DeploymentData {
  name: string;
  onChange: (id: string, data: any) => void;
}

export default function DeploymentNode(props: NodeProps<DeploymentData>) {
  const { id, data } = props;

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    data?.onChange?.(id, { [event.target.name]: event.target.value ?? '' });
  };

  return (
    <BaseNode
      nodeName="Deployment"
      nodeHeaderBgColor="#DB3069"
      nodeHandleBgColor="#e99bb5"
      {...props}
    >
      <div>
        <label htmlFor="name">Application Name</label>
        <input
          type="text"
          name="name"
          aria-labelledby="name"
          placeholder="Application Name"
          defaultValue={data.name}
          onChange={inputChangeHandler}
        />
      </div>
      <div>
        <NodeHandle
          id="dockerImage"
          type="target"
          position={Position.Left}
          $top="1.125rem"
          $backgroundColor="#f3e297"
        />
        <label>Docker Image</label>
      </div>
      <div>
        <NodeHandle
          id="environment"
          type="target"
          position={Position.Left}
          $top="1.125rem"
          $backgroundColor="aqua"
        />
        <label>Environment</label>
      </div>
      <div>
        <NodeHandle
          id="ports"
          type="target"
          position={Position.Left}
          $top="1.125rem"
          $backgroundColor="#7CAFC4"
        />
        <label>Ports</label>
      </div>
      <div>
        <NodeHandle
          id="volume"
          type="target"
          position={Position.Left}
          $top="1.125rem"
          $backgroundColor="#1446A0"
        />
        <label>Volumes</label>
      </div>
    </BaseNode>
  );
}
