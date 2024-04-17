import "../styles/Counter.css"
import PropTypes from 'prop-types'
function Counter({counter, color}) {
  return (
    <div className={`counter ${color}`}>
      <h1>{counter}</h1>
    </div>
  );
}


Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  color: PropTypes.number
};
export default Counter;
