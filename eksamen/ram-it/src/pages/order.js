import Header from "../components/header";
import Footer from "../components/footer";
import Product from "../components/product";
import { useEffect ,useState } from "react";
import axios from "axios";

const Order = ({ user }) => {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/order/all/${user.id}`);
                setOrders(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getOrders();
    }, [user]);

    return (
        <div className="order">
            <Header active="order" />
            <div className="order-content">
                <h1>Dine ordre</h1>
                {orders ?
                <div className="order-content-grid">
                    {orders.map((order) => (
                        <div className="order-content-grid-item">
                            <h2>Ordre #{order._id}</h2>
                            <p>Produkter:</p>
                            <div className="item-grid">
                                {order.items.map((product) => (
                                    <Product
                                        key={product.id}
                                        id={product.id}
                                        title={product.title}
                                        image={product.image}
                                        price={product.price}
                                    />
                                ))}
                            </div>
                            <h3>Shipping:</h3>
                            <p><span className="accent-text">Navn: </span>{order.name}</p>
                            <p><span className="accent-text">Adresse: </span>{order.address}</p>
                            <p><span className="accent-text">Postnummer: </span>{order.zip}</p>
                            <p><span className="accent-text">By: </span>{order.city}</p>
                            <h4 className="order-total"><span className="accent-text">Pris: </span>{order.total}</h4>
                        </div>
                    ))}
                </div> : null}
            </div>
            <Footer />
        </div>
    );
}

export default Order;