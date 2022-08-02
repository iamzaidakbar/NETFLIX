import {Link} from "react-router-dom";
import logo from '../../Logo/netflix-logo-png-2564.png'
import {useState} from "react";

export default function Navbar() {

    const [navbarColor, setNavbarColor] = useState("");
    window.addEventListener('scroll', () => {
        if (window.scrollY < 60) {
            setNavbarColor("")
        } else {
            setNavbarColor("navbar-black")
        }
    })

    return (
        <>
            <nav className={`navbar navbar-expand-lg ${navbarColor} fixed-top`}>
                <div className="container-fluid px-5">
                    <img className="netflix-header-logo me-5" style={{width: "5rem"}} src={logo} alt="..."/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-light" aria-current="page" to="">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" aria-current="page" to="/home">My List</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}