import { useState } from 'react';

export function usePagenation() {
  const numberOfRecordsFromAPI = 100;
  const rowsPerPageOptions = [10, 25, 50, 100];
  const [page, setPage] = useState(0);
  const [apiPageNumber, setApiPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[1]);
  const [slice, setSlice] = useState(true);
  const [range, setRange] = useState({
    start: 0,
    end: 9,
  });

  const handleChangePage = (event, newPage) => {
    if ((newPage + 1) * rowsPerPage > range.end || (newPage + 1) * rowsPerPage <= range.start) {
      const nextApiPageNumber = Math.ceil(((newPage + 1) * rowsPerPage) / numberOfRecordsFromAPI);

      // eslint-disable-next-line
      nextApiPageNumber > apiPageNumber ? setSlice(false) : setSlice(true);

      setApiPageNumber(nextApiPageNumber);
      setRange({
        start: nextApiPageNumber * numberOfRecordsFromAPI - numberOfRecordsFromAPI,
        end: nextApiPageNumber * numberOfRecordsFromAPI - 1,
      });
    } else {
      setSlice(true);
    }
    setPage(newPage);
  };

  return {
    page,
    apiPageNumber,
    rowsPerPage,
    slice,
    rowsPerPageOptions,
    setPage,
    setRowsPerPage,
    handleChangePage,
  };
}
