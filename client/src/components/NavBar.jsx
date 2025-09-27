import { Link } from "react-router";

export default function NavBar() {
  return (
    <div className="nav-container">
      <h1 className="header">The Game Loop</h1>
      <nav>
        <Link className="link" to={"/"}>
          Home{" "}
        </Link>
        <Link className="link" to={"/form"}>
          Form{" "}
        </Link>
        <Link className="link" to={"/reviews"}>
          Reviews
        </Link>
      </nav>
    </div>
  );
}
