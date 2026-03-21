// Modules internes
import './CharactersList.css';
import CharacterCard from '../../components/CharacterCard/CharacterCard';

const CharactersList = ({ characters, favorites, addToFavorites, removeFromFavorites }) => {
    return (
        <section className="characters-list">
            {characters.map(character => {
                return <CharacterCard character={character} key={character._id} favoriteCharacters={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />;
            })}
        </section>
    );
};

export default CharactersList;
