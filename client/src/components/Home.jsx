import HomePage from "./HomePage.png";

export default function Home() {
  return (
    <>
      <div className="home-page-wrapper">
        <div className="home-container">
          <h1 className="home-header">Welcome to The Game Loop</h1>
          <img
            className="home-image"
            draggable="false"
            src={HomePage}
            alt="The main image for the home page"
          />
          <p className="home-text">
            Stop guessing and start knowing! This is where the gaming community
            comes together to share their true opinions on all things
            interactive. Whether you're hunting for your next obsession or
            warning others about a dud, your voice matters. Read deep-dive
            reviews, browse player scores, and join the conversation to help
            every gamer make the best purchase decisions. Your next great game
            is just a review away!
          </p>
        </div>
      </div>
    </>
  );
}
