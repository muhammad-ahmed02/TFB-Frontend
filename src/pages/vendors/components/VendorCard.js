import React from 'react';
import { Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import Iconify from '../../../components/Iconify';

function VendorCard({ name, id, onEdit, onDelete }) {
  return (
    <Card sx={{ maxWidth: 345, padding: '0.5rem' }}>
      <CardContent className="card-content">
        <Typography variant="h5" textAlign="center">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Chip
          label="Edit"
          onClick={() => onEdit(id)}
          icon={<Iconify icon="eva:edit-fill" width={20} height={20} />}
          variant="outlined"
          color="secondary"
        />
        <Chip
          label="Delete"
          onClick={() => onDelete(id)}
          icon={<Iconify icon="eva:trash-fill" width={20} height={20} />}
          variant="outlined"
          color="error"
        />
      </CardActions>
    </Card>
  );
}

export default VendorCard;
