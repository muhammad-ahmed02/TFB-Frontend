import React, { useState } from 'react';
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
import { filter } from 'lodash';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usePagenation } from '../../hooks/usePagenation';
import { useToast } from '../../hooks/useToast';
import { createWeekClosure, getWeekClosureReport, getWeekClosures } from '../../service/api';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { ListHead } from '../../sections/@dashboard/table-components';
import { convertDateTimeObject } from '../../utils/formatDate';

//  ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'created_at', label: 'Created Date', alignRight: false },
  { id: 'total_profit', label: 'Total Profit', alignRight: false },
  { id: 'business_profit', label: 'Bussiness Profit', alignRight: false },
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
    return filter(array, (_user) => _user.id.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function WeekClosures() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { slice, page, rowsPerPage, apiPageNumber, rowsPerPageOptions, setRowsPerPage, setPage, handleChangePage } =
    usePagenation();

  const { isLoading, data } = useQuery({
    queryKey: ['getWeekClosures', `${apiPageNumber}`],
    queryFn: () => getWeekClosures({ page: apiPageNumber }),
  });

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  // eslint-disable-next-line
  const [filterName, setFilterName] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.results.length) : 0;

  const filteredProducts = applySortFilter(data ?? [], getComparator(order, orderBy), filterName);

  const isProductsNotFound = filteredProducts.length === 0;

  const { refetch } = useQuery({
    queryKey: 'getWeekClosureReport',
    queryFn: getWeekClosureReport,
    enabled: false,
    onSuccess: (data) => {
      const link = document.getElementById('download-link');
      link.href = `data:text/csv;charset=utf-8,${escape(data)}`;
      link.click();
    },
  });

  const { mutate: createWeekClosureFn } = useMutation({
    mutationKey: 'createWeekClosure',
    mutationFn: createWeekClosure,
    onSuccess: () => showToast(`Week closed successfully`),
    onSettled: () => queryClient.invalidateQueries('getWeekClosures'),
    onError: (error) => showToast(error.message),
  });

  return (
    <Page title="Week Closure">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Week Closure
          </Typography>
          <div>
            <Button
              className="bulk-edit-btn"
              variant="contained"
              startIcon={<Iconify icon="eva:clock-fill" />}
              onClick={createWeekClosureFn}
            >
              Close Week
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="eva:download-fill" />} onClick={refetch}>
              Export Week Closure
            </Button>
            {/* eslint-disable-next-line */}
            <a id="download-link" hidden download={`week-closure-${new Date().toLocaleDateString()}.csv`} />
          </div>
        </Stack>

        <Card>
          {/* <ListToolbar
            text="week"
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}

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
                      rowCount={data.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {(slice
                        ? filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filteredProducts
                      ).map((row) => {
                        const { id, business_profit, total_profit, created_at } = row;
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
                            <TableCell align="left">{id}.</TableCell>
                            <TableCell align="left">{convertDateTimeObject(created_at)}</TableCell>
                            <TableCell align="left">Rs. {total_profit}</TableCell>
                            <TableCell align="left">Rs. {business_profit}</TableCell>

                            {/* <TableCell align="right">
                              <MoreMenu
                                onDelete={() => deleteProductFn(id)}
                                pathWithId={`/dashboard/products/edit/${id}`}
                              />
                            </TableCell> */}
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

export default WeekClosures;
