const SmallProduct = (data) => {
    return (
        <a href={"/product-edit/" + data.id} className="smaller-product">
            <img src={"https://ramit-api.hcklikk.com/uploads/" + data.image} alt={data.title} />
            <h4>{data.title}</h4>
            <p>{data.price} kr</p>
        </a>
    );
}

export default SmallProduct;