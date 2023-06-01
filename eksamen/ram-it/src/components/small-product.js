const SmallProduct = (data) => {
    return (
        <a href={"/product-edit/" + data.id} className="small-product">
            <img src={"https://ramit-api.sigve.dev/uploads/" + data.image} alt={data.title} />
            <h4>{data.title}</h4>
            <p>{data.price} kr</p>
        </a>
    );
}

export default SmallProduct;