import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import './normalize.css';
import './styles.scss';
import './theme.scss';
import ProductList from '../ProductList';
import Header from '../Header';
import ShopList from '../ShopList';
import ProductAdmin from '../ProductAdmin';
import ZoneAdmin from '../ZoneAdmin';
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { store } from '../../store'

Amplify.configure(awsconfig);

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header />
          <div className="App__content">
            <Switch>
              <Route exact path="/">
                <ProductList />
              </Route>
              <Route exact path="/products">
                <ProductAdmin />
              </Route>
              <Route exact path="/zones">
                <ZoneAdmin />
              </Route>
              <Route path="/shop">
                <ShopList />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
