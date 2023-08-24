import { useAuthContext } from "../hooks/useAuthContext"

const User = () => {
    const username = window.location.search.substring(1).split('=')[1] 
    const { user } = useAuthContext();

    return (
        <div className="user-page">
            <h1>{user.username}</h1>
        </div>
    )
}

export default User