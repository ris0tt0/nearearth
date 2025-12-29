import { Pagination, Skeleton, styled } from '@mui/material';
import React, { FC } from 'react';
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

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) =>
    navigate(`/browse/${value.toString()}`);

  return (
    <BrowseControlsContainer>
      {isNaN(page) ? (
        <Skeleton width={300} height={50} />
      ) : (
        <Pagination
          disabled={loading}
          count={total}
          page={page}
          boundaryCount={2}
          onChange={handleChange}
        />
      )}
    </BrowseControlsContainer>
  );
};
