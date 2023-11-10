import logo from "./logo.svg";
import "./App.css";
import CafeCard from "./screens/CafeCard";
import FavoriteScreen from "./screens/FavoriteScreen";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div>
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1em",
          }}
        >
          <Link to="/">Home</Link>
          {" / "}
          <Link to="/favorite">Favorite</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CafeCard />} />
          <Route path="/favorite" element={<FavoriteScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
