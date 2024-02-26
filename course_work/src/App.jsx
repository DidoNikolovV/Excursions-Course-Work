import './App.css';
import ExcursionsPage from './components/ExcursionPage/ExcursionsPage';
import CancellationsPage from './components/CancellationsPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<ExcursionsPage />} />
          <Route path="/excursions/cancel" element={<CancellationsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
