import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './styles.css';
import ProductList from '../ProductList';
import AddProduct from '../AddProduct';
import Header from '../Header';
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <ProductList /> 
            <AddProduct />
          </Route>
          <Route path="/delete">
            {/* <About /> */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
