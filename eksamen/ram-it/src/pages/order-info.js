import Header from "../components/header";
import Footer from "../components/footer";
import Product from "../components/product";
import { useEffect, useState } from "react";
import axios from "axios";

const OrderInfo = ({ user }) => {
    const [order, setOrder] = useState(null);
    const url = window.location.href;
    let id = url.split("/")[4];

    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await axios.get("https://ramit-api.hcklikk.com/order/find/order/" + id);
                setOrder(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getOrder();

        if(user !== null) {
            if(!user.isAdmin) {
                window.location.replace("/profile");
            }
        }
    }, [user]);

    const cancelOrder = async () => {
        try {
            const res = await axios.delete("https://ramit-api.hcklikk.com/order/delete/" + id);
            console.log(res.data);
            window.location.replace("/dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="order-info">
            <Header active="none" />
            <div className="order-info-content">
                {order ? <h1>Ordre #{order._id}</h1> : null}
                {order ?
                <div className="order-info-content-grid">
                    <div className="order-info-content-grid-left">
                        <h2>Info</h2>
                        <p>{order.name}</p>
                        <p>{order.address}</p>
                        <p>{order.zip} {order.city}</p>
                        <p>{new Date(order.createdAt).toDateString()}</p>
                        <h3 className="total">Total: {order.total} kr</h3>
                        <p className="mva">Uten mva: {order.total * 0.75}</p>
                        <button className="cancelButton" onClick={cancelOrder}>Avbryt bestillingen</button>
                    </div>
                    <div className="order-info-content-grid-right">
                        <h2>Produkter</h2>
                        <div className="order-info-content-grid-right-item">
                            {order.items.map((item) => (
                                <Product
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    amount={item.amount}
                                />
                            ))}
                        </div>
                    </div>
                </div> : null}
            </div>
            <Footer />
        </div>
    );
};

export default OrderInfo;