import { ButtonBase, LinearProgress } from '@material-ui/core'
import { Edit, PlaylistAddCheck, ShoppingCart, Sync, LocationOn } from '@material-ui/icons';
import { useLoadProducts, useNavigation } from '../../hooks';
import "./styles.scss";

const Header = () => {
  const { isLoading, sendRequest } = useLoadProducts()
  const navigateTo = useNavigation()

  const onClickRefresh = () => {
    sendRequest()
  }

  return (
    <div className="Header">
      <ButtonBase onClick={() => navigateTo("/products")} centerRipple>
        <Edit />
      </ButtonBase>
      <ButtonBase onClick={() => navigateTo("/zones")} centerRipple>
        <LocationOn />
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