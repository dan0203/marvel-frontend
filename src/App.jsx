// Modules internes
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Characters from './pages/Characters/Characters';
import Comics from './pages/Comics/Comics';
import Favorites from './pages/Favorites/Favorites';
import Character from './pages/Character/Character';
// Modules yarn
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
    return (
        <>
            <Router>
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/characters" element={<Characters />} />
                    <Route path="/comics" element={<Comics />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/character/:id" element={<Character />} />
                    <Route path="*" element={<div className="container">Route not found</div>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
