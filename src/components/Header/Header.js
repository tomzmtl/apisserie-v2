import API from '@aws-amplify/api';
import { ButtonBase, LinearProgress } from '@material-ui/core'
import { Edit, PlaylistAddCheck, ShoppingCart, Sync } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { API_NAME } from '../../constants';
import { useLoadProducts, useNavigation } from '../../hooks';
import { setProducts } from '../../redux/actions/products';
import "./styles.scss";

const Header = () => {
  const isLoading = useLoadProducts()
  const navigateTo = useNavigation()
  const dispatch = useDispatch()

  const onClickRefresh = () => {
    API
      .get(API_NAME, '/products/id')
      .then(response => dispatch(setProducts(response)))
      .catch(error => console.log(error.response));
  }

  return (
    <div className="Header">
      <ButtonBase onClick={() => navigateTo("/products")} centerRipple>
        <Edit />
      </ButtonBase>
      <ButtonBase onClick={() => navigateTo("/")} centerRipple>
        <PlaylistAddCheck />
      </ButtonBase>
      <ButtonBase onClick={() => navigateTo("/shop")} centerRipple>
        <ShoppingCart />
      </ButtonBase>
      <ButtonBase onClick={onClickRefresh} centerRipple>
        <Sync />
      </ButtonBase>
      {isLoading && <LinearProgress />}
    </div>
  )
}

export default Header