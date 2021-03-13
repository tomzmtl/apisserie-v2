import './styles.css';
import ProductList from '../ProductList';
import AddProduct from '../AddProduct';
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <ProductList />
      <AddProduct />
    </div>
  );
}

export default App;
