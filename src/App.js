import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout, LayoutAdmin } from '~/components/Layout';
import '../src/components/GlobalStyles/font-awesome-6.4.2-pro-main/css/all.css';
import { AdminRouter } from './routes/routeAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from './store/zustand';
import { shallow } from 'zustand/shallow';

function App() {
    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

    const [type, setType] = useState('USER');

    useEffect(() => {
        if (userData && userData?.role) {
            return setType(userData?.role);
        }
        return setType('USER');
    }, [userData]);

    // Xử lý check type
    const handleReturnRouter = () => {
        if (type === 'USER') {
            return publicRoutes;
        }
        return AdminRouter;
    };

    const handleReturnLayout = () => {
        if (type === 'USER') {
            return DefaultLayout;
        }
        return LayoutAdmin;
    };

    return (
        <Router>
            <div className="App">
                <ToastContainer />

                <Routes>
                    {handleReturnRouter().map((route, index) => {
                        const Page = route.component;
                        let Layout = handleReturnLayout();

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
