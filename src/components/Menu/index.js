import { connect } from "react-redux"
import { refresh } from "../../actions/app"
import { selectAppIsLoading } from "../../selectors/app"
import component from "./Menu"

const mapStateToProps = (state) => ({
  isLoading: selectAppIsLoading(state),
})

const mapDispatchToProps = (dispatch) => ({
  refresh: () => dispatch(refresh()),
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
