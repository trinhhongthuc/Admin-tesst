import { makeStyles } from "@material-ui/core/styles";
import logo from "assets/img/reactlogo.png";
import bgImage from "assets/img/sidebar-2.jpg";
import { ReactComponent as IconLoading } from "assets/img/three-dots.svg";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { AuthContext } from "Context/AuthProvider";
import { db } from "firebase/config";
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
    height: "100vh",
    overflow: "auto",
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
  containContentWrapper: {
    height: "100vh",
    overflow: "auto",
  },
  headingContent: {
    fontWeight: "bold",
    fontSize: "22px",
    color: "#333",
    margin: "12px 0",
  },

  titleImage: {
    fontSize: "14px",
    fontWeight: "500",
    margin: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  textDescription: {
    width: "95%",
    height: 150,
    border: "1px solid #9e9eb1",
    resize: "none",
    padding: 6,
    borderRadius: 3,
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

const UpdateProduct = () => {
  const classes = useStyles();
  const history = useHistory();
  const id = useParams().id;
  //silde bar
  const [image, setImage] = React.useState(bgImage);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [color, setColor] = React.useState("blue");
  const [loading, setLoading] = React.useState(true);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleColorClick = (color) => {
    setColor(color);
  };
  // context
  const { listMenu } = React.useContext(AuthContext);

  // state
  const [nameProduct, setNameProduct] = React.useState("");
  const [displayProduct, setDisplayProduct] = React.useState({});
  const [menuProduct, setMenuProduct] = React.useState("");
  const [avatarProduct, setAvatarProduct] = React.useState("");
  const [imageProduct, setImageProduct] = React.useState([]);
  const [description, setDescription] = React.useState("");
  // get product by id

  React.useEffect(() => {
    if (id) {
      db.collection("Products")
        .where("id", "==", id)
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            idDoc: doc.id,
          }));
          if (data) {
            setDisplayProduct(data[0]);
            setNameProduct(data[0].nameProduct);
            setAvatarProduct(data[0].avatarProduct);
            setImageProduct(data[0].imageProduct);
            setDescription(data[0].description);
            setLoading(false);
          }
        });
    }
  }, [id]);

  React.useEffect(() => {
    if (listMenu?.length > 0) {
      const dataMenu = listMenu.find(
        (itemMenu) => itemMenu.menuId == displayProduct.idMenu
      );
      setMenuProduct(dataMenu && dataMenu.nameMenu ? dataMenu.nameMenu : "");
    }
  }, [listMenu, displayProduct]);

  const handleAcceptProduct = (idDoc, type) => {
    setLoading(true);
    const dataUpdate = db.collection("Products").doc(idDoc);
    if (type === 0) {
      dataUpdate
        .update({
          status: 0,
        })
        .then((result) => {
          history.push("/admin/product");
        });
      setLoading(false);
    } else if (type === 1) {
      dataUpdate
        .update({
          status: 2,
        })
        .then((result) => {
          history.push("/admin/product");
        });
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
        <div>
          <GridContainer style={{ overflow: "auto" }}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    Thông tin chi tiết sản phẩm
                  </h4>
                  <p className={classes.cardCategoryWhite}>
                    Kiểm tra thông tin chi tiết sản phẩm
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <h3 className={classes.headingContent}>
                        Thông tin sản phẩm
                      </h3>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Tên sản phẩm"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={nameProduct}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Danh mục sản phẩm"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={menuProduct}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <p className={classes.titleImage}>
                        Ảnh đại diện sản phẩm
                      </p>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                      <img
                        src={avatarProduct}
                        alt="avatar"
                        style={{
                          width: "100px",
                          height: "100px",
                          marginRight: 6,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <p className={classes.titleImage}>Hình ảnh sản phẩm</p>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                      {imageProduct?.length > 0 &&
                        imageProduct.map((item, index) => {
                          if (item != "")
                            return (
                              <img
                                src={item}
                                alt="avatar"
                                key={index}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  marginRight: 6,
                                }}
                              />
                            );
                        })}
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <p className={classes.titleImage}>Mô tả sản phẩm</p>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={9}>
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        value={description}
                        disabled={true}
                        className={classes.textDescription}
                      ></textarea>
                    </GridItem>
                  </GridContainer>
                  {/* Thông tin sản phẩm */}
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <h3 className={classes.headingContent}>
                        {" "}
                        Thông tin chi tiết sản phẩm
                      </h3>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Thương hiệu"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={
                          !!displayProduct && displayProduct.detailProduct
                            ? displayProduct.detailProduct.trademark
                            : ""
                        }
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Xuất xứ"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={
                          !!displayProduct && displayProduct.detailProduct
                            ? displayProduct.detailProduct.origin
                            : ""
                        }
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Chất liệu"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={
                          !!displayProduct && displayProduct.detailProduct
                            ? displayProduct.detailProduct.material
                            : ""
                        }
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Hạn bảo hành"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={
                          !!displayProduct && displayProduct.detailProduct
                            ? displayProduct.detailProduct.insurance
                            : ""
                        }
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Loại bảo hành"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={
                          !!displayProduct && displayProduct.detailProduct
                            ? displayProduct.detailProduct.typeInsurance
                            : ""
                        }
                      />
                    </GridItem>
                  </GridContainer>
                  {/* Thông tin bán hàng */}
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <h3 className={classes.headingContent}>
                        {" "}
                        Thông tin chi tiết bán hàng
                      </h3>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Giá"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={
                          !!displayProduct && displayProduct.infoBuyProduct
                            ? displayProduct.infoBuyProduct.price
                            : ""
                        }
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Kho hàng"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={
                          !!displayProduct && displayProduct.infoBuyProduct
                            ? displayProduct.infoBuyProduct.countProduct
                            : ""
                        }
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Khuyến mãi"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={
                          !!displayProduct && displayProduct.infoBuyProduct
                            ? displayProduct.infoBuyProduct.sale
                            : ""
                        }
                      />
                    </GridItem>
                  </GridContainer>

                  {/* Vận chuyển */}

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <h3 className={classes.headingContent}> Vận chuyển</h3>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Cân nặng"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={
                          !!displayProduct
                            ? Number(displayProduct.productKG)
                            : ""
                        }
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Phí vận chuyển"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={
                          !!displayProduct
                            ? Number(displayProduct.productKG) * 30000
                            : ""
                        }
                      />
                    </GridItem>
                  </GridContainer>

                  {/* Thông tin khác */}

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <h3 className={classes.headingContent}>Thông tin khác</h3>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Hàng đặt trước"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={
                          !!displayProduct &&
                          displayProduct.informationOther &&
                          displayProduct.informationOther.productBuyNow == "0"
                            ? "không"
                            : "Có"
                        }
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Tình trạng sản phẩm"
                        id="company-disabled"
                        disabled={true}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={
                          !!displayProduct &&
                          displayProduct.informationOther &&
                          displayProduct.informationOther.statusProduct == "0"
                            ? "Mới"
                            : "Đã sử dụng"
                        }
                      />
                    </GridItem>
                  </GridContainer>

                  {/* button */}
                </CardBody>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Button
                      color="primary"
                      onClick={() =>
                        handleAcceptProduct(
                          displayProduct && displayProduct.idDoc,
                          0
                        )
                      }
                      style={{ marginLeft: 18, marginBottom: 12 }}
                    >
                      Chấp nhận
                    </Button>
                    <Button
                      color="danger"
                      onClick={() =>
                        handleAcceptProduct(
                          displayProduct && displayProduct.idDoc,
                          1
                        )
                      }
                      style={{ marginLeft: 6, marginBottom: 12 }}
                    >
                      Khóa
                    </Button>
                  </GridItem>
                </GridContainer>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
