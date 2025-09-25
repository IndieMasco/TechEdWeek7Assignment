import { Link } from "react-router";

import "./NavBar.css";

export default function NavBar() {
  return (
    <>
      <nav>
        <Link to={"/"}>Home </Link>
        <Link to={"/form"}>Form </Link>
        <Link to={"/reviews"}>Reviews</Link>
      </nav>
    </>
  );
}
