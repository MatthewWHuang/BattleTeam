import { useRouteError } from "react-router-dom";

function ErrorPage({}) {
  const error = useRouteError();
  return (
    <div>
      <h1>An unexpected error has occured.</h1>
      <h2>{error}</h2>
    </div>
  );
}

export default ErrorPage;
