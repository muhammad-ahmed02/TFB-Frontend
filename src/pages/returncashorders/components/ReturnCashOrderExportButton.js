import { Button } from '@mui/material';
import React from 'react';
import CsvDownloader from 'react-csv-downloader';
import Iconify from '../../../components/Iconify';

function ReturnCashOrderExportButton({ TABLE_HEAD = [], data = [] }) {
  return (
    <CsvDownloader
      className="csv-downloader"
      filename={`return-cash-order-${new Date().toISOString()}.csv`}
      extension=".csv"
      columns={TABLE_HEAD.map(({ id, label }) => ({
        id,
        displayName: label,
      }))}
      datas={data.map((row) => ({
        unique_id: row.cashorder_detail[0].unique_id,
        reason: row.reason,
        product_name: row.cashorder_detail[0].product_detail[0].name,
        seller_name: row.cashorder_detail[0].seller_name,
        product: row.cashorder_detail[0].product_detail[0].name,
        sale_price: row.cashorder_detail[0].sale_price,
        cost_price: row.cashorder_detail[0].product_detail[0].purchasing_price,
        profit: row.cashorder_detail[0].profit,
        return_amount: row.return_amount,
        warranty: row.cashorder_detail[0].warranty,
        buy_date: new Date(row.cashorder_detail[0].created_at).toDateString(),
        return_date: new Date(row.created_at).toDateString(),
      }))}
    >
      <Button className="bulk-edit-btn" variant="contained" startIcon={<Iconify icon={'eva:download-fill'} />}>
        Export
      </Button>
    </CsvDownloader>
  );
}

export default ReturnCashOrderExportButton;
