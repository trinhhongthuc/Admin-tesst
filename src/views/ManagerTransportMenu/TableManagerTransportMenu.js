// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "components/CustomButtons/Button.js";
import { db } from "firebase/config";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
const styless = {
  linkInButton: {
    color: "#fff !important",
  },
};

const useStyles = makeStyles(styless);

export default function TableManagerTransportMenu(props) {
  const classes = useStyles();
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    linkButton,
    setNotify,
    setListCodeSale,
  } = props;

  const handleRemoveItem = (id) => {
    db.collection("Code-Sale")
      .doc(id)
      .delete()
      .then((res) => {
        const data = tableData.filter((item) => item.id !== id);
        setListCodeSale(data);
        setNotify(true);
        setTimeout(function () {
          setNotify(false);
        }, 4000);
      });
  };

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}

              {props.tableHeadAction == true ? (
                <TableCell
                  className={classes.tableCell + " " + classes.tableHeadCell}
                  width={"30%"}
                >
                  Thao tác
                </TableCell>
              ) : (
                ""
              )}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.displayName}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.email}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.phone}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.status == 0
                    ? "Active"
                    : prop.status == 1
                    ? "Inactive"
                    : "Suspended"}
                </TableCell>

                <TableCell className={classes.tableCell} key={key}>
                  {props.tableHeadAction == true ? (
                    <Link to={`/admin/transport-menu/detail-transport-menu/1`}>
                      <Button
                        color="primary"
                        // onClick={() => handleRemoveItem(prop.id)}
                      >
                        Xem chi tiết đơn hàng
                      </Button>
                    </Link>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

TableManagerTransportMenu.defaultProps = {
  tableHeaderColor: "gray",
};

TableManagerTransportMenu.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
