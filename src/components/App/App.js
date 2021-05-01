import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import './normalize.css';
import './styles.scss';
import './theme.scss';
import ProductList from '../ProductList';
import AddProduct from '../AddProduct';
import Header from '../Header';
import ShopList from '../ShopList';
import ProductCard from '../ProductCard';
import ProductAdmin from '../ProductAdmin';
import ZoneAdmin from '../ZoneAdmin';
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
            <Route exact path="/products">
              <ProductAdmin />
            </Route>
            <Route exact path="/zones">
              <ZoneAdmin />
            </Route>
            <Route path="/shop">
              <ShopList />
            </Route>
            <Route path="/products/:productId">
              <ProductCard />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
