import { LinearProgress, SpeedDial, MenuList, MenuItem, ListItemIcon, 
ListItemText } from '@mui/material';
import { PlaylistAddCheck, ShoppingCart, Storefront, Apps, Close } from '@mui/icons-material';
import { useNavigation } from '../../hooks/navigation';
import "./styles.scss";
import { useLocation } from 'react-router';
import classnames from 'classnames';
import { useState } from 'react';

const Menu = ({ isLoading }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigateTo = useNavigation()
  const location = useLocation()

  const renderButton = (label, to, icon) => {
    const handleClick = () => {
      navigateTo(to)
      setIsOpen(false)
    }

    return (
      <MenuItem onClick={handleClick} title={label} selected={to === location.pathname}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText className="Menu__buttonLabel">{label}</ListItemText>
      </MenuItem>
    )
  }

  const classes = classnames("Menu", {
    "Menu--open": isOpen
  })

  return (
    <div className={classes}>
      <div className="Menu__backdrop" onClick={() => setIsOpen(false)}/>
      <div className="Menu__wrapper">
        <MenuList>
          {renderButton("Rayons", "/zones", <Storefront fontSize="small" />)}
          {renderButton("Inventaire", "/", <PlaylistAddCheck fontSize="small" />)}
          {renderButton("À pisserie", "/shop", <ShoppingCart fontSize="small" />)}
        </MenuList>
      </div>
      <SpeedDial
        className="Menu__openButton"
        ariaLabel="Menu"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={isOpen ? <Close /> : <Apps />}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isLoading && <LinearProgress />}
    </div>
  )
}

export default Menu
