import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Autocomplete, TextField } from '@mui/material';
import { getIMEIs } from '../../../service/api';

function IMEISelect({ value, onSelect, error, helperText, ...props }) {
  const { data, isLoading } = useQuery({
    queryKey: 'getIMEIs',
    queryFn: getIMEIs,
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
      renderInput={(params) => <TextField label="IMEI number" {...params} error={error} helperText={helperText} />}
      onChange={onSelect}
      {...props}
    />
  );
}

export default IMEISelect;
