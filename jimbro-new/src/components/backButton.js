const BackButton = ({whereTo}) => {
    return (
        <a href={whereTo} className="planSiteHeader">
            <ion-icon name="chevron-back"></ion-icon>
            <h2 className="backText">Back</h2>
        </a>
    )
}

export default BackButton;