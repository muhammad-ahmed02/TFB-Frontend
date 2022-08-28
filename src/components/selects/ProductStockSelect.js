import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Autocomplete, TextField } from '@mui/material';
import { getProductStocks } from '../../service/api';

const ProductStockSelect = ({ value, onSelect, error, helperText, onlyAvailble = true, ...props }) => {
  const { data, isLoading } = useQuery({
    queryKey: 'getProductStocks',
    queryFn: () => getProductStocks({ available: onlyAvailble ? true : null }),
  });

  const productOptions = useMemo(() => {
    if (data?.results) {
      return data.results.map(({ id, name, vendor, purchasing_price }) => ({
        id,
        label: `${name} (${vendor.name}) @ PKR ${purchasing_price}`,
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
      isOptionEqualToValue={!isLoading ? (product, value) => product.label === value : null}
      renderInput={(params) => <TextField label="Product" {...params} error={error} helperText={helperText} />}
      onChange={onSelect}
      {...props}
    />
  );
};

export default ProductStockSelect;
