import { ButtonBase } from '@material-ui/core'
import { Delete, PlaylistAddCheck } from '@material-ui/icons';
import { useHistory } from 'react-router-dom'
import "./styles.scss";

const Header = () => {
  const history = useHistory()
  const navigateTo = path => () => history.push(path)

  return (
    <div className="Header">
      <ButtonBase onClick={navigateTo("/delete")}>
        <Delete />
      </ButtonBase>
      <ButtonBase onClick={navigateTo("/")}>
        <PlaylistAddCheck />
      </ButtonBase>
    </div>
  )
}

export default Header