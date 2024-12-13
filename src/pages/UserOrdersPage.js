import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

function UserOrdersPage() {
    return ( 
        <div>
            <Navbar>
                <h1 className="text-2xl m-auto">My Orders</h1>
                <UserOrders></UserOrders>
            </Navbar>
        </div>
     );
}

export default UserOrdersPage;