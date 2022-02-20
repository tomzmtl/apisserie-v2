import "./styles.scss"

const Select = ({ options = [], onChange, value }) => {
  console.log(3333, options);
  const renderOptions = () => {
    return options.map(opt => {
      return <option key={opt.value} value={opt.value}>{opt.label || opt.value}</option>
    })
  }

  return (
    <select className="Select" onChange={onChange} value={value}>
      {renderOptions()}
    </select>
  )
}

export default Select
