import classnames from 'classnames'
import './styles.scss'

const Card = ({ children, isActive, onClick, className }) => {
  const classes = classnames({
    Card: true,
    'Card--active': isActive,
    'Card--interactive': onClick
  }, className)

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card