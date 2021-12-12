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
import FileBase64 from "react-file-base64";
import { useHistory } from "react-router-dom";
// silde bar
import routes from "routes.js";
import { validateText } from "until/validate";
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
  wrapperImg: {
    width: "100%",
    height: "70px",
    "& img": {
      width: "100%",
      height: "70px",
    },
    "& p": {
      width: "100%",
      height: "100%",
      margin: 0,
      display: "flex",
      alignItems: "flex-end",
      color: "red",
      fontWeight: "500",
    },
  },
  selectStatusStyle: {
    padding: "12px 16px",
    border: "1px solid #d2d2d2",
    fontSize: 16,
    fontWeight: "500",
    borderRadius: "3px",

    "& option": {
      padding: "6px 0",
      fontSize: 16,
      fontWeight: "500",
    },
  },
};

const useStyles = makeStyles(styles);

const listStatus = [
  {
    id: 0,
    status: "Active",
  },
  {
    id: 1,
    status: "Inactive",
  },
  {
    id: 2,
    status: "Suspended",
  },
];

const AddBanner = () => {
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

  const [nameBanner, setNameBanner] = React.useState("");

  const [banner, setBanner] = React.useState("");
  const [status, setStatus] = React.useState("0");

  //err
  const [errNameBanner, setErrNameBanner] = React.useState(true);
  const [errBanner, setErrBanner] = React.useState(true);

  // handle code sale request
  const validateBanner = (banner, setErrBanner) => {
    if (banner == "") {
      setErrBanner(false);
      return false;
    } else {
      setErrBanner(true);
      return true;
    }
  };

  const handleCreateBanner = () => {
    setLoading(true);
    const resultNameBanner = validateText(nameBanner, setErrNameBanner);
    const resultBanner = validateBanner(banner, setErrBanner);

    if (resultNameBanner && resultBanner) {
      const result = addDocument("Banner", {
        image: banner,
        status: status,
        nameBanner: nameBanner,
        id: uuidv4(),
      });

      if (result) {
        setLoading(false);
        history.push("/admin/banner");
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
                <h4 className={classes.cardTitleWhite}>Thêm Banner mới</h4>
                <p className={classes.cardCategoryWhite}>
                  Hoàn thành các bước thêm Banner mới
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <div className={classes.wrapperImg}>
                      {banner == "" ? (
                        <p>Vui lòng chọn ảnh</p>
                      ) : (
                        <img src={banner} alt="banner" />
                      )}
                    </div>
                    {!errBanner ? (
                      <p
                        style={{ color: "red", fontSize: "16px", margin: "0" }}
                      >
                        *Vui lòng chọn banner
                      </p>
                    ) : (
                      ""
                    )}
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={4}
                    style={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <div>
                      <FileBase64
                        id="file-input"
                        className="input-image"
                        multiple={false}
                        onDone={({ base64 }) => {
                          setBanner(base64);
                          setErrBanner(true);
                        }}
                        accept="image/*"
                        type="file"
                        value={banner}
                        required
                      />
                    </div>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <select
                        className={classes.selectStatusStyle}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {listStatus.map((item, index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.status}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Tên banner"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={nameBanner}
                      onChange={(e) => {
                        setNameBanner(e.target.value);
                        setErrNameBanner(true);
                      }}
                    />
                    {!errNameBanner ? (
                      <p style={{ color: "red", margin: "0" }}>
                        *Vui lòng nhập tên hợp lệ
                      </p>
                    ) : (
                      ""
                    )}
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={() => handleCreateBanner()}>
                  Tạo Banner
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </>
  );
};

export default AddBanner;
