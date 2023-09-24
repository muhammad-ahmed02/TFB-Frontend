import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function MoreMenu({ pathWithId, onDelete, invoicePath }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogSubmit = () => {
    onDelete();
    handleDialogClose();
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDialogOpen}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Delete?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Are you sure you want to delete?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="error">
              CANCEL
            </Button>
            <Button onClick={handleDialogSubmit} autoFocus color="primary">
              CONFIRM
            </Button>
          </DialogActions>
        </Dialog>
        {pathWithId && (
          <RouterLink to={pathWithId}>
            <MenuItem sx={{ color: 'text.secondary' }}>
              <ListItemIcon>
                <Iconify icon="eva:edit-fill" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          </RouterLink>
        )}
        {invoicePath && (
          <a href={invoicePath} target="_blank" rel="noreferrer">
            <MenuItem sx={{ color: 'text.secondary' }}>
              <ListItemIcon>
                <Iconify icon="foundation:page-export-pdf" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Export" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          </a>
        )}
      </Menu>
    </>
  );
}
