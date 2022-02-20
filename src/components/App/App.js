import { Switch, Route } from "react-router-dom";
import './normalize.css';
import './styles.scss';
import './theme.scss';
import ProductList from '../ProductList';
import Header from '../Header';
import ShopList from '../ShopList';
import ProductAdmin from '../ProductAdmin';
import ZoneAdmin from '../ZoneAdmin';
import { useLoadProducts } from '../../hooks/products';
import { useLoadZones } from '../../hooks/zones';

const App = () => {
  useLoadProducts()
  useLoadZones()

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
