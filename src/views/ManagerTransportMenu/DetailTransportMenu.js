import { makeStyles } from "@material-ui/core/styles";
import logo from "assets/img/reactlogo.png";
import bgImage from "assets/img/sidebar-2.jpg";
import { ReactComponent as IconLoading } from "assets/img/three-dots.svg";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import useFirestore from "hooks/useFirestore";
import moment from "moment";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
// silde bar
import routes from "routes.js";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  containContent: {
    width: "calc(100% - 260px)",
    marginLeft: "260px",
    padding: 25,
    boxSizing: "border-box",
  },
  imgAvatar: {
    width: "150px",
    height: "100%",
  },
  title: {
    fontSize: "16px",
    margin: 0,
    color: "#333",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const useStyles = makeStyles(styles);

const DetailTransportMenu = () => {
  const id = useParams().id;
  const classes = useStyles();
  const history = useHistory();
  //silde bar
  const [image, setImage] = React.useState(bgImage);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [color, setColor] = React.useState("blue");
  const [loading, setLoading] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleColorClick = (color) => {
    setColor(color);
  };
  //

  const [success, setSuccess] = React.useState(false);
  const [codeSale, setCodeSale] = React.useState("");
  const [nameCode, setNameCode] = React.useState("");
  const [priceSale, setPriceSale] = React.useState("");
  const [numberCount, setNumberCount] = React.useState("5");

  //err
  const [errNameCode, setErrNameCode] = React.useState(true);
  const [errPriceSale, setErrPriceSale] = React.useState(true);
  const [errNumberCount, setErrNumberCount] = React.useState(true);

  const handleRandomCodeSale = () => {
    let crypto = require("crypto");
    let codeRandom = crypto.randomBytes(6).toString("hex").toUpperCase();
    setCodeSale(codeRandom);
  };

  // handle code sale request
  const condition = React.useMemo(
    () => ({
      fieldName: "uid",
      operator: "==",
      compareValue: id,
    }),
    [id]
  );

  const messages = useFirestore("users", condition);

  const [dataResult, setDataResult] = React.useState({
    displayName: "",
    photoURL: "",
    gender: "",
    dayOfBirth: "",
    email: "",
    phone: "",
    address: "",
  });

  console.log(dataResult);

  React.useEffect(() => {
    if (messages && messages.length > 0) {
      setDataResult(messages[0]);
    }
  });

  return (
    <>
      <Sidebar
        routes={routes}
        logoText={"Creative Tim"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        // {...rest}
      />{" "}
      <div className={classes.containContent}>
        {loading ? (
          <div className="loading">
            <IconLoading style={{ width: "60px" }} />
          </div>
        ) : (
          ""
        )}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Kiểm tra đơn hàng</h4>
                <p className={classes.cardCategoryWhite}>
                  Thông tin chi tiết đơn hàng
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Mã đơn hàng"
                      id="company-disabled"
                      disabled={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Tên đơn hàng"
                      id="company-disabled"
                      disabled={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Trạng thái"
                      id="company-disabled"
                      disabled={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email"
                      id="company-disabled"
                      disabled={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={dataResult.email}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Số điện thoại"
                      id="company-disabled"
                      disabled={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={dataResult.phone}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Giới tính"
                      id="company-disabled"
                      disabled={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={
                        dataResult.gender == 0
                          ? "Nam"
                          : dataResult.gender == 1
                          ? "Nữ"
                          : "Không xác định "
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Ngày sinh"
                      id="company-disabled"
                      disabled={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={moment(dataResult.dayOfBirth).format("DD/MM/YYYY")}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Địa chỉ"
                      id="company-disabled"
                      disabled={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={dataResult.address}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary">Quay lại</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </>
  );
};

export default DetailTransportMenu;
