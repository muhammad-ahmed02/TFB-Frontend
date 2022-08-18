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
// components
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCashOrder, getCashOrders } from '../../service/api';
import { useToast } from '../../hooks/useToast';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../sections/@dashboard/table-components';
// mock
import { REACT_APP_BACKEND_URL } from '../../config';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'unique_id', label: 'UniqueID', alignRight: false },
  { id: 'customer_name', label: 'Customer', alignRight: false },
  { id: 'product', label: 'Product', alignRight: false },
  { id: 'sale_by', label: 'Seller', alignRight: false },
  { id: 'sale_price', label: 'Sale price', alignRight: false },
  { id: 'cost_price', label: 'Cost price', alignRight: false },
  { id: 'profit', label: 'Profit', alignRight: false },
  { id: 'imei_number', label: 'IMEI', alignRight: false },
  { id: 'updated_by', label: 'Date', alignRight: false },
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
    return filter(array, (_user) => _user.unique_id.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function CashOrders() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: 'getCashOrders',
    queryFn: getCashOrders,
  });

  const { mutate: deleteCashOrderFn } = useMutation((id) => deleteCashOrder(id), {
    onSuccess: () => {
      showToast(`Cash order deleted successfully`);
    },
    onSettled: () => queryClient.invalidateQueries('getCashOrders'),
    onError: (error) => {
      showToast(error.message);
    },
  });

  const bulkDelete = (ids) => {
    ids.map((id) => deleteCashOrderFn(id));
    setSelected([]);
  };

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('unique_id');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.results.map((n) => n.id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.results.length) : 0;

  const filteredUsers = applySortFilter(data?.results ?? [], getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  // eslint-disable-next-line
  const addZeroBeforeNum = (num) => {
    // eslint-disable-next-line
    return `${parseInt(num) < 10 ? '0' + num : num}`;
  };

  const convertDateTimeObject = (date) => {
    const datetime = `${new Date(date).toDateString()} ${addZeroBeforeNum(
      new Date(date).getHours()
    )}:${addZeroBeforeNum(new Date(date).getMinutes())}:${addZeroBeforeNum(new Date(date).getSeconds())}`;
    return datetime;
  };

  return (
    <Page title="Cash Order">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Cash Order
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/cashorder/add"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New cash order
          </Button>
        </Stack>

        <Card>
          <ListToolbar
            text="cash order"
            onDelete={() => bulkDelete(selected)}
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
                      rowCount={data.results.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const {
                          id,
                          unique_id,
                          customer_name,
                          product_detail,
                          seller_name,
                          sale_price,
                          profit,
                          imei_number,
                          updated_at,
                        } = row;
                        const isItemSelected = selected.indexOf(id) !== -1;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none" align="center" noWrap>
                              <Typography variant="subtitle2" noWrap>
                                {unique_id}
                              </Typography>
                            </TableCell>

                            <TableCell align="left">{customer_name}</TableCell>
                            <TableCell align="left">{product_detail[0].name}</TableCell>
                            <TableCell align="left">{seller_name}</TableCell>
                            <TableCell align="left">Rs. {sale_price}</TableCell>
                            <TableCell align="left">Rs. {product_detail[0].purchasing_price}</TableCell>
                            <TableCell align="left">Rs. {profit}</TableCell>
                            <TableCell align="left">{imei_number}</TableCell>
                            <TableCell align="left">{convertDateTimeObject(updated_at)}</TableCell>

                            <TableCell align="right">
                              <MoreMenu
                                onDelete={() => deleteCashOrderFn(id)}
                                pathWithId={`/dashboard/cashorder/edit/${id}`}
                                invoicePath={`${REACT_APP_BACKEND_URL}/api/v1/export/cashorder/invoice/${unique_id}`}
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
                    {isUserNotFound && (
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
            count={data?.results?.length ?? 0}
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
