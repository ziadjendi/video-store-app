import React, { Component } from "react";
import { TableRow, TableCell, TableBody } from "@material-ui/core";
import _ from "lodash";

class TBody extends Component {
  createCellKey(item, column) {
    const { idProperty, pathProperty, keyProperty } = this.props;
    return item[idProperty] + (column[pathProperty] || column[keyProperty]);
  }
  render() {
    const { data, columns, pathProperty, idProperty } = this.props;

    return (
      <TableBody>
        {data.map(item => (
          <TableRow key={item[idProperty]} hover>
            {columns.map(column => (
              <TableCell key={this.createCellKey(item, column)}>
                {column.content
                  ? column.content(item)
                  : _.get(item, column[pathProperty])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }
}

TBody.defaultProps = {
  keyProperty: "key",
  pathProperty: "path",
  idProperty: "_id"
};

export default TBody;
