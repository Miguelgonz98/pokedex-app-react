import { NavLink } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = () => {
  const handleReload = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <header className="header">
        <NavLink to="/" className="header__container" onClick={handleReload}>
          <img
            src="src/assets/icons/Union.svg"
            alt="Pokemon Logo"
            className="header__logo"
          />
          <h1 className="header__text">Pokédex App</h1>
        </NavLink>
    </header>
  );
};
