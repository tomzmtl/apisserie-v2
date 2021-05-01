import './styles.scss'

const TextField = ({ value, onChange, placeholder, type }) => {
  return (
    <div className="TextField">
      <input
        className="TextField__input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  )
}

export default TextField