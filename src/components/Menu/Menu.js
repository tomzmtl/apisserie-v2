import {
  LinearProgress,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Menu as MuiMenu,
  MenuItem,
  ListItemIcon,
  MenuList,
  ListItemText,
} from "@mui/material"
import {
  Storefront,
  PlaylistAddCheck,
  Inventory,
  Refresh,
  MenuBook,
  MiscellaneousServices,
} from "@mui/icons-material"
import { useNavigation } from "../../hooks/navigation"
import "./styles.scss"
import { useLocation } from "react-router"
import { useRef, useState } from "react"

const BUTTONS = {
  "/zones": { label: "Rayons", Icon: Storefront },
  "/inventory": { label: "Inventaire", Icon: Inventory },
  "/": { label: "Liste", Icon: PlaylistAddCheck },
  // "/recipes" :  { label: "Recettes"  , Icon: MenuBook         },
}

const Menu = ({ isLoading, refresh }) => {
  const navigateTo = useNavigation()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  const handleTabClick = (e, value) => {
    navigateTo(value)
  }

  const renderButtons = () =>
    Object.entries(BUTTONS)
      .map(([path, { label, Icon }]) => {
        return (
          <BottomNavigationAction
            key={path}
            label={label}
            icon={<Icon />}
            value={path}
          />
        )
      }, [])
      .concat(
        <BottomNavigationAction
          ref={menuRef}
          key="tools"
          label="Outils"
          icon={<MiscellaneousServices />}
          onClick={() => {
            setOpen(true)
          }}
        />
      )

  const menuProps = {
    open,
    anchorEl: menuRef.current,
    onClose: () => {
      setOpen(false)
    },
    transformOrigin: { horizontal: "right", vertical: "bottom" },
    anchorOrigin: { horizontal: "right", vertical: "bottom" },
    BackdropProps: { invisible: false },
    sx: { width: "100%" },
  }

  const handleRefresh = () => {
    refresh()
    setOpen(false)
  }

  return (
    <div className="Menu">
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
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
      <MuiMenu {...menuProps}>
        <MenuList>
          <MenuItem onClick={handleRefresh}>
            <ListItemIcon>
              <Refresh fontSize="small" />
            </ListItemIcon>
            <ListItemText>Refresh</ListItemText>
          </MenuItem>
        </MenuList>
      </MuiMenu>
    </div>
  )
}

export default Menu
