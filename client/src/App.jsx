import { BrowserRouter, Routes, Route } from "react-router";

import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import Form from "./components/form/Form";
import Reviews from "./components/reviews/Reviews";
import NotFound from "./components/notfound/NotFound";

import "./App.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
