import { Outlet } from "react-router-dom";
function Root({}) {
  return (
    <div>
      <div style={{ width: "100%" }}>{/* <h1>root</h1> */}</div>
      <Outlet />
    </div>
  );
}
export default Root;
