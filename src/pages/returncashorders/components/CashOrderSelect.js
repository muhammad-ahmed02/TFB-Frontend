import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Autocomplete, TextField } from '@mui/material';
import { getCashOrders } from '../../../service/api';

function CashOrderSelect({ value, onSelect, error, helperText, ...props }) {
  const { data, isLoading } = useQuery({
    queryKey: 'getCashOrders',
    queryFn: getCashOrders,
  });

  const cashOrderOptions = useMemo(() => {
    if (data?.results) {
      return data.results.map(({ id, unique_id }) => ({
        id,
        label: unique_id,
      }));
    }
    return [];
  }, [data?.results]);

  return (
    <Autocomplete
      disablePortal
      disabled={isLoading}
      options={cashOrderOptions}
      value={!isLoading ? cashOrderOptions.find((cashOrder) => cashOrder.id === value)?.label : ''}
      isOptionEqualToValue={(cashOrder, value) => cashOrder.label === value}
      renderInput={(params) => <TextField label="Cash Order" {...params} error={error} helperText={helperText} />}
      onChange={onSelect}
      {...props}
    />
  );
}

export default CashOrderSelect;
