import {
  Pagination,
  Skeleton,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const BrowseControlsContainer = styled('nav')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

export const BrowseControls: FC<{
  loading: boolean;
  page: number;
  total: number;
}> = ({ loading, page, total }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) =>
      navigate(`/browse/${value.toString()}`),
    [],
  );

  return (
    <BrowseControlsContainer>
      {isNaN(page) ? (
        <Skeleton width={300} height={50} />
      ) : (
        <Pagination
          disabled={loading}
          size={small ? 'small' : 'medium'}
          count={total}
          page={page}
          boundaryCount={2}
          onChange={handleChange}
        />
      )}
    </BrowseControlsContainer>
  );
};
