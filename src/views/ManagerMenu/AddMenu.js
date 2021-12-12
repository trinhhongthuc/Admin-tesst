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
import { db } from "firebase/config";
import React from "react";
import FileBase64 from "react-file-base64";
import { useHistory } from "react-router-dom";
// silde bar
import routes from "routes.js";
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
  selectStatusStyle: {
    padding: "12px 16px",
    border: "1px solid #d2d2d2",
    fontSize: 16,
    fontWeight: "500",
    borderRadius: "3px",
    width: "100%",

    "& option": {
      padding: "6px 0",
      fontSize: 16,
      fontWeight: "500",
    },
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

const AddMenu = () => {
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

  //

  const [nameMenu, setNameMenu] = React.useState("");
  const [menu, setMenu] = React.useState("0");
  const [status, setStatus] = React.useState(0);
  const [listMenu, setListMenu] = React.useState([]);
  const [avatarMenu, setAvatarMenu] = React.useState("");

  //err
  const [errNameMenu, setErrNameMenu] = React.useState(true);
  const [errAvatarMenu, setErrAvatarMenu] = React.useState(true);
  React.useEffect(() => {
    db.collection("Menu")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get()
      .then((snapshot) => {
        let codeSale = snapshot.docs.map((doc) => ({
          nameMenu: doc.data().nameMenu,
          status: doc.data().status,
          parentId: doc.data().parentId,
          menuId: doc.data().menuId,
          id: doc.id,
        }));
        setListMenu(codeSale);
      })
      .catch((err) => {
        console.log("Đây là Err get all Slide", err);
      });
  }, []);

  // validate name men
  const validateNameMenu = (name, setErrName) => {
    if (name == "") {
      setErrName(false);
      return false;
    } else {
      setErrName(true);
      return true;
    }
  };

  const validateAvatar = (avatar, setErrAvatar) => {
    if (avatar == "") {
      setErrAvatar(false);
      return false;
    } else {
      setErrAvatar(true);
      return true;
    }
  };

  // handle code sale request

  const handleCreateMenu = () => {
    setLoading(true);
    const resultNameMenu = validateNameMenu(nameMenu, setErrNameMenu);
    const resultAvatar = validateAvatar(avatarMenu, setErrAvatarMenu);

    if (resultNameMenu && menu && resultAvatar) {
      const result = addDocument("Menu", {
        nameMenu: nameMenu,
        status: status,
        parentId: menu,
        menuId: uuidv4(),
        image: avatarMenu,
      });

      if (result) {
        setLoading(false);
        history.push("/admin/menu");
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
                  Thêm danh mục sản phẩm
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Hoàn thành các bước thêm danh mục
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <div className={classes.wrapperImg}>
                      {avatarMenu == "" ? (
                        <p>Vui lòng chọn ảnh</p>
                      ) : (
                        <img src={avatarMenu} alt="avatarMenu" />
                      )}
                    </div>
                    {!errAvatarMenu ? (
                      <p
                        style={{ color: "red", fontSize: "16px", margin: "0" }}
                      >
                        *Vui lòng chọn Avatar Menu
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
                          setAvatarMenu(base64);
                          setErrAvatarMenu(true);
                        }}
                        accept="image/*"
                        type="file"
                        value={avatarMenu}
                        required
                      />
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Tên danh mục"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={nameMenu}
                      onChange={(e) => {
                        setNameMenu(e.target.value);
                        setErrNameMenu(true);
                      }}
                    />
                    {!errNameMenu ? (
                      <p style={{ color: "red", margin: "0" }}>
                        *Vui lòng nhập tên hợp lệ
                      </p>
                    ) : (
                      ""
                    )}
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
                        value={menu}
                        onChange={(e) => setMenu(e.target.value)}
                      >
                        <option value={"1"}>Danh mục cha</option>
                        {listMenu?.length > 0 &&
                          listMenu.map((item, index) => {
                            return (
                              <option value={item.menuId} key={index}>
                                {item.nameMenu}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
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
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={() => handleCreateMenu()}>
                  Tạo danh mục
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </>
  );
};

export default AddMenu;
