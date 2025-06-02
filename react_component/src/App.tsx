import { ReactFlowProvider } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import FlowComponent from "./components/FlowCanvas.tsx";

export default function App() {
  return (
      <ReactFlowProvider>
        <FlowComponent />
      </ReactFlowProvider>
  );
}
