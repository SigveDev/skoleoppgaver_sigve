const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <h2>Om oss:</h2>
                    <h4>
                        Ram IT er en nettbutikk som selger datautstyr og lisenser.
                    </h4>
                    <p>
                        ©2023 by Ram IT
                    </p>
                </div>
                <div className="footer-content-right">
                    <h2>Kontakt oss</h2>
                    <p>
                        <a href="mailto:
                            contact@ramit.no
                        ">
                            contact@ramit.no
                        </a>
                    </p>
                    <p>
                        <a href="tel:
                            +47 123 45 678
                        ">
                        +47 123 45 678
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;