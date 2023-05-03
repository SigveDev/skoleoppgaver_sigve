const UserName = ({user}) => {
    return (
        <div className="userName">
            <h1 className="name" data-testid="userName-1"><span className="hello">Hello, </span>{user.displayName}</h1>
        </div>
    );
}

export default UserName;