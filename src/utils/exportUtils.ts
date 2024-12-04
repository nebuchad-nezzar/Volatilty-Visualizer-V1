import Papa from 'papaparse';
import { saveAs } from 'file-saver';

export const exportToCsv = (data: any[], filename: string) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

export const exportToHtml = (plotData: any[], filename: string) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Volatility Surface</title>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
      </head>
      <body>
        <div id="plot"></div>
        <script>
          const data = ${JSON.stringify(plotData)};
          const layout = {
            title: '3D Volatility Surface',
            scene: {
              xaxis: { title: 'Log Moneyness (%)' },
              yaxis: { title: 'Days to Expiry' },
              zaxis: { title: 'Implied Volatility (%)' },
            },
          };
          Plotly.newPlot('plot', data, layout);
        </script>
      </body>
    </html>
  `;
  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  saveAs(blob, filename);
};