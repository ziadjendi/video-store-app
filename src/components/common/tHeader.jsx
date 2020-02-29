import React, { Component } from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

class TableHeader extends Component {
  raiseSort = column => {
    if (column.path) {
      const sortColumn = { ...this.props.sortColumn };
      if (sortColumn.path === column.path)
        sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
      else {
        sortColumn.path = column.path;
        sortColumn.order = "asc";
      }
      this.props.onSort(sortColumn);
    }
  };
  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (sortColumn.path !== column.path || !column.path) return null;
    if (column.path && sortColumn.order === "asc") return <ArrowDropUpIcon />;
    return <ArrowDropDownIcon />;
  };
  render() {
    const { columns } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell
              key={column.path || column.key}
              onClick={() => this.raiseSort(column)}
              className={column.path && "clickable"}
            >
              {column.lable} {this.renderSortIcon(column)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default TableHeader;
