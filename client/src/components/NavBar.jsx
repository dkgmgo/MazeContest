function NavBar() {
    const links = [
        { name: 'Players List', path: '/upload' },
        { name: 'Train', path: '/train' },
        { name: 'Play', path: '/play' },
        { name: 'Learn', path: '/learn' }
    ]

    const handleClicks = (e) => {
        if (e) {
            console.log(e.target);
            const a = e.target.querySelector("a");
            if (a) {
                a.click();
            }
        }
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-primary text-white text-center">
                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#drawer" aria-controls="drawer">
                    <i className="fa fa-bars mx-2"></i>
                    Menu
                </button>
                <div className="mx-auto order-0">
                    <h1 className="navbar-brand mx-auto">
                        <span>MAZE</span>
                        <span className="text-secondary"> Contest</span>
                    </h1>
                </div>
            </nav>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="drawer" aria-labelledby="drawerLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="drawerLabel">Menu</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        <ul className="list-group">
                            {links.map((link, index) => (
                                <li key={index} className="list-group-item" onClick={(e) => {
                                    handleClicks(e);
                                }}>
                                    <a href={link.path} className="text-decoration-none text-dark">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;