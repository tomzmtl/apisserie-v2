import { Alert, Snackbar, Slide } from "@mui/material"
import { useState } from "react"
import Drawer from "."

export const useProductEdit = () => {
  const [productId, setProductId] = useState(null)
  const [message, setMessage] = useState("Done!")
  const [name, setName] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isOpenNotification, setIsOpenNotification] = useState(false)

  const handleCloseDrawer = (e, reason) => {
    if (reason === "clickaway") {
      return
    }

    setIsDrawerOpen(false)
  }

  const handleCloseNotification = () => {
    setIsOpenNotification(false)
  }

  const notificationProps = {
    open: isOpenNotification,
    autoHideDuration: 3000,
    onClose: handleCloseNotification,
    TransitionComponent: Slide,
    anchorOrigin: { vertical: "top", horizontal: "center" },
  }

  const drawerProps = {
    onClose: handleCloseDrawer,
    onAfterSave: (message) => {
      setIsDrawerOpen(false)
      setIsOpenNotification(true)
      setMessage(message)
    },
    productId,
    add: name,
    isOpen: isDrawerOpen,
  }

  return {
    productEditComponents: (
      <>
        <Snackbar {...notificationProps}>
          <Alert
            onClose={handleCloseNotification}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
        <Drawer {...drawerProps} />
      </>
    ),
    openProductEdit: (productId, name) => {
      setProductId(productId)
      setName(name)
      setIsDrawerOpen(true)
    },
  }
}
