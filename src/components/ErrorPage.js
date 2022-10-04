import { useRouteError } from "react-router-dom";
import { useEffect } from "react";

function ErrorPage({}) {
  const error = useRouteError();

  useEffect(() => {
    document.title = "Error - Battle Team";
  });

  return (
    <div>
      <h1>An unexpected error has occured.</h1>
      <h2>{JSON.stringify(error.data)}</h2>
    </div>
  );
}

export default ErrorPage;
