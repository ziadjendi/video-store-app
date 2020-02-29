import React from "react";
import { TableContainer, Table } from "@material-ui/core";
import TBody from "./tBody";
import THeader from "./tHeader";
const TTable = ({ data, columns, sortColumn, onSort }) => {
  return (
    <TableContainer>
      <Table aria-label="movie table">
        <THeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
        <TBody data={data} columns={columns} />
      </Table>
    </TableContainer>
  );
};

export default TTable;
