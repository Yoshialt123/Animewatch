import { BrowserRouter, Routes, Route } from "react-router-dom"; import Home from "./pages/Home"; import Anime from "./pages/Anime"; import Watch from "./pages/Watch";

export default function App() { return ( <BrowserRouter> <Routes> <Route path="/" element={<Home />} /> <Route path="/anime/:id" element={<Anime />} /> <Route path="/watch" element={<Watch />} /> </Routes> </BrowserRouter> ); }
