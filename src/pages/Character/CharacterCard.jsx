// Modules internes
import './CharacterCard.css';
import defaultImage from '../../assets/images/default.jpg';
import ComicCard from '../Comics/ComicCard';
import Button from '../../components/Button/Button';
// Modules yarn
import { Link } from 'react-router';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

const CharacterCard = ({ character, favorites, addToFavorites, removeFromFavorites }) => {
    return (
        <>
            <article className="character-card">
                {favorites && (
                    <Button
                        text={favorites.includes(character._id) ? <FaHeart /> : <FaRegHeart />}
                        className="add-to-favorite"
                        onClickFunc={() => {
                            // Ajouter le nouveau favori
                            if (!favorites.includes(character._id)) {
                                addToFavorites(character._id);
                            } else {
                                removeFromFavorites(character._id);
                            }
                        }}
                    />
                )}

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
