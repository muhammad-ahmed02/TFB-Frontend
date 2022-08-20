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
import TableInput from '../../sections/@dashboard/table-components/TableInput';
import { buklUpdateProductStocks, deleteProductStock, getProductStocks } from '../../service/api';
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
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'vendor', label: 'Vendor', alignRight: false },
  { id: 'purchasing_price', label: 'Purchasing Price', alignRight: false },
  { id: 'available_stock', label: 'Available', alignRight: false },
  { id: 'sold', label: 'Sold', alignRight: false },
  { id: 'on_credit', label: 'Credit', alignRight: false },
  { id: 'sold', label: 'Claim', alignRight: false },
  { id: 'update_at', label: 'Date', alignRight: false },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ProductStock() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [productStock, setProductStock] = useState([]);
  const [areEditable, setAreEditable] = useState(false);

  const { isLoading } = useQuery({
    queryKey: 'getProductStocks',
    queryFn: getProductStocks,
    onSuccess: (data) => setProductStock(data?.results),
  });

  const { mutate: bulkUpdateFn } = useMutation((products) => buklUpdateProductStocks(products), {
    onSuccess: () => {
      setAreEditable(false);
      showToast(`Product Stock updated successfully`);
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  const { mutate: deleteProductStockFn } = useMutation((id) => deleteProductStock(id), {
    onSuccess: () => {
      showToast(`Product Stock deleted successfully`);
    },
    onSettled: () => queryClient.invalidateQueries('getProductStock'),
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
      const newSelecteds = productStock.map((n) => n.id);
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

  const handleChange = (event, id) =>
    setProductStock(
      productStock.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            [event.target.name]: event.target.value,
          };
        }
        return product;
      })
    );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productStock.results.length) : 0;

  const filteredProducts = applySortFilter(productStock ?? [], getComparator(order, orderBy), filterName);

  const isProductsNotFound = filteredProducts.length === 0;

  return (
    <Page title="Products Stock">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Product Stock
          </Typography>
          <div>
            <Button
              className="bulk-edit-btn"
              variant="contained"
              onClick={() => (areEditable ? bulkUpdateFn(productStock) : setAreEditable(!areEditable))}
              startIcon={<Iconify icon={areEditable ? 'eva:save-fill' : 'eva:edit-fill'} />}
            >
              {areEditable ? 'Save' : 'Bulk Edit'}
            </Button>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/product-stock/add"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Products Stock
            </Button>
          </div>
        </Stack>

        <Card>
          <ListToolbar
            text="stock"
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
                      rowCount={productStock.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const {
                          id,
                          name,
                          purchasing_price,
                          available_stock,
                          vendor,
                          sold,
                          on_credit,
                          on_claim,
                          updated_at,
                        } = row;
                        const isItemSelected = selected.indexOf(name) !== -1;

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
                              <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{vendor}</TableCell>

                            <TableInput
                              disabled={!areEditable}
                              name="purchasing_price"
                              lebel="Rs."
                              value={purchasing_price}
                              onChange={(event) => handleChange(event, id)}
                            />

                            <TableInput
                              disabled={!areEditable}
                              name="available_stock"
                              className={`indicator ${((available_stock ?? 0) <= 0 && 'error') || 'success'}`}
                              value={available_stock ?? 0}
                              onChange={(event) => handleChange(event, id)}
                            />

                            <TableCell align="left">{sold ?? 0}</TableCell>
                            <TableCell align="left">{on_credit ?? 0}</TableCell>
                            <TableCell align="left">{on_claim ?? 0}</TableCell>
                            <TableCell align="left">{convertDateTimeObject(updated_at)}</TableCell>

                            <TableCell align="right">
                              <MoreMenu
                                onDelete={() => deleteProductStockFn(id)}
                                pathWithId={`/dashboard/product-stock/edit/${id}`}
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
            count={productStock?.length ?? 0}
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
