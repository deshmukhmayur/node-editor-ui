import Head from 'next/head';
import { ReactFlowProvider } from 'reactflow';
import Flow from '../app/components/Flow';

export default function Create() {
  return (
    <>
      <div style={{ height: '100dvh', width: '100dvw' }}>
        <Head>
          <title>Serverless Generator</title>
        </Head>

        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </div>
    </>
  );
}
