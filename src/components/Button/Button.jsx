// Modules internes
import './Button.css';

const Button = ({ text, onClickFunc, className, disabled }) => {
    return (
        <button onClick={() => onClickFunc()} className={className || ''} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
