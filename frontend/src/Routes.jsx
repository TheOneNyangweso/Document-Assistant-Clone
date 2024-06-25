import Home from './components/Home';
import DocumentViewer from './components/DocumentViewer';
import Login from './components/Login';
import Register from './components/Register';

const Routes = {
  '/home': () => <Home />,
  '/user/login': () => <Login />,
  '/user/signup': () => <Register />,
  '/analyzer': () => <DocumentViewer />,
};

export default Routes;
