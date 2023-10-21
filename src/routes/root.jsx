import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import { Outlet, Link } from "react-router-dom";

//importacion de estilo
//import "../../style/nav.css";
//import AgregarBoton from "../productos/from";
import { FaList } from "react-icons/fa";
import { HiChartBar } from "react-icons/hi";
import { FaCheck } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import { SiLaravelnova } from "react-icons/si";
import { BiSolidTimeFive } from "react-icons/bi";
import { BiSolidTimer } from "react-icons/bi";
//import { EtiquetasMampara } from "../DragAnDrop/EtiquetasMampara";
//import ImportDocument from "../cargaDocument/importDocument";
//import ImplementacionDrag from "../DragAnDrop/ImplementacionDrag";
//import Consumo from "../consumoApi/ejemplo";

//implementacion de boton extrusion
//import BotonEtrusion from "../global/botonExtruxion";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

console.log("esto es una data");
const data = [
  {
    id: "01",
    name: "Entradas",
    icon: <DesktopMacIcon />,
    link: "/",
  },
  {
    id: "02",
    name: "Extrusion",
    icon: <FaList />,
    link: "/extrusion",
  },
  {
    id: "03",
    name: "Graficado",
    icon: <HiChartBar />,
    link: "/graficado",
  },
  {
    id: "04",
    name: "Terminado",
    icon: <FaCheck />,
    link: "/terminados",
  },
  {
    id: "05",
    name: "Entradas MOL",
    icon: <DesktopMacIcon />,
    link: "/entrada-molinos",
  },
  {
    id: "06",
    name: "Molinos",
    icon: <ImSpinner9 />,
    link: "/molinos",
  },
  {
    id: "07",
    name: "Entradas MEZ",
    icon: <DesktopMacIcon />,
    link: "/entrada-mezcladoras",
  },
  {
    id: "08",
    name: "Mezcladoras",
    icon: <SiLaravelnova />,
    link: "/mezcladoras",
  },
  {
    id: "09",
    name: "Terminados Mezcladoras",
    icon: <FaCheck />,
    link: "/terminados mezcladoras",
  },
  {
    id: "10",
    name: "TIMESET",
    icon: <BiSolidTimeFive />,
    link: "/time-set",
  },
  {
    id: "11",
    name: "SETUP",
    icon: <BiSolidTimer />,
    link: "/setup",
  },
];

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Produccion
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {data.map((data, index) => (
            <ListItem key={data.id} disablePadding sx={{ display: "block" }}>
              <Link to={data.link} style={{ color: "black" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {data.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={data.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>{" "}
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box>
        <DrawerHeader />
        <Outlet />
        {/*  <div
          style={{
            paddingBottom: "1.5rem",
            display: "flex",
            gap: "5rem",
          }}
        >
          <AgregarBoton /> <ImportDocument /> <BotonEtrusion /> 
          <Consumo />
        </div>
 */}
        {/*   

        <Container className="mampara-style">
          <Card />
        </Container> */}

        {/*   <EtiquetasMampara /> */}
        {/*    <ImplementacionDrag /> */}
      </Box>
    </Box>
  );
}
