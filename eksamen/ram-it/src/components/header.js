const Header = (data) => {
    return (
        <header>
            <div className="header-top">
                <div className="header-content">
                    <div className="header-logo">
                        <h1 className="header-logo-text">Ram <span className="header-logo-accent">IT</span></h1>
                    </div>
                    <div className="header-links">
                        <a href="/cart" className="cart">
                            <ion-icon name="cart-sharp" size="large"></ion-icon>
                        </a>
                        <a href="/profile" className="profile">
                            <ion-icon name="person-sharp" size="large"></ion-icon>
                        </a>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="header-content">
                    <nav className="header-nav">
                        <a href="/" className={data.active === "all" ? "active" : ""}>Alle produkter</a>
                        <a href="/pc" className={data.active === "pc" ? "active" : ""}>PC</a>
                        <a href="/laptop" className={data.active === "laptop" ? "active" : ""}>Laptop</a>
                        <a href="/mobil" className={data.active === "mobil" ? "active" : ""}>Mobil</a>
                        <a href="/skjerm" className={data.active === "skjerm" ? "active" : ""}>Skjerm</a>
                        <a href="/tilbehor" className={data.active === "tilbehor" ? "active" : ""}>Tilbehør</a>
                        <a href="/hoyttaler" className={data.active === "hoyttaler" ? "active" : ""}>Høyttaler</a>
                        <a href="/kamera" className={data.active === "kamera" ? "active" : ""}>Kamera</a>
                        <a href="/lisens" className={data.active === "lisens" ? "active" : ""}>Lisenser</a>
                        <a href="/annet" className={data.active === "annet" ? "active" : ""}>Annet</a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;