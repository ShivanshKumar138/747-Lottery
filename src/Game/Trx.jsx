import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Mobile from "../Components/Mobile";
import { Typography, Grid, Box, TextField, Checkbox } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Button } from "@mui/material";
import { Refresh, AccountBalanceWallet, VolumeUp } from "@mui/icons-material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MusicOffIcon from "@material-ui/icons/MusicOff";
import { wssdomain } from "../Components/config";
import Popup from "./Popup";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Tabs,
  Tab,
  Divider,
  Pagination,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Drawer } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import RowVisualization from "./Chart";
import CustomTable from "./Custom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, styled } from "@mui/material";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";

import axios from "axios";
import "../App.css";
import { domain } from "../Components/config";
// import abc from "../../public/assets/trxgamebg.png"
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddIcon from "@mui/icons-material/AddBox";
import { FormControlLabel, Radio } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { CheckCircleIcon } from "lucide-react";
const countdownSound = new Audio("/assets/sound.mp3");
import Alert from '@mui/material/Alert';
countdownSound.loop = true;

const images = [
  {
    id: 1,
    src: "../../games/assets/time-5d4e96a3.png",
    altSrc: "https://in.piccdn123.com/static/_template_/orange/img/game/time_cur.png",
    subtitle: "1Min",
  },
  {
    id: 2,
    src: "../../games/assets/time-5d4e96a3.png",
    altSrc: "https://in.piccdn123.com/static/_template_/orange/img/game/time_cur.png",
    subtitle: "3Min",
  },
  {
    id: 3,
    src: "../../games/assets/time-5d4e96a3.png",
    altSrc: "https://in.piccdn123.com/static/_template_/orange/img/game/time_cur.png",
    subtitle: "5Min",
  },
  {
    id: 4,
    src: "../../games/assets/time-5d4e96a3.png",
    altSrc: "https://in.piccdn123.com/static/_template_/orange/img/game/time_cur.png",
    subtitle: "10Min",
  },
];

const tabData = [
  { label: "Game History" },
  { label: "Chart" },
  { label: "My History" },
];
const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box p={0} m={0}>
          {children}
        </Box>
      )}
    </div>
  );
};

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  borderRadius: "5px",
  padding: "3px 0px",
  gap: "5.5px",
}));
const StyledButton = styled(Button)(({ theme, active, isRandom }) => ({
  backgroundColor: isRandom ? "#ffffff" : active ? "#17B15E" : "#f2f2f1",
  color: isRandom ? "#D23838" : active ? "#ffffff" : "#000000",
  fontSize: "0.8rem",
  padding: "3px 8px",
  border: isRandom ? "1px solid #D23838" : "none",
  "&:hover": {
    backgroundColor: isRandom ? "#ffffff" : active ? "#17B15E" : "#f2f2f1",
    border: isRandom ? "1px solid #D23838" : "none",
  },
}));

const multipliers = [
  { label: "Random", value: "random", isRandom: true },
  { label: "X1", value: 1 },
  { label: "X5", value: 5 },
  { label: "X10", value: 10 },
  { label: "X20", value: 20 },
  { label: "X50", value: 50 },
  { label: "X100", value: 100 },
];

const LotteryAppt = ({ timerKey }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Store message here
    const [agree, setAgree] = useState(false);
   const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeId, setActiveId] = useState(images[0].id);
  const [selectedTimer, setSelectedTimer] = useState("1Min");
  const [timer, setTimer] = useState(60); // 60 seconds = 1 minute
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [winner, setWinner] = useState(null);
  const [periodId, setPeriodId] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [betAmount, setBetAmount] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const [totalBet, setTotalBet] = useState(0);
  const [betPlaced, setBetPlaced] = useState(false);
  const [betPeriodId, setBetPeriodId] = useState(null);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [popupresult, setPopupResult] = useState(0);
  const [popupperiodid, setPopupPeriodId] = useState(0);
  const [winloss, setWinLoss] = useState(0);
  const [popupTimer, setPopupTimer] = useState(0);
  const [gameResult, setGameResult] = useState("");
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastAlertedPeriodId, setLastAlertedPeriodId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [bets, setBets] = useState([]);
  const [popupperiod, setPopupPeriod] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [popupQueue, setPopupQueue] = useState([]); // new queue to manage sequential popups
  const [currentBetIndex, setCurrentBetIndex] = useState(0); // tracks current popup being shown
  const [isBig, setIsBig] = useState(true);
