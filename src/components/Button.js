import PropTypes from "prop-types";

const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      // style={{ backgroundColor: color }}
      className="btn"
    >
      {text}
    </button>
  );
};

// Creating default props. this is how you create a default prop below

// Button.defaultProps = {
//   color: "steelblue",
// };

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
