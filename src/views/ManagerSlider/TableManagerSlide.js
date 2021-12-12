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
const styless = {
  linkInButton: {
    color: "#fff !important",
  },
  wrapperImg: {
    width: "50%",
    height: "80px",

    "& img": {
      width: "100%",
      height: "100%",
    },
  },
};

const useStyles = makeStyles(styless);

export default function TableManagerSlide(props) {
  const classes = useStyles();
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    linkButton,
    setNotify,
    setListSlide,
  } = props;

  const handleRemoveItem = (id) => {
    db.collection("Slide")
      .doc(id)
      .delete()
      .then((res) => {
        const data = tableData.filter((item) => item.id !== id);
        setListSlide(data);
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
                  style={{ textAlign: "center" }}
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
          {tableData &&
            tableData.length > 0 &&
            tableData.map((prop, key) => {
              return (
                <TableRow key={key} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell} key={key}>
                    <div className={classes.wrapperImg}>
                      <img src={prop.image} alt="img" />
                    </div>
                  </TableCell>
                  <TableCell className={classes.tableCell} key={key}>
                    {prop.nameSlide}
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
                      <div style={{ textAlign: "center" }}>
                        <Button
                          color="warning"
                          onClick={() => handleRemoveItem(prop.id)}
                        >
                          xóa
                        </Button>
                      </div>
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

TableManagerSlide.defaultProps = {
  tableHeaderColor: "gray",
};

TableManagerSlide.propTypes = {
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
