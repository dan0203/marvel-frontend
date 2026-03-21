// Modules internes
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Characters from './pages/Characters/Characters';
import Comics from './pages/Comics/Comics';
import Favorites from './pages/Favorites/Favorites';
import Character from './pages/Character/Character';
import Footer from './components/Footer/Footer';
// import { handleFavorites } from './utils/handleFavorites';
// Modules react
import { useState, useEffect } from 'react';
// Modules yarn
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Cookies from 'js-cookie';

function App() {
    const [favoriteCharacters, setFavoriteCharacters] = useState([]);
    const [favoriteComics, setFavoriteComics] = useState([]);

    const addToFavorites = (favorites, id, category) => {
        const copyFavorites = [...favorites];
        copyFavorites.push(id);
        if (category === 'characters') {
            Cookies.set('characters_favorites', JSON.stringify(copyFavorites));
            setFavoriteCharacters(copyFavorites);
        } else if (category === 'comics') {
            Cookies.set('comics_favorites', JSON.stringify(copyFavorites));
            setFavoriteComics(copyFavorites);
        }
    };

    const removeFromFavorites = (favorites, id, category) => {
        const copyFavorites = [...favorites];
        const index = copyFavorites.indexOf(id);

        if (index !== -1) {
            copyFavorites.splice(index, 1);
        }

        if (category === 'characters') {
            Cookies.set('characters_favorites', JSON.stringify(copyFavorites));
            setFavoriteCharacters(copyFavorites);
        } else if (category === 'comics') {
            Cookies.set('comics_favorites', JSON.stringify(copyFavorites));
            setFavoriteComics(copyFavorites);
        }
    };

    useEffect(() => {
        // Récupération des personnages favoris depuis les cookies
        const charactersFavorites = Cookies.get('characters_favorites');
        if (charactersFavorites && charactersFavorites.length > 0) {
            setFavoriteCharacters(JSON.parse(charactersFavorites));
        }

        // Récupération des comics favoris depuis les cookies
        const comicsFavorites = Cookies.get('comics_favorites');
        if (comicsFavorites && comicsFavorites.length > 0) {
            setFavoriteComics(JSON.parse(comicsFavorites));
        }
    }, []);

    return (
        <>
            <Router>
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/characters" element={<Characters favorites={favoriteCharacters} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />} />
                    {/* <Route path="/characters" element={<Characters favorites={favoriteCharacters} handleFavorites={handleFavorites} setState={setFavoriteCharacters} />} /> */}
                    <Route path="/comics" element={<Comics favorites={favoriteComics} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />} />
                    {/* <Route path="/comics" element={<Comics favorites={favoriteComics} handleFavorites={handleFavorites} setState={setFavoriteComics} />} /> */}
                    <Route path="/favorites" element={<Favorites favoriteCharacters={favoriteCharacters} favoriteComics={favoriteComics} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />} />
                    {/* <Route path="/favorites" element={<Favorites favoriteCharacters={favoriteCharacters} favoriteComics={favoriteComics} handleFavorites={handleFavorites} setFavoriteCharacters={setFavoriteCharacters} setFavoriteComics={setFavoriteComics} />} /> */}
                    <Route path="/character/:id" element={<Character favorites={favoriteComics} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />} />
                    <Route path="*" element={<div className="container">Route not found</div>} />
                </Routes>

                <Footer />
            </Router>
        </>
    );
}

export default App;
