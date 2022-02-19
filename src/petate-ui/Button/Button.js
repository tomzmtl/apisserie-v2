import { ButtonBase } from "@material-ui/core"
import classnames from "classnames"
import "./styles.scss"

const Button = ({
  className,
  label = null,
  onClick,
  icon = null,
  submit = false,
  variant = null,
  disabled = false
}) => {
  const props = {
    className: classnames("Button", className, {
      "Button--withIcon": !!icon,
      "Button--withLabel": !!label,
      "Button--disabled": disabled,
      [`Button--variant-${variant}`]: variant,
    }),
    onClick,
    type: submit ? "submit" : "button",
    disabled
  }

  return (
    <ButtonBase {...props}>
      {icon && <div className="Button__icon">{icon}</div>}
      {label && <div className="Button__label">{label}</div>}
    </ButtonBase>
  )
}

export default Button
