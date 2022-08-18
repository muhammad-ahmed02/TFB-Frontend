import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Autocomplete, TextField } from '@mui/material';
import { getProduct } from '../../../service/api';

function IMEISelect({ product, value, onSelect, error, helperText, ...props }) {
  const { data, isLoading } = useQuery(['getProduct', product], () => product && getProduct(product));

  const imeiOptions = useMemo(() => {
    if (data?.imei_or_serial_number) {
      return data.imei_or_serial_number.map((number) => ({
        label: number,
      }));
    }
    return [];
  }, [data?.imei_or_serial_number]);

  return (
    <Autocomplete
      disablePortal
      disabled={isLoading}
      options={imeiOptions}
      value={imeiOptions.find((imei) => imei.label === value)}
      renderInput={(params) => <TextField label="IMEI number" {...params} error={error} helperText={helperText} />}
      onChange={onSelect}
      noOptionsText="No IMEI available."
      {...props}
    />
  );
}

export default IMEISelect;
