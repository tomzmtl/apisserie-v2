import { ButtonBase, LinearProgress } from '@material-ui/core'
import { List, PlaylistAddCheck, ShoppingCart, Sync, LocationOn, Menu } from '@material-ui/icons';
import { useLoadProducts } from '../../hooks/products';
import { useNavigation } from '../../hooks/navigation';
import "./styles.scss";
import { useLocation } from 'react-router';
import classnames from 'classnames';
import { useState } from 'react';

const Header = ({ isLoading }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { sendRequest } = useLoadProducts()
  const navigateTo = useNavigation()
  const location = useLocation()

  const onClickRefresh = () => {
    sendRequest()
  }

  const renderButton = (label, to, icon) => {
    const className = classnames("Header__button", {
      "Header__button--active": to === location.pathname
    })

    const handleClick = () => {
      navigateTo(to)
      setIsOpen(false)
    }

    return (
      <ButtonBase className={className} onClick={handleClick}>
        <div className="Header__buttonIcon">{icon}</div>
        <div className="Header__buttonLabel">{label}</div>
      </ButtonBase>
    )
  }

  const classes = classnames("Header", {
    "Header--open": isOpen
  })

  return (
    <div className={classes}>
      <div className="Header__backdrop" onClick={() => setIsOpen(false)}/>
      <div className="Header__wrapper">
        {renderButton("Produits", "/products", <List />)}
        {renderButton("Rayons", "/zones", <LocationOn />)}
        {renderButton("Liste", "/", <PlaylistAddCheck />)}
        {renderButton("À pisserie", "/shop", <ShoppingCart />)}
        <ButtonBase className="Header__button" onClick={onClickRefresh}>
          <div className="Header__buttonIcon"><Sync /></div>
          <div className="Header__buttonLabel">Rafraîchir</div>
        </ButtonBase>
      </div>
      <div className="Header__openButton">
        <ButtonBase onClick={() => setIsOpen(!isOpen)}>
          <Menu />
        </ButtonBase>
      </div>
      {isLoading && <LinearProgress />}
    </div>
  )
}

export default Header