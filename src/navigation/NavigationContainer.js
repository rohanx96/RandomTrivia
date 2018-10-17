//@flow
import NavigationComponent from "./NavigationComponent";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  isBSOpen: state.app.isBSOpen,
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationComponent);
