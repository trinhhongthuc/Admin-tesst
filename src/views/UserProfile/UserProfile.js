import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { AuthContext } from "Context/AuthProvider";
import firebase, { auth, db } from "firebase/config";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
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
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  //context
  const { user } = React.useContext(AuthContext);
  // state
  const [success, setSuccess] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");

  React.useEffect(() => {
    if (user) {
      console.log(user);
      setPhoneNumber(user.phone);
      setEmail(user.email);
      setAddress(user.address);
      setDisplayName(user.displayName);
    }
  }, [user]);

  const handleUpdate = () => {
    const info = db.collection("users").doc(user.id);
    info
      .update({
        phone: phoneNumber,
        displayName: displayName,
        address: address,
      })
      .then((res) => {
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
          clearTimeout();
        }, 3000);
      });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {success ? (
            <SnackbarContent
              message={
                'SUCCESS - This is a regular notification made with color="success"'
              }
              close
              setDisplay={setSuccess}
              color="success"
            />
          ) : (
            ""
          )}

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
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Số điện thoại"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Email"
                    id="first-name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    disabled={true}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Đại chỉ"
                    id="city"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                {/* <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  /> */}
                {/* </GridItem> */}
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => handleUpdate()}>
                Cập nhật thông tin
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
