import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h2 className="not-found-heading">404 Not Found</h2>
        <p className="not-found-text">
          Even John Travolta is here looking around, wondering where we put that
          page.
        </p>
        <img
          className="not-found-gif"
          draggable="false"
          src="https://media1.tenor.com/m/fuiG0_pco2wAAAAd/confused-john-travolta.gif"
          alt="Confused John Travolta GIF"
        />
        <Link to={"/"} className="not-found-link">
          Go Home
        </Link>
      </div>
    </div>
  );
}
