import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

function UserProfilePage() {
    return ( 
        <div>
            <Navbar>
                <h1 className="text-2xl m-auto">My Profile</h1>
                <UserProfile></UserProfile>
            </Navbar>
        </div>
     );
}

export default UserProfilePage;