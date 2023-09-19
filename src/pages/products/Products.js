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
import { deleteProduct, getProducts } from '../../service/api';
import { useToast } from '../../hooks/useToast';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { ListHead, MoreMenu, ListToolbar } from '../../sections/@dashboard/table-components';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Products() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [products, setProducts] = useState([]);

  const { slice, page, rowsPerPage, apiPageNumber, rowsPerPageOptions, setRowsPerPage, setPage, handleChangePage } =
    usePagenation();

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['getProducts', `${apiPageNumber}`],
    queryFn: () => getProducts({ page: apiPageNumber }),
    onSuccess: (data) => setProducts(data?.results),
  });

  const { mutate: deleteProductFn } = useMutation((id) => deleteProduct(id), {
    onSuccess: () => {
      showToast(`Product deleted successfully`);
    },
    onSettled: () => queryClient.invalidateQueries('getProduct'),
    onError: (error) => {
      showToast(error.message);
    },
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.id);
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

  const getProductFromName = (event, name) => {
    const prod = products.find((obj) => obj.name === name);
    return prod;
  };

  const bulkDelete = (event) => {
    selected.forEach((name) => {
      const prod = getProductFromName(event, name);
      deleteProductFn(prod.id);
    });
    setSelected([]);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.results?.length) : 0;

  const filteredProducts = applySortFilter(products ?? [], getComparator(order, orderBy), filterName);

  const isProductsNotFound = filteredProducts.length === 0;

  return (
    <Page title="Products">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          <div>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/products/add"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Product
            </Button>
          </div>
        </Stack>

        <Card>
          <ListToolbar
            text="product"
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDelete={bulkDelete}
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
                      rowCount={products.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {(slice
                        ? filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filteredProducts
                      ).map((row) => {
                        const { id, name, updated_at, created_at } = row;
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
                            <TableCell component="th" scope="row" padding="none" align="center">
                              <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{new Date(updated_at).toDateString()}</TableCell>
                            <TableCell align="left">{new Date(created_at).toDateString()}</TableCell>

                            <TableCell align="right">
                              <MoreMenu
                                onDelete={() => deleteProductFn(id)}
                                pathWithId={`/dashboard/products/edit/${id}`}
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
