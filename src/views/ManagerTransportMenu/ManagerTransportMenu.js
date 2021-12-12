// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import React from "react";
import TableManagerTransportMenu from "./TableManagerTransportMenu";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function ManagerTransportMenu() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Danh sách mã giảm giá</h4>
            <p className={classes.cardCategoryWhite}>Thông tin mã giảm giá</p>
          </CardHeader>
          <CardBody>
            <TableManagerTransportMenu
              tableHeaderColor="primary"
              tableHead={["Mã đơn hàng", "Tên đơn hàng", "Trạng thái"]}
              tableHeadAction={true}
              tableData={[
                ["asssdsadasd", "120000", "10"],
                ["asssdsadasd", "120000", "10"],
                ["asssdsadasd", "120000", "10"],
                ["asssdsadasd", "120000", "10"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
