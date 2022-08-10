import { filter } from 'lodash';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
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
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteSeller, getSellers } from '../service/api';
import { useToast } from '../hooks/useToast';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../sections/@dashboard/table-components';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'profit', label: 'Profit', alignRight: false },
  { id: 'update_at', label: 'Updated date', alignRight: false },
  { id: 'create_at', label: 'Created date', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
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
    return filter(array, (_user) => _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Seller() {
  const { showToast } = useToast();
  const { data, isLoading } = useQuery({
    queryKey: 'getSellers',
    queryFn: getSellers,
  });

  const { mutate: deleteSellerFn } = useMutation((id) => deleteSeller(id), {
    onSuccess: () => {
      showToast(`Seller deleted successfully`);
    },
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
      const newSelecteds = USERLIST.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

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
    <Page title="Seller">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Seller
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New seller
          </Button>
        </Stack>

        <Card>
          <ListToolbar
            text="seller"
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
                      rowCount={USERLIST.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id, username, profit, created_at, updated_at } = row;
                        const isItemSelected = selected.indexOf(username) !== -1;

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
                              <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, username)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={username} />
                                <Typography variant="subtitle2" noWrap>
                                  {username}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">Rs. {profit}</TableCell>
                            <TableCell align="left">{convertDateTimeObject(updated_at)}</TableCell>
                            <TableCell align="left">{convertDateTimeObject(created_at)}</TableCell>

                            <TableCell align="right">
                              <MoreMenu
                                onDelete={() => deleteSellerFn(id)}
                                pathWithId={`/dashboard/sellers/edit/${id}`}
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
            count={USERLIST?.length ?? 0}
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
