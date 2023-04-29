const UserName = ({user}) => {
    return (
        <div className="userName">
            <h1 className="name"><span className="hello">Hello, </span>{user.displayName}</h1>
        </div>
    );
}

export default UserName;