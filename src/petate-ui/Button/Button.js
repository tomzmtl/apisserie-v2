import { ButtonBase } from "@material-ui/core"
import classnames from "classnames"
import "./styles.scss"

const Button = ({
  className,
  label = null,
  onClick,
  icon = null,
  submit = false,
  danger = false
}) => {
  const props = {
    className: classnames("Button", className, {
      "Button--withIcon": !!icon,
      "Button--withLabel": !!label,
      "Button--danger": danger,
    }),
    onClick,
    type: submit ? "submit" : "button"
  }

  return (
    <ButtonBase {...props}>
      {icon && <div className="Button__icon">{icon}</div>}
      {label && <div className="Button__label">{label}</div>}
    </ButtonBase>
  )
}

export default Button
