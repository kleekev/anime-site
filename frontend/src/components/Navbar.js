import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { CaretUpFilled } from '@ant-design/icons'

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
                    <div className="dropdown">
                        <span className='dropdown-icon'>Anime</span>
                        <CaretUpFilled className='dropdown-arrow'/>
                        <div className="dropdown-content">
                            <Link to={'/top_animes'}>
                                Top 100
                            </Link>
                            <Link>
                                Search
                            </Link>
                            <Link>
                                Recommend
                            </Link>
                        </div>
                    </div>
                    <div className="dropdown">
                        <span className='dropdown-icon'>Social</span>
                    </div>
                </div>
                {user ? (
                    <div className='user-links links'>
                        <Link to={'/user?username=' + user.username}>{user.username}</Link>
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