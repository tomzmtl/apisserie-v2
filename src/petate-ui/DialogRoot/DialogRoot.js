import { Dialog } from '@mui/material';

const DialogRoot = (props) => {
  return <Dialog {...props} PaperProps={{ square: true }} />
}

export default DialogRoot
