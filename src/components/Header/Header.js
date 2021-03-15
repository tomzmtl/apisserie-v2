import API from '@aws-amplify/api';
import { ButtonBase } from '@material-ui/core'
import { Delete, PlaylistAddCheck, ShoppingCart, Sync } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { setProducts } from '../../redux/actions/products';
import "./styles.scss";

const Header = () => {
  const history = useHistory()
  const navigateTo = path => () => history.push(path)
  const dispatch = useDispatch()

  const onClickRefresh = () => {
    API
      .get('api41415b60', '/products/name')
      .then(response => dispatch(setProducts(response)))
      .catch(error => console.log(error.response));
  }

  return (
    <div className="Header">
      <ButtonBase onClick={navigateTo("/delete")} centerRipple>
        <Delete />
      </ButtonBase>
      <ButtonBase onClick={navigateTo("/")} centerRipple>
        <PlaylistAddCheck />
      </ButtonBase>
      <ButtonBase onClick={navigateTo("/shop")} centerRipple>
        <ShoppingCart />
      </ButtonBase>
      <ButtonBase onClick={onClickRefresh} centerRipple>
        <Sync />
      </ButtonBase>
    </div>
  )
}

export default Header