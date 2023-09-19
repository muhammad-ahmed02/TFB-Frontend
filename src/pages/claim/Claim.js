import { filter } from 'lodash';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePagenation } from '../../hooks/usePagenation';
import { deleteClaim, getClaims } from '../../service/api';
import { useToast } from '../../hooks/useToast';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { ListHead, MoreMenu, ListToolbar } from '../../sections/@dashboard/table-components';
import { convertDateTimeObject } from '../../utils/formatDate';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'product', label: 'Product', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'vendor', label: 'Vendor', alignRight: false },
  { id: 'imei_or_serial_number', label: 'IMEI numbers', alignRight: false },
  { id: 'reason', label: 'Reason', alignRight: false },
  { id: 'created_at', label: 'Created Date', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (claim) => claim.product_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Claims() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [claims, setClaims] = useState([]);

  const { slice, page, rowsPerPage, apiPageNumber, rowsPerPageOptions, setRowsPerPage, setPage, handleChangePage } =
    usePagenation();

  const { isLoading, data } = useQuery({
    queryKey: ['getClaims', `${apiPageNumber}`],
    queryFn: () => getClaims({ page: apiPageNumber }),
    onSuccess: (data) => setClaims(data?.results),
  });

  const { mutate: deleteClaimFn } = useMutation((id) => deleteClaim(id), {
    onSuccess: () => {
      showToast(`Claim deleted successfully`);
    },
    onSettled: () => queryClient.invalidateQueries('getClaim'),
    onError: (error) => {
      showToast(error.message);
    },
  });

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = claims.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - claims.results.length) : 0;

  const filteredProducts = applySortFilter(claims ?? [], getComparator(order, orderBy), filterName);

  const isProductsNotFound = filteredProducts.length === 0;

  return (
    <Page title="Claims">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Claims
          </Typography>
          <div>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/claim/add"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Claim
            </Button>
          </div>
        </Stack>

        <Card>
          <ListToolbar
            text="claim"
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                {isLoading ? (
                  <Container>
                    <CircularProgress />
                  </Container>
                ) : (
                  <>
                    <ListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={claims.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {(slice
                        ? filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filteredProducts
                      ).map((row) => {
                        const { id, product_name, status, reason, vendor_name, imei_or_serial_number, created_at } =
                          row;
                        const isItemSelected = selected.indexOf(id) !== -1;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            id="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none" align="center">
                              <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography variant="subtitle2" noWrap>
                                  {product_name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{status}</TableCell>
                            <TableCell align="left">{vendor_name}</TableCell>
                            <TableCell align="left">{imei_or_serial_number}</TableCell>
                            <TableCell align="left">{reason}</TableCell>
                            <TableCell align="left">{convertDateTimeObject(created_at)}</TableCell>

                            <TableCell align="right">
                              <MoreMenu onDelete={() => deleteClaimFn(id)} pathWithId={`/dashboard/claim/edit/${id}`} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isProductsNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={data?.count ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
