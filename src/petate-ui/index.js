import DialogActions from "./DialogActions"
import DialogContent from "./DialogContent"
import DialogHeader from "./DialogHeader"
import DialogRoot from "./DialogRoot"

export { default as Button } from "./Button"
export { default as Select } from "./Select"
export { default as TextField } from "./TextField"

export const Dialog = {
  Root: DialogRoot,
  Actions: DialogActions,
  Content: DialogContent,
  Header: DialogHeader
}