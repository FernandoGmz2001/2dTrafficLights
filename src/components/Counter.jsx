import PropTypes from 'prop-types'
function Counter({counter}) {
  return (
    <div className="counter">
      <h1>{counter}</h1>
    </div>
  );
}


Counter.propTypes = {
  counter: PropTypes.number.isRequired
};
export default Counter;
