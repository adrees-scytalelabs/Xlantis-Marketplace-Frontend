import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Table } from "react-bootstrap";


function CheckoutScreenTable({ classes }) {
  return (
    <div>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={{ borderBottom: "2px solid black" }}>
              <TableCell className={classes.tableBodyCell}>Common x3</TableCell>
              <TableCell align="right" className={classes.tableBodyCell}>
                $115,780.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableBodyCell}>Anciet x3</TableCell>
              <TableCell align="right" className={classes.tableBodyCell}>
                $115,780.00
              </TableCell>
            </TableRow>
            <TableRow style={{ borderBottom: "2px solid black" }}>
              <TableCell className={classes.subtotal}>Subtotal</TableCell>
              <TableCell align="right" className={classes.tableBodyCell}>
                $115,780.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.total}>Total</TableCell>
              <TableCell align="right" className={classes.total}>
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
