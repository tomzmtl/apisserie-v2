import { connect } from 'react-redux'
import { selectAppIsLoading } from '../../selectors/app'
import component from "./Header"

const mapStateToProps = state => ({
  isLoading: selectAppIsLoading(state)
})

export default connect(mapStateToProps)(component)