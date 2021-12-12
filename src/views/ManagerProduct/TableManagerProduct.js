// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "components/CustomButtons/Button.js";
import { AuthContext } from "Context/AuthProvider";
import { db } from "firebase/config";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { listStatus } from "until/Contants";
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

export default function TableManagerProduct(props) {
  const classes = useStyles();
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    linkButton,
    setNotify,
    setListBanner,
  } = props;

  const { listMenu } = React.useContext(AuthContext);

  const handleRemoveItem = (id) => {
    db.collection("Banner")
      .doc(id)
      .delete()
      .then((res) => {
        const data = tableData.filter((item) => item.id !== id);
        setListBanner(data);
        setNotify(true);
        setTimeout(function () {
          setNotify(false);
        }, 4000);
      });
  };

  const handleDisplayNameMenu = (id) => {
    console.log(id);
    if (listMenu && listMenu?.length > 0) {
      let menuProduct = listMenu.find((itemMenu) => itemMenu.menuId == id);
      if (menuProduct) return menuProduct.nameMenu;
    } else return "";
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
          {tableData &&
            tableData.length > 0 &&
            tableData.map((prop, key) => {
              let status = listStatus.find((item) => item.type === prop.status);
              console.log(prop);
              return (
                <TableRow key={key} className={classes.tableBodyRow}>
                  <TableCell
                    className={classes.tableCell}
                    key={key}
                    style={{ width: "20%" }}
                  >
                    <div className={classes.wrapperImg}>
                      <img src={prop.avatarProduct} alt="img" />
                    </div>
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    key={key}
                    style={{ width: "15%" }}
                  >
                    {handleDisplayNameMenu(prop.idMenu)}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    key={key}
                    style={{ width: "25%" }}
                  >
                    {prop.nameProduct}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    key={key}
                    style={{ width: "10%" }}
                  >
                    {status.status}
                  </TableCell>
                  <TableCell className={classes.tableCell} key={key}>
                    {props.tableHeadAction == true ? (
                      <>
                        <Link to={`/admin/product/update-product/${prop.id}`}>
                          <Button color="primary">Kiểm tra sản phẩm</Button>
                        </Link>
                      </>
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

TableManagerProduct.defaultProps = {
  tableHeaderColor: "gray",
};

TableManagerProduct.propTypes = {
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