const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const getBackgroundColor = (selectedItem) => {
    const item = selectedItem.toLowerCase();
    switch (item) {
      case "violet":
        return "#9B48DB"; // Violet color
      case "green":
        return "rgb(64,173,114)"; // Green color
      case "1":
      case "3":
      case "7":
      case "9":
        return "rgb(64,173,114)"; // Green color
      case "red":
      case "2":
      case "4":
      case "6":
      case "8":
        return "rgb(253,86,92)"; // Red color
      case "yellow":
        return "rgb(255,255,0)"; // Yellow color
      case "blue":
        return "rgb(0,0,255)"; // Blue color
      case "big":
      case "small":
        return "rgb(255,168,46)"; // Orange color for big/small
      case "0":
        return {
          background:
            "linear-gradient(to right, rgb(153,36,42) 50%, rgb(132,39,194) 50%)", // Darker Red to Violet gradient
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        };
      case "5":
        return {
          background:
            "linear-gradient(to right, rgb(34,123,84) 50%, rgb(132,39,194) 50%)", // Darker Green to Violet gradient
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        };
      default:
        return "#FF952A"; // Default to a blue-like color
    }
  };

  useEffect(() => {
    if (timerKey) {
      console.log("Timer key received:", timerKey); // Console log the timerKey

      // Map timerKey to corresponding timer details
      const timerMap = {
        "1min": { id: 1, subtitle: "1min" },
        "3min": { id: 2, subtitle: "3min" },
        "5min": { id: 3, subtitle: "5min" },
        "10min": { id: 4, subtitle: "10min" },
      };

      if (timerMap[timerKey]) {
        setActiveId(timerMap[timerKey].id);
        setSelectedTimer(timerMap[timerKey].subtitle);
        navigate(`/trx/${timerKey}`);
      }
    }
  }, [timerKey, navigate]); // Include navigate in the dependency array

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setIsSmall(true);
        setIsBig(false);
      } else {
        setIsSmall(false);
        setIsBig(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Set the initial state
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const socket = new WebSocket(`${wssdomain}/`); // Connect to WebSocket server

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data.timers && data.timers[selectedTimer]) {
        setPeriodId(data.timers[selectedTimer].periodId); // Set the periodId
        setRemainingTime(data.timers[selectedTimer].remainingTime); // Set the remainingTime
      } else {
        console.error("Unexpected data structure", data);
      }
    };

    return () => socket.close(); // Cleanup WebSocket connection
  }, [selectedTimer]);

  const timeParts = (remainingTime || "00:00").split(":");
  const minutes = timeParts[0] || "00";
  const seconds = timeParts[1] || "00";
  const [lastPlayedTime, setLastPlayedTime] = useState(null);
  const [isSoundOn, setIsSoundOn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`${domain}/trxresultroute`, {
          params: {
            timer: selectedTimer, // Send the selected timer to the backend
          },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.data) {
          console.log(response.data);
          setRows(response.data); // Directly set the filtered data received from the backend
        } else {
          console.error("Response data does not contain Result");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
  
    // Fetch the user data initially and then set an interval for periodic fetching
    fetchUserData();
    const intervalId = setInterval(fetchUserData, 1000);
  
    return () => clearInterval(intervalId);
  }, [selectedTimer]);

  useEffect(() => {
    handleClick(images[0].id);
  }, []);

  const handleTimerChange = (id, subtitle) => {
    setActiveId(id);
    const newTimerKey = subtitle.toLowerCase().replace("min", "min");
    setSelectedTimer(subtitle);
    navigate(`/trx/${newTimerKey}`);
  };

  const handleClick = (id) => {
    // Only handle clicks if there's no timerKey prop
    if (!timerKey) {
      let newTimerKey;
      switch (id) {
        case 1:
          newTimerKey = "1min";
          break;
        case 2:
          newTimerKey = "3min";
          break;
        case 3:
          newTimerKey = "5min";
          break;
        case 4:
          newTimerKey = "10min";
          break;
        default:
          newTimerKey = "1min";
      }
      navigate(`/trx/${newTimerKey}`);
      setSelectedTimer(images.find((img) => img.id === id).subtitle);
      setActiveId(id);
    }
  };

  const textArray = [
    "We are excited to welcome you to 747 Lottery , where you can enjoy a wide range of games. But that's not all - there are also plenty of bonuses waiting for you to claim! Join us now and start play your game with 747 Lottery . Get ready for non-stop fun and rewards. Welcome aboard!  Stay tuned for more updates and promotions.",
    "24/7 Live support on 747 Lottery  club ",
    "747 Lottery  club welcomes you here !!",
  ];

  const [index, setIndex] = React.useState(0);
  const [inProp, setInProp] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setInProp(false);

      setTimeout(() => {
        setIndex((oldIndex) => {
          return (oldIndex + 1) % textArray.length;
        });
        setInProp(true);
      }, 500); // This should be equal to the exit duration below
    }, 3000); // Duration between changing texts

    return () => clearInterval(timer);
  }, []);

  //   table
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${domain}/user`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setUser(response.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleRefresh = () => {
    // Handle refresh logic
    // fetchUserData();
    setSnackbarMessage("Wallet refreshed"); // Set message
    setSnackbarOpen(true);  // Open snackbar
  };
  
  const handleSnackbarCloser = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    setSnackbarOpen(false);
  };

  // ...

  const navigateToPage = () => {
    navigate("/home");
  };

  const navigateToPage1 = () => {
    navigate("/recharge"); // Replace '/path-to-page' with the actual path
  };

  const navigateToPage2 = () => {
    navigate("/withdraw"); // Replace '/path-to-page' with the actual path
  };

  const handleOpenDrawer = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleBetAmount = (amount) => {
    setBetAmount(amount);
  };

  const handleMultiplier = (multiplier) => {
    setMultiplier(multiplier);
  };

  const handleTotalBet = () => {
    setTotalBet(betAmount * multiplier);
  };

  const handlePlaceBet = async () => {
    const totalBet = betAmount * multiplier;
    handleRefresh();
    // Check if user's wallet balance is less than the total bet amount
    if (betAmount === 0) {
      alert("You can't place a bet with 0 amount.");
      return;
    }
    if (user.walletAmount < totalBet) {
      alert("You don't have enough balance to place this bet.");
      return;
    }
    if (
      ["00:06", "00:05", "00:04", "00:03", "00:02", "00:01"].includes(
        remainingTime
      )
    ) {
      alert("You can't place a bet in the last 5 seconds.");
      return;
    }

    console.log("Multiplier --->", multiplier);

    const betData = {
      selectedItem: selectedItem,
      betAmount: betAmount,
      multiplier: multiplier,
      totalBet: totalBet,
      selectedTimer: selectedTimer,
      periodId: periodId,
      result: " ",
      status: " ",
      winLoss: "",
    };
    console.log("betData --->", betData);
    setLastAlertedPeriodId(periodId);
    // Send a POST request to the backend API endpoint
    try {
      const response = await axios.post(`${domain}/trxbet/`, betData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
    } catch (err) {
      console.error(err);
    }

    setBetPlaced(true);
    setBetPeriodId(periodId);
    handleCloseDrawer();
    setOpenSnackbar(true);
  };

  const handleCancelBet = () => {
    setSelectedItem("");
    setBetAmount(0);
    setMultiplier(1);
    setTotalBet(0);
    handleCloseDrawer();
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  useEffect(() => {
    handleClick(images[0].id);
  }, []);

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  useEffect(() => {
    if (remainingTime >= "00:01" && remainingTime <= "00:05") {
      setDrawerOpen(false)
      setOpenDialog(true);
      if (isSoundOn && remainingTime !== lastPlayedTime) {
        countdownSound.play();
        setLastPlayedTime(remainingTime);
        setTimeout(() => {
          countdownSound.pause();
          countdownSound.currentTime = 0;
        }, 1000 - countdownSound.duration * 1000);
      }
    } else {
      setOpenDialog(false);
      if (isSoundOn) {
        countdownSound.pause();
        countdownSound.currentTime = 0;
        setLastPlayedTime(null);
      }
    }
    // console.log("popupRemaningTime:", popupRemaningTime)
  }, [remainingTime, isSoundOn]);

  const [selectedColor, setSelectedColor] = useState("#FF952A");
  const handleEventSelection = (event) => {
    switch (event) {
      case "violet":
        setSelectedColor("#9B48DB");
        break;
      case "green":
        setSelectedColor("RGB(64,173,114)");
        break;
      case "red":
        setSelectedColor("RGB(253,86,92)");
        break;
      case "small":
        setSelectedColor("rgb(80,136,211)");
        break;
      case "big":
        setSelectedColor("rgb(255,168,46)");
        break;
      case "mix1":
        setSelectedColor(
          "linear-gradient(to right, rgb(253,86,92) 50%, rgb(182,89,254) 50%)"
        );
        break;
      case "mix2":
        setSelectedColor(
          "linear-gradient(to right, rgb(64,173,114) 50%, rgb(182,89,254) 50%)"
        );
        break;
      default:
        setSelectedColor("#FF952A");
    }
  };

  const [activeButton, setActiveButton] = useState(1);
  const [activeBetAmount, setActiveBetAmount] = useState(1);
  const [customBetAmount, setCustomBetAmount] = useState("");

  const handleCustomBetChange = (event) => {
    const betAmount = parseFloat(event.target.value);
    setCustomBetAmount(event.target.value);
    if (!isNaN(betAmount) && betAmount > 0) {
      handleBetAmount(betAmount);
      setActiveBetAmount(betAmount);
    }
  };

  const getColorAndSize = (popupresult) => {
    popupresult = Number(popupresult);

    let color = "unknown";

    if ([1, 3, 7, 9].includes(popupresult)) {
      color = "green";
    } else if ([2, 4, 6, 8].includes(popupresult)) {
      color = "red";
    } else if (popupresult === 0) {
      color = "red and violet";
    } else if (popupresult === 5) {
      color = "green and violet";
    }

    return `${color} ${popupresult} `;
  };

  const seconds1 = remainingTime ? remainingTime.split(":")[1] : "00";

  // Determine the length of the seconds string
  const length = seconds1.length;

  // Split the seconds into two halves
  const firstHalf = seconds1.slice(0, Math.ceil(length / 2));
  const secondHalf = seconds1.slice(Math.ceil(length / 2));

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const response = await axios.get(`${domain}/user/trxbethistory/`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        // Log fetched data to confirm it's being received correctly
        console.log("Fetched bets data:", response.data);
        setBets(response.data);
  
        // Convert periodId and lastAlertedPeriodId to strings before comparison
        const currentPeriodId = String(periodId);
        const previousAlertedPeriodId = String(lastAlertedPeriodId);
  
        console.log("Current Period ID (String):", currentPeriodId);
        console.log(
          "Last Alerted Period ID (String):",
          previousAlertedPeriodId
        );
  
        if (currentPeriodId !== previousAlertedPeriodId) {
          console.log("Period ID has changed. Filtering bets...");
  
          // Filter the bets for the period matching the last alerted period ID
          const periodBets = response.data.filter(
            (bet) => String(bet.periodId) === previousAlertedPeriodId
          );
          console.log("Filtered Period Bets:", periodBets); // Log filtered bets
  
          if (periodBets.length > 0) {
            console.log("Adding bets to popup queue...");
  
            setPopupQueue(periodBets);
            setCurrentBetIndex(0); // Reset index to start with the first popup
            setLastAlertedPeriodId(currentPeriodId); // Update the alerted period ID after queueing
            console.log("Popup queue updated:", periodBets);
          } else {
            console.log("No bets found for the current period.");
          }
        } else {
          console.log("Period ID has not changed. No new popups queued.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchBets();
    const intervalId = setInterval(fetchBets, 1000);
  
    return () => {
      console.log("Clearing interval...");
      clearInterval(intervalId);
    };
  }, [periodId, lastAlertedPeriodId, domain]);
  console.log("Bets are:",bets);
  useEffect(() => {
    // Only display if there are popups in the queue and the index is within bounds
    if (popupQueue.length > 0 && currentBetIndex < popupQueue.length) {
      const currentBet = popupQueue[currentBetIndex];
      setGameResult(currentBet.status); // Succeed or Fail status
      setWinLoss(currentBet.winLoss); // Win or loss amount
      setPopupPeriodId(currentBet.periodId); // Period ID
      setPopupResult(currentBet.result); // Bet result
      setPopupTimer(currentBet.selectedTimer); // Timer associated with the bet
      setDialogContent(
        currentBet.status === "Succeed" ? "Bonus" : "You lost the bet"
      );

      // Show the popup
      setOpen(true);

      // Close popup automatically after 1 second, then move to the next one
      // const timer = setTimeout(() => {
      //   setOpen(false);
      //   setTimeout(() => {
      //     setCurrentBetIndex((prevIndex) => prevIndex + 1); // Increment to show the next popup
      //   }, 3000); // Delay before showing the next popup
      // }, 4000); // Popup display duration

      // // Cleanup to avoid memory leaks
      // return () => clearTimeout(timer);
    }
  }, [popupQueue, currentBetIndex]);

  useEffect(() => {
    setTotalBet(betAmount * multiplier);
  }, [betAmount, multiplier]);

  const [lastFiveCharacters, setLastFiveCharacters] = useState([]);
  const handleCheckboxChange = (event) => {
    const newCheckedState = event.target.checked;
    setIsChecked(newCheckedState);
    
    // Trigger your function here based on checkbox state
    if (newCheckedState) {
      console.log('Auto-close enabled');
      setIsChecked(false);
            const timer = setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          setCurrentBetIndex((prevIndex) => prevIndex + 1);
          setIsChecked(false)
        }, 2000);
      }, 4000);
      // Your function logic here
    } else {
      console.log('Auto-close disabled');
      // Your alternative function logic here
    }
  };

  useEffect(() => {
    // Function to fetch the latest period ID's hash
    const fetchLatestHash = () => {
      // Assuming `rows` is an array of objects, get the latest row based on period ID
      const latestRow =
        rows && rows.length > 0
          ? rows.reduce(
              (latest, row) => (row.periodId > latest.periodId ? row : latest),
              rows[0]
            )
          : null;

      const hash = latestRow && latestRow.hash ? latestRow.hash : "";

      if (hash) {
        const characters = hash.slice(-5).split("");
        setLastFiveCharacters(characters);
      }
    };

    fetchLatestHash();
    const timer = setInterval(fetchLatestHash, selectedTimer);
    return () => clearInterval(timer);
  }, [rows, selectedTimer]);

  const [selectedMultiplier, setSelectedMultiplier] = useState(1);

  const handleMultiplierChange = (multiplier) => {
    if (!multiplier.isRandom) {
      setSelectedMultiplier(multiplier.value);
    } else {
      // In a real app, you'd generate a random multiplier here
      const randomMultipliers = [1, 5, 10, 20, 50, 100];
      const randomIndex = Math.floor(Math.random() * randomMultipliers.length);
      setSelectedMultiplier(randomMultipliers[randomIndex]);
    }
  };
  const periodNumber = "20240322130064";
  const drawTime = "00312";
  const numbers = ["2", "5", "E", "D", "C"];

  return (
    <div>
      <Mobile>
        <div style={{ backgroundColor: "#f2f2f1" }}>
        <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 5000,
              background: "rgb(254,134,37)",
              padding: "8px 16px",
              color: "white",
            }}
          >
            <Grid item xs={3} textAlign="left">
              <IconButton style={{ color: "white" }} onClick={navigateToPage}>
                <ArrowBackIosNewIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6} textAlign="center">
              <img
                src="/assets/genzwinlogo.png"
                alt="logo"
                style={{ width: "140px", height: "50px" }}
              />
            </Grid>
            <Grid item xs={3} textAlign="right">
              <IconButton style={{ color: "white" }}>
                <SupportAgentIcon />
              </IconButton>

              <IconButton
                style={{ color: "white" }}
                onClick={() => setIsSoundOn(!isSoundOn)}
              >
                {isSoundOn ? <MusicNoteIcon /> : <MusicOffIcon />}
              </IconButton>
            </Grid>
          </Grid>

          <Grid
            container
            direction="column"
            sx={{
              height: "300px",
              background: "rgb(255,142,40)",
              borderRadius: "0 0 70px 70px",
              textAlign: "center",
            }}
          >
            <Grid
              sx={{
                backgroundImage: `url("../../games/assets/walletbg.png")`,
                backgroundSize: "cover",
                backgroundColor: "#ffffff",
                backgroundPosition: "center",
                margin: "0 20px 20px 20px",
                borderRadius: "30px",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              <Grid
                sm={12}
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {user ? user.walletAmount.toFixed(2) : " Loading"}
                </Typography>
                <IconButton sx={{ color: "black" }}>
                  <Refresh onClick={handleRefresh} />
                </IconButton>
                {snackbarOpen && (
                    <Box
                        sx={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 1500,
                            backgroundColor: "rgba(0,0,0,0.6)", // Optional overlay background
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <Alert
                            severity={snackbarMessage.includes("Failed") ? "error" : "success"}
                            onClose={handleSnackbarCloser}
                            sx={{ 
                                width: "fit-content",
                                maxWidth: "90%",
                                padding: "16px 24px",
                                fontSize: "1rem"
                            }}
                        >
                            {snackbarMessage}
                        </Alert>
                    </Box>
                )}
              </Grid>

              <Grid
                sm={12}
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black",
                }}
              >
                <AccountBalanceWallet
                  sx={{ marginRight: "10px", color: "#FF952A" }}
                />
                <Typography variant="subtitle2">Wallet Balance</Typography>
              </Grid>
              <Grid
                sm={12}
                mt={3}
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="filled"
                  onClick={navigateToPage2}
                  fullWidth
                  sx={{
                    marginLeft: "10px",
                    color: "white",
                    backgroundColor: "#D23838",
                    "&:hover": {
                      backgroundColor: "#D23838",
                    },
                    borderColor: "#D23838",
                    borderRadius: "50px",
                  }}
                >
                  Withdraw
                </Button>
                <Button
                  variant="contained"
                  onClick={navigateToPage1}
                  fullWidth
                  sx={{
                    marginLeft: "10px",
                    backgroundColor: "#17B15E",
                    "&:hover": {
                      backgroundColor: "#17B15E",
                    },
                    borderRadius: "50px",
                  }}
                >
                  Deposit
                </Button>
              </Grid>
            </Grid>

            <Grid
              item
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                width: "90%",
                padding: "0 5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflow: "hidden",
                margin: "0 20px 20px 20px",
              }}
            >
              <IconButton>
                <VolumeUpIcon sx={{ color: "rgb(255,142,40)" }} />
              </IconButton>

              <Box sx={{ flex: 1, overflow: "hidden", padding: "0 10px" }}>
                <CSSTransition
                  in={inProp}
                  timeout={500}
                  classNames="message"
                  unmountOnExit
                >
                  <Typography
                    sx={{
                      color: "#8c90a6",
                      fontSize: "12.8px",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      textAlign: "left",
                      overflow: "hidden",
                      WebkitLineClamp: 2, // Limits the text to 2 lines
                      lineClamp: 2, // Fallback for non-WebKit browsers
                      textOverflow: "ellipsis", // Adds "..." at the end of overflowed text
                    }}
                  >
                    {textArray[index]}
                  </Typography>
                </CSSTransition>
              </Box>

              <Button
                variant="contained"
                sx={{
                  background:
                    "rgb(255,142,40)",
                  "&:hover": {
                    background:
                      "rgb(255,142,40)",
                  },
                  borderRadius: "50px",
                  fontSize: "11px",
                  textTransform: "initial",
                  padding: "4px 12px", // Adjust padding for a more balanced look
                  color: "#ffffff",
                }}
              >
                Details
              </Button>
            </Grid>
          </Grid>
          {/* Timer */}

          <Grid
            container
            spacing={1}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "93%",
              marginTop: "-65px",
              backgroundColor: "#ffffff",
              borderRadius: "13px",
              color: "white",
            }}
          >
            {images.map((image) => (
              <Grid
                item
                xs={3}
                key={image.id}
                onClick={() => handleTimerChange(image.id, image.subtitle)}
                style={{
                  cursor: "pointer",
                  background:
                    activeId === image.id
                      ? "linear-gradient(180deg, rgba(255, 150, 44, 0.46) 0%, #FFF 90.5%)"
                      : "transparent",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Align items horizontally
                  justifyContent: "center", // Align items vertically
                }}
              >
                <img
                  src={activeId === image.id ? image.altSrc : image.src}
                  alt={image.subtitle}
                  style={{ width: "60%" }}
                />
                <div
                  style={{
                    textAlign: "center",
                    color: activeId === image.id ? "black" : "grey",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    style={{
                      fontSize: "0.75rem",
                      lineHeight: "1",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    Trx
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{
                      fontSize: "0.75rem",
                      lineHeight: "1.5",
                      marginBottom: "2px",
                    }}
                  >
                    {image.subtitle}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
          {/* TRX- Card */}

          <Grid
            mt={2}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "95%",
              background: "#FF8E28",
              borderRadius: "0.7rem",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "5px",
            }}
          >
            <Grid
              container
              item
              xs={12}
              sx={{
            
                justifyContent: "space-between", // Distribute space between the items
                alignItems: "center",
                marginTop: "5px",

              }}
            >
              <Grid
                item
                sx={{
                  flex: "0 1 auto", // Take up available space evenly
                  maxWidth: "calc(20% - 10px)", // Adjust the width as per your design
                  height: "25px",
                  backgroundColor: "transparent",
                  color: "#ffffff",
                  border: "1px solid #ffffff",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: "0 10px",
                  fontSize: "12px",
                  marginLeft: "10px", // Add margin to create space
                }}
              >
                Period
              </Grid>

              <Grid
                item
                sx={{
                  flex: "0 0 auto", // Fixed width without shrinking
                  width: "80px",
                  height: "25px",
                  background: "rgb(255,142,40)",
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: "2px",
                  fontSize: "12px",
                  marginRight: "30px",
                  marginLeft: "-10px", // Add margin to create space
                }}
                onClick={handleOpenPopup}
              >
                How to play
              </Grid>
              <Popup isOpen={isPopupOpen} onClose={handleClosePopup} />

              <Grid
                item
                sx={{
                  flex: "0 0 auto", // Fixed width without shrinking
                  width: "120px",
                  height: "25px",
                  border: "1px solid white",
                  background: "rgb(255,142,40)",
                  color: "white",
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: "2px",
                  fontSize: "12px",
                  marginRight: "10px", // Add margin to create space
                }}
              >
                Public Chain Query
              </Grid>
            </Grid>

            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
                marginBottom: "15px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "50px",
                  alignItems: "flex-end",
                  paddingLeft: "10px",
                }}
              >
                <Typography sx={{ color: "white", fontSize: "15px" }}>
                  {periodId ? periodId : ""}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      marginRight: "10px",
                      fontSize: "11px",
                    }}
                  >
                    Draw time
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        display: "inline-block",
                        width: "16px",
                        height: "22px",
                        marginTop: "12px",
                        backgroundColor: "#f2f2f1",
                        color: "#000000",
                        textAlign: "center",
                        fontWeight: "bold",
                        lineHeight: "25px",
                        margin: "2px 2px",
                      }}
                    >
                      {minutes[0]}
                    </Box>
                    <Box
                      sx={{
                        display: "inline-block",
                        width: "16px",
                        height: "22px",
                        marginTop: "8px",
                        backgroundColor: "#f2f2f1",
                        color: "#000000",
                        fontWeight: "bold",
                        textAlign: "center",
                        lineHeight: "25px",
                        margin: "0 2px",
                      }}
                    >
                      {minutes[1]}
                    </Box>
                    <Box
                      sx={{
                        display: "inline-block",
                        width: "16px",
                        height: "22px",
                        backgroundColor: "#f2f2f1",
                        color: "#000000",
                        marginTop: "8px",
                        fontWeight: "bold",
                        textAlign: "center",
                        lineHeight: "20px",
                        margin: "0 2px",
                      }}
                    >
                      :
                    </Box>
                    <Box
                      sx={{
                        display: "inline-block",
                        width: "16px",
                        height: "22px",
                        backgroundColor: "#f2f2f1",
                        color: "#000000",
                        marginTop: "10px",
                        fontWeight: "bold",
                        textAlign: "center",
                        lineHeight: "25px",
                        margin: "0 2px",
                      }}
                    >
                      {seconds[0]}
                    </Box>
                    <Box
                      sx={{
                        display: "inline-block",
                        width: "16px",
                        height: "22px",
                        backgroundColor: "#f2f2f1",
                        color: "#000000",
                        fontWeight: "bold",
                        marginTop: "8px",
                        textAlign: "center",
                        lineHeight: "25px",
                        margin: "2px 2px",
                      }}
                    >
                      {seconds[1]}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Divider variant="middle" sx={{ borderStyle: 'dashed', marginY: 2, borderColor: 'white' }} /> {/* Add this line */}

            <Grid
              item
              sx={{
                display: "flex",
                marginBottom: "15px",
                justifyContent: "center",
              }}
            >
              {lastFiveCharacters.map((character, index) => {
                const upperCaseCharacter = character.trim().toUpperCase(); // Convert to uppercase
                // console.log(`Character ${index}:`, upperCaseCharacter); // Log each character

                return (
                  <img
                    key={index}
                    src={`../../games/assets/${upperCaseCharacter}.png`}
                    className="auja"
                    alt={`Image ${index + 1}`}
                    style={{
                      width: "16%",
                      marginRight:
                        index !== lastFiveCharacters.length - 1 ? "10px" : "0",
                    }}
                  />
                );
              })}
            </Grid>
          </Grid>

          <Grid
            container
            mt={2}
            spacing={2}
            sx={{
              boxShadow: "0px 4px 8px #f2f2f1",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "95%",
              borderRadius: "15px",
              backgroundColor: "#ffffff",
              position: "relative",
              pointerEvents: openDialog ? "none" : "auto",
            }}
          >
            <div
              className="overlay"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "20px",
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 100,
                display: openDialog ? "inline-block" : "none",
                cursor: "not-allowed",
              }}
            ></div>
            <div
              style={{
                width: "300px",
                height: "200px",
                display: openDialog ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                color: "#FF952A",
                fontWeight: "bold",
                textAlign: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 900,
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <p
                  style={{
                    textAlign: "center",
                    paddingLeft: "20px",
                    borderRadius: "20px",
                    fontSize: "130px",
                    paddingRight: "20px",
                    backgroundColor: "#ffffff",
                  }}
                >
                  {firstHalf}
                </p>
                <p
                  style={{
                    textAlign: "center",
                    paddingLeft: "20px",
                    borderRadius: "20px",
                    fontSize: "130px",
                    paddingRight: "20px",
                    backgroundColor: "#ffffff",
                  }}
                >
                  {secondHalf}
                </p>
              </div>
            </div>
            {/* First Row */}
            <Grid
              xs={12}
              container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 10px 0",
              }}
            >
              <Button
                onClick={() => {
                  handleOpenDrawer("Green ");
                  handleEventSelection("green");
                }}
                variant="contained"
                sx={{
                  backgroundColor: "RGB(64,173,114)",
                  "&:hover": {
                    backgroundColor: "RGB(64,173,114)",
                  },
                  width: "30%",
                  borderRadius: "0 10px 0 10px",
                }}
              >
                Green
              </Button>
              <Button
                onClick={() => {
                  handleOpenDrawer("Violet");
                  handleEventSelection("violet");
                }}
                variant="contained"
                sx={{
                  backgroundColor: "#9B48DB",
                  "&:hover": {
                    backgroundColor: "#9B48DB",
                  },
                  width: "30%",
                  borderRadius: "10px",
                }}
              >
                Violet
              </Button>
              <Button
                onClick={() => {
                  handleOpenDrawer("Red");
                  handleEventSelection("red");
                }}
                variant="contained"
                sx={{
                  backgroundColor: "RGB(253,86,92)",
                  "&:hover": {
                    backgroundColor: "RGB(253,86,92)",
                  },
                  width: "30%",
                  borderRadius: "10px 0 10px 0",
                }}
              >
                Red
              </Button>
            </Grid>
            {/* Second Row */}
            <Grid
              container
              mt={2}
              sx={{
                backgroundColor: "#f2f2f1",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "95%",
                borderRadius: "20px",
                padding: "10px",
              }}
            >
              <Grid item xs={12} container justifyContent="space-evenly">
                <img
                  src="../../games/assets/n0-30bd92d1.png"
                  alt="0"
                  style={{ width: "15%" }}
                  onClick={() => {
                    handleOpenDrawer("0");
                    handleEventSelection("mix1");
                  }}
                />
                <img
                  src="../../games/assets/n1-dfccbff5.png"
                  alt="1"
                  style={{ width: "15%" }}
                  onClick={() => {
                    handleOpenDrawer("1");
                    handleEventSelection("green");
                  }}
                />
                <img
                  src="../../games/assets/n2-c2913607.png"
                  alt="2"
                  style={{ width: "15%" }}
                  onClick={() => {
                    handleOpenDrawer("2");
                    handleEventSelection("red");
                  }}
                />
                <img
                  src="../../games/assets/n3-f92c313f.png"
                  alt="3"
                  style={{ width: "15%" }}
                  onClick={() => {
                    handleOpenDrawer("3");
                    handleEventSelection("green");
                  }}
                />
                <img
                  src="../../games/assets/n4-cb84933b.png"
                  alt="4"
                  style={{ width: "15%" }}
                  onClick={() => {
                    handleOpenDrawer("4");
                    handleEventSelection("red");
                  }}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="space-evenly">
                <img
                  src="../../games/assets/n5-49d0e9c5.png"
                  alt="5"
                  style={{ width: "15%" }}
                  onClick={() => {
                    handleOpenDrawer("5");
                    handleEventSelection("mix2");
                  }}
                />
                <img
                  src="../../games/assets/n6-a56e0b9a.png"
                  alt="6"
                  style={{ width: "15%" }}
                  onClick={() => {
                    handleOpenDrawer("6");
                    handleEventSelection("red");
                  }}
                />
                <img
                  src="../../games/assets/n7-5961a17f.png"
                  alt="7"
                  style={{ width: "15%" }}
                  onClick={() => {
                    handleOpenDrawer("7");
                    handleEventSelection("green");
                  }}
                />
                <img
                  src="../../games/assets/n8-d4d951a4.png"
                  alt="8"
                  style={{ width: "15%" }}
                  onClick={() => {
                    handleOpenDrawer("8");
                    handleEventSelection("red");
                  }}
                />
                <img
                  src="../../games/assets/n9-a20f6f42.png"
                  alt="9"
                  style={{ width: "15%" }}
                  onClick={() => {
                    handleOpenDrawer("9");
                    handleEventSelection("green");
                  }}
                />
              </Grid>
            </Grid>
            {/* Third Row */}
            <Box
              sx={{
                width: "70%",
                marginX: "auto",
                display: "flex",
                justifyContent: "center",
                p: 2,
                mb: -3,
              }}
            >
              <StyledButtonGroup aria-label="multiplier selection">
                {multipliers.map((multiplier) => (
                  <StyledButton
                    key={multiplier.label}
                    onClick={() => handleMultiplierChange(multiplier)}
                    active={
                      !multiplier.isRandom &&
                      selectedMultiplier === multiplier.value
                        ? 1
                        : 0
                    }
                    isRandom={multiplier.isRandom}
                  >
                    {multiplier.label}
                  </StyledButton>
                ))}
              </StyledButtonGroup>
            </Box>

            {/* Fourth Row */}
            <Grid
              container
              item
              xs={12}
              justifyContent="center"
              sx={{ marginBottom: "10px" }}
            >
              <Grid item>
                <Button
                  onClick={() => {
                    handleOpenDrawer("big");
                    handleEventSelection("big");
                  }}
                  variant="contained"
                  sx={{
                    width: "150px",
                    borderRadius: "20px 0 0 20px",
                    margin: "0",
                    backgroundColor: "rgb(255,168,46)",
                    "&:hover": {
                      backgroundColor: "rgb(255,168,46)", // Prevent color change on hover
                    },
                  }}
                >
                  Big
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    handleOpenDrawer("small");
                    handleEventSelection("small");
                  }}
                  variant="contained"
                  sx={{
                    width: "150px",
                    borderRadius: "0 20px 20px 0",
                    margin: "0",
                    backgroundColor: " #5088d3",
                    backgroundColor: "#5088d3",
                    "&:hover": {
                      backgroundColor: "#5088d3", // Prevent color change on hover
                    },
                  }}
                >
                  Small
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={1000}
            onClose={handleCloseSnackbar}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <MuiAlert
              onClose={handleCloseSnackbar}
              severity="success"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white" }}
            >
              Bet placed successfully!
            </MuiAlert>
          </Snackbar>

          <Drawer
            anchor="bottom"
            open={drawerOpen}
            onClose={handleCloseDrawer}
            sx={{
              "& .MuiDrawer-paper": {
                width: "100%",
                height: "auto",
                margin: "0 auto",
                maxWidth: isSmallScreen ? "600px" : "396px",
                backgroundColor: "white",
                color: "black",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              },
            }}
          >
            <Grid
              container
              alignItems="center"
              style={{
                position: "relative",
                color: "black",
                backgroundColor: "#ffffff",
              }}
            >
              <Grid
                item
                xs={12}
                align="center"
                style={{
                  position: "relative",
                  marginBottom: "-5px",
                  height: "90px",
                  color: "white",
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "70%",
                    background: selectedColor,
                    clipPath: "polygon(50.7% 100.3%, 100.1% 61%, 100.1% 0%, 0% 0%, 0.1% 71.3%)",
                  }}
                >
                   <Typography variant="h6">{`TRx ${selectedTimer}`}</Typography>
                   <Typography variant="body1">{`${selectedItem} is selected`}</Typography>
                </div>
                
              </Grid>
              <Grid container padding={1}>
  {/* Balance Section */}
  <Grid item xs={6}>
    <Typography
      variant="h6"
      sx={{
        color: "#666",
        fontSize: "1rem",
        marginTop: "5px",
      }}
    >
      Balance
    </Typography>
  </Grid>

  {/* Bet Amount Buttons */}
  <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
    <Box sx={{ display: "flex", gap: "5px" }}>
      {[1, 10, 100, 1000].map((amount) => (
        <Button
          key={amount}
          sx={{
            minWidth: "40px",
            height: "25px",
            padding: "2px 4px",
            fontSize: "0.75rem",
            backgroundColor: activeBetAmount === amount ? selectedColor : "#f2f2f1",
            color: activeBetAmount === amount ? "white" : "#666",
            "&:hover": {
              backgroundColor: activeBetAmount === amount ? selectedColor : "#f2f2f1",
            },
          }}
          onClick={() => {
            handleBetAmount(amount);
            setActiveBetAmount(amount);
          }}
        >
          {amount}
        </Button>
      ))}
    </Box>
  </Grid>

  {/* Quantity Section */}
  <Grid item xs={6} mt={2}>
    <Typography
      variant="h6"
      sx={{ color: "#666", fontSize: "1rem" }}
    >
      Quantity
    </Typography>
  </Grid>

  {/* Quantity Controls */}
  <Grid item xs={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
    <IconButton onClick={() => setMultiplier(multiplier > 1 ? multiplier - 1 : 1)}>
      <RemoveIcon fontSize="small" sx={{ color: selectedColor, fontSize: 30 }} />
    </IconButton>

    <TextField
      value={multiplier}
      onChange={(e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
          setMultiplier(value === "" ? "" : Math.max(1, Number(value)));
        }
      }}
      sx={{
        width: "50px",
        textAlign: "center",
        "& .MuiOutlinedInput-root": {
          borderRadius: "4px",
          backgroundColor: "white",
          color: "#666",
          textAlign: "center",
          fontSize: "1rem",
          "& input": {
            textAlign: "center",
            padding: "4px 8px",
          },
        },
      }}
      variant="outlined"
      inputProps={{ min: 1, style: { textAlign: "center" } }}
    />

    <IconButton onClick={() => setMultiplier(multiplier + 1)}>
      <AddIcon fontSize="small" sx={{ color: selectedColor, fontSize: 30 }} />
    </IconButton>
  </Grid>

  {/* Multiplier Buttons */}
  <Grid item xs={12} mt={2}>
    <Grid container justifyContent="flex-end" sx={{ color: "#666" }}>
      {[1, 5, 10, 20, 50, 100].map((mult) => (
        <div
          key={mult}
          className={`button ${activeButton === mult ? "active" : ""}`}
          onClick={() => {
            handleMultiplier(mult);
            setActiveButton(mult);
          }}
          style={
            activeButton === mult
              ? { backgroundColor: selectedColor, color: "white" }
              : { backgroundColor: "#f2f2f1", color: "#666" }
          }
        >
          X{mult}
        </div>
      ))}
    </Grid>
  </Grid>
</Grid>


<FormControlLabel
      control={
        <Radio
          checked={agree}
          onChange={() => setAgree(!agree)}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />} // Green check when selected
        />
      }
      label="I Agree"
      sx={{ color: "#666", fontSize: "1rem",marginLeft:1}}
    />



              <Grid item xs={12} mt={2}>
                <Grid container justifyContent="space-around" spacing={0}>
                  <Grid item xs={3}>
                    <Button
                      onClick={handleCancelBet}
                      fullWidth
                      style={{ backgroundColor: "#f2f2f1", color: "grey" }}
                      variant="contained"
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={9}>
                    <Button
                      onClick={handlePlaceBet}
                      fullWidth
                      style={{ background: selectedColor }}
                      variant="contained"
                    >{`Total Amount: ${betAmount * multiplier}`}</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Drawer>

          <Grid
            mt={2}
            container
            justifyContent="center"
            sx={{ marginBottom: "15%" }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "95%",
                margin: "0 auto",
              }}
            >
              <Grid container spacing={1} sx={{ mb: 1.5 }}>
                {tabData.map((tab, index) => (
                  <Grid item xs={4} key={index}>
                    <Box
                      onClick={() => setActiveTab(index)}
                      sx={{
                        height: "40px", // Adjust this value to change the tab height
                        backgroundColor:
                          activeTab === index ? "rgb(255,142,40)" : "#ffffff",
                        color: activeTab === index ? "#ffffff" : "grey",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        "&:hover": {
                          backgroundColor:
                            activeTab === index ? "rgb(255,142,40)" : "#f5f5f5",
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "12px",
                          textTransform: "none",
                          fontWeight: "bold",
                        }}
                      >
                        {tab.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 2 }}>
                {activeTab === 0 && (
                  <TabPanel>
                    <CustomTable data={rows} />
                  </TabPanel>
                )}
                {activeTab === 1 && (
                  <TabPanel>
                    <RowVisualization data={rows} />
                  </TabPanel>
                )}
                {activeTab === 2 && (
                  <TabPanel>
                    <Grid container sx={{ justifyContent: "center" }}>
                      {bets
                        .slice()
                        .sort((a, b) =>
                          b.timestamp && a.timestamp
                            ? b.timestamp.seconds - a.timestamp.seconds
                            : 0
                        )
                        .map((bet, index) => (
                          <Accordion
                            key={index}
                            sx={{
                              backgroundColor: "#ffffff",
                              width: "100%",
                            }}
                          >
                            <AccordionSummary>
                              <Grid
                                container
                                sx={{
                                  alignItems: "center",
                                  p: 1,
                                  margin: "0px",
                                }}
                              >
                                <Grid item xs={2}>
                                  <Box
                                    border={1}
                                    borderRadius={2}
                                    style={{
                                      background:
                                        bet.selectedItem.toLowerCase() ===
                                          "green" ||
                                        [1, 3, 7, 9].includes(
                                          Number(bet.selectedItem)
                                        )
                                          ? "RGB(64,173,114)"
                                          : bet.selectedItem.toLowerCase() ===
                                              "red" ||
                                            [2, 4, 6, 8].includes(
                                              Number(bet.selectedItem)
                                            )
                                          ? "RGB(253,86,92)"
                                          : bet.selectedItem.toLowerCase() ===
                                            "violet"
                                          ? "RGB(182,89,254)"
                                          : bet.selectedItem.toLowerCase() ===
                                            "big"
                                          ? "#ffa82e" // Background color for "big"
                                          : bet.selectedItem.toLowerCase() ===
                                            "small"
                                          ? "#1876d2" // Background color for "small"
                                          : Number(bet.selectedItem) === 0
                                          ? "linear-gradient(to right, rgb(253,86,92) 50%, rgb(182,89,254) 50%)"
                                          : Number(bet.selectedItem) === 5
                                          ? "linear-gradient(to right, rgb(64,173,114) 50%, rgb(182,89,254) 50%)"
                                          : "RGB(64,173,114)",
                                      color: "white",
                                      height: "40px",
                                      width: "40px",
                                      display: "flex",
                                      border: "none",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography sx={{ fontSize: "10px" }}>
                                      {bet.selectedItem.toUpperCase()}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={7} textAlign="left">
                                  <Typography variant="body2">
                                    {bet.periodId}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "text.secondary" }}
                                  >
                                    {bet.timestamp
                                      ? new Date(bet.timestamp).toLocaleString(
                                          "en-GB"
                                        )
                                      : "N/A"}
                                  </Typography>
                                </Grid>
                                <Grid item xs={3} sx={{ textAlign: "right" }}>
                                <Box
                                                                  sx={{
                                                                    border: 1,
                                                                    borderColor:
                                                                      bet.status === "lost"
                                                                        ? "error.main"
                                                                        : bet.status === "won"
                                                                        ? "success.main"
                                                                        : "text.primary",
                                                                    borderRadius: 1,
                                                                    pt: 0.1,
                                                                    pb: 0.1,
                                                                    pl: 1,
                                                                    pr: 1,
                                                                    display: "inline-block",
                                                                    mb: 0.5,
                                                                  }}
                                                                >
                                                                  <Typography
                                                                    variant="caption"
                                                                    sx={{
                                                                      color:
                                                                        bet.status === "lost"
                                                                          ? "orange" // Color for Pending status
                                                                          : bet.winLoss >= 0
                                                                          ? "green"
                                                                          : "red",
                                                                    }}
                                                                  >
                                                                    {bet.status==="lost"||bet.status==="won"?bet.status:"Pending"}
                                                                  </Typography>
                                                                </Box>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color:
                                        bet.winLoss < 0 ? "#f44336" : "#4caf50", // Red for losses, green for wins
                                      fontWeight: "bold",
                                    }}
                                  >
                               {bet.status === "lost"
    ? `-₹${Math.abs(bet.winLoss)}`
    : bet.status === "won"
        ? `+₹${Math.abs(bet.winLoss)}`
        : ``
}{" "}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </AccordionSummary>
                            <AccordionDetails sx={{ m: 0, p: 0 }}>
                              <Table size="small" style={{ padding: 2 }}>
                                <TableBody>
                                  {[
                                    {
                                      label: "Order number",
                                      value: bet.orderId,
                                    },
                                    { label: "Period", value: bet.periodId },
                                    {
                                      label: "Purchase amount",
                                      value: `₹${bet.betAmount}`,
                                    },
                                    {
                                      label: "Quantity",
                                      value: multiplier,
                                    },
                                    {
                                      label: "Amount after tax",
                                      value: `₹${bet.totalBet}`,
                                    },
                                    { label: "Tax", value: `₹${bet.tax}` },
                                    { label: "Result", value: bet.result },
                                    {
                                      label: "Select",
                                      value: bet.selectedItem,
                                    },
                                    { label: "Status", value: bet.status },
                                    {
                                      label: "Win/lose",
                                      value:
                                        bet.winLoss > 0
                                          ? `+₹${bet.winLoss}`
                                          : `₹${bet.winLoss}`,
                                    },
                                    {
                                      label: "Order time",
                                      value: new Date(
                                        bet.timestamp
                                      ).toLocaleString("en-GB"),
                                    },
                                  ].map((row, index) => (
                                    <TableRow
                                      key={index}
                                      sx={{
                                        py: 2,
                                        px: 1,
                                        border: "0.4rem solid #ffffff",
                                        backgroundColor: "#f6f6f6",
                                      }}
                                    >
                                      <TableCell component="th" scope="row">
                                        {row.label}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.label === "Amount after tax" ? (
                                          <Typography sx={{ color: "red" }}>
                                            {row.value}
                                          </Typography>
                                        ) : row.label === "Result" ? (
                                          <Typography
                                            sx={{
                                              color: "black",
                                              fontSize:
                                                Number(row.value) >= 0 &&
                                                Number(row.value) <= 4
                                                  ? "16px"
                                                  : "16px",
                                            }}
                                          >
                                            {row.value}{" "}
                                            {Number(row.value) >= 0 &&
                                            Number(row.value) <= 4 ? (
                                              <span
                                                style={{ color: "#6ea8f4" }}
                                              >
                                                Small
                                              </span>
                                            ) : (
                                              <span
                                                style={{ color: "#feaa57" }}
                                              >
                                                Big
                                              </span>
                                            )}{" "}
                                            {Number(row.value) === 0 ? (
                                              <span style={{ color: "green" }}>
                                                Green
                                              </span>
                                            ) : [1, 3, 7, 9].includes(
                                                Number(row.value)
                                              ) ? (
                                              <span style={{ color: "green" }}>
                                                Green
                                              </span>
                                            ) : [2, 4, 6, 8].includes(
                                                Number(row.value)
                                              ) ? (
                                              <span style={{ color: "red" }}>
                                                Red
                                              </span>
                                            ) : Number(row.value) === 5 ? (
                                              <span style={{ color: "red" }}>
                                                Red
                                              </span>
                                            ) : (
                                              <span style={{ color: "black" }}>
                                                Unknown
                                              </span>
                                            )}
                                          </Typography>
                                        ) : row.label === "Win/lose" ? (
                                          <Typography
                                            sx={{
                                              color:
                                                Number(
                                                  row.value.replace(
                                                    /[^0-9.-]+/g,
                                                    ""
                                                  )
                                                ) >= 0
                                                  ? "green"
                                                  : "red",
                                            }}
                                          >
                                            {row.value}
                                          </Typography>
                                        ) : (
                                          row.value
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                    </Grid>
                  </TabPanel>
                )}
              </Box>
            </Box>
          </Grid>
          <>
            {/* ...rest of the code... */}
            <div
  style={{
    display: open ? "block" : "none",
    position: "absolute",
    zIndex: 2000,
    left:5,
    top: "120px",
    width: "100%",
    height: "100%",
    overflow: "auto",
    border: "none",
    // backgroundColor: "rgba(59, 53, 53, 0.6)", // Backdrop effect
  }}
>

  <div
    style={{
      backgroundColor: "transparent",
      margin: "15% auto",
      padding: 5,
      width: "75%",
      height: "55%",
      backgroundImage: `url(${
        gameResult === "Succeed"
          ? "../../assets/images/missningBg-6f17b242.png"
          : "../../assets/images/missningLBg-73e02111.png"
      })`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <br />
    <br />
    <br/>
    <br/>
    {/* Main Title */}
    <Typography
      variant="h5"
      style={{
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "0",
        marginBottom:"30px"
      }}
    >
      {gameResult === "Succeed" ? "Congratulations" : "Sorry"}
    </Typography>

    {/* Lottery Results Section */}
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "3px",
        alignItems: "center",
      }}
    >

      {/* Lottery Result Tags */}
      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "transparent", // Smooth gradient background
    padding: "4px 10px",
    borderRadius: "20px",
  }}
>
  <Typography
    variant="body1"
    style={{
      color: "#fff",
      fontWeight: "normal",
      fontSize: "15px",
    }}
  >
    Lottery results
  </Typography>

  {/* "Red" Tag */}
  <div
    style={{
      background: "transparent",
      border: "2px solid white",
      padding: "4px 12px",
      borderRadius: "20px",
      color: "#fff",
      fontWeight: "normal",
      fontSize: "10px",
      textAlign: "center",
      minWidth: "20px",
    }}
  >
    {rows[0]?.colorOutcome[0]}
  </div>

  {/* Number Circle */}
  <div
    style={{
      background: "transparent",
      border: "2px solid white",
      padding: "2px 7px",
      borderRadius: "50%",
      color: "#fff",
      fontWeight: "normal",
      fontSize: "14px",
      textAlign: "center",
      minWidth: "5px",
    }}
  >
    {rows[0]?.numberOutcome}
  </div>

  {/* "Big" Tag */}
  <div
    style={{
      background: "transparent",
      border: "2px solid white",
      padding: "4px 12px",
      borderRadius: "20px",
      color: "#fff",
      fontWeight: "normal",
      fontSize: "10px",
      textAlign: "center",
      minWidth: "20px",
    }}
  >
    {rows[0]?.sizeOutcome}
  </div>
</div>
</div>

    {/* Ticket Style for Bonus Amount */}
    <br/>
    <br />
    <Typography
      variant="h7"
      style={{
        color: gameResult === "Succeed" ? "#28a745" : "#dc3545",
        fontWeight: "bold",
      }}
    >
      {gameResult === "Succeed" ? "Bonus" : "Lose"}
    </Typography>

    <Typography
      variant="h7"
      style={{
        color: gameResult === "Succeed" ? "#28a745" : "#dc3545",
        fontWeight: "bold",
        margin: "1px 0",
      }}
    >
     ₹{parseFloat(bets[0]?.winLoss).toFixed(2)}
    </Typography>

    <Typography variant="body2" style={{ fontSize: "12px", fontWeight: "normal" }}>
      Period: {popupTimer} {popupperiodid}
    </Typography>

    {/* Close Button */}
    <br/>
    <div
          style={{
            backgroundColor: "transparent",
            color: "white",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 20px",
            fontSize: "16px",
          }}
        >
           <Checkbox
                           checked={isChecked}
                           onChange={handleCheckboxChange}
                           size="small"
                           sx={{
                             color: "#fff",
                             '&.Mui-checked': {
                               color: "#fff",
                             },
                           }}
                         />
          <Typography
            variant="body2"
            style={{
              fontSize: "10px",
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            Auto close in 3 sec
          </Typography>
  </div>
  </div>
  <Button
  onClick={() => setOpen(false)}
  style={{
    backgroundColor: "black",
    color: "white",
    marginTop: "-70px",
    padding: "8px 20px",
    fontSize: "16px",
    opacity: "0.2",
    borderRadius: "70px",
  }}
>
  <CloseIcon />
</Button>

<div 
    style={{
      display: open ? "block" : "none",
      position: "fixed",  // Ensures full-screen coverage
      zIndex: -2000,
      left: 0,
      top: 0,  // Covers from the very top
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(59, 53, 53, 0.6)", // Backdrop effect
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >

</div>


</div>
          </>
        </div>
      </Mobile>
    </div>
  );
};

export default LotteryAppt;
