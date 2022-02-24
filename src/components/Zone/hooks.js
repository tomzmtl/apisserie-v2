import { Alert, Snackbar, Slide } from "@mui/material"
import { useState } from "react"
import Drawer from "."

export const useZoneEdit = () => {
  const [zoneId, setZoneId] = useState(null)
  const [message, setMessage] = useState("Done!")
  const [name, setName] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  const handleCloseDrawer = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsDrawerOpen(false);
  };

  const handleCloseNotification = () => {
    setIsOpenNotification(false);
  };

  const notificationProps = {
    open: isOpenNotification,
    autoHideDuration: 3000,
    onClose: handleCloseNotification,
    TransitionComponent: Slide,
    anchorOrigin: { vertical: "top", horizontal: "center" }
  }

  const drawerProps = {
    onClose: handleCloseDrawer,
    onAfterSave: (message) => {
      setIsDrawerOpen(false)
      setIsOpenNotification(true)
      setMessage(message)
    },
    zoneId,
    add: name,
    isOpen: isDrawerOpen
  } 

  return {
    zoneEditComponents: (
      <>
        <Snackbar {...notificationProps}>
          <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <Drawer {...drawerProps} />
      </>
    ),
    openZoneEdit: (zoneId, name) => {
      setZoneId(zoneId)
      setName(name)
      setIsDrawerOpen(true)
    }
  }
}
