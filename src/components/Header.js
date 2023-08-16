// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import Button from "./Button";

// const Header = ({ title, onAdd, showAdd }) => {
//   const onClick = () => {
//     console.log("Click");
//   };

//   const handleBack = () => {
//     console.log("Back");
//   };
//   return (
//     <header className="header">
//       <h1></h1>
//       <Link to="/" style={{ textDecoration: "none" }}>
//         <Button text="Home" />{" "}
//       </Link>
//       <Link to="/add" style={{ textDecoration: "none" }}>
//         {" "}
//         <Button text="Add Member" onClick={onAdd} />
//       </Link>
//       <EditMember onBack={handleBack} />
//     </header>
//   );
// };
// Header.propTypes = {
//   title: PropTypes.string,
//   onAdd: PropTypes.func.isRequired,
//   showAdd: PropTypes.bool.isRequired,
// };

// export default Header;
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  const handleBack = () => {
    console.log("Back");
  };

  return (
    <header className="header">
      <h1></h1>
      {location.pathname === "/" && ( // Render the button only on the home page
        <Link to="/add" style={{ textDecoration: "none" }}>
          <Button text="Add Member" onClick={onAdd} />
        </Link>
      )}
      {/* {location.pathname.includes("/edit/") && (
        <EditMember onBack={handleBack} />
      )} */}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
  showAdd: PropTypes.bool.isRequired,
};

export default Header;
