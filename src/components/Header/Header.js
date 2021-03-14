import { ButtonBase } from '@material-ui/core'
import { Settings, PlaylistAdd } from '@material-ui/icons';
import { useHistory } from 'react-router-dom'
import "./styles.scss";

const Header = () => {
  const history = useHistory()
  const navigateTo = path => () => history.push(path)

  return (
    <div className="Header">
      <ButtonBase onClick={navigateTo("/admin")}>
        <Settings />
      </ButtonBase>
      <ButtonBase onClick={navigateTo("/")}>
        <PlaylistAdd />
      </ButtonBase>
    </div>
  )
}

export default Header