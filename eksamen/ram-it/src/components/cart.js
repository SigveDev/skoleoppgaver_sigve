import axios from "axios";

const Cart = (data) => {

    const changeQuantity = (id) => {
        const e = document.getElementById("amount-" + id).value;
        console.log(e);
        const change = async () => {
            try {
                const old = await axios.get("http://localhost:5000/cart/find/" + data.owner);
                const oldData = old.data[0];
                const newItems = oldData.items.map((item) => {
                    if (item.id === id) {
                        item.amount = e;
                    }
                    return item;
                }
                );
                const newCart = {
                    items: newItems,
                };
                await axios.put("http://localhost:5000/cart/update/" + data.owner, newCart);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
        change();
    };

    const removeItem = (id) => {
        const remove = async () => {
            try {
                const old = await axios.get("http://localhost:5000/cart/find/" + data.owner);
                const oldData = old.data[0];
                const newItems = oldData.items.filter((item) => item.id !== id);
                const newCart = {
                    items: newItems,
                };
                await axios.put("http://localhost:5000/cart/update/" + data.owner, newCart);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
        remove();
    };

    return (
        <div className="small-product">
            <a href={"/product/" + data.id}>
                <img src={"http://localhost:5000/uploads/" + data.image} alt={data.title} />
            </a>
            <div className="cart-info">
                <h4>{data.title}</h4>
                <p>{data.price} kr</p>
                <form>
                    <select onChange={() => {changeQuantity(data.id)}} id={"amount-" + data.id}>
                      {[...Array(10)].map((e, i) => {
                        if(parseInt(data.amount) === i + 1) {
                          return <option key={i} value={i + 1} selected>{i + 1}</option>
                        } else {
                          return <option key={i} value={i + 1}>{i + 1}</option>
                        }
                      })}
                    </select>
                </form>
                <button className="btn" onClick={() => {removeItem(data.id)}}>Fjern</button>
            </div>
        </div>
    );
}

export default Cart;