import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";


function CheckoutScreenTable({ classes }) {
  return (
    <div>
      <TableContainer>
        <Table sx={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={{ borderBottom: "2px solid black" }}>
              <TableCell sx={classes.tableBodyCell}>Common x3</TableCell>
              <TableCell align="right" sx={classes.tableBodyCell}>
                $115,780.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={classes.tableBodyCell}>Anciet x3</TableCell>
              <TableCell align="right" sx={classes.tableBodyCell}>
                $115,780.00
              </TableCell>
            </TableRow>
            <TableRow style={{ borderBottom: "2px solid black" }}>
              <TableCell sx={classes.subtotal}>Subtotal</TableCell>
              <TableCell align="right" sx={classes.tableBodyCell}>
                $115,780.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={classes.total}>Total</TableCell>
              <TableCell align="right" sx={classes.total}>
                $115,780.00
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CheckoutScreenTable;
