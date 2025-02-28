import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Checkbox,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { domain } from "../Components/config";

const DepositModal = ({ open, onClose }) => {
  const [depositBonuses, setDepositBonuses] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchDepositBonuses = async () => {
      try {
        const response = await axios.get(`${domain}/all-deposit-bonuses`);
        setDepositBonuses(response.data);
      } catch (error) {
        console.error("Error fetching deposit bonuses:", error);
      }
    };

    if (open) {
      fetchDepositBonuses();
    }
  }, [open]);

  // Check if the modal should be displayed based on stored date
  React.useEffect(() => {
    const dismissedDate = localStorage.getItem("depositModalDismissedDate");
    const today = new Date().toDateString();

    // If today is not equal to the dismissed date, open the modal
    if (dismissedDate !== today && !open) {
      onClose(false); // Force modal open
    }
  }, [open, onClose]);

  const handleClose = () => {
    if (isChecked) {
      const today = new Date().toDateString();
      localStorage.setItem("depositModalDismissedDate", today);
    }
    onClose();
  };

  const handleCloseIconClick = () => {
    // Only close the modal without setting the dismissedDate
    onClose();
  };

  const handleDeposit = () => {
    navigate("/recharge");
  };

  const handleActivity = () => {
    handleClose(); // Use the same close logic here
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 320,
          bgcolor: "background.paper",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: "#FF952A",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <IconButton
            edge="end"
            onClick={handleActivity}
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Extra first deposit bonus
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 1,
              fontSize: "12px",
            }}
          >
            Each account can only receive rewards once
          </Typography>
        </Box>

        {/* Bonus Cards */}
        <Box
          sx={{
            padding: 2,
            overflowY: "auto",
            maxHeight: "50vh",
          }}
        >
          {depositBonuses.map((bonus) => (
            <Card
              key={bonus._id}
              sx={{
                mb: 2,
                backgroundColor: "#FFF",
                boxShadow: "none",
                border: "1px solid #E0E0E0",
                borderRadius: 1,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                  >
                    First deposit{" "}
                    <Typography component="span" sx={{ color: "#FF952A" }}>
                      ₹{bonus.minimumDeposit}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#FF952A",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    + ₹{bonus.bonus}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#7B7B7B", mb: 1, fontSize: "12px" }}
                >
                  Deposit ₹{bonus.minimumDeposit} for the first time and receive
                  ₹{bonus.bonus} bonus
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={0}
                    sx={{
                      flexGrow: 1,
                      height: 8,
                      paddingY: "6px",
                      borderRadius: 4,
                      backgroundColor: "#E0E0E0",
                      "& .MuiLinearProgress-bar": {
                        background: "linear-gradient(90deg, #FF952A 0%, #59adff 100%)",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      left: "30%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#FF952A",
                      fontWeight: "bold",
                    }}
                  >
                    0/{bonus.minimumDeposit}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      ml: 2,
                      minWidth: 80,
                      height: 30,
                      fontSize: "12px",
                      borderColor: "#FF952A",
                      color: "#FF952A",
                      "&:hover": {
                        borderColor: "#FF952A",
                        backgroundColor: "rgba(15, 101, 24, 0.04)",
                      },
                    }}
                    onClick={handleDeposit}
                  >
                    Deposit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #E0E0E0",
            bgcolor: "#FFF",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              sx={{
                color: "#FF952A",
                "&.Mui-checked": {
                  color: "#FF952A",
                },
              }}
            />
            <Typography variant="body2" sx={{ fontSize: "12px" }}>
              No more reminders today
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#FF952A",
              color: "white",
              "&:hover": {
                bgcolor: "#FF952A",
              },
            }}
            onClick={() => navigate("/activity/FirstRecharge")}
          >
            Activity
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

DepositModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DepositModal;
