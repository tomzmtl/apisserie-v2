import { ButtonBase, LinearProgress, SpeedDial } from '@mui/material';
import { PlaylistAddCheck, ShoppingCart, Storefront, Apps, Close } from '@mui/icons-material';
import { useNavigation } from '../../hooks/navigation';
import "./styles.scss";
import { useLocation } from 'react-router';
import classnames from 'classnames';
import { useState } from 'react';

const Header = ({ isLoading }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigateTo = useNavigation()
  const location = useLocation()

  const renderButton = (label, to, icon) => {
    const className = classnames("Header__button", {
      "Header__button--active": to === location.pathname
    })

    const handleClick = () => {
      navigateTo(to)
      setIsOpen(false)
    }

    return (
      <ButtonBase className={className} onClick={handleClick} title={label}>
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
        <div className="Header__menu">
          {renderButton("Rayons", "/zones", <Storefront />)}
          {renderButton("Inventaire", "/", <PlaylistAddCheck />)}
          {renderButton("À pisserie", "/shop", <ShoppingCart />)}
        </div>
      </div>
      <SpeedDial
        className="Header__openButton"
        ariaLabel="Menu"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={isOpen ? <Close /> : <Apps />}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isLoading && <LinearProgress />}
    </div>
  )
}

export default Header
