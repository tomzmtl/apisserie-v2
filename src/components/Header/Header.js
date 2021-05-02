import { ButtonBase, LinearProgress } from '@material-ui/core'
import { List, PlaylistAddCheck, ShoppingCart, Sync, LocationOn } from '@material-ui/icons';
import { useLoadProducts } from '../../hooks/products';
import { useNavigation } from '../../hooks/navigation';
import "./styles.scss";

const Header = () => {
  const { isLoading, sendRequest } = useLoadProducts()
  const navigateTo = useNavigation()

  const onClickRefresh = () => {
    sendRequest()
  }

  const renderButton = (label, to, icon) => (
    <ButtonBase className="Header__button" onClick={() => navigateTo(to)} centerRipple>
      <div className="Header__buttonIcon">{icon}</div>
      <div className="Header__buttonLabel">{label}</div>
    </ButtonBase>
  )

  return (
    <div className="Header">
      {renderButton("Produits", "/products", <List />)}
      {renderButton("Rayons", "/zones", <LocationOn />)}
      {renderButton("Liste", "/", <PlaylistAddCheck />)}
      {renderButton("À pisserie", "/shop", <ShoppingCart />)}
      <ButtonBase className="Header__button" onClick={onClickRefresh} centerRipple>
        <div className="Header__buttonIcon"><Sync /></div>
        <div className="Header__buttonLabel">Rafraîchir</div>
      </ButtonBase>
      {isLoading && <LinearProgress />}
    </div>
  )
}

export default Header