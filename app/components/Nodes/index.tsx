import DeploymentNode from "./DeploymentNode";
import DockerImageNode from "./DockerImageNode";
import ExportNode from "./ExportNode";

export default [
  {
    type: 'deployment',
    label: 'Deployment',
    styles: { '--identifying-color': '#DB3069' },
    component: DeploymentNode
  },
  {
    type: 'dockerImage',
    label: 'Docker Image',
    styles: { '--identifying-color': '#F5D547' },
    component: DockerImageNode
  },
  {
    type: 'export',
    label: 'Export',
    styles: { '--identifying-color': '#888' },
    component: ExportNode
  },
];
