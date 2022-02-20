import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux'
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { store } from '../../store'
import App from "../App"

Amplify.configure(awsconfig);

const AppRoot = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

export default AppRoot;
