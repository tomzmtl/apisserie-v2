import { ButtonBase } from "@material-ui/core"
import "./styles.scss"

const Button = ({ label, onClick, submit = false }) => {
  const props = {
    className: "Button",
    onClick,
    type: submit ? "submit" : "button"
  }

  return (
    <ButtonBase {...props}>
      {label}
    </ButtonBase>
  )
}

export default Button
