import Mobile from "../Components/Mobile";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    TextField,
    Button,
    Box,
    Container,
    Grid,
  } from "@mui/material";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
  import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const RetrieveLogin = () => {
const [image, setImage] = useState(null);
const navigate = useNavigate();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Mobile>
         <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "orange", boxShadow: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton edge="start">
            <ArrowBackIcon sx={{ color: "white" }} onClick={()=>navigate(-1)}/>
          </IconButton>
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
            Retrieve Login ID Account
          </Typography>
          <IconButton>
            <HelpOutlineIcon sx={{ color: "black" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Form Section */}
      <Container sx={{ mt: 3 }}>
        {[
          { label: "Bank Account Number", placeholder: "Please enter Bank Card Number" },
          { label: "IFSC Code", placeholder: "Please enter IFSC" },
          { label: "ID 747 Lottery", placeholder: "Please enter username" },
          { label: "Email", placeholder: "Please enter content" },
        ].map((field, index) => (
          <Box key={index} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {field.label} <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              placeholder={field.placeholder}
              variant="outlined"
              sx={{ backgroundColor: "white", mt: 1 }}
            />
          </Box>
        ))}

        {/* Image Upload */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Latest Deposit Receipt Proof <span style={{ color: "red" }}>*</span>
          </Typography>
          <Grid
            container
            sx={{
              width: 100,
              height: 100,
              backgroundColor: "white",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "1px dashed #aaa",
              mt: 1,
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="upload-receipt"
            />
            <label htmlFor="upload-receipt">
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "#aaa",
                  }}
                >
                  <CloudUploadIcon fontSize="large" />
                  <Typography variant="body2">photo</Typography>
                </Box>
              )}
            </label>
          </Grid>
        </Box>

        {/* Confirm Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "orange",
            color: "white",
            borderRadius: "30px",
            mt: 4,
            py: 1.5,
            fontSize: "16px",
          }}
        >
          Confirm
        </Button>
      </Container>
    </Box>
    </Mobile>
  )
}

export default RetrieveLogin