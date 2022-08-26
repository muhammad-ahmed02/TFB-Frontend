import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Autocomplete, TextField } from '@mui/material';
import { getProductStock } from '../../service/api';

function IMEISelect({ productStockId, value, onSelect, error, helperText, ...props }) {
  const { data, isLoading } = useQuery({
    queryKey: ['getProductStock', productStockId],
    queryFn: () => getProductStock(productStockId),
  });

  const imeiOptions = useMemo(() => {
    if (data) {
      return data.imei_or_serial_number.map((imei) => ({
        id: imei,
        label: imei,
      }));
    }
    return [];
  }, [data]);

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
