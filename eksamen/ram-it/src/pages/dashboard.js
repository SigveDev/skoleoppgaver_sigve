import Header from "../components/header";
import Footer from "../components/footer";
import SmallProduct from "../components/small-product";
import SmallOrder from "../components/small-order";
import { useEffect ,useState } from "react";
import axios from "axios";

const Dashboard = ({ user }) => {
    const [orders, setOrders] = useState(null);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`https://ramit-api.sigve.dev/order/all`);
                setOrders(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getOrders();

        const getProducts = async () => {
            try {
                const res = await axios.get('https://ramit-api.sigve.dev/product/all');
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getProducts();

        if(user !== null) {
            if(!user.isAdmin) {
                window.location.replace("/profile");
            }
        }
    }, [user]);

    return (
        <div className="dashboard">
            <Header active="dashboard" />
            <div className="dashboard-content">
                <h1>Dashboard</h1>
                <div className="dashboard-content-grid">
                    {orders ?
                    <div className="dashboard-content-grid-left">
                        <div className="dashboard-content-grid-left-item">
                            <h2>Ordre</h2>
                            <div className="item-grid">
                                {orders.slice(0).reverse().map((order) => (
                                    <SmallOrder
                                        key={order._id}
                                        id={order._id}
                                        price={order.total}
                                        date={order.createdAt}
                                        owner={order.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div> : null}
                    {products ?
                    <div className="dashboard-content-grid-right">
                        <div className="dashboard-content-grid-right-item">
                            <h2>Produkter</h2>
                            <div className="item-grid">
                                {products.slice(0).reverse().map((product) => (
                                    <SmallProduct
                                        key={product._id}
                                        id={product._id}
                                        title={product.title}
                                        image={product.image}
                                        price={product.price}
                                    />
                                ))}
                            </div>
                        </div>
                    </div> : null}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;