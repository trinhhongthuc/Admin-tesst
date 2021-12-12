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

const AddSlide = () => {
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

  const [nameSlide, setNameSlide] = React.useState("");

  const [slide, setSlide] = React.useState("");
  const [status, setStatus] = React.useState("0");

  //err
  const [errNameSlide, setErrNameSlide] = React.useState(true);
  const [errSlide, setErrSlide] = React.useState(true);

  // handle code sale request
  const validateSlide = (slide, setErrSlide) => {
    if (slide == "") {
      setErrSlide(false);
      return false;
    } else {
      setErrSlide(true);
      return true;
    }
  };

  const handleCreateSlide = () => {
    setLoading(true);
    const resultNameSlide = validateText(nameSlide, setErrNameSlide);
    const resultSlide = validateSlide(slide, setErrSlide);

    if (resultNameSlide && resultSlide) {
      const result = addDocument("Slide", {
        image: slide,
        status: status,
        nameSlide: nameSlide,
        id: uuidv4(),
      });

      if (result) {
        setLoading(false);
        history.push("/admin/slider");
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
                <h4 className={classes.cardTitleWhite}>Thêm Slide mới</h4>
                <p className={classes.cardCategoryWhite}>
                  Hoàn thành các bước thêm Slide
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <div className={classes.wrapperImg}>
                      {slide == "" ? (
                        <p>Vui lòng chọn ảnh</p>
                      ) : (
                        <img src={slide} alt="slide" />
                      )}
                    </div>
                    {!errSlide ? (
                      <p
                        style={{ color: "red", fontSize: "16px", margin: "0" }}
                      >
                        *Vui lòng chọn slide
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
                          setSlide(base64);
                          setErrSlide(true);
                        }}
                        accept="image/*"
                        type="file"
                        value={slide}
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
                      labelText="Tên Slide"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={nameSlide}
                      onChange={(e) => {
                        setNameSlide(e.target.value);
                        setErrNameSlide(true);
                      }}
                    />
                    {!errNameSlide ? (
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
                <Button color="primary" onClick={() => handleCreateSlide()}>
                  Tạo Slide
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </>
  );
};

export default AddSlide;
