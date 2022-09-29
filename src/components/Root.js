import { Outlet, Link } from "react-router-dom";
import NavBar from "./NavBar";
function Root({}) {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
export default Root;
