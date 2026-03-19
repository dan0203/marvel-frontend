// Modules internes
import './Search.css';

const Search = ({ search, setSearch }) => {
    return (
        <div>
            <label htmlFor="search">LOUPE</label>
            <input
                type="text"
                name="search"
                id="search"
                value={search}
                onChange={event => {
                    setSearch(event.target.value);
                }}
            />
        </div>
    );
};

export default Search;
