import { useState } from "react"
import Zone from "."

export const useZoneEdit = () => {
  const [zoneId, setZoneId] = useState(null)
  const [name, setName] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const editProps = {
    onAfterSave: () => setIsOpen(false),
    zoneId,
    add: name,
    isOpen
  } 

  return {
    zoneEdit: <Zone {...editProps} />,
    openZoneEdit: (zoneId, name) => {
      setZoneId(zoneId)
      setName(name)
      setIsOpen(true)
    }
  }
}
