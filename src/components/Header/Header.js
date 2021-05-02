import { ButtonBase, LinearProgress } from '@material-ui/core'
import { List, PlaylistAddCheck, ShoppingCart, Sync, LocationOn } from '@material-ui/icons';
import { useLoadProducts } from '../../hooks/products';
import { useNavigation } from '../../hooks/navigation';
import "./styles.scss";
import { useLocation } from 'react-router';
import classnames from 'classnames';

const Header = () => {
  const { isLoading, sendRequest } = useLoadProducts()
  const navigateTo = useNavigation()
  const location = useLocation()

  const onClickRefresh = () => {
    sendRequest()
  }

  const renderButton = (label, to, icon) => {
    const className = classnames("Header__button", {
      "Header__button--active": to === location.pathname
    })

    return (
      <ButtonBase className={className} onClick={() => navigateTo(to)}>
        <div className="Header__buttonIcon">{icon}</div>
        <div className="Header__buttonLabel">{label}</div>
      </ButtonBase>
    )
  }

  return (
    <div className="Header">
      {renderButton("Produits", "/products", <List />)}
      {renderButton("Rayons", "/zones", <LocationOn />)}
      {renderButton("Liste", "/", <PlaylistAddCheck />)}
      {renderButton("À pisserie", "/shop", <ShoppingCart />)}
      <ButtonBase className="Header__button" onClick={onClickRefresh}>
        <div className="Header__buttonIcon"><Sync /></div>
        <div className="Header__buttonLabel">Rafraîchir</div>
      </ButtonBase>
      {isLoading && <LinearProgress />}
    </div>
  )
}

export default Header