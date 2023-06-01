import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductPage = (user) => {
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    const url = window.location.href;
    let id = url.split("/")[4];
    
    useEffect(() => {
        const getProduct = async () => {
        try {
            const res = await axios.get("https://ramit-api.sigve.dev/product/find/" + id);
            setProduct(res.data);
        } catch (err) {
            console.log(err);
        }
        };
        getProduct();

        const getCart = async () => {
            try {
                const res = await axios.get("https://ramit-api.sigve.dev/cart/find/" + user.user.id);
                setCart(res.data[0].items);
            } catch (err) {
                console.log(err);
            }
        }
        getCart();
    }, [user]);

    const addCart = async () => {
        try {
            const oldCart = await axios.get("https://ramit-api.sigve.dev/cart/find/" + user.user.id);
            let newItems = oldCart.data[0].items;
            const thisProduct = {
                id: product._id,
                title: product.title,
                image: product.image,
                price: product.price,
                amount: 1
            };
            newItems.push(thisProduct);
            const newCart = {
                items: newItems
            };
            await axios.put("https://ramit-api.sigve.dev/cart/update/" + user.user.id, newCart);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div className="product-page">
            <Header active="none" />
            <div className="product-page-content">
                <div className="product-page-content-left">
                    <img src={"https://ramit-api.sigve.dev/uploads/" + product.image} alt={product.title} />
                </div>
                <div className="product-page-content-right">
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <h3>{product.price} kr</h3>
                    {user.user ? <div className="product-page-content-right-login">
                        {cart.find((item) => item.id === id) ?
                            <div>
                                <button className="btn2" disabled>Lagt til i handlekurv</button>
                                <a href="/cart">Til handelvognen</a>
                            </div>
                            :
                            <button className="btn" onClick={addCart}>Legg til i handlekurv</button>
                        }</div> : 
                        <div className="product-page-content-right-login">
                            <p className="warning">Du må logge inn for å legge til i handlekurv</p>
                            <a href="/login">Logg inn</a>
                        </div>}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductPage;