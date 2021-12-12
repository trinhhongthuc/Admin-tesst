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
import { addDocument } from "firebase/AddDocument";
import React from "react";
import { useHistory } from "react-router-dom";
// silde bar
import routes from "routes.js";
import { validateNumber, validateText } from "until/validate";
import { v4 as uuidv4 } from "uuid";

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
};

const useStyles = makeStyles(styles);

const AddCodeSale = () => {
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

  const handleCreateCodeSale = () => {
    setLoading(true);
    const resultNameCode = validateText(nameCode, setErrNameCode);
    const resultPriceSale = validateNumber(priceSale, setErrPriceSale);
    const resultNumberCount = validateNumber(numberCount, setErrNumberCount);

    if (resultNameCode && resultPriceSale && resultNumberCount && codeSale) {
      const result = addDocument("Code-Sale", {
        code: codeSale,
        nameCode: nameCode,
        priceSale: priceSale,
        numberCountNow: numberCount,
        numberCountEntered: 0,
        status: 0,
        id: uuidv4(),
      });

      if (result) {
        setLoading(false);
        history.push("/admin/mgg");
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

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
                <h4 className={classes.cardTitleWhite}>
                  Chỉnh sửa thông tin cá nhân
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Hoàn thành hồ sơ cá nhân
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Mã giảm giá"
                      id="company-disabled"
                      disabled={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={codeSale}
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={2}
                    style={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <Button
                      color="success"
                      onClick={() => handleRandomCodeSale()}
                    >
                      Random
                    </Button>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Tên mã giảm giá"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={nameCode}
                      onChange={(e) => {
                        setNameCode(e.target.value);
                        setErrNameCode(true);
                      }}
                    />
                    {!errNameCode ? (
                      <p style={{ color: "red", margin: "0" }}>
                        *Vui lòng nhập tên hợp lệ
                      </p>
                    ) : (
                      ""
                    )}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Số tiền"
                      id="first-name"
                      value={priceSale}
                      onChange={(e) => {
                        setPriceSale(e.target.value);
                        setErrPriceSale(true);
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    {!errPriceSale ? (
                      <p style={{ color: "red", margin: "0" }}>
                        *Vui lòng nhập số tiền hợp lệ
                      </p>
                    ) : (
                      ""
                    )}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Số lần nhập"
                      id="city"
                      value={numberCount}
                      onChange={(e) => {
                        setNumberCount(e.target.value);
                        setErrNumberCount(true);
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    {!errNumberCount ? (
                      <p style={{ color: "red", margin: "0" }}>
                        *Vui lòng nhập số lần nhập hợp lệ
                      </p>
                    ) : (
                      ""
                    )}
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={() => handleCreateCodeSale()}>
                  Tạo mã giảm giá
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </>
  );
};

export default AddCodeSale;
