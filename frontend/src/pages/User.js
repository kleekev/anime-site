import { useAuthContext } from "../hooks/useAuthContext"
import userIcon from '../images/usericon.png'

const User = () => {
    const username = window.location.search.substring(1).split('=')[1] 
    const { user } = useAuthContext();

    return (
        <div className="user-page">
            <div className="header">
                <img src={userIcon} alt="user icon" />
                <h1>{user.username}'s Profile</h1>
            </div>
        </div>
    )
}

export default User