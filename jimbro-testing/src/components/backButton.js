//dette er en compoennt som kan tas i bruk på flere sider for å gå tilbake til spesifisert side, og passer på at alle får samme styling
const BackButton = ({whereTo}) => {
    return (
        <a href={whereTo} className="planSiteHeader">
            <ion-icon name="chevron-back"></ion-icon>
            <h2 className="backText">Back</h2>
        </a>
    )
}

export default BackButton;