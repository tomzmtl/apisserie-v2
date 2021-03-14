import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import './styles.css';
import ProductList from '../ProductList';
import AddProduct from '../AddProduct';
import Header from '../Header';
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';
import Card from '../Card';
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
              <Card>
                <AddProduct />
              </Card>
            </Route>
            <Route path="/delete">
              {/* <About /> */}
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
