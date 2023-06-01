import Header from "../components/header";
import Footer from "../components/footer";
import Product from "../components/product";
import { useEffect ,useState } from "react";
import axios from "axios";

const Category = ({ category }) => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`https://ramit-api.sigve.dev/product/category/${category}`);
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getProducts();
    }
    , [category]);

    return (
        <div className="category">
            <Header active={category} />
            <div className="category-content">
                <h1>{category}</h1>
                {products ?
                <div className="category-content-grid">
                    {products.map((product) => (
                        <Product
                            key={product._id}
                            id={product._id}
                            title={product.title}
                            image={product.image}
                            price={product.price}
                        />
                    ))}
                </div> : null}
            </div>
            <Footer />
        </div>
    );
}

export default Category;