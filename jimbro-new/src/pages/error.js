import '../App.css';

const Error = () => {
    return (
        <div className="error">
            <h1>Error: 404</h1>
            <br />
            <h2>Page not found</h2>
            <a href="/" className="oldLink">home</a>
        </div>
    );
}

export default Error;