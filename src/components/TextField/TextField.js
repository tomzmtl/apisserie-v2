import './styles.scss'

const TextField = ({ value, onChange, placeholder }) => {
  return (
    <div className="TextField">
      <input
        className="TextField__input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextField