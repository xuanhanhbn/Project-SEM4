import classNames from 'classnames/bind';
import Header from '~/components/Layout/components/Header';
import styles from './DefaultLayout.module.scss';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className=" bg-[#f2f4f4] min-h-[100vh] flex-col cursor-grabbing">
            <Header />
            <div>
                <div>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
