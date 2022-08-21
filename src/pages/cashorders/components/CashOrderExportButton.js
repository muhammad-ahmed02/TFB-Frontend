import { Button } from '@mui/material';
import React from 'react';
import CsvDownloader from 'react-csv-downloader';
import Iconify from '../../../components/Iconify';

function CashOrderExportButton({ TABLE_HEAD = [], data = [] }) {
  return (
    <CsvDownloader
      className="csv-downloader"
      filename={`cash-order-${new Date().toISOString()}.csv`}
      extension=".csv"
      columns={TABLE_HEAD.map(({ id, label }) => ({
        id,
        displayName: label,
      }))}
      datas={data.map((row) => ({
        unique_id: row.unique_id,
        customer_name: row.customer_name,
        // product: row.product_detail[0]?.name,
        seller_name: row.seller_name,
        sale_price: row.sale_price,
        // cost_price: row.product_detail[0]?.purchasing_price,
        profit: row.profit,
        imei_number: row.imei_number,
        updated_by: new Date(row.updated_at).toDateString(),
      }))}
    >
      <Button className="bulk-edit-btn" variant="contained" startIcon={<Iconify icon={'eva:download-fill'} />}>
        Export
      </Button>
    </CsvDownloader>
  );
}

export default CashOrderExportButton;
