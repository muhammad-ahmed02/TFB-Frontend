import React from 'react';
import { TableCell } from '@mui/material';

function TableInput({ value, onChange, nanme, disabled, lebel = '', className, style, ...props }) {
  return (
    <TableCell align="left">
      {`${lebel} `}
      <input
        className={`table-input ${className}`}
        type="number"
        value={value}
        onChange={onChange}
        name={nanme}
        disabled={disabled}
        {...props}
        style={{ width: `${`${value}`.length * 8.5 + 16}px`, ...style }}
      />
    </TableCell>
  );
}

export default TableInput;
