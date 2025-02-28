import { Button, MenuItem, styled, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
  CameraResult,
  PhotosResult,
  RoverResult,
  usePhotosStore,
} from '../store';
import { RoverDayType, Rover, RoverCams, PerseveranceCams } from '../const';
import { useCommands } from '../hooks/useCommands';
import Logger from 'js-logger';

const StyledRoot = styled('div')`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const StyledMainContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const StyledRoverData = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: column;

  border: 1px red solid;
`;

const rovers: { value: Rover; label: string }[] = [
  {
    value: 'spirit',
    label: 'Spirit',
  },
  {
    value: 'opportunity',
    label: 'Opportunity',
  },
  {
    value: 'perseverance',
    label: 'Perseverance',
  },
  {
    value: 'curiosity',
    label: 'Curiosity',
  },
];

const Controls: FC = () => {
  const commands = useCommands();
  const [value, setValue] = useState<Rover | ''>('');
  // const value = usePhotosStore((state) => state.rover);

  useEffect(() => {
    commands.setCurrentRover(value as Rover);
  }, [value]);

  return (
    <TextField
      id="outlined-select-rover"
      select
      label="Rover"
      defaultValue=""
      value={value}
      onChange={(e) => setValue(e.target.value as Rover)}
      helperText="Please select your rover"
    >
      {rovers.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

const RoverData: FC = () => {
  const roverData = usePhotosStore((state) => state.roverData);

  if (roverData === null) {
    return null;
  }

  return (
    <StyledRoverData>
      <div>
        <h1>{roverData.name}</h1>
        <div>status:{roverData.status}</div>
        <div>launch:{roverData.launchDate}</div>
        <div>landing:{roverData.landingDate}</div>
        <div>date :{roverData.maxDate}</div>
        <div>sol :{roverData.maxSol}</div>
      </div>
    </StyledRoverData>
  );
};

const RoverDaySol: FC = () => {
  const roverData = usePhotosStore((state) => state.roverData);
  const value = usePhotosStore((state) => state.dayType);
  const sol = usePhotosStore((state) => state.sol);
  const setSol = usePhotosStore((state) => state.setSol);

  if (roverData === null || value !== 'sol') {
    return null;
  }

  return (
    <TextField
      value={sol}
      type="number"
      onChange={(e) => setSol(parseInt(e.target.value))}
      id="outlined-basic"
      label="Outlined"
      variant="outlined"
    />
  );
};

const RoverDayEarthDate: FC = () => {
  const roverData = usePhotosStore((state) => state.roverData);
  const value = usePhotosStore((state) => state.dayType);

  if (roverData === null || value !== 'earthDate') {
    return null;
  }

  return 'earthDate';
};

const formatDate = (date: string = '') => {
  const result = date.replace(/T\d{2}:\d{2}:\d{2}.\d{3}Z/, '');

  return result;
};

const useCurrentPhotoData = () => {
  const roverData = usePhotosStore((state) => state.roverData);
  const value = usePhotosStore((state) => state.dayType);
  const sol = usePhotosStore((state) => state.sol);
  const date = usePhotosStore((state) => state.date);

  if (roverData?.photos) {
    const result =
      value === 'sol'
        ? (roverData.photos[sol] ?? null)
        : (roverData.photos[formatDate(date.toISOString())] ?? null);

    return result;
  }

  return null;
};

const StyledRoverResultsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RoverDayResults: FC = () => {
  const data = useCurrentPhotoData();
  const rover = usePhotosStore((state) => state.rover);
  const sol = usePhotosStore((state) => state.sol);
  const earthDate = usePhotosStore((state) => state.date);
  const camera = usePhotosStore((state) => state.camera);
  const dayType = usePhotosStore((state) => state.dayType);
  const setCamera = usePhotosStore((state) => state.setCamera);
  const setPhotosResult = usePhotosStore((state) => state.setPhotosResultList);
  const commands = useCommands();
  const [loading, setLoading] = useState(false);

  Logger.info('RoverDayResults', data);

  useEffect(() => {
    setCamera('');
    setPhotosResult(null);
  }, [data]);

  if (data === null) {
    return null;
  }

  const handleLoadPhotos = () => {
    if (camera && rover && earthDate) {
      setLoading(true);
      commands
        .loadPhotos({
          camera,
          dayType,
          rover,
          sol,
          earthDate: formatDate(earthDate.toISOString()),
        })
        .then((result) => {
          const { photos, rovers, cameras } = result;
          if (Array.isArray(photos)) {
            const result: PhotosResult[] = photos.map((photo) => {
              const cameraData = cameras.get(photo.cameraId) ?? null;
              const roverData = rovers.get(photo.roverId) ?? null;
              const rover: RoverResult = {
                id: roverData?.id ?? 0,
                landingDate: roverData?.landingDate ?? '',
                launchDate: roverData?.launchDate ?? '',
                name: roverData?.name ?? '',
                status: roverData?.status ?? '',
              };
              const camera: CameraResult = {
                id: cameraData?.id ?? NaN,
                fullName: cameraData?.fullName ?? '',
                name: cameraData?.name ?? '',
                rover,
              };
              return {
                id: photo.id,
                imgSrc: photo.imgSrc,
                camera,
                rover,
                earthDate: photo.earthDate,
              };
            });

            setPhotosResult(result);
          }
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <StyledRoverResultsContainer>
      <div>date: {new Date(data.earthDate).toLocaleString()}</div>
      <div>sol: {data.sol}</div>
      <div>total photos: {data.totalPhotos}</div>
      <TextField
        id="outlined-select-camera"
        select
        label="camera"
        defaultValue=""
        value={camera}
        onChange={(e) =>
          setCamera(e.target.value as RoverCams | PerseveranceCams | '')
        }
        helperText="Please select you are camera"
      >
        {data.cameras.map((camera) => (
          <MenuItem key={camera} value={camera}>
            {camera}
          </MenuItem>
        ))}
      </TextField>
      <Button disabled={camera === '' || loading} onClick={handleLoadPhotos}>
        load photos
      </Button>
    </StyledRoverResultsContainer>
  );
};

const RoverDaySelector: FC = () => {
  const roverData = usePhotosStore((state) => state.roverData);
  const value = usePhotosStore((state) => state.dayType);
  const setValue = usePhotosStore((state) => state.setDayType);

  if (roverData === null) {
    return null;
  }

  Logger.info('RoverDetails', roverData);

  return (
    <TextField
      id="outlined-select-rover"
      select
      label="date"
      defaultValue=""
      value={value}
      onChange={(e) => setValue(e.target.value as RoverDayType)}
      helperText="Please select you are date"
    >
      <MenuItem value={'sol'}>Sol</MenuItem>
      <MenuItem value={'earthDate'}>Earth Date</MenuItem>
    </TextField>
  );
};

const RoverDetailsSelector: FC = () => {
  const photoResult = usePhotosStore((state) => state.photosResult);
  const photosResultList = usePhotosStore((state) => state.photosResultList);
  const setPhotoResult = usePhotosStore((state) => state.setPhotosResult);
  Logger.info('RoverDetails', photosResultList);

  useEffect(() => {
    Logger.info('RoverDetails2', photosResultList);
  }, [photosResultList]);

  if (photosResultList === null) {
    return null;
  }

  const handleSelect = (event: any) => {
    const id: number = event.target.value;

    const photoResult = photosResultList.find((photo) => {
      return photo.id === id;
    });

    if (photoResult) {
      setPhotoResult(photoResult);
    }
  };

  return (
    <div>
      <TextField
        id="outlined-select-camera"
        select
        label="camera"
        defaultValue=""
        value={photoResult?.id ?? ''}
        onChange={handleSelect}
        helperText="Please select you are camera"
      >
        {photosResultList.map((camera) => (
          <MenuItem key={camera.id} value={camera.id}>
            {camera.earthDate}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

const RoverDetailsSelectorResults: FC = () => {
  const photosResult = usePhotosStore((state) => state.photosResult);
  if (photosResult === null) {
    return null;
  }

  return <img src={photosResult.imgSrc}></img>;
};

export const Main: FC = () => {
  return (
    <StyledRoot>
      <StyledMainContainer>
        <Controls />
        <RoverData />
        <RoverDaySelector />
        <RoverDaySol />
        <RoverDayEarthDate />
        <RoverDayResults />
        <RoverDetailsSelector />
        <RoverDetailsSelectorResults />
      </StyledMainContainer>
    </StyledRoot>
  );
};
