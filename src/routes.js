/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import ImageIcon from "@material-ui/icons/Image";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";

// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import ManagerMGG from "./views/MGG/ManagerMGG";
import ManagerBanner from "./views/ManagerBanner/ManagerBanner";
import ManagerSlider from "views/ManagerSlider/ManagerSlider";
import ManagerMenu from "views/ManagerMenu/ManagerMenu";
import ManagerProduct from "./views/ManagerProduct/ManagerProduct";
import ManagerAccount from "./views/ManagerAccount/ManagerAccount";
import ManagerTransportMenu from "./views/ManagerTransportMenu/ManagerTransportMenu";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Thông cá nhân",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/mgg",
    name: "Mã giảm giá",
    icon: "content_paste",
    component: ManagerMGG,
    layout: "/admin",
  },
  {
    path: "/banner",
    name: "Banner",
    icon: ViewCarouselIcon,
    component: ManagerBanner,
    layout: "/admin",
  },
  {
    path: "/slider",
    name: "Slider",
    icon: ImageIcon,
    component: ManagerSlider,
    layout: "/admin",
  },
  {
    path: "/menu",
    name: "Danh mục",
    icon: MenuIcon,
    component: ManagerMenu,
    layout: "/admin",
  },
  {
    path: "/product",
    name: "Sản phẩm",
    icon: CardGiftcardIcon,
    component: ManagerProduct,
    layout: "/admin",
  },
  {
    path: "/account",
    name: "Tài khoản",
    icon: AccountBoxIcon,
    component: ManagerAccount,
    layout: "/admin",
  },
  {
    path: "/transport-menu",
    name: "Đơn hàng",
    icon: "content_paste",
    component: ManagerTransportMenu,
    layout: "/admin",
  },

  {
    path: "/dotify",
    name: "thong bao",
    icon: "content_paste",
    component: NotificationsPage,
    layout: "/admin",
  },
];

export default dashboardRoutes;
