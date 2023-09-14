const Product = (data) => {
    return (
        <a href={"/product/" + data.id} className="product">
            <img src={"https://ramit-api.hcklikk.com/uploads/" + data.image} alt={data.title} />
            <h4>{data.title}</h4>
            <p>{data.price} kr</p>
            {data.amount ? <p className="product-amount">Antal: {data.amount}</p> : null}
        </a>
    );
}

export default Product;