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
import { deleteCredit, getCredits } from '../../service/api';
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
  { id: 'payment_status', label: 'Payment Status', alignRight: false },
  { id: 'quantity', label: 'Quantity', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'product', label: 'Product', alignRight: false },
  { id: 'imei_or_serial_number', label: 'IMEI numbers', alignRight: false },
  { id: 'updated_at', label: 'Updated Date', alignRight: false },
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
    return filter(array, (_user) => _user.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Credits() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [credits, setCredits] = useState([]);

  const { isLoading } = useQuery({
    queryKey: 'getCredits',
    queryFn: getCredits,
    onSuccess: (data) => setCredits(data?.results),
  });

  const { mutate: deleteCreditFn } = useMutation((id) => deleteCredit(id), {
    onSuccess: () => {
      showToast(`Credit deleted successfully`);
    },
    onSettled: () => queryClient.invalidateQueries('getCredit'),
    onError: (error) => {
      showToast(error.message);
    },
  });

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = credits.map((n) => n.id);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - credits.results.length) : 0;

  const filteredProducts = applySortFilter(credits ?? [], getComparator(order, orderBy), filterName);

  const isProductsNotFound = filteredProducts.length === 0;

  return (
    <Page title="Credits">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Credits
          </Typography>
          <div>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/credit/add"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Credit
            </Button>
          </div>
        </Stack>

        <Card>
          <ListToolbar
            text="credits"
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
                      rowCount={credits.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id, items, payment_status, quantity, updated_at, created_at } = row;
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
                                <Iconify
                                  icon={`eva:${
                                    payment_status === 'CLEARED' ? 'shield-outline' : 'shield-off-outline'
                                  }`}
                                  width={24}
                                  height={24}
                                />
                                <Typography variant="subtitle2" noWrap>
                                  {payment_status}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{quantity}</TableCell>
                            <TableCell align="left">
                              {items.map((item, i) => (
                                <span key={i}>
                                  RS. {item.price} <br />
                                </span>
                              ))}
                            </TableCell>
                            <TableCell align="left">
                              {items.map((item, i) => (
                                <span key={i}>
                                  {item.product_name} <br />
                                </span>
                              ))}
                            </TableCell>
                            <TableCell align="left">
                              {items.map((item, i) => (
                                <span key={i}>
                                  {item.imei_or_serial_number} <br />
                                </span>
                              ))}
                            </TableCell>
                            <TableCell align="left">{convertDateTimeObject(updated_at)}</TableCell>
                            <TableCell align="left">{convertDateTimeObject(created_at)}</TableCell>

                            <TableCell align="right">
                              <MoreMenu
                                onDelete={() => deleteCreditFn(id)}
                                pathWithId={`/dashboard/credit/edit/${id}`}
                              />
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={credits?.length ?? 0}
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
