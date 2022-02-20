import { ButtonBase } from '@mui/material';
import { Close } from '@mui/icons-material';
import classNames from 'classnames'
import './styles.scss'

const TextField = ({
  value,
  onChange,
  placeholder,
  type,
  required = false,
  isInvalid = false,
  onEmpty
}) => {
  const isEmpty = value === ""

  const classes = classNames({
    TextField: true,
    'TextField--error': isInvalid,
    'TextField--empty': isEmpty
  })

  const emptyBtnProps = {
    className: "TextField__empty",
    onClick: onEmpty,
    disabled: isEmpty
  }

  return (
    <div className={classes}>
      <input
        className="TextField__input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required={required}
      />
      {onEmpty && (
        <ButtonBase {...emptyBtnProps}>
          <Close/>
        </ButtonBase>
      )}
    </div>
  )
}

export default TextField
