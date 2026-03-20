// Modules internes
import './CharacterCard.css';
import defaultImage from '../../assets/images/default.jpg';
import ComicCard from '../Comics/ComicCard';
import Button from '../../components/Button/Button';
// Modules react
import { useState } from 'react';
// Modules yarn
import Cookies from 'js-cookie';
import { Link } from 'react-router';
import { CiHeart } from 'react-icons/ci';

const CharacterCard = ({ character }) => {
    const charactersFavorites = Cookies.get('characters_favorites');
    const initFavorites = charactersFavorites ? JSON.parse(charactersFavorites) : [];
    console.log('charactersFavorites', JSON.parse(charactersFavorites));

    const [favorites, setFavorites] = useState(initFavorites);

    return (
        <>
            <article className="character-card">
                <Button
                    text={<CiHeart />}
                    className="add-to-favorite"
                    onClickFunc={() => {
                        // Ajouter le nouveau favori
                        if (!favorites.includes(character._id)) {
                            console.log('favorites', favorites);
                            const copyFavorites = [...favorites];
                            copyFavorites.push(character._id);
                            Cookies.set('characters_favorites', JSON.stringify(copyFavorites));
                            console.log('copyFavorites', copyFavorites);
                            setFavorites(copyFavorites);
                        }
                    }}
                />

                <Link to={`/character/${character._id}`}>
                    <h2>{character.name}</h2>
                    <div className="content">
                        <img src={character.thumbnail.path ? `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}` : defaultImage} alt={character.name} onError={e => (e.target.src = defaultImage)} />
                        <p>{character.description || 'N/A'}</p>
                    </div>
                    {character.comics.show &&
                        character.comics.map(comic => {
                            return <ComicCard key={comic._id} comic={comic} />;
                        })}
                </Link>
            </article>
        </>
    );
};

export default CharacterCard;
