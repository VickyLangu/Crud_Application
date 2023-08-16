import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
  const onClick = () => {
    console.log("Click");
  };
  return (
    <header className="header">
      <h1></h1>
      {/* <Link to="/" style={{ textDecoration: "none" }}>
        <Button text="Home" />{" "}
      </Link> */}
      <Link to="/add" style={{ textDecoration: "none" }}>
        {" "}
        <Button text="Add Member" onClick={onAdd} />
      </Link>
    </header>
  );
};
Header.propTypes = {
  title: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
  showAdd: PropTypes.bool.isRequired,
};

export default Header;
