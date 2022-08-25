import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Autocomplete, TextField } from '@mui/material';
import { getIMEIs, getProductStock } from '../../service/api';

function IMEISelect({ product, value, onSelect, error, helperText, ...props }) {
  // const { data, isLoading } = useQuery(['getProductStock', product], () => product && getProductStock(product));
  const { data, isLoading } = useQuery({
    queryKey: 'getIMEIs',
    queryFn: () => getIMEIs(),
  });

  const imeiOptions = useMemo(() => {
    if (data?.results) {
      return data.results.map(({ number }) => ({
        label: number,
      }));
    }
    return [];
  }, [data?.results]);

  return (
    <Autocomplete
      disablePortal
      disabled={isLoading}
      options={imeiOptions}
      value={imeiOptions.find((imei) => imei.label === value)}
      isOptionEqualToValue={(product, value) => product.label === value}
      renderInput={(params) => <TextField label="IMEI number" {...params} error={error} helperText={helperText} />}
      onChange={onSelect}
      noOptionsText="No IMEI available."
      {...props}
    />
  );
}

export default IMEISelect;
