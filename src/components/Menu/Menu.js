import { LinearProgress, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Storefront } from '@mui/icons-material';
import { useNavigation } from '../../hooks/navigation';
import "./styles.scss";
import { useLocation } from 'react-router';

const BUTTONS = {
  "/zones": { label: "Rayons"    , Icon: Storefront },
  "/"     : { label: "Inventaire", Icon: Storefront },
  "/list" : { label: "Liste"     , Icon: Storefront },
}

const Menu = ({ isLoading }) => {
  const navigateTo = useNavigation()
  const location = useLocation()

  const handleTabClick = (e, value) => {
    navigateTo(value)
  }

  const renderButtons = () => 
    Object.entries(BUTTONS).map(([path, {label, Icon}]) => {
      return (
        <BottomNavigationAction
          key={path}
          label={label}
          icon={<Icon />}
          value={path}
        />
      )
    }, [])

  return (
    <div className="Menu">
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={location.pathname}
          onChange={handleTabClick}
        >
          {renderButtons()}
        </BottomNavigation>
      </Paper>
      {isLoading && <LinearProgress />}
    </div>
  )
}

export default Menu
