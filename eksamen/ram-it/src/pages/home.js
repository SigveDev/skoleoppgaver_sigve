import Header from '../components/header';
import Footer from '../components/footer';
import Product from '../components/product';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get('https://ramit-api.hcklikk.com/product/all');
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getProducts();
    }, []);

    return (
        <div className="home">
            <Header active="all" />
            <div className="home-content">
                <h1>Alle produkter</h1>
                <div className="home-content-grid">
                    {products.map((product) => (
                        <Product
                            key={product._id}
                            id={product._id}
                            title={product.title}
                            image={product.image}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;