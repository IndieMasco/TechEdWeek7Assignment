import { BrowserRouter, Routes, Route } from "react-router";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Form from "./components/Form";
import Reviews from "./components/Reviews";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

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
        <Footer />
      </BrowserRouter>
    </>
  );
}
