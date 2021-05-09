import "./styles.scss"

const DialogHeader = ({ title }) => {
  return (
    <div className="DialogHeader">
      <div className="DialogHeader__title">
        {title}
      </div>
    </div>
  )
}

export default DialogHeader