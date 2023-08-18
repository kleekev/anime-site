import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Anime Site</h1>
                </Link>
                <Link to="/top_animes">
                    <h2>Top Animes</h2>
                </Link>
            </div>
        </header>
    )
}

export default Navbar