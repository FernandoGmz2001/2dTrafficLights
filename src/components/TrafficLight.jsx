import "../styles/TrafficLight.css";
import PropTypes from 'prop-types';

function TrafficLight({type, color}) {
  return (
    <>
      <div className={`traffic-light ${type}`}>
        <div className="lights">
          <div className={`light red ${color === 'red' ? 'active' : ''}`}></div>
          <div className={`light yellow ${color === 'yellow' ? 'active' : ''}`}></div>
          <div className={`light green ${color === 'green' ? 'active' : ''}`}></div>
        </div>
      </div>
    </>
  )
}

TrafficLight.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['red', 'yellow', 'green']).isRequired,
};

export default TrafficLight;