import classNames from 'classnames/bind';
import Header from '~/components/Layout/components/Header';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className=" bg-[#f2f4f4] min-h-[100vh] flex-col">
            <Header />
            <div>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
