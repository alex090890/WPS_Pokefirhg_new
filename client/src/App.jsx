import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "./routes/PokemonList";
import PokemonDetails from "./routes/PokemonDetails";
import PokemonFight from "./routes/PokemonFight";
import Home from "./routes/Home";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="/fight" element={<PokemonFight />} />
      </Routes>
    </Router>
  );
}

export default App;