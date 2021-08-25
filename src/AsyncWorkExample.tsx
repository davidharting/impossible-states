import React from "react";

interface RemoteData {
  username: string;
}

function fetchRemoteData(): Promise<RemoteData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ username: "jthandy" });
    }, 1000);
  });
}

type UseRemoteDataResult =
  | { state: "loading" }
  | { state: "success"; data: RemoteData }
  | { state: "error"; message: string };

function useRemoteData() {
  const [result, setResult] = React.useState<UseRemoteDataResult>({
    state: "loading"
  });

  const fetch = async () => {
    try {
      const data = await fetchRemoteData();
      setResult({ state: "success", data });
    } catch (error) {
      setResult({ state: "error", message: "Something went wrong!" });
    }
  };
  fetch();

  return result;
}

function ExampleOne() {
  const remoteDataResult = useRemoteData();
  return (
    <>
      <h2>Network Request</h2>
      {remoteDataResult.state === "loading" && <p>Loading...</p>}
      {remoteDataResult.state === "success" && (
        <p>Your username is {remoteDataResult.data.username}</p>
      )}
      {remoteDataResult.state === "error" && <p>{remoteDataResult.message}</p>}
    </>
  );
}

export default ExampleOne;
