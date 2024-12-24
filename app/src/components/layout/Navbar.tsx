import "../../styles/components/layout/Navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar">

      <Link className="nav-title nav-link" to="/">Meal Prep</Link>

      <ul className="nav-ul">
        
        {/* Links */}
        <li className="nav-li">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-li">
          <Link className="nav-link" to="/recipes">Recipes</Link>
        </li>
        <li className="nav-li">
          <Link className="nav-link" to="/ingredients">Ingredients</Link>
        </li>
        <li className="nav-li">
          <Link className="nav-link" to="/days">Days</Link>
        </li>
      </ul>

    </nav>
  )
}
export default Navbar;