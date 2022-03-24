import { normalize, schema } from 'normalizr';

const objectId = (obj) => `${Object.entries(obj).join('-')}-id`;

export const normalizeNeoBrowse = (json) => {
  const links = new schema.Entity(
    'links',
    {},
    { idAttribute: (obj) => `${obj.self}id` }
  );
  const page = new schema.Entity(
    'page',
    {},
    {
      idAttribute: (obj) =>
        `${obj.number}+${obj.size}+${obj.total_elements}+${obj.total_pages}id`,
    }
  );

  const miss_distance = new schema.Entity(
    'miss_distance',
    {},
    {
      idAttribute: (obj) =>
        `${obj.astronomical}+${obj.kilometers}+${obj.lunar}+${obj.miles}id`,
    }
  );
  const relative_velocity = new schema.Entity(
    'relative_velocity',
    {},
    {
      idAttribute: (obj) =>
        `${obj.kilometers_per_hour}+${obj.kilometers_per_second}+${obj.miles_per_hour}id`,
    }
  );
  const close_approach_data = new schema.Entity(
    'close_approach_data',
    { miss_distance, relative_velocity },
    {
      idAttribute: (obj) =>
        `${obj.epoch_date_close_approach}+${obj.close_approach_date}id`,
    }
  );

  const feet = new schema.Entity(
    'feet',
    {},
    {
      idAttribute: (obj) =>
        `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`,
    }
  );
  const kilometers = new schema.Entity(
    'kilometers',
    {},
    {
      idAttribute: (obj) =>
        `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`,
    }
  );
  const meters = new schema.Entity(
    'meters',
    {},
    {
      idAttribute: (obj) =>
        `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`,
    }
  );
  const miles = new schema.Entity(
    'miles',
    {},
    {
      idAttribute: (obj) =>
        `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`,
    }
  );

  const estimated_diameter = new schema.Entity(
    'estimated_diameter',
    { feet, kilometers, meters, miles },
    { idAttribute: (obj) => `${obj.feet.estimated_diameter_max}id` }
  );

  const orbit_class = new schema.Entity(
    'orbit_class',
    {},
    {
      idAttribute: (obj) =>
        `${obj.orbit_class_description}+${obj.orbit_class_range}+${obj.orbit_class_type}id`,
    }
  );
  const orbital_data = new schema.Entity(
    'orbital_data',
    { orbit_class },
    { idAttribute: (obj) => `${obj.mean_anomaly}+${obj.mean_motion}id` }
  );
  const near_earth_objects = new schema.Entity(
    'near_earth_objects',
    {
      links,
      orbital_data,
      estimated_diameter,
      close_approach_data: [close_approach_data],
    },
    { idAttribute: (obj) => `${obj.designation}id` }
  );
  const mySchema = new schema.Entity(
    'response',
    { near_earth_objects: [near_earth_objects], links, page },
    { idAttribute: (obj) => `${obj}id` }
  );
  const data = normalize(json, mySchema);

  return data;
};

export const normalizeNeoFeed = (json) => {
  const links = new schema.Entity('links', {}, { idAttribute: objectId });
  const miss_distance = new schema.Entity(
    'miss_distance',
    {},
    { idAttribute: objectId }
  );
  const relative_velocity = new schema.Entity(
    'relative_velocity',
    {},
    { idAttribute: objectId }
  );
  const close_approach_data = new schema.Entity(
    'close_approach_data',
    { miss_distance, relative_velocity },
    { idAttribute: objectId }
  );
  const feet = new schema.Entity('feet', {}, { idAttribute: objectId });
  const kilometers = new schema.Entity(
    'kilometers',
    {},
    { idAttribute: objectId }
  );
  const meters = new schema.Entity('meters', {}, { idAttribute: objectId });
  const miles = new schema.Entity('miles', {}, { idAttribute: objectId });
  const estimated_diameter = new schema.Entity(
    'estimated_diameter',
    { feet, kilometers, meters, miles },
    { idAttribute: objectId }
  );
  const near_earth_objects = new schema.Entity(
    'near_earth_objects',
    {
      estimated_diameter,
      links,
      close_approach_data: [close_approach_data],
    },
    { idAttribute: objectId }
  );
  const near_earth_objectsvalues = new schema.Values([near_earth_objects]);
  const mySchema = new schema.Entity(
    'response',
    { links, near_earth_objects: near_earth_objectsvalues },
    { idAttribute: () => 'neoFeedId' }
  );
  const data = normalize(json, mySchema);

  return data;
};

export const normalizeNeoLookup = (json) => {
  const miss_distance = new schema.Entity(
    'miss_distance',
    {},
    { idAttribute: (obj) => `${obj.lunar}+${obj.miles}id` }
  );
  const relative_velocity = new schema.Entity(
    'relative_velocity',
    {},
    {
      idAttribute: (obj) =>
        `${obj.kilometers_per_hour}+${obj.kilometers_per_second}+${obj.miles_per_hour}id`,
    }
  );
  const close_approach_data = new schema.Entity(
    'close_approach_data',
    { miss_distance, relative_velocity },
    {
      idAttribute: (obj) =>
        `${obj.epoch_date_close_approach}+${obj.close_approach_date}id`,
    }
  );

  const orbit_class = new schema.Entity(
    'orbit_class',
    {},
    { idAttribute: (obj) => `${obj.orbit_class_range}id` }
  );
  const orbital_data = new schema.Entity(
    'orbital_data',
    { orbit_class },
    {
      idAttribute: (obj) =>
        `${obj.aphelion_distance}+${obj.perihelion_distance}id`,
    }
  );
  const links = new schema.Entity(
    'links',
    {},
    { idAttribute: (obj) => `${obj.self}id` }
  );

  const feet = new schema.Entity(
    'feet',
    {},
    {
      idAttribute: (obj) =>
        `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`,
    }
  );
  const kilometers = new schema.Entity(
    'kilometers',
    {},
    {
      idAttribute: (obj) =>
        `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`,
    }
  );
  const meters = new schema.Entity(
    'meters',
    {},
    {
      idAttribute: (obj) =>
        `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`,
    }
  );
  const miles = new schema.Entity(
    'miles',
    {},
    {
      idAttribute: (obj) =>
        `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`,
    }
  );
  const estimated_diameter = new schema.Entity(
    'estimated_diameter',
    { feet, kilometers, meters, miles },
    { idAttribute: (obj) => `${obj}id` }
  );

  const mySchema = new schema.Entity('response', {
    close_approach_data: [close_approach_data],
    orbital_data,
    links,
    estimated_diameter,
  });
  const data = normalize(json, mySchema);

  return data;
};
