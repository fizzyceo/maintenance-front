import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isStaffs, setIsStaffs] = useState(false);
  const [isReports, setIsReports] = useState(false);
  const [isAccess, setIsAccess] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);

  // const [isVisitors, setIsVisitors] = useState(false);
  // const [isVisitorsPasses, setIsVisitorsPasses] = useState(false);
  // const [isMaintenance, setIsMaintenance] = useState(false);
  // const [isVenues, setIsVenues] = useState(false);

  const [isCurrentState, setIsCurrentState] = useState("Staffs");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    if (isCurrentState !== "Access") {
      setIsAccess(false);
    }
    if (isCurrentState !== "Staffs") {
      setIsStaffs(false);
    }
    if (isCurrentState !== "Reports") {
      setIsReports(false);
    }
    // if (isCurrentState !== "Facilities") {
    //   setIsFacilities(false);
    // }
    // if (isCurrentState !== "Visitors") {
    //   setIsVisitors(false);
    // }
    // if (isCurrentState !== "VisitorsPasses") {
    //   setIsVisitorsPasses(false);
    // }
    // if (isCurrentState !== "Maintenance") {
    //   setIsMaintenance(false);
    // }
    // if (isCurrentState !== "Staffs") {
    //   setIsStaffs(false);
    // }
    // if (isCurrentState !== "Venues") {
    //   setIsVenues(false);
    // }
  }, [isCurrentState, history]);

  const menuItems = [
    {
      label: t("Menu"),
      isHeader: true,
    },

    {
      id: "dashboard",
      label: "Dashboards",
      icon: "ri-dashboard-2-line",
      link: "",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIsCurrentState("Dashboard");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "dashboard1",
          label: t("Displacement"),
          link: "/dashboard",
          parentId: "dashboard",
        },
        {
          id: "dashboard2",
          label: t("RMS"),
          link: "/dashboard2",
          parentId: "dashboard",
        },
      ],
    },

    {
      id: "Reports",
      label: "Rapports",
      icon: "ri-file-chart-fill",
      link: "/reports",
      stateVariables: isReports,
      click: function (e) {
        e.preventDefault();
        setIsReports(!isReports);
        setIsCurrentState("Reports");
        updateIconSidebar(e);
      },
      // subItems: [
      //   {
      //     id: "staffs",
      //     label: "Staffs",
      //     link: "/staffs",
      //     parentId: "Staffs",
      //   },
      // ],
    },
    {
      id: "Staffs",
      label: "Utilisateurs",
      icon: "ri-group-line",
      link: "/staffs",
      stateVariables: isStaffs,
      click: function (e) {
        e.preventDefault();
        setIsStaffs(!isStaffs);
        setIsCurrentState("Staffs");
        updateIconSidebar(e);
      },
      // subItems: [
      //   {
      //     id: "staffs",
      //     label: "Staffs",
      //     link: "/staffs",
      //     parentId: "Staffs",
      //   },
      // ],
    },
  ];

  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
