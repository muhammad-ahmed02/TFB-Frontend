import React, { useState } from 'react';
import { Card, Stack, Button, Container, Typography, Autocomplete, TextField, Grid } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useQuery } from '@tanstack/react-query';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import { getCashOrderReport, getReturnCashOrderReport } from '../../service/api';

function Reports() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reportType, setReportType] = useState('');

  const reportOptions = [
    {
      label: 'Cash Order Report',
      value: getCashOrderReport,
    },
    {
      label: 'Return Cash Order Report',
      value: getReturnCashOrderReport,
    },
  ];

  const { data, isLoading, refetch } = useQuery(
    [reportType.label, startDate.toISOString() + endDate.toISOString()],
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
              disabled={!reportType}
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    fullWidth
                    options={reportOptions}
                    value={reportType}
                    isOptionEqualToValue={(vendor, value) => vendor.label === value}
                    renderInput={(params) => <TextField label="Report" {...params} />}
                    onChange={(event, newValue) => setReportType(newValue)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <DateTimePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <DateTimePicker
                    label="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}

export default Reports;
