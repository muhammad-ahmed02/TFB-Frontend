import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Autocomplete, TextField } from '@mui/material';
import { getProductStocks } from '../../../service/api';

function ProductSelect({ value, onSelect, error, helperText, ...props }) {
  const { data, isLoading } = useQuery({
    queryKey: 'getProductStocks',
    queryFn: getProductStocks,
  });

  const productOptions = useMemo(() => {
    if (data?.results) {
      return data.results.map(({ id, product }) => ({
        id,
        label: product.name,
      }));
    }
    return [];
  }, [data?.results]);

  return (
    <Autocomplete
      disablePortal
      disabled={isLoading}
      options={productOptions}
      value={!isLoading ? productOptions.find((product) => product.id === value)?.label : ''}
      isOptionEqualToValue={(product, value) => product.label === value}
      renderInput={(params) => <TextField label="Product" {...params} error={error} helperText={helperText} />}
      onChange={onSelect}
      {...props}
    />
  );
}

export default ProductSelect;
