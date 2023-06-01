const SmallOrder = (data) => {
    return (
        <a href={"/order-info/" + data.id} className="small-order">
            <h3>{data.owner}</h3>
            <p className="order-id">Order id: {data.id}</p>
            <h5>{data.price} kr</h5>
            <p className="order-date">{new Date(data.date).toDateString()}</p>
        </a>
    );
}

export default SmallOrder;