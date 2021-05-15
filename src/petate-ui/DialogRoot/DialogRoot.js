import { Dialog } from "@material-ui/core"

const DialogRoot = (props) => {
  return <Dialog {...props} PaperProps={{ square: true }} />
}

export default DialogRoot