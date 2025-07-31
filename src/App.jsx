import { useState, useRef, useEffect } from "react";
import { 
  Container, 
  Grid, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField,
  Box
} from "@mui/material";
import QuotationTable from "./QuotationTable";
import initialData from "./data.json";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);
  const [selectedProduct, setSelectedProduct] = useState(products[0].code);

  // Load initial data on component mount
  useEffect(() => {
    setDataItems(initialData);
  }, []);

  const addItem = () => {
    let item = products.find((v) => selectedProduct === v.code);
    const discount = parseFloat(discountRef.current.value) || 0;

    const newItem = {
      item: item.name,
      ppu: parseFloat(ppuRef.current.value),
      qty: parseInt(qtyRef.current.value),
      discount: discount,
    };

    // Check for redundant items (same name and price)
    const existingItemIndex = dataItems.findIndex(
      (existingItem) => 
        existingItem.item === newItem.item && 
        existingItem.ppu === newItem.ppu
    );

    if (existingItemIndex !== -1) {
      // Merge redundant items
      const updatedItems = [...dataItems];
      updatedItems[existingItemIndex].qty += newItem.qty;
      updatedItems[existingItemIndex].discount += newItem.discount;
      setDataItems(updatedItems);
    } else {
      // Add new item
      setDataItems([...dataItems, newItem]);
    }

    // Reset discount field
    discountRef.current.value = 0;
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  }

  const clearAll = () => {
    setDataItems([]);
  };

  const productChange = (event) => {
    const productCode = event.target.value;
    setSelectedProduct(productCode);
    let item = products.find((v) => productCode === v.code);
    setPpu(item.price);
  };

  return (
    <Container maxWidth={false} sx={{ height: '100vh', p: 2, maxWidth: '100vw' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: "#e4e4e4", p: 3, borderRadius: 1, height: 'fit-content' }}>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Item</InputLabel>
                <Select
                  value={selectedProduct}
                  label="Item"
                  onChange={productChange}
                >
                  {products.map((p) => (
                    <MenuItem key={p.code} value={p.code}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Price Per Unit"
                type="number"
                inputRef={ppuRef}
                value={ppu}
                onChange={(e) => setPpu(e.target.value)}
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                inputRef={qtyRef}
                defaultValue={1}
              />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Discount"
                type="number"
                inputRef={discountRef}
                defaultValue={0}
                //helperText="Discount applies to this row"
              />
            </Box>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={addItem}
              sx={{ py: 1.5 }}
            >
              Add
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={8} sx={{ height: '100%', overflow: 'auto' }}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={clearAll}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
