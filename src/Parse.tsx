import { useState } from "react";
import * as z from "zod";

const dbtCommandSchema = z.union([
  z.literal("run"),
  z.literal("test"),
  z.literal("seed")
]);

// type DbtCommand = z.infer<typeof dbtCommandSchema>;

function Parse() {
  const [inputValue, setInputValue] = useState<string>("");
  const parseResult = dbtCommandSchema.safeParse(inputValue);

  return (
    <>
      <h2>Parse don't validate</h2>

      <label htmlFor="command">dbt command:</label>
      <br />
      <input
        id="command"
        type="text"
        name="dbtCommand"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <br />
      {parseResult.success ? (
        <>
          <p style={{ color: "green" }}>Valid!</p>
          <p>
            You would like to run: <pre>{parseResult.data}</pre>
          </p>
        </>
      ) : (
        <>
          <p style={{ color: "tomato" }}>Invalid!</p>

          <details>
            <summary>View raw parse error</summary>
            <pre style={{ textAlign: "left" }}>
              {JSON.stringify(parseResult.error, null, 2)}
            </pre>
          </details>
        </>
      )}
    </>
  );
}

export default Parse;
