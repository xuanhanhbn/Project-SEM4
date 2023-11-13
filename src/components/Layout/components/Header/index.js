import './Header.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

// const cx = classNames.bind(styles);

function Header() {
    return (
        <header className="wrapper">
            <div className="content">
                <div>
                    <img src={images.logo} alt="Logo" />
                </div>
                <div className="topnav">
                    <Link className="active" to="/">
                        Home
                    </Link>
                    <Link to="/following">Following</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/search">Search</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
