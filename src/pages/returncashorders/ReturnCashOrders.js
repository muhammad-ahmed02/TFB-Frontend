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
import { usePagenation } from '../../hooks/usePagenation';
import { deleteReturnCashOrder, getReturnCashOrders } from '../../service/api';
import { useToast } from '../../hooks/useToast';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../sections/@dashboard/table-components';
import { convertDateTimeObject } from '../../utils/formatDate';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'unique_id', label: 'Unique id', alignRight: false },
  { id: 'reason', label: 'Reason', alignRight: false },
  // { id: 'product_name', label: 'Product', alignRight: false },
  { id: 'seller_name', label: 'Seller', alignRight: false },
  { id: 'sale_price', label: 'Price', alignRight: false },
  // { id: 'cost_price', label: 'Cost price', alignRight: false },
  // { id: 'profit', label: 'Profit', alignRight: false },
  { id: 'return_amount', label: 'Return amount', alignRight: false },
  { id: 'warranty', label: 'Warranty', alignRight: false },
  { id: 'buy_date', label: 'Buying Date', alignRight: false },
  { id: 'date', label: 'Returning Date', alignRight: false },
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
    return filter(
      array,
      (_user) => _user.cashorder_detail[0].unique_id.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ReturnCashOrders() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { slice, page, rowsPerPage, apiPageNumber, rowsPerPageOptions, setRowsPerPage, setPage, handleChangePage } =
    usePagenation();

  const { data, isLoading } = useQuery({
    queryKey: ['getReturnCashOrders', `${apiPageNumber}`],
    queryFn: () => getReturnCashOrders({ page: apiPageNumber }),
  });

  const { mutate: deleteReturnCashOrderFn } = useMutation((id) => deleteReturnCashOrder(id), {
    onSuccess: () => {
      showToast(`Retrun Cash order deleted successfully`);
    },
    onSettled: () => queryClient.invalidateQueries('getReturnCashOrders'),
    onError: (error) => {
      showToast(error.message);
    },
  });

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('date');

  const [filterName, setFilterName] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.results.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.results.length) : 0;

  const filteredOrders = applySortFilter(data?.results ?? [], getComparator(order, orderBy), filterName);

  const isOrderNotFound = filteredOrders.length === 0;

  return (
    <Page title="Return Cash Order">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Return Cash Order
          </Typography>
          <div>
            {/* <ReturnCashOrderExportButton TABLE_HEAD={TABLE_HEAD} data={filteredOrders} /> */}
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/return-cashorder/add"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New return cash order
            </Button>
          </div>
        </Stack>

        <Card>
          <ListToolbar
            text="return cash order"
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
                      {(slice
                        ? filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filteredOrders
                      ).map((row) => {
                        const { id, reason, return_amount, cashorder_detail, updated_at } = row;
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
                                {cashorder_detail[0].unique_id}
                              </Typography>
                            </TableCell>

                            <TableCell align="left">{reason}</TableCell>
                            {/* <TableCell align="left">{cashorder_detail[0].product_detail[0].name}</TableCell> */}
                            <TableCell align="left">{cashorder_detail[0].seller_name}</TableCell>
                            <TableCell align="left">Rs. {cashorder_detail[0].total_amount}</TableCell>
                            {/* <TableCell align="left">
                              Rs. {cashorder_detail[0].product_detail[0].purchasing_price}
                            </TableCell> */}
                            {/* <TableCell align="left">Rs. {cashorder_detail[0].profit}</TableCell> */}
                            <TableCell align="left">Rs. {return_amount}</TableCell>
                            <TableCell align="left">{cashorder_detail[0].warranty} Days</TableCell>
                            <TableCell align="left">{convertDateTimeObject(cashorder_detail[0].updated_at)}</TableCell>
                            <TableCell align="left">{convertDateTimeObject(updated_at)}</TableCell>

                            <TableCell align="right">
                              <MoreMenu
                                onDelete={() => deleteReturnCashOrderFn(id)}
                                // pathWithId={`/dashboard/return-cashorder/edit/${id}`}
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
                    {isOrderNotFound && (
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
