const NavBar = ({id}) => {
    switch (id) {
        case "home":
            return (
                <div className="navBar">
                    <a href="/" className="navElem active"><ion-icon name="people-sharp"></ion-icon></a>
                    <a href="/days" className="navElem"><ion-icon name="calendar-clear-sharp"></ion-icon></a>
                    <a href="/pr" className="navElem"><ion-icon name="barbell-sharp"></ion-icon></a>
                    <a href="/profile" className="navElem"><ion-icon name="person-sharp"></ion-icon></a>
                </div>
            );
        case "plan":
            return (
                <div className="navBar">
                    <a href="/" className="navElem"><ion-icon name="people-sharp"></ion-icon></a>
                    <a href="/days" className="navElem active"><ion-icon name="calendar-clear-sharp"></ion-icon></a>
                    <a href="/pr" className="navElem"><ion-icon name="barbell-sharp"></ion-icon></a>
                    <a href="/profile" className="navElem"><ion-icon name="person-sharp"></ion-icon></a>
                </div>
            );
        case "pr":
            return (
                <div className="navBar">
                    <a href="/" className="navElem"><ion-icon name="people-sharp"></ion-icon></a>
                    <a href="/days" className="navElem"><ion-icon name="calendar-clear-sharp"></ion-icon></a>
                    <a href="/pr" className="navElem active"><ion-icon name="barbell-sharp"></ion-icon></a>
                    <a href="/profile" className="navElem"><ion-icon name="person-sharp"></ion-icon></a>
                </div>
            );
        case "profile":
            return (
                <div className="navBar">
                    <a href="/" className="navElem"><ion-icon name="people-sharp"></ion-icon></a>
                    <a href="/days" className="navElem"><ion-icon name="calendar-clear-sharp"></ion-icon></a>
                    <a href="/pr" className="navElem"><ion-icon name="barbell-sharp"></ion-icon></a>
                    <a href="/profile" className="navElem active"><ion-icon name="person-sharp"></ion-icon></a>
                </div>
            );
        default:
            return (
                <div className="navBar">
                    <a href="/" className="navElem"><ion-icon name="people-sharp"></ion-icon></a>
                    <a href="/days" className="navElem"><ion-icon name="calendar-clear-sharp"></ion-icon></a>
                    <a href="/pr" className="navElem"><ion-icon name="barbell-sharp"></ion-icon></a>
                    <a href="/profile" className="navElem"><ion-icon name="person-sharp"></ion-icon></a>
                </div>
            );
    }
}

export default NavBar;