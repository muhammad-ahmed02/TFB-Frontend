import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Autocomplete, TextField } from '@mui/material';
import { getSellers } from '../../../service/api';

function SellerSelect({ value, onSelect, error, helperText, ...props }) {
  const { data, isLoading } = useQuery({
    queryKey: 'getSellers',
    queryFn: getSellers,
  });

  const sellerOptions = useMemo(() => {
    if (data?.results) {
      return data.results.map(({ id, username }) => ({
        id,
        label: username,
      }));
    }
    return [];
  }, [data?.results]);

  return (
    <Autocomplete
      disablePortal
      options={sellerOptions}
      value={!isLoading ? sellerOptions.find((seller) => seller.id === value)?.label : ''}
      isOptionEqualToValue={(seller, value) => seller.label === value}
      renderInput={(params) => <TextField label="Seller" {...params} error={error} helperText={helperText} />}
      onChange={onSelect}
      {...props}
    />
  );
}

export default SellerSelect;
