import { NodeProps } from 'reactflow';
import BaseNode from './BaseNode';

export default function DockerImageNode(props: NodeProps) {
  const { id, data } = props;

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    data?.onChange?.(id, {
      [event.target.name]: event.target.value ?? '',
    });
  };

  return (
    <BaseNode
      nodeName="Docker Image"
      nodeHeaderBgColor="#F5D547"
      nodeHandleBgColor='#f3e297'
      nodeHeaderColor="#000"
      {...props}
    >
      <div>
        <label htmlFor="registry">Registry</label>
        <input
          type="text"
          name="registry"
          id="registry"
          placeholder="Enter the registry url"
          onChange={inputChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="repository">Image Repository</label>
        <input
          type="text"
          name="repository"
          id="repository"
          placeholder="Enter the image repository"
          onChange={inputChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          name="tag"
          id="tag"
          placeholder="latest"
          onChange={inputChangeHandler}
        />
      </div>
    </BaseNode>
  );
}
