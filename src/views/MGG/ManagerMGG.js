// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import { db } from "firebase/config";
import React from "react";
import { Link } from "react-router-dom";
import TableManagerCodeSale from "./TableManagerCodeSale";
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

export default function ManagerMGG() {
  const classes = useStyles();

  const [listCodeSale, setListCodeSale] = React.useState([]);
  const [notify, setNotify] = React.useState(false);
  React.useEffect(() => {
    db.collection("Code-Sale")
      // .where("keywords", "array-contains", search?.toLowerCase())
      .orderBy("createdAt", "desc")
      .limit(20)
      .get()
      .then((snapshot) => {
        let codeSale = snapshot.docs.map((doc) => ({
          code: doc.data().code,
          priceSale: doc.data().priceSale,
          numberCountEntered: doc.data().numberCountEntered,
          status: doc.data().status,
          id: doc.id,
        }));
        setListCodeSale(codeSale);
      })
      .catch((err) => {
        console.log("Đây là Err get all code sale", err);
      });
  }, []);

  return (
    <GridContainer>
      {notify ? (
        <Snackbar
          place="tc"
          color="success"
          icon={NotificationsIcon}
          message="Xóa mã giảm giá thành công"
          open={notify}
          closeNotification={() => setNotify(false)}
          close
        />
      ) : (
        ""
      )}
      <GridItem xs={12} sm={12} md={12}>
        <Link to="/admin/mgg/add-code-sale">
          <Button color="primary">Thêm mã giảm giá</Button>
        </Link>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Danh sách mã giảm giá</h4>
            <p className={classes.cardCategoryWhite}>Thông tin mã giảm giá</p>
          </CardHeader>
          <CardBody>
            <TableManagerCodeSale
              tableHeaderColor="primary"
              tableHead={["Code", "Số tiền", "Số lần nhập", "Trạng thái"]}
              tableHeadAction={true}
              tableData={listCodeSale}
              setListCodeSale={setListCodeSale}
              setNotify={setNotify}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
