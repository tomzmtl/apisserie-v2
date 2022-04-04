import { connect } from "react-redux"
import { selectRefreshTimestamp } from "../../selectors/app"
import component from "./App"

const mapStateToProps = state => ({
  ts: selectRefreshTimestamp(state)
})

export default connect(mapStateToProps)(component)
