import React, { useState } from 'react';
import { Card, Stack, Button, Container, Typography, Autocomplete, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useQuery } from '@tanstack/react-query';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import { getCashOrderReport, getReturnCashOrderReport } from '../../service/api';

function Reports() {
  const [startDate, setStartDate] = useState(new Date('2014-08-18T21:11:54'));
  const [endDate, setEndDate] = useState(new Date('2014-08-18T21:11:54'));
  const [reportType, setReportType] = useState('');

  const reportOptions = [
    {
      label: 'Csh Order Report',
      value: getCashOrderReport,
    },
    {
      label: 'Return Cash Order Report',
      value: getReturnCashOrderReport,
    },
  ];

  const { data, isLoading, refetch } = useQuery(
    [reportType.label, startDate.toISOString + endDate.toISOString],
    () =>
      reportType.value({
        start: startDate,
        end: endDate,
      }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Page title="Reports">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Reports
          </Typography>
          <div>
            <Button
              className="bulk-edit-btn"
              variant="contained"
              onClick={() => refetch()}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              GO
            </Button>
            {data && (
              <Button
                variant="contained"
                onClick={() => {
                  const link = document.getElementById('report');
                  link.click();
                }}
                startIcon={<Iconify icon={isLoading ? 'eva:loader-outline' : 'eva:download-fill'} />}
              >
                {isLoading ? 'Loding...' : 'Download'}
              </Button>
            )}
            {/* eslint-disable-next-line */}
            <a id="report" href={`data:text/csv;charset=utf-8,${escape(data)}`} download="report.csv" hidden />
          </div>
        </Stack>

        <Card>
          <Stack padding={5} spacing={3} direction={{ xs: 'column', sm: 'row' }}>
            <Autocomplete
              fullWidth
              options={reportOptions}
              value={reportType}
              isOptionEqualToValue={(vendor, value) => vendor.label === value}
              renderInput={(params) => <TextField label="Vendor" {...params} />}
              onChange={(event, newValue) => setReportType(newValue)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="MM/dd/yyyy"
                value={startDate}
                onChange={(e) => setStartDate(e)}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/dd/yyyy"
                value={endDate}
                onChange={(e) => setEndDate(e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}

export default Reports;
