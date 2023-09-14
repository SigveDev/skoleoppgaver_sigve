import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import axios from "axios";

const NewProduct = ({ user }) => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            title: e.target.title.value,
            description: e.target.description.value,
            price: e.target.price.value,
            category: e.target.category.value,
        };
        const data = new FormData();
        data.append("image", file);
        const res = await axios.post(
            "https://ramit-api.hcklikk.com/upload",
            data
        );
        console.log(res.data.file);
        newProduct.image = res.data.file;
        try {
            await axios.post("https://ramit-api.hcklikk.com/product/create", newProduct);
            window.location.replace("https://ramit.hcklikk.com/");
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log(user);
        if(user !== null) {
            if(!user.isAdmin) {
                window.location.replace("/profile");
            }
        }
    }, [user]);

    return (
        <div className="new-product">
            <Header active="new" />
            <div className="new-product-content">
                <h1>Nytt produkt</h1>
                <form onSubmit={handleSubmit}>
                    <div className="new-product-content-horizontal">
                        <div className="new-product-content-left">
                            <input type="file" onChange={handleFileChange} accept="image/png, image/jpg, image/jpeg, image/gif" />
                            {imageUrl && <img src={imageUrl} alt="Uploaded file" className="uploadedImg" />}
                        </div>
                        <div className="new-product-content-right">
                            <label htmlFor="title">Tittel</label>
                            <input type="text" name="title" required />
                            <label htmlFor="description">Beskrivelse</label>
                            <textarea name="description" />
                            <label htmlFor="price">Pris</label>
                            <input type="number" name="price" required />
                            <label htmlFor="category">Kategori</label>
                            <select name="category">
                                <option value="pc">PC</option>
                                <option value="laptop">Laptop</option>
                                <option value="mobil">Mobil</option>
                                <option value="skjerm">Skjerm</option>
                                <option value="tilbehor">Tilbehør</option>
                                <option value="hoyttaler">Høyttaler</option>
                                <option value="kamera">Kamera</option>
                                <option value="lisens">Lisens</option>
                                <option value="annet">Annet</option>
                            </select>
                        </div>
                    </div>
                    <input type="submit" value="Legg til" className="btn" />
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default NewProduct;