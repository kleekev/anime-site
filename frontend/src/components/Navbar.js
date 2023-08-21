import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <div className="first-links links">
                    <div className="dropdown">
                        <div className="anime-menu">
                            Anime
                        </div>
                        <div className="dropdown-content">
                            <Link to='/top_animes'>
                                Top 100 Animes
                            </Link>
                            <Link>
                                Recommend Anime
                            </Link>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <Link className="home-link links" to="/">
                        Anime Site
                    </Link>
                </div>
                <div className="other-links links">
                    <Link className='login' to="/login">
                        Login
                    </Link>
                    <Link className='sign-up' to="/signup">
                        Sign-Up
                    </Link>
                </div>
                
            </div>
        </header>
    )
}

export default Navbar