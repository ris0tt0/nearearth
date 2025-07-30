import { Button, Paper, styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NeoDateParams } from '../../routes';
import { formatFeedDate, formatFeedDateString } from '../../utils';

const DateControlsContainer = styled(Paper)`
  display: flex;
  flex: 1;
  gap: 1rem;
  justify-content: center;
  width: 100%;
  padding: 10px 0px;
`;

export const DateControls = () => {
  const { neoDate } = useParams<NeoDateParams>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [dateValue, setDateValue] = useState<Date>(new Date());

  useEffect(() => {
    if (neoDate && neoDate.length > 1) {
      const value = formatFeedDateString(neoDate);
      if (value) {
        setDateValue(value);
      }
    }
  }, [neoDate]);

  const handleDateChange = (event: Date | null) => {
    if (event) {
      const date = formatFeedDate(event);
      setDateValue(event);
    }
  };

  const handleClick = async () => {
    const date = formatFeedDate(dateValue);

    setIsLoading(true);
    await navigate(date);
    setIsLoading(false);
  };

  return (
    <DateControlsContainer>
      <DatePicker
        sx={{ maxWidth: '300px' }}
        label="Select date"
        onChange={handleDateChange}
        value={dateValue}
      />
      <Button variant="outlined" onClick={handleClick} disabled={isLoading}>
        select
      </Button>
    </DateControlsContainer>
  );
};
