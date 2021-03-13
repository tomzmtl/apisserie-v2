import "./styles.css";
import { ButtonBase } from '@material-ui/core'
import { Settings } from '@material-ui/icons';

const Header = () => {
  return (
    <div className="Header">
      <ButtonBase>
        <Settings />
      </ButtonBase>
    </div>
  )
}

export default Header