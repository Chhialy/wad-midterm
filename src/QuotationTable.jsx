import { 
  Container, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  Box
} from "@mui/material";
import { ShoppingCart, Clear, Delete } from "@mui/icons-material";

function QuotationTable({ data, deleteByIndex, clearAll }) {

  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Quotation
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShoppingCart />
          <Typography>No items</Typography>
        </Box>
      </Container>
    );
  }

  const totalAmount = data.reduce((acc, v) => acc + (v.qty * v.ppu - v.discount), 0);
  const totalDiscount = data.reduce((acc, v) => acc + v.discount, 0);

  const handleDelete = (index) => {
    deleteByIndex(index);
  };

  const handleClear = () => {
    clearAll();
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Quotation
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Button 
          variant="outlined" 
          color="secondary" 
          startIcon={<Clear />}
          onClick={handleClear}
        >
          Clear
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              let amount = v.qty * v.ppu - v.discount;
              return (
                <TableRow key={i}>
                  <TableCell align="center">
                    <Delete 
                      sx={{ cursor: 'pointer', color: 'error.main' }}
                      onClick={() => handleDelete(i)} 
                    />
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{v.ppu.toFixed(2)}</TableCell>
                  <TableCell align="center">{v.discount.toFixed(2)}</TableCell>
                  <TableCell align="right">{amount.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bold' }}>
                Total Discount
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                {totalDiscount.toFixed(2)}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                -
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right" sx={{ fontWeight: 'bold' }}>
                Total
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                {totalAmount.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default QuotationTable;
