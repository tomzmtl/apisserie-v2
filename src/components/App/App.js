import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import './normalize.css';
import './styles.scss';
import './theme.scss';
import ProductList from '../ProductList';
import AddProduct from '../AddProduct';
import Header from '../Header';
import ShopList from '../ShopList';
import DeleteProducts from '../DeleteProducts';
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { store } from '../../redux/store'

Amplify.configure(awsconfig);

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <ProductList />
              <AddProduct />
            </Route>
            <Route path="/delete">
              <DeleteProducts />
            </Route>
            <Route path="/shop">
              <ShopList />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
