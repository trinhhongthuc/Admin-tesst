// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import { db } from "firebase/config";
import React from "react";
import TableManagerAccount from "./TableManagerAccout";
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

export default function ManagerAccount() {
  const classes = useStyles();

  const [listAccount, setListAccount] = React.useState([]);
  const [notify, setNotify] = React.useState(false);
  React.useEffect(() => {
    db.collection("users")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get()
      .then((snapshot) => {
        let codeSale = snapshot.docs.map((doc) => ({
          displayName: doc.data().displayName,
          email: doc.data().email,
          phone: doc.data().phone,
          status: doc.data().status,
          uid: doc.data().uid,
          address: doc.data().address,
          dayOfBirth: doc.data().dayOfBirth,
          genders: doc.data().gender,
          photoURL: doc.data().photoURL,
          id: doc.id,
        }));

        console.log(codeSale);
        setListAccount(codeSale);
      })
      .catch((err) => {
        console.log("Đây là Err get all Account", err);
      });
  }, []);

  return (
    <GridContainer>
      {notify ? (
        <Snackbar
          place="tc"
          color="success"
          icon={NotificationsIcon}
          message="Xóa Menu thành công"
          open={notify}
          closeNotification={() => setNotify(false)}
          close
        />
      ) : (
        ""
      )}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Danh sách mã giảm giá</h4>
            <p className={classes.cardCategoryWhite}>Thông tin mã giảm giá</p>
          </CardHeader>
          <CardBody>
            <TableManagerAccount
              tableHeaderColor="primary"
              tableHead={["Tên tài khoản", "Email", "Phone", "Trạng thái"]}
              tableHeadAction={true}
              tableData={listAccount}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
