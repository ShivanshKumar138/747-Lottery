import Mobile from "../Components/Mobile";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Container,
  } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LanguageIcon from "@mui/icons-material/Language";

import { Link } from "react-router-dom";
  const services = [
    { icon: <LockIcon color="primary" />, text: "Change ID Login Password" ,path:"/changePassword"},
    { icon: <AccountBoxIcon color="primary" />, text: "Retrieve Login ID Account" ,path:"/retrieve"},
    { icon: <SportsEsportsIcon color="primary" />, text: "Game Problems" ,path:"/problems"},
    { icon: <SupportAgentIcon sx={{ color: "red" }} />, text: "Online service" ,path:"/customer-service"},
  ];
  


const Service = () => {
  return (
    <>
    <Mobile>
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#FF952A", boxShadow: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton edge="start" color="inherit">
            <HomeIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
            Self Service Center
          </Typography>
          <IconButton>
            <LanguageIcon sx={{ color: "white" }} />
            <Typography variant="body2" sx={{ ml: 1, color: "white" }}>
              English
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Banner */}
      <Box
        sx={{
          backgroundColor:"#FF952A",
          backgroundSize: "cover",
          textAlign: "center",
          padding: "20px",
          color: "white",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Welcome to Consult the 747 Lottery Self-Service Center!
        </Typography>
        <Typography sx={{ mt: 1 }}>www.747lottery.fun</Typography>
      </Box>

      {/* Self Service Section */}
      <Container sx={{ mt: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Self Service
        </Typography>
        {/* <List sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 ,textDecoration:"none"}}>
          {services.map((service, index) => (
            <ListItem key={index} button divider={index !== services.length - 1}>
            <Link to={service.path}>
              <ListItemIcon>{service.icon}</ListItemIcon>
              <span style={{textDecoration:"none"}}>{service.text}</span>
            </Link>
            </ListItem>
          ))}
        </List> */}


<List sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}>
  {services.map((service, index) => (
    <ListItem
      key={index}
      component={Link}  // Make ListItem a Link
      to={service.path}
      button
      divider={index !== services.length - 1}
      sx={{ textDecoration: "none", color: "inherit" }} // Prevent default styling
    >
      <ListItemIcon>{service.icon}</ListItemIcon>
      <span>{service.text}</span>
    </ListItem>
  ))}
</List>

      </Container>

      {/* Footer Section */}
      <Container sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Kind tips
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
          1. Please select the relevant query and submit it for review. After successful submission,
          the customer service specialist will handle it for you immediately.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF952A",
            color: "white",
            borderRadius: "30px",
            mt: 2,
            px: 5,
          }}
        >
          Progress query
        </Button>
      </Container>
    </Box>
    </Mobile>
    </>
  )
}

export default Service