// Modules internes
import './Search.css';

const Search = ({ search, setSearch, searchLabel }) => {
    return (
        <div className="search">
            <input
                type="text"
                name="search"
                id="search"
                value={search}
                onChange={event => {
                    setSearch(event.target.value);
                }}
                placeholder={`Rechercher un ${searchLabel}`}
            />
        </div>
    );
};

export default Search;
