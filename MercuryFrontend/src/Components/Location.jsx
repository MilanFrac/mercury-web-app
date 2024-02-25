import PropTypes from 'prop-types';
export default function Location({ locationName }) {
  const className = locationName.toLowerCase().split(' ').join('');
  return (
    <div className={className}>
      <h1>{locationName}</h1>
    </div>
  );
}

Location.propTypes = {
  locationName: PropTypes.string
};
