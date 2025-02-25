/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

import Years from "layouts/project/years";
import Student from "layouts/project/students";

import Months from "layouts/project/month";
import Files from "layouts/project/files";
import Videos from "layouts/project/videos";
import Exams from "layouts/project/exams";

import Receipt from "layouts/project/receipt";
import Questions from "layouts/project/questions";
import Slider from "layouts/project/sliders";

import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "لوحة القيادة",
    key: "dashboard",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    privateRoute: true,
  },

  {
    type: "collapse",
    name: "اعلانات",
    key: "sliders",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    route: "/sliders",
    component: <Slider />,
    privateRoute: true,
  },

  {
    type: "collapse",
    name: "الطلاب",
    key: "students",
    icon: <Icon fontSize="medium">people</Icon>,
    route: "/students",
    component: <Student />,
    privateRoute: true,
  },
  {
    type: "collapse",
    name: "سنوات دراسيه",
    key: "years",
    icon: <Icon fontSize="medium">abc</Icon>,
    route: "/years",
    component: <Years />,
    privateRoute: true,
  },
  {
    type: "collapse",
    name: "شهور",
    key: "months",
    icon: <Icon fontSize="medium">today</Icon>,
    route: "/months",
    component: <Months />,
    privateRoute: true,
  },
  {
    type: "collapse",
    name: " الملفات",
    key: "files",
    icon: <Icon fontSize="medium">backupTable</Icon>,
    route: "/files",
    component: <Files />,
    privateRoute: true,
  },
  {
    type: "collapse",
    name: "فيديو",
    key: "videos",
    icon: <Icon fontSize="medium">movie</Icon>,
    route: "/videos",
    component: <Videos />,
    privateRoute: true,
  },
  {
    type: "collapse",
    name: "الامتحانات",
    key: "exams",
    icon: <Icon fontSize="medium">listAlt</Icon>,
    route: "/exams",
    component: <Exams />,
    privateRoute: true,
  },
  {
    type: "collapse",
    name: "أسئلة",
    key: "questions",
    icon: <Icon fontSize="medium">help</Icon>,
    route: "/questions",
    component: <Questions />,
    privateRoute: true,
  },
  {
    type: "collapse",
    name: "الإيصالات",
    key: "receipt",
    icon: <Icon fontSize="medium">receipt</Icon>,
    route: "/receipt",
    component: <Receipt />,
    privateRoute: true,
  },

  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="medium">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    privateRoute: false,
  },
];

export default routes;
