import '../App.css';

const PleaseLogin = () => {

    const toLogin = () => {
        window.open("/login", "_self");
    }

    return (
        <div className="pleaseLogin">
            <h1>Log in to view this page...</h1>
            <h2 className="toLogin" onClick={toLogin}>To login</h2>
        </div>
    );
}

export default PleaseLogin;