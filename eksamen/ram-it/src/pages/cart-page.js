import Header from "../components/header";
import Footer from "../components/footer";
import Cart from "../components/cart";
import { useEffect, useState } from "react";
import axios from "axios";

const CartPage = (user) => {
    const [cart, setCart] = useState(null);

    const token = localStorage.getItem("user");
    if(!token) window.location.replace("/login");

    useEffect(() => {
        const getCart = async () => {
            try {
                const res = await axios.get("https://ramit-api.sigve.dev/cart/find/" + user.user.id);
                setCart(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        };
        getCart();
    }, [user]);

    const order = async (e) => {
        e.preventDefault();
        try {
            const cart = await axios.get("https://ramit-api.sigve.dev/cart/find/" + user.user.id);
            if(cart.data[0].items.length === 0) return alert("Du har ingen varer i handlekurven");
            const order = {
                items: cart.data[0].items,
                total: cart.data[0].total + 49,
                userId: user.user.id,
                name: document.getElementById("name").value,
                address: document.getElementById("adresse").value,
                city: document.getElementById("poststed").value,
                zip: document.getElementById("postnummer").value,
            };
            await axios.post("https://ramit-api.sigve.dev/order/create", order);
            await axios.put("https://ramit-api.sigve.dev/cart/update/" + user.user.id, {items: [], total: 0});
            window.location.replace("/order");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="cart-page">
            <Header active="none" />
            <div className="cart-content">
                <h1>Handlekurv</h1>
                {cart ?
                <div className="cart-content-grid">
                    <div className="cart-items">
                        {cart.items.map((cartItem) => (
                            <Cart
                                key={cartItem.id}
                                id={cartItem.id}
                                title={cartItem.title}
                                image={cartItem.image}
                                price={cartItem.price}
                                amount={cartItem.amount}
                                owner={cart.userId}
                            />
                        ))}
                    </div>
                    <div className="cart-sidebar">
                        <form onSubmit={order}>
                            <label htmlFor="name">Navn</label><br />
                            <input type="text" id="name" name="name" placeholder="Fult navn" required/><br />
                            <label htmlFor="adresse">Adresse</label><br />
                            <input type="text" id="adresse" name="adresse" placeholder="Adresse" required/><br />
                            <label htmlFor="poststed">Poststed</label><br />
                            <input type="text" id="poststed" name="poststed" placeholder="Poststed" required/><br />
                            <label htmlFor="postnummer">Postnummer</label><br />
                            <input type="number" id="postnummer" name="postnummer" placeholder="Postnummer" required/>
                            <div className="cart-bottom">
                                {cart.total > 0 ? <p>Frakt: 49kr</p> : null}
                                {cart.total > 0 ? <h2>Total: {cart.total + 49} kr</h2> : <h2>Total: 0 kr</h2>}
                                {cart.total > 0 ? <p className="mva">Uten mva: {cart.total * 0.75} kr</p> : <p className="mva">Uten mva: 0 kr</p>}
                                <input type="submit" className="checkout" value="Betal med kort"/>
                                <input type="submit" className="vipps" value="Betal med vipps"/>
                            </div>
                        </form>
                    </div>
                </div> : null}
            </div>
            <Footer />
        </div>
    );
}

export default CartPage;