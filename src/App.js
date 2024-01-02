import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout, LayoutAdmin } from '~/components/Layout';
import '../src/components/GlobalStyles/font-awesome-6.4.2-pro-main/css/all.css';
import { AdminRouter } from './routes/routeAdmin';

function App() {
    const type = 'user';

    // Xử lý check type
    const handleReturnRouter = () => {
        if (type === 'admin') {
            return publicRoutes;
        } else {
            return AdminRouter;
        }
    };

    const handleReturnLayout = () => {
        if (type === 'admin') {
            return DefaultLayout;
        } else {
            return LayoutAdmin;
        }
    };

    return (
        <Router>
            <div className="App">
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
