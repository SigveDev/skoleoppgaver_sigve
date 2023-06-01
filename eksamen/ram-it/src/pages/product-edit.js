import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductEdit = ({ user }) => {
    const [product, setProduct] = useState(null);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const url = window.location.href;
    let id = url.split("/")[4];
    let changedImage = false;

    if(file !== null) {
        changedImage = true;
    }

    let categories = [
        "pc",
        "laptop",
        "mobil",
        "skjerm",
        "tilbehor",
        "hoyttaler",
        "kamera",
        "lisens",
        "annet",
    ];

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get("http://localhost:5000/product/find/" + id);
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getProduct();

        if(user !== null) {
            if(!user.isAdmin) {
                window.location.replace("/profile");
            }
        }
    }, [user]);

    const deleteProduct = async () => {
        try {
            const res = await axios.delete("http://localhost:5000/product/delete/" + id);
            window.location.replace("/dashboard");
        } catch (err) {
            console.log(err);
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        changedImage = true;
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        const newProduct = {
            title: e.target.title.value,
            description: e.target.description.value,
            price: e.target.price.value,
            category: e.target.category.value,
        };
        if(changedImage) {
            const data = new FormData();
            data.append("image", file);
            const res = await axios.post(
                "http://localhost:5000/upload",
                data
            );
            console.log(res.data.file);
            newProduct.image = res.data.file;
        } else {
            newProduct.image = product.image;
        }
        try {
            await axios.put("http://localhost:5000/product/update/" + id, newProduct);
            window.location.replace("/dashboard");
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="edit-product">
            <Header active="new" />
            <div className="edit-product-content">
                <h1>Rediger Produkt</h1>
                {product ? 
                <form onSubmit={updateProduct}>
                    <div className="edit-product-content-horizontal">
                        <div className="edit-product-content-left">
                            <input type="file" onChange={handleFileChange} accept="image/png, image/jpg, image/jpeg, image/gif" />
                            {imageUrl ? <img src={imageUrl} alt="Uploaded file" className="uploadedImg" /> : <img src={"http://localhost:5000/uploads/" + product.image} alt="Uploaded file" className="uploadedImg" />}
                        </div>
                        <div className="edit-product-content-right">
                            <label htmlFor="title">Tittel</label>
                            <input type="text" name="title" required defaultValue={product.title} />
                            <label htmlFor="description">Beskrivelse</label>
                            <textarea name="description" defaultValue={product.description} />
                            <label htmlFor="price">Pris</label>
                            <input type="number" name="price" required defaultValue={product.price} />
                            <label htmlFor="category">Kategori</label>
                            <select name="category">
                            {categories.map((e, i) => {
                                if(product.category === e) {
                                  return <option key={i} value={e} selected>{e}</option>
                                } else {
                                  return <option key={i} value={e}>{e}</option>
                                }
                            })}
                            </select>
                        </div>
                    </div>
                    <input type="submit" value="Oppdater" className="btn" />
                    <button className="btn-danger" onClick={deleteProduct}>Slett</button>
                </form> : <p>Loading...</p>}
            </div>
            <Footer />
        </div>
    );
};

export default ProductEdit;