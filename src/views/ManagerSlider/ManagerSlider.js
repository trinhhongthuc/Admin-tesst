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
import TableManagerSlide from "./TableManagerSlide";
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

export default function ManagerSlider() {
  const classes = useStyles();

  const [listSlide, setListSlide] = React.useState([]);
  const [notify, setNotify] = React.useState(false);
  React.useEffect(() => {
    db.collection("Slide")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get()
      .then((snapshot) => {
        let codeSale = snapshot.docs.map((doc) => ({
          image: doc.data().image,
          status: doc.data().status,
          nameSlide: doc.data().nameSlide,
          id: doc.id,
        }));
        setListSlide(codeSale);
      })
      .catch((err) => {
        console.log("Đây là Err get all Slide", err);
      });
  }, [setListSlide, listSlide]);

  return (
    <GridContainer>
      {notify ? (
        <Snackbar
          place="tc"
          color="success"
          icon={NotificationsIcon}
          message="Xóa Slide thành công"
          open={notify}
          closeNotification={() => setNotify(false)}
          close
        />
      ) : (
        ""
      )}
      <GridItem xs={12} sm={12} md={12}>
        <Link to="/admin/slide/add-slide">
          <Button color="primary">Thêm Slide</Button>
        </Link>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Danh sách Slide</h4>
            <p className={classes.cardCategoryWhite}>Thông tin Slide</p>
          </CardHeader>
          <CardBody>
            <TableManagerSlide
              tableHeaderColor="primary"
              tableHead={["Hình ảnh", "Tên Slide", "Trạng thái"]}
              tableHeadAction={true}
              tableData={listSlide}
              setNotify={setNotify}
              setListSlide={setListSlide}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
