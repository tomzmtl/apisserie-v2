import { connect } from 'react-redux'
import { selectAppIsLoading } from '../../selectors/app'
import component from "./Menu"

const mapStateToProps = state => ({
  isLoading: selectAppIsLoading(state)
})

export default connect(mapStateToProps)(component)
