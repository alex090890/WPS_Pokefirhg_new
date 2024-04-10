import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "./routes/PokemonList";
import PokemonDetails from "./routes/PokemonDetails";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;