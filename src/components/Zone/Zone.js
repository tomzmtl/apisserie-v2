import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Drawer, Paper, TextField, Stack } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Delete, Save, Send } from "@mui/icons-material"
import { v4 as uuid } from "uuid"
import { selectZonesByName } from "../../selectors/zones"
import { updateZone, deleteZone } from "../../actions/zones"
import * as api from "../../api/zones"
import { difference } from "lodash-es"

const INITIAL_LOADING = {
  delete: false,
  save: false,
}

const Zone = ({ onAfterSave, onClose, zoneId, isOpen, add = null }) => {
  const isEditMode = !!zoneId
  const isCreateMode = !isEditMode

  const dispatch = useDispatch()
  const zones = useSelector(selectZonesByName)
  const zId = add ? null : zoneId
  const zone = zones.find((z) => z.id === zoneId)

  const [name, setName] = useState(add ?? zone?.name ?? "")
  const [order, setOrder] = useState(zone?.order || "1")

  const [isLoading, setIsLoading] = useState(INITIAL_LOADING)

  const handleClose = () => {
    onClose()
    setIsLoading(INITIAL_LOADING)
  }

  useEffect(() => {
    if (zone) {
      setName(zone.name)
      setOrder(zone.order)
    } else {
      setName("")
      setOrder("1")
    }
  }, [zone])

  if (!zone && add === null) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading({ ...isLoading, save: true })

    const body = {
      id: isCreateMode ? uuid() : zone.id,
      name,
      order: Number(order),
    }

    api
      .putZone(body)
      .then(() => {
        dispatch(updateZone(body))
        onAfterSave?.(isCreateMode ? `${name} ajouté` : `${name} mis à jour`)
      })
      .finally(() => {
        setIsLoading({ ...isLoading, save: false })
      })
  }

  const handleChangeName = (e) => setName(e.target.value)
  const handleChangeOrder = (e) => setOrder(e.target.value)

  const handleDelete = () => {
    const confirm = window.confirm(`Supprimer ${zone.name}?`)

    if (!confirm) {
      return
    }

    setIsLoading({ ...isLoading, delete: true })

    api
      .deleteZone(zone.id)
      .then(() => {
        dispatch(deleteZone(zone.id))
        onAfterSave?.(`${name} supprimé`)
      })
      .finally(() => {
        setIsLoading({ ...isLoading, delete: false })
      })
  }

  const existingZoneNames = difference(
    zones.map((z) => z.name),
    isCreateMode ? [] : [zone.name]
  )

  const isNameInvalid = existingZoneNames.includes(name)

  const nameFieldProps = {
    value: name,
    placeholder: "Name",
    label: "Name",
    onChange: handleChangeName,
    required: true,
    error: isNameInvalid,
    sx: { width: "100%", mb: 2 },
  }

  const orderFieldProps = {
    value: order,
    placeholder: "Order",
    label: "Order",
    onChange: handleChangeOrder,
    required: true,
    inputProps: { inputMode: "numeric", pattern: "[0-9]*" },
    sx: { width: "100%", mb: 2 },
  }

  const deleteBtnProps = {
    onClick: handleDelete,
    endIcon: <Delete />,
    sx: { marginRight: "auto" },
    variant: "outlined",
    color: "error",
    loading: isLoading.delete,
    disabled: isLoading.save,
  }

  const confirmBtnProps = {
    label: zId ? "Mettre à jour" : "Ajouter",
    icon: <Save />,
    type: "submit",
    disabled: isNameInvalid || isLoading.delete,
    endIcon: <Send />,
    variant: "contained",
    loading: isLoading.save,
  }

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={handleClose}>
      <Paper square sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField {...nameFieldProps} />
          <TextField {...orderFieldProps} />

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 3 }}
          >
            {zId && (
              <LoadingButton {...deleteBtnProps}>Supprimer</LoadingButton>
            )}
            <LoadingButton {...confirmBtnProps}>
              {add ? "Ajouter" : "Mettre à jour"}
            </LoadingButton>
          </Stack>
        </form>
      </Paper>
    </Drawer>
  )
}

export default Zone
