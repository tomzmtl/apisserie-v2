import './styles.scss'

const TextField = ({ value, onChange, placeholder, type, required = false }) => {
  return (
    <div className="TextField">
      <input
        className="TextField__input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required
      />
    </div>
  )
}

export default TextField