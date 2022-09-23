import { useRouteError } from "react-router-dom";

function ErrorPage({}) {
  const error = useRouteError();
  return (
    <div>
      <h1>An unexpected error has occured.</h1>
      <h2>{JSON.stringify(error.data)}</h2>
    </div>
  );
}

export default ErrorPage;
