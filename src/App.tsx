import React from "react";
import AsyncWorkExample from "./AsyncWorkExample";
import ParseExample from "./Parse";
import "./styles.css";

const ExampleMap = {
  asyncWork: AsyncWorkExample,
  parse: ParseExample
};

type ExampleId = keyof typeof ExampleMap;

function Example({ exampleId }: ExampleProps) {
  if (exampleId) {
    const Component = ExampleMap[exampleId];
    return <Component />;
  }
  return null;
}

export default function App() {
  const [exampleId, setExampleId] = React.useState<ExampleId | null>(null);
  return (
    <div className="App">
      <h1>Making impossible states impossible</h1>
      <p>Choose an example</p>
      <ul className="buttonList">
        <li>
          <button onClick={() => setExampleId("asyncWork")}>
            Network Request
          </button>
        </li>
        <li>
          <button onClick={() => setExampleId("parse")}>
            Parse (don't validate)
          </button>
        </li>
      </ul>

      <Example exampleId={exampleId} />
    </div>
  );
}

interface ExampleProps {
  exampleId: ExampleId | null;
}
