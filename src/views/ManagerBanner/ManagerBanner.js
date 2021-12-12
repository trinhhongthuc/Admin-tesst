// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AddAlert from "@material-ui/icons/AddAlert";
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
import TableManagerBanner from "./TableManagerBanner";
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

export default function ManagerBanner() {
  const classes = useStyles();

  const [listBanner, setListBanner] = React.useState([]);
  const [notify, setNotify] = React.useState(false);
  React.useEffect(() => {
    db.collection("Banner")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get()
      .then((snapshot) => {
        let codeSale = snapshot.docs.map((doc) => ({
          image: doc.data().image,
          status: doc.data().status,
          nameBanner: doc.data().nameBanner,
          id: doc.id,
        }));
        setListBanner(codeSale);
      })
      .catch((err) => {
        console.log("Đây là Err get all Banner", err);
      });
  }, [setListBanner, listBanner]);

  return (
    <GridContainer>
      {notify ? (
        <Snackbar
          place="tc"
          color="success"
          icon={AddAlert}
          message="Xóa Banner thành công"
          open={notify}
          closeNotification={() => setNotify(false)}
          close
        />
      ) : (
        ""
      )}
      <GridItem xs={12} sm={12} md={12}>
        <Link to="/admin/banner/add-banner">
          <Button color="primary">Thêm Banner</Button>
        </Link>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Danh sách Banner</h4>
            <p className={classes.cardCategoryWhite}>Thông tin Banner</p>
          </CardHeader>
          <CardBody>
            <TableManagerBanner
              tableHeaderColor="primary"
              tableHead={["Hình ảnh", "Tên banner", "Trạng thái"]}
              tableHeadAction={true}
              tableData={listBanner}
              setNotify={setNotify}
              setListBanner={setListBanner}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
