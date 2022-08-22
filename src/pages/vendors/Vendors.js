import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Stack, Button, Container, Typography, Grid, CircularProgress } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteVendor, getVendors } from '../../service/api';
import { useToast } from '../../hooks/useToast';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import VendorCard from './components/VendorCard';

function Vendors() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [vendors, setVendors] = useState([]);

  const { isLoading } = useQuery({
    queryKey: 'getVendors',
    queryFn: getVendors,
    onSuccess: (data) => setVendors(data?.results),
  });

  const { mutate: deleteVendorFn } = useMutation((id) => deleteVendor(id), {
    onSuccess: () => {
      showToast(`Vendor deleted successfully`);
    },
    onSettled: () => queryClient.invalidateQueries('getVendors'),
    onError: (error) => {
      showToast(error.message);
    },
  });

  return (
    <Page title="Vendors">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Vendors
          </Typography>
          <div>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/vendors/add"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Vendor
            </Button>
          </div>
        </Stack>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {!vendors.length && (
              <Typography textAlign="center" variant="h5" gutterBottom>
                No Vendors found !!!
              </Typography>
            )}

            <Grid container spacing={2}>
              {vendors.map(({ id, name }) => (
                <Grid item key={id}>
                  <VendorCard
                    id={id}
                    name={name}
                    onEdit={() => navigate(`/dashboard/vendors/edit/${id}`)}
                    onDelete={deleteVendorFn}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Page>
  );
}

export default Vendors;
