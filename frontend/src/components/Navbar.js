import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }
    return (
        <header>
            <div className="container">
                <Link className="home-link links" to="/">
                    AniTrack
                </Link>
                <div className="links">
                    <span>Anime</span>
                    <span>Social</span>
                </div>
                {user ? (
                    <div className='other-links links'>
                        <span>{user.email}</span>
                        <button className="logout" onClick={handleClick}>Logout</button>
                    </div>
                ) : (
                    <div className='other-links links'>
                        <Link className='login' to="/login">
                            Login
                        </Link>
                        <Link className='sign-up' to="/signup">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar