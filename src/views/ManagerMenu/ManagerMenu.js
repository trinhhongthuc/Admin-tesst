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
import { AuthContext } from "Context/AuthProvider";
import React from "react";
import { Link } from "react-router-dom";
import TableManagerMenu from "./TableManagerMenu";
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

export default function ManagerMenu() {
  const classes = useStyles();

  const [notify, setNotify] = React.useState(false);
  const { listMenu, setListMenu } = React.useContext(AuthContext);

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
        <Link to="/admin/menu/add-menu">
          <Button color="primary">Thêm Menu</Button>
        </Link>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Danh sách Menu sản phẩm</h4>
            <p className={classes.cardCategoryWhite}>Thông tin Menu</p>
          </CardHeader>
          <CardBody>
            <TableManagerMenu
              tableHeaderColor="primary"
              tableHead={["Tên menu", "Hình ảnh", "Danh mục cha", "Trạng thái"]}
              tableHeadAction={true}
              tableData={listMenu}
              setNotify={setNotify}
              setListMenu={setListMenu}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
