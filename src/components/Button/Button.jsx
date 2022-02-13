import PropTypes from "prop-types";

const Button = ({ loadMore }) => (
  <button type="button" className="Button" onClick={loadMore}>Load more</button>
)

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
}

export default Button;