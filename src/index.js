import "assets/css/material-dashboard-react.css?v=1.10.0";
import AuthProvider from "Context/AuthProvider";
// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AddBanner from "views/ManagerBanner/AddBanner";
import AddMenu from "views/ManagerMenu/AddMenu";
import UpdateProduct from "views/ManagerProduct/UpdateProduct";
import AddSlide from "views/ManagerSlider/AddSlide";
import DetailTransportMenu from "views/ManagerTransportMenu/DetailTransportMenu";
import AddCodeSale from "views/MGG/AddCodeSale";
import EditCodeSale from "views/MGG/EditCodeSale";
import Login from "./layouts/Login";
import DetailAccount from "./views/ManagerAccount/DetailAccount";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin/mgg/add-code-sale" component={AddCodeSale} />
        <Route
          exact
          path="/admin/mgg/edit-code-sale"
          component={EditCodeSale}
        />
        <Route exact path="/admin/banner/add-banner" component={AddBanner} />
        <Route exact path="/admin/slide/add-slide" component={AddSlide} />
        <Route exact path="/admin/menu/add-menu" component={AddMenu} />
        <Route
          exact
          path="/admin/product/update-product/:id"
          component={UpdateProduct}
        />
        <Route
          exact
          path="/admin/account/detail-account/:id"
          component={DetailAccount}
        />

        <Route
          exact
          path="/admin/transport-menu/detail-transport-menu/:id"
          component={DetailTransportMenu}
        />

        <Route exact path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/rtl" component={RTL} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
