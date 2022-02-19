import classNames from 'classnames'
import './styles.scss'

const TextField = ({
  value,
  onChange,
  placeholder,
  type,
  required = false,
  isInvalid = false
}) => {
  const classes = classNames({
    TextField: true,
    'TextField--error': isInvalid
  })

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
    </div>
  )
}

export default TextField
