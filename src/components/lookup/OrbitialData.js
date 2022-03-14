import PropTypes from 'prop-types';
import React from 'react';

function OrbitialData({ orbitialData }) {
  return (
    <div className="OrbitialData">
      <h1>Orbitial Data</h1>
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">aphelion distance: </b>
        <span className="OrbitialData__data">
          {orbitialData.aphelion_distance}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">ascending node longitude: </b>
        <span className="OrbitialData__data">
          {orbitialData.ascending_node_longitude}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">data arc in day: </b>
        <span className="OrbitialData__data">
          {orbitialData.data_arc_in_days}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">eccentricity: </b>
        <span className="OrbitialData__data">{orbitialData.eccentricity}</span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">epoch osculation: </b>
        <span className="OrbitialData__data">
          {orbitialData.epoch_osculation}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">equinox: </b>
        <span className="OrbitialData__data">{orbitialData.equinox}</span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">first observation date: </b>
        <span className="OrbitialData__data">
          {orbitialData.first_observation_date}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">inclination: </b>
        <span className="OrbitialData__data">{orbitialData.inclination}</span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">jupiter tisserand invariant: </b>
        <span className="OrbitialData__data">
          {orbitialData.jupiter_tisserand_invariant}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">last observation date: </b>
        <span className="OrbitialData__data">
          {orbitialData.last_observation_date}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">mean anomaly: </b>
        <span className="OrbitialData__data">{orbitialData.mean_anomaly}</span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">mean motion: </b>
        <span className="OrbitialData__data">{orbitialData.mean_motion}</span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">minimum orbit intersection: </b>
        <span className="OrbitialData__data">
          {orbitialData.minimum_orbit_intersection}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">oservations used: </b>
        <span className="OrbitialData__data">
          {orbitialData.observations_used}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">orbit class: </b>
        <span className="OrbitialData__data">{orbitialData.orbit_class}</span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">orbit determination date: </b>
        <span className="OrbitialData__data">
          {orbitialData.orbit_determination_date}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">orbit id: </b>
        <span className="OrbitialData__data">{orbitialData.orbit_id}</span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">orbit uncertanity: </b>
        <span className="OrbitialData__data">
          {orbitialData.orbit_uncertainty}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">orbitial perioid: </b>
        <span className="OrbitialData__data">
          {orbitialData.orbital_period}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">perihelion argument: </b>
        <span className="OrbitialData__data">
          {orbitialData.perihelion_argument}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">perihelion distance: </b>
        <span className="OrbitialData__data">
          {orbitialData.perihelion_distance}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">perhelion time: </b>
        <span className="OrbitialData__data">
          {orbitialData.perihelion_time}
        </span>
      </span>
      <br />
      <span className="OrbitialData__item">
        <b className="OrbitialData__title">semi major axis: </b>
        <span className="OrbitialData__data">
          {orbitialData.semi_major_axis}
        </span>
      </span>
    </div>
  );
}

OrbitialData.propTypes = {
  orbitialData: PropTypes.shape({
    aphelion_distance: PropTypes.string.isRequired,
    ascending_node_longitude: PropTypes.string.isRequired,
    data_arc_in_days: PropTypes.number.isRequired,
    eccentricity: PropTypes.string.isRequired,
    epoch_osculation: PropTypes.string.isRequired,
    equinox: PropTypes.string.isRequired,
    first_observation_date: PropTypes.string.isRequired,
    inclination: PropTypes.string.isRequired,
    jupiter_tisserand_invariant: PropTypes.string.isRequired,
    last_observation_date: PropTypes.string.isRequired,
    mean_anomaly: PropTypes.string.isRequired,
    mean_motion: PropTypes.string.isRequired,
    minimum_orbit_intersection: PropTypes.string.isRequired,
    observations_used: PropTypes.number.isRequired,
    orbit_class: PropTypes.string.isRequired,
    orbit_determination_date: PropTypes.string.isRequired,
    orbit_id: PropTypes.string.isRequired,
    orbit_uncertainty: PropTypes.string.isRequired,
    orbital_period: PropTypes.string.isRequired,
    perihelion_argument: PropTypes.string.isRequired,
    perihelion_distance: PropTypes.string.isRequired,
    perihelion_time: PropTypes.string.isRequired,
    semi_major_axis: PropTypes.string.isRequired,
  }).isRequired,
};

export { OrbitialData };
