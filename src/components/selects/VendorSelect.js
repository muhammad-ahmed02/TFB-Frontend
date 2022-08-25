import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Autocomplete, TextField } from '@mui/material';
import { getVendors } from '../../service/api';

function VendorSelect({ value, onSelect, error, helperText, ...props }) {
  const { data, isLoading } = useQuery({
    queryKey: 'getVendors',
    queryFn: getVendors,
  });

  const vendorOptions = useMemo(() => {
    if (data?.results) {
      return data.results.map(({ id, name }) => ({
        id,
        label: name,
      }));
    }
    return [];
  }, [data?.results]);

  return (
    <Autocomplete
      disablePortal
      disabled={isLoading}
      options={vendorOptions}
      value={!isLoading ? vendorOptions.find((vendor) => vendor.id === value)?.label : ''}
      isOptionEqualToValue={(vendor, value) => vendor.label === value}
      renderInput={(params) => <TextField label="Vendor" {...params} error={error} helperText={helperText} />}
      onChange={onSelect}
      {...props}
    />
  );
}

export default VendorSelect;
