// Modules internes
import './Pagination.css';
import Button from '../Button/Button';

const Pagination = ({ setCurrentPage, currentPage, pages }) => {
    return (
        <div className="pagination">
            <Button
                text="&lt;"
                onClickFunc={() => {
                    setCurrentPage(currentPage - 1);
                }}
                disabled={!(currentPage > 1)}
            />

            {pages.map((page, index) => (page === '...' ? <span key={index}>...</span> : <Button key={index} text={page} className={currentPage === page ? 'active' : ''} onClickFunc={() => setCurrentPage(page)} />))}

            <Button
                text="&gt;"
                onClickFunc={() => {
                    setCurrentPage(currentPage + 1);
                }}
                disabled={!(currentPage < pages[pages.length - 1])}
            />
        </div>
    );
};

export default Pagination;
