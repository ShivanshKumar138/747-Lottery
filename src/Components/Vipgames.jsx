import React, { useState , useEffect} from "react";
import { AppBar, Tabs, Tab, Grid, Box ,} from "@mui/material";
import {
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { domain } from "../Components/config";
import axios from "axios";
import { styled } from "@mui/material/styles";
import jdb from "../../public/tabsIcon/JDB.svg";
import jilli from "../../public/tabsIcon/JILLI.svg";
import TopBet from "../../public/tabsIcon/TopBet.svg";
import {TextField, InputAdornment, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRef } from "react";
const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const App = () => {


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);


    // setTimeout(() => {
    //   setTabValue((prev) => (prev + 1));
    // }, 800); // Adjust delay as needed
  };
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [firstDepositMade, setFirstDepositMade] = useState(true);
  const [needToDepositFirst, setNeedToDepositFirst] = useState(false);
  const [phoneUserUid, setPhoneUserUid] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameType, setGameType] = useState("");
  const [isDepositCheckLoading, setIsDepositCheckLoading] = useState(true);
  const [hasDeposit, setHasDeposit] = useState(false);
  // const totalTabs = 10; // Change this to the actual number of tabs
  
 
  const tabsRef = useRef(null);

  const StyledDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      width: "70%",
      maxWidth: "330px",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    },
  }));

  const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    backgroundColor: "#4c8eff",
    color: "white",
    padding: theme.spacing(1.5),
  }));

  const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(2.5),
  }));

  const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    backgroundColor: "#f5f5f5",
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: "10px",
    padding: theme.spacing(1, 2),
    textTransform: "none",
    // fontWeight: "bold",
  }));
const RechargeDialog = ({ open, onClose, onConfirm, selectedGame }) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialogTitle>
        <Typography variant="h6" component="div" fontWeight="bold">
          Recharge Required
        </Typography>
      </StyledDialogTitle>
      <StyledDialogContent>
        <Typography sx={{ marginTop: "0.5rem" }} variant="body1" gutterBottom>
          To enter{" "}
          <Box component="span" fontWeight="bold">
            {selectedGame?.game}
          </Box>
          , you need to make a deposit first.
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          Recharging your account will allow you to enjoy all the exciting
          features of our games!
        </Typography>
      </StyledDialogContent>
      <StyledDialogActions>
        <StyledButton onClick={onClose} color="inherit">
          Cancel
        </StyledButton>
        <StyledButton
          onClick={onConfirm}
          variant="contained"
          style={{ backgroundColor: "#4c8eff", color: "white" }}
        >
          Recharge Now
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};




useEffect(() => {
  const checkDepositStatus = async () => {
    setIsDepositCheckLoading(true);
    try {
      const token = sessionStorage.getItem('token'); // Assuming the token is stored in localStorage
      const userResponse = await axios.get(`${domain}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const depositResponse = await axios.get(`${domain}/need-to-deposit-first`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const hasFirstDeposit = userResponse?.data?.user?.firstDepositMade;
      const needsDeposit = depositResponse?.data?.data?.needToDepositFirst;

      setFirstDepositMade(hasFirstDeposit);
      setNeedToDepositFirst(needsDeposit);
      setHasDeposit(!needsDeposit || hasFirstDeposit);
    } catch (error) {
      console.error("Error checking deposit status:", error);
      // Default to requiring deposit on error
      setHasDeposit(false);
    } finally {
      setIsDepositCheckLoading(false);
    }
  };

  checkDepositStatus();
}, []);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const flashGames = [
    { imageSrc: "/assets/jili/JL_392.png", gameId: "JL_392" },
    { imageSrc: "/assets/jili/JL_307.png", gameId: "JL_307" },
    { imageSrc: "/assets/jili/JL_377.png", gameId: "JL_377" },
    { imageSrc: "/assets/jili/JL_441.png", gameId: "JL_441" },
    { imageSrc: "/assets/jili/JL_442.png", gameId: "JL_442" },
    { imageSrc: "/assets/jili/JL_422.png", gameId: "JL_422" },
    { imageSrc: "/assets/jili/JL_378.png", gameId: "JL_378" },
    { imageSrc: "/assets/jili/JL_404.png", gameId: "JL_404" },
    { imageSrc: "/assets/jili/JL_374.png", gameId: "JL_374" },
    { imageSrc: "/assets/jili/JL_436.png", gameId: "JL_436" },
    { imageSrc: "/assets/jili/JL_421.png", gameId: "JL_421" },
    { imageSrc: "/assets/jili/JL_376.png", gameId: "JL_376" },
    { imageSrc: "/assets/jili/JL_462.png", gameId: "JL_462" },
    { imageSrc: "/assets/jili/JL_324.png", gameId: "JL_324" },
    { imageSrc: "/assets/jili/JL_379.png", gameId: "JL_379" },
    { imageSrc: "/assets/jili/JL_372.png", gameId: "JL_372" },
    { imageSrc: "/assets/jili/JL_272.png", gameId: "JL_272" },
    { imageSrc: "/assets/jili/JL_464.png", gameId: "JL_464" },
    { imageSrc: "/assets/jili/JL_305.png", gameId: "JL_305" },
    { imageSrc: "/assets/jili/JL_427.png", gameId: "JL_427" },
    { imageSrc: "/assets/jili/JL_375.png", gameId: "JL_375" },
    { imageSrc: "/assets/jili/JL_400.png", gameId: "JL_400" },
    { imageSrc: "/assets/jili/JL_469.png", gameId: "JL_469" },
    { imageSrc: "/assets/jili/JL_440.png", gameId: "JL_440" },
    { imageSrc: "/assets/jili/JL_397.png", gameId: "JL_397" },
    { imageSrc: "/assets/jili/JL_439.png", gameId: "JL_439" },
    { imageSrc: "/assets/jili/JL_264.png", gameId: "JL_264" },
    { imageSrc: "/assets/jili/JL_240.png", gameId: "JL_240" },
    { imageSrc: "/assets/jili/JL_389.png", gameId: "JL_389" },
    { imageSrc: "/assets/jili/JL_302.png", gameId: "JL_302" },
    { imageSrc: "/assets/jili/JL_403.png", gameId: "JL_403" },
    { imageSrc: "/assets/jili/JL_180.png", gameId: "JL_180" },
    { imageSrc: "/assets/jili/JL_407.png", gameId: "JL_407" },
    { imageSrc: "/assets/jili/JL_263.png", gameId: "JL_263" },
    { imageSrc: "/assets/jili/JL_262.png", gameId: "JL_262" },
    { imageSrc: "/assets/jili/JL_420.png", gameId: "JL_420" },
    { imageSrc: "/assets/jili/JL_299.png", gameId: "JL_299" },
    { imageSrc: "/assets/jili/JL_399.png", gameId: "JL_399" },
    { imageSrc: "/assets/jili/JL_300.png", gameId: "JL_300" },
    { imageSrc: "/assets/jili/JL_301.png", gameId: "JL_301" },
    { imageSrc: "/assets/jili/JL_252.png", gameId: "JL_252" },
    { imageSrc: "/assets/jili/JL_258.png", gameId: "JL_258" },
    { imageSrc: "/assets/jili/JL_253.png", gameId: "JL_253" },
    { imageSrc: "/assets/jili/JL_297.png", gameId: "JL_297" },
    { imageSrc: "/assets/jili/JL_208.png", gameId: "JL_208" },
    { imageSrc: "/assets/jili/JL_228.png", gameId: "JL_228" },
    { imageSrc: "/assets/jili/JL_152.png", gameId: "JL_152" },
    { imageSrc: "/assets/jili/JL_114.png", gameId: "JL_114" },
    { imageSrc: "/assets/jili/JL_226.png", gameId: "JL_226" },
    { imageSrc: "/assets/jili/JL_259.png", gameId: "JL_259" },
    { imageSrc: "/assets/jili/JL_195.png", gameId: "JL_195" },
    { imageSrc: "/assets/jili/JL_214.png", gameId: "JL_214" },
    { imageSrc: "/assets/jili/JL_44.png", gameId: "JL_44" },
    { imageSrc: "/assets/jili/JL_37.png", gameId: "JL_37" },
    { imageSrc: "/assets/jili/JL_26.png", gameId: "JL_26" },
    { imageSrc: "/assets/jili/JL_14.png", gameId: "JL_14" },
    { imageSrc: "/assets/jili/JL_13.png", gameId: "JL_13" },
    { imageSrc: "/assets/jili/JL_10.png", gameId: "JL_10" },
    { imageSrc: "/assets/jili/JL_261.png", gameId: "JL_261" },
    { imageSrc: "/assets/jili/JL_289.png", gameId: "JL_289" },
    { imageSrc: "/assets/jili/JL_197.png", gameId: "JL_197" },
    { imageSrc: "/assets/jili/JL_217.png", gameId: "JL_217" },
    { imageSrc: "/assets/jili/JL_204.png", gameId: "JL_204" },
    { imageSrc: "/assets/jili/JL_216.png", gameId: "JL_216" },
    { imageSrc: "/assets/jili/JL_182.png", gameId: "JL_182" },
    { imageSrc: "/assets/jili/JL_177.png", gameId: "JL_177" },
    { imageSrc: "/assets/jili/JL_173.png", gameId: "JL_173" },
    { imageSrc: "/assets/jili/JL_200.png", gameId: "JL_200" },
    { imageSrc: "/assets/jili/JL_149.png", gameId: "JL_149" },
    { imageSrc: "/assets/jili/JL_178.png", gameId: "JL_178" },
    { imageSrc: "/assets/jili/JL_174.png", gameId: "JL_174" },
    { imageSrc: "/assets/jili/JL_150.png", gameId: "JL_150" },
    { imageSrc: "/assets/jili/JL_148.png", gameId: "JL_148" },
    { imageSrc: "/assets/jili/JL_151.png", gameId: "JL_151" },
    { imageSrc: "/assets/jili/JL_125.png", gameId: "JL_125" },
    { imageSrc: "/assets/jili/JL_139.png", gameId: "JL_139" },
    { imageSrc: "/assets/jili/JL_124.png", gameId: "JL_124" },
    { imageSrc: "/assets/jili/JL_122.png", gameId: "JL_122" },
    { imageSrc: "/assets/jili/JL_123.png", gameId: "JL_123" },
    { imageSrc: "/assets/jili/JL_113.png", gameId: "JL_113" },
    { imageSrc: "/assets/jili/JL_112.png", gameId: "JL_112" },
    { imageSrc: "/assets/jili/JL_111.png", gameId: "JL_111" },
    { imageSrc: "/assets/jili/JL_171.png", gameId: "JL_171" },
    { imageSrc: "/assets/jili/JL_239.png", gameId: "JL_239" },
    { imageSrc: "/assets/jili/JL_132.png", gameId: "JL_132" },
    { imageSrc: "/assets/jili/JL_220.png", gameId: "JL_220" },
    { imageSrc: "/assets/jili/JL_219.png", gameId: "JL_219" },
    { imageSrc: "/assets/jili/JL_163.png", gameId: "JL_163" },
    { imageSrc: "/assets/jili/JL_161.png", gameId: "JL_161" },
    { imageSrc: "/assets/jili/JL_160.png", gameId: "JL_160" },
    { imageSrc: "/assets/jili/JL_159.png", gameId: "JL_159" },
    { imageSrc: "/assets/jili/JL_127.png", gameId: "JL_127" },
    { imageSrc: "/assets/jili/JL_79.png", gameId: "JL_79" },
    { imageSrc: "/assets/jili/JL_75.png", gameId: "JL_75" },
    { imageSrc: "/assets/jili/JL_72.png", gameId: "JL_72" },
    { imageSrc: "/assets/jili/JL_303.png", gameId: "JL_303" },
    { imageSrc: "/assets/jili/JL_209.png", gameId: "JL_209" },
    { imageSrc: "/assets/jili/JL_238.png", gameId: "JL_238" },
    { imageSrc: "/assets/jili/JL_67.png", gameId: "JL_67" },
    { imageSrc: "/assets/jili/JL_65.png", gameId: "JL_65" },
    { imageSrc: "/assets/jili/JL_193.png", gameId: "JL_193" },
    { imageSrc: "/assets/jili/JL_191.png", gameId: "JL_191" },
    { imageSrc: "/assets/jili/JL_230.png", gameId: "JL_230" },
    { imageSrc: "/assets/jili/JL_172.png", gameId: "JL_172" },
    { imageSrc: "/assets/jili/JL_225.png", gameId: "JL_225" },
    { imageSrc: "/assets/jili/JL_242.png", gameId: "JL_242" },
    { imageSrc: "/assets/jili/JL_241.png", gameId: "JL_241" },
    { imageSrc: "/assets/jili/JL_254.png", gameId: "JL_254" },
    { imageSrc: "/assets/jili/JL_236.png", gameId: "JL_236" },
    { imageSrc: "/assets/jili/JL_235.png", gameId: "JL_235" },
    { imageSrc: "/assets/jili/JL_233.png", gameId: "JL_233" },
    { imageSrc: "/assets/jili/JL_232.png", gameId: "JL_232" },
    { imageSrc: "/assets/jili/JL_229.png", gameId: "JL_229" },
    { imageSrc: "/assets/jili/JL_224.png", gameId: "JL_224" },
    { imageSrc: "/assets/jili/JL_198.png", gameId: "JL_198" },
    { imageSrc: "/assets/jili/JL_223.png", gameId: "JL_223" },
    { imageSrc: "/assets/jili/JL_212.png", gameId: "JL_212" },
    { imageSrc: "/assets/jili/JL_119.png", gameId: "JL_119" },
    { imageSrc: "/assets/jili/JL_82.png", gameId: "JL_82" },
    { imageSrc: "/assets/jili/JL_71.png", gameId: "JL_71" },
    { imageSrc: "/assets/jili/JL_74.png", gameId: "JL_74" },
    { imageSrc: "/assets/jili/JL_60.png", gameId: "JL_60" },
    { imageSrc: "/assets/jili/JL_32.png", gameId: "JL_32" },
    { imageSrc: "/assets/jili/JL_42.png", gameId: "JL_42" },
    { imageSrc: "/assets/jili/JL_20.png", gameId: "JL_20" },
    { imageSrc: "/assets/jili/JL_1.png", gameId: "JL_1" },
    { imageSrc: "/assets/jili/JL_181.png", gameId: "JL_181" },
    { imageSrc: "/assets/jili/JL_176.png", gameId: "JL_176" },
    { imageSrc: "/assets/jili/JL_183.png", gameId: "JL_183" },
    { imageSrc: "/assets/jili/JL_166.png", gameId: "JL_166" },
    { imageSrc: "/assets/jili/JL_164.png", gameId: "JL_164" },
    { imageSrc: "/assets/jili/JL_153.png", gameId: "JL_153" },
    { imageSrc: "/assets/jili/JL_146.png", gameId: "JL_146" },
    { imageSrc: "/assets/jili/JL_145.png", gameId: "JL_145" },
    { imageSrc: "/assets/jili/JL_144.png", gameId: "JL_144" },
    { imageSrc: "/assets/jili/JL_142.png", gameId: "JL_142" },
    { imageSrc: "/assets/jili/JL_137.png", gameId: "JL_137" },
    { imageSrc: "/assets/jili/JL_136.png", gameId: "JL_136" },
    { imageSrc: "/assets/jili/JL_135.png", gameId: "JL_135" },
    { imageSrc: "/assets/jili/JL_134.png", gameId: "JL_134" },
    { imageSrc: "/assets/jili/JL_130.png", gameId: "JL_130" },
    { imageSrc: "/assets/jili/JL_126.png", gameId: "JL_126" },
    { imageSrc: "/assets/jili/JL_116.png", gameId: "JL_116" },
    { imageSrc: "/assets/jili/JL_115.png", gameId: "JL_115" },
    { imageSrc: "/assets/jili/JL_110.png", gameId: "JL_110" },
    { imageSrc: "/assets/jili/JL_109.png", gameId: "JL_109" },
    { imageSrc: "/assets/jili/JL_108.png", gameId: "JL_108" },
    { imageSrc: "/assets/jili/JL_106.png", gameId: "JL_106" },
    { imageSrc: "/assets/jili/JL_103.png", gameId: "JL_103" },
    { imageSrc: "/assets/jili/JL_102.png", gameId: "JL_102" },
    { imageSrc: "/assets/jili/JL_101.png", gameId: "JL_101" },
    { imageSrc: "/assets/jili/JL_100.png", gameId: "JL_100" },
    { imageSrc: "/assets/jili/JL_92.png", gameId: "JL_92" },
    { imageSrc: "/assets/jili/JL_91.png", gameId: "JL_91" },
    { imageSrc: "/assets/jili/JL_87.png", gameId: "JL_87" },
    { imageSrc: "/assets/jili/JL_85.png", gameId: "JL_85" },
    { imageSrc: "/assets/jili/JL_78.png", gameId: "JL_78" },
    { imageSrc: "/assets/jili/JL_77.png", gameId: "JL_77" },
    { imageSrc: "/assets/jili/JL_76.png", gameId: "JL_76" },
    { imageSrc: "/assets/jili/JL_58.png", gameId: "JL_58" },
    { imageSrc: "/assets/jili/JL_51.png", gameId: "JL_51" },
    { imageSrc: "/assets/jili/JL_49.png", gameId: "JL_49" },
    { imageSrc: "/assets/jili/JL_48.png", gameId: "JL_48" },
    { imageSrc: "/assets/jili/JL_47.png", gameId: "JL_47" },
    { imageSrc: "/assets/jili/JL_46.png", gameId: "JL_46" },
    { imageSrc: "/assets/jili/JL_45.png", gameId: "JL_45" },
    { imageSrc: "/assets/jili/JL_517.png", gameId: "JL_517" },
    { imageSrc: "/assets/jili/JL_473.png", gameId: "JL_473" },
    { imageSrc: "/assets/jili/JL_485.png", gameId: "JL_485" },
    { imageSrc: "/assets/jili/JL_392.png", gameId: "JL_392" },
    { imageSrc: "/assets/jili/JL_307.png", gameId: "JL_307" },
    { imageSrc: "/assets/jili/JL_377.png", gameId: "JL_377" },
    { imageSrc: "/assets/jili/JL_441.png", gameId: "JL_441" },
    { imageSrc: "/assets/jili/JL_442.png", gameId: "JL_442" },
    { imageSrc: "/assets/jili/JL_422.png", gameId: "JL_422" },
    { imageSrc: "/assets/jili/JL_378.png", gameId: "JL_378" },
    { imageSrc: "/assets/jili/JL_404.png", gameId: "JL_404" },
    { imageSrc: "/assets/jili/JL_374.png", gameId: "JL_374" },
    { imageSrc: "/assets/jili/JL_436.png", gameId: "JL_436" },
    { imageSrc: "/assets/jili/JL_421.png", gameId: "JL_421" },
    { imageSrc: "/assets/jili/JL_376.png", gameId: "JL_376" },
    { imageSrc: "/assets/jili/JL_462.png", gameId: "JL_462" },
    { imageSrc: "/assets/jili/JL_324.png", gameId: "JL_324" },
    { imageSrc: "/assets/jili/JL_379.png", gameId: "JL_379" },
    { imageSrc: "/assets/jili/JL_372.png", gameId: "JL_372" },
    { imageSrc: "/assets/jili/JL_272.png", gameId: "JL_272" },
    { imageSrc: "/assets/jili/JL_464.png", gameId: "JL_464" },
    { imageSrc: "/assets/jili/JL_305.png", gameId: "JL_305" },
    { imageSrc: "/assets/jili/JL_427.png", gameId: "JL_427" },
    { imageSrc: "/assets/jili/JL_375.png", gameId: "JL_375" },
    { imageSrc: "/assets/jili/JL_400.png", gameId: "JL_400" },
    { imageSrc: "/assets/jili/JL_469.png", gameId: "JL_469" },
    { imageSrc: "/assets/jili/JL_440.png", gameId: "JL_440" },
    { imageSrc: "/assets/jili/JL_397.png", gameId: "JL_397" },
    { imageSrc: "/assets/jili/JL_439.png", gameId: "JL_439" },
    { imageSrc: "/assets/jili/JL_264.png", gameId: "JL_264" },
    { imageSrc: "/assets/jili/JL_240.png", gameId: "JL_240" },
    { imageSrc: "/assets/jili/JL_389.png", gameId: "JL_389" },
    { imageSrc: "/assets/jili/JL_302.png", gameId: "JL_302" },
    { imageSrc: "/assets/jili/JL_403.png", gameId: "JL_403" },
    { imageSrc: "/assets/jili/JL_180.png", gameId: "JL_180" },
    { imageSrc: "/assets/jili/JL_407.png", gameId: "JL_407" },
    { imageSrc: "/assets/jili/JL_263.png", gameId: "JL_263" },
    { imageSrc: "/assets/jili/JL_262.png", gameId: "JL_262" },
    { imageSrc: "/assets/jili/JL_420.png", gameId: "JL_420" },
    { imageSrc: "/assets/jili/JL_299.png", gameId: "JL_299" },
    { imageSrc: "/assets/jili/JL_399.png", gameId: "JL_399" },
    { imageSrc: "/assets/jili/JL_300.png", gameId: "JL_300" },
    { imageSrc: "/assets/jili/JL_301.png", gameId: "JL_301" },
    { imageSrc: "/assets/jili/JL_252.png", gameId: "JL_252" },
    { imageSrc: "/assets/jili/JL_258.png", gameId: "JL_258" },
    { imageSrc: "/assets/jili/JL_253.png", gameId: "JL_253" },
    { imageSrc: "/assets/jili/JL_297.png", gameId: "JL_297" },
    { imageSrc: "/assets/jili/JL_208.png", gameId: "JL_208" },
    { imageSrc: "/assets/jili/JL_228.png", gameId: "JL_228" },
    { imageSrc: "/assets/jili/JL_152.png", gameId: "JL_152" },
    { imageSrc: "/assets/jili/JL_114.png", gameId: "JL_114" },
    { imageSrc: "/assets/jili/JL_226.png", gameId: "JL_226" },
    { imageSrc: "/assets/jili/JL_259.png", gameId: "JL_259" },
    { imageSrc: "/assets/jili/JL_195.png", gameId: "JL_195" },
    { imageSrc: "/assets/jili/JL_214.png", gameId: "JL_214" },
    { imageSrc: "/assets/jili/JL_44.png", gameId: "JL_44" },
    { imageSrc: "/assets/jili/JL_37.png", gameId: "JL_37" },
    { imageSrc: "/assets/jili/JL_26.png", gameId: "JL_26" },
    { imageSrc: "/assets/jili/JL_14.png", gameId: "JL_14" },
    { imageSrc: "/assets/jili/JL_13.png", gameId: "JL_13" },
    { imageSrc: "/assets/jili/JL_10.png", gameId: "JL_10" },
    { imageSrc: "/assets/jili/JL_261.png", gameId: "JL_261" },
    { imageSrc: "/assets/jili/JL_289.png", gameId: "JL_289" },
    { imageSrc: "/assets/jili/JL_197.png", gameId: "JL_197" },
    { imageSrc: "/assets/jili/JL_217.png", gameId: "JL_217" },
    { imageSrc: "/assets/jili/JL_204.png", gameId: "JL_204" },
    { imageSrc: "/assets/jili/JL_216.png", gameId: "JL_216" },
    { imageSrc: "/assets/jili/JL_182.png", gameId: "JL_182" },
    { imageSrc: "/assets/jili/JL_177.png", gameId: "JL_177" },
    { imageSrc: "/assets/jili/JL_173.png", gameId: "JL_173" },
    { imageSrc: "/assets/jili/JL_200.png", gameId: "JL_200" },
    { imageSrc: "/assets/jili/JL_149.png", gameId: "JL_149" },
    { imageSrc: "/assets/jili/JL_178.png", gameId: "JL_178" },
    { imageSrc: "/assets/jili/JL_174.png", gameId: "JL_174" },
    { imageSrc: "/assets/jili/JL_150.png", gameId: "JL_150" },
    { imageSrc: "/assets/jili/JL_148.png", gameId: "JL_148" },
    { imageSrc: "/assets/jili/JL_151.png", gameId: "JL_151" },
    { imageSrc: "/assets/jili/JL_125.png", gameId: "JL_125" },
    { imageSrc: "/assets/jili/JL_139.png", gameId: "JL_139" },
    { imageSrc: "/assets/jili/JL_124.png", gameId: "JL_124" },
    { imageSrc: "/assets/jili/JL_122.png", gameId: "JL_122" },
    { imageSrc: "/assets/jili/JL_123.png", gameId: "JL_123" },
    { imageSrc: "/assets/jili/JL_113.png", gameId: "JL_113" },
    { imageSrc: "/assets/jili/JL_112.png", gameId: "JL_112" },
    { imageSrc: "/assets/jili/JL_111.png", gameId: "JL_111" },
    { imageSrc: "/assets/jili/JL_171.png", gameId: "JL_171" },
    { imageSrc: "/assets/jili/JL_239.png", gameId: "JL_239" },
    { imageSrc: "/assets/jili/JL_132.png", gameId: "JL_132" },
    { imageSrc: "/assets/jili/JL_220.png", gameId: "JL_220" },
    { imageSrc: "/assets/jili/JL_219.png", gameId: "JL_219" },
    { imageSrc: "/assets/jili/JL_163.png", gameId: "JL_163" },
    { imageSrc: "/assets/jili/JL_161.png", gameId: "JL_161" },
    { imageSrc: "/assets/jili/JL_160.png", gameId: "JL_160" },
    { imageSrc: "/assets/jili/JL_159.png", gameId: "JL_159" },
    { imageSrc: "/assets/jili/JL_127.png", gameId: "JL_127" },
    { imageSrc: "/assets/jili/JL_79.png", gameId: "JL_79" },
    { imageSrc: "/assets/jili/JL_75.png", gameId: "JL_75" },
    { imageSrc: "/assets/jili/JL_72.png", gameId: "JL_72" },
    { imageSrc: "/assets/jili/JL_303.png", gameId: "JL_303" },
    { imageSrc: "/assets/jili/JL_209.png", gameId: "JL_209" },
    { imageSrc: "/assets/jili/JL_238.png", gameId: "JL_238" },
    { imageSrc: "/assets/jili/JL_67.png", gameId: "JL_67" },
    { imageSrc: "/assets/jili/JL_65.png", gameId: "JL_65" },
    { imageSrc: "/assets/jili/JL_193.png", gameId: "JL_193" },
    { imageSrc: "/assets/jili/JL_191.png", gameId: "JL_191" },
    { imageSrc: "/assets/jili/JL_230.png", gameId: "JL_230" },
    { imageSrc: "/assets/jili/JL_172.png", gameId: "JL_172" },
    { imageSrc: "/assets/jili/JL_225.png", gameId: "JL_225" },
    { imageSrc: "/assets/jili/JL_242.png", gameId: "JL_242" },
    { imageSrc: "/assets/jili/JL_241.png", gameId: "JL_241" },
    { imageSrc: "/assets/jili/JL_254.png", gameId: "JL_254" },
    { imageSrc: "/assets/jili/JL_236.png", gameId: "JL_236" },
    { imageSrc: "/assets/jili/JL_235.png", gameId: "JL_235" },
    { imageSrc: "/assets/jili/JL_233.png", gameId: "JL_233" },
    { imageSrc: "/assets/jili/JL_232.png", gameId: "JL_232" },
    { imageSrc: "/assets/jili/JL_229.png", gameId: "JL_229" },
    { imageSrc: "/assets/jili/JL_224.png", gameId: "JL_224" },
    { imageSrc: "/assets/jili/JL_198.png", gameId: "JL_198" },
    { imageSrc: "/assets/jili/JL_223.png", gameId: "JL_223" },
    { imageSrc: "/assets/jili/JL_212.png", gameId: "JL_212" },
    { imageSrc: "/assets/jili/JL_119.png", gameId: "JL_119" },
    { imageSrc: "/assets/jili/JL_82.png", gameId: "JL_82" },
    { imageSrc: "/assets/jili/JL_71.png", gameId: "JL_71" },
    { imageSrc: "/assets/jili/JL_74.png", gameId: "JL_74" },
    { imageSrc: "/assets/jili/JL_60.png", gameId: "JL_60" },
    { imageSrc: "/assets/jili/JL_32.png", gameId: "JL_32" },
    { imageSrc: "/assets/jili/JL_42.png", gameId: "JL_42" },
    { imageSrc: "/assets/jili/JL_20.png", gameId: "JL_20" },
    { imageSrc: "/assets/jili/JL_1.png", gameId: "JL_1" },
    { imageSrc: "/assets/jili/JL_181.png", gameId: "JL_181" },
    { imageSrc: "/assets/jili/JL_176.png", gameId: "JL_176" },
    { imageSrc: "/assets/jili/JL_183.png", gameId: "JL_183" },
    { imageSrc: "/assets/jili/JL_166.png", gameId: "JL_166" },
    { imageSrc: "/assets/jili/JL_164.png", gameId: "JL_164" },
    { imageSrc: "/assets/jili/JL_153.png", gameId: "JL_153" },
    { imageSrc: "/assets/jili/JL_146.png", gameId: "JL_146" },
    { imageSrc: "/assets/jili/JL_145.png", gameId: "JL_145" },
    { imageSrc: "/assets/jili/JL_144.png", gameId: "JL_144" },
    { imageSrc: "/assets/jili/JL_142.png", gameId: "JL_142" },
    { imageSrc: "/assets/jili/JL_137.png", gameId: "JL_137" },
    { imageSrc: "/assets/jili/JL_136.png", gameId: "JL_136" },
    { imageSrc: "/assets/jili/JL_135.png", gameId: "JL_135" },
    { imageSrc: "/assets/jili/JL_134.png", gameId: "JL_134" },
    { imageSrc: "/assets/jili/JL_130.png", gameId: "JL_130" },
    { imageSrc: "/assets/jili/JL_126.png", gameId: "JL_126" },
    { imageSrc: "/assets/jili/JL_116.png", gameId: "JL_116" },
    { imageSrc: "/assets/jili/JL_115.png", gameId: "JL_115" },
    { imageSrc: "/assets/jili/JL_110.png", gameId: "JL_110" },
    { imageSrc: "/assets/jili/JL_109.png", gameId: "JL_109" },
    { imageSrc: "/assets/jili/JL_108.png", gameId: "JL_108" },
    { imageSrc: "/assets/jili/JL_106.png", gameId: "JL_106" },
    { imageSrc: "/assets/jili/JL_103.png", gameId: "JL_103" },
    { imageSrc: "/assets/jili/JL_102.png", gameId: "JL_102" },
    { imageSrc: "/assets/jili/JL_101.png", gameId: "JL_101" },
    { imageSrc: "/assets/jili/JL_100.png", gameId: "JL_100" },
    { imageSrc: "/assets/jili/JL_92.png", gameId: "JL_92" },
    { imageSrc: "/assets/jili/JL_91.png", gameId: "JL_91" },
    { imageSrc: "/assets/jili/JL_87.png", gameId: "JL_87" },
    { imageSrc: "/assets/jili/JL_85.png", gameId: "JL_85" },
    { imageSrc: "/assets/jili/JL_78.png", gameId: "JL_78" },
    { imageSrc: "/assets/jili/JL_77.png", gameId: "JL_77" },
    { imageSrc: "/assets/jili/JL_76.png", gameId: "JL_76" },
    { imageSrc: "/assets/jili/JL_58.png", gameId: "JL_58" },
    { imageSrc: "/assets/jili/JL_51.png", gameId: "JL_51" },
    { imageSrc: "/assets/jili/JL_49.png", gameId: "JL_49" },
    { imageSrc: "/assets/jili/JL_48.png", gameId: "JL_48" },
    { imageSrc: "/assets/jili/JL_47.png", gameId: "JL_47" },
    { imageSrc: "/assets/jili/JL_46.png", gameId: "JL_46" },
    { imageSrc: "/assets/jili/JL_45.png", gameId: "JL_45" },
  ]



  const slotGames= [
    { imageSrc: "/assets/jdb/JDB_0_14095.png", gameId: "JDB_0_14095" },
    { imageSrc: "/assets/jdb/JDB_0_14093.png", gameId: "JDB_0_14093" },
    { imageSrc: "/assets/jdb/JDB_0_14094.png", gameId: "JDB_0_14094" },
    { imageSrc: "/assets/jdb/JDB_0_14092.png", gameId: "JDB_0_14092" },
    { imageSrc: "/assets/jdb/JDB_0_14088.png", gameId: "JDB_0_14088" },
    { imageSrc: "/assets/jdb/JDB_0_14091.png", gameId: "JDB_0_14091" },
    { imageSrc: "/assets/jdb/JDB_7_7008.png", gameId: "JDB_7_7008" },
    { imageSrc: "/assets/jdb/JDB_9_9019.png", gameId: "JDB_9_9019" },
    { imageSrc: "/assets/jdb/JDB_0_14090.png", gameId: "JDB_0_14090" },
    { imageSrc: "/assets/jdb/JDB_9_9018.png", gameId: "JDB_9_9018" },
    { imageSrc: "/assets/jdb/JDB_7_7009.png", gameId: "JDB_7_7009" },
    { imageSrc: "/assets/jdb/JDB_0_14089.png", gameId: "JDB_0_14089" },
    { imageSrc: "/assets/jdb/JDB_0_14087.png", gameId: "JDB_0_14087" },
    { imageSrc: "/assets/jdb/JDB_0_14086.png", gameId: "JDB_0_14086" },
    { imageSrc: "/assets/jdb/JDB_7_7007.png", gameId: "JDB_7_7007" },
    { imageSrc: "/assets/jdb/JDB_7_7006.png", gameId: "JDB_7_7006" },
    { imageSrc: "/assets/jdb/JDB_7_7005.png", gameId: "JDB_7_7005" },
    { imageSrc: "/assets/jdb/JDB_7_7004.png", gameId: "JDB_7_7004" },
    { imageSrc: "/assets/jdb/JDB_7_7003.png", gameId: "JDB_7_7003" },
    { imageSrc: "/assets/jdb/JDB_7_7002.png", gameId: "JDB_7_7002" },
    { imageSrc: "/assets/jdb/JDB_7_7001.png", gameId: "JDB_7_7001" },
    { imageSrc: "/assets/jdb/JDB_9_9012.png", gameId: "JDB_9_9012" },
    { imageSrc: "/assets/jdb/JDB_0_14085.png", gameId: "JDB_0_14085" },
    { imageSrc: "/assets/jdb/JDB_9_9011.png", gameId: "JDB_9_9011" },
    { imageSrc: "/assets/jdb/JDB_9_9010.png", gameId: "JDB_9_9010" },
    { imageSrc: "/assets/jdb/JDB_9_9009.png", gameId: "JDB_9_9009" },
    { imageSrc: "/assets/jdb/JDB_9_9008.png", gameId: "JDB_9_9008" },
    { imageSrc: "/assets/jdb/JDB_9_9007.png", gameId: "JDB_9_9007" },
    { imageSrc: "/assets/jdb/JDB_9_9006.png", gameId: "JDB_9_9006" },
    { imageSrc: "/assets/jdb/JDB_9_9004.png", gameId: "JDB_9_9004" },
    { imageSrc: "/assets/jdb/JDB_9_9003.png", gameId: "JDB_9_9003" },
    { imageSrc: "/assets/jdb/JDB_9_9002.png", gameId: "JDB_9_9002" },
    { imageSrc: "/assets/jdb/JDB_9_9001.png", gameId: "JDB_9_9001" },
    { imageSrc: "/assets/jdb/JDB_0_14084.png", gameId: "JDB_0_14084" },
    { imageSrc: "/assets/jdb/JDB_0_14083.png", gameId: "JDB_0_14083" },
    { imageSrc: "/assets/jdb/JDB_0_14082.png", gameId: "JDB_0_14082" },
    { imageSrc: "/assets/jdb/JDB_0_14080.png", gameId: "JDB_0_14080" },
    { imageSrc: "/assets/jdb/JDB_0_14081.png", gameId: "JDB_0_14081" },
    { imageSrc: "/assets/jdb/JDB_0_14079.png", gameId: "JDB_0_14079" },
    { imageSrc: "/assets/jdb/JDB_0_14077.png", gameId: "JDB_0_14077" },
    { imageSrc: "/assets/jdb/JDB_0_14075.png", gameId: "JDB_0_14075" },
    { imageSrc: "/assets/jdb/JDB_0_14070.png", gameId: "JDB_0_14070" },
    { imageSrc: "/assets/jdb/JDB_0_14068.png", gameId: "JDB_0_14068" },
    { imageSrc: "/assets/jdb/JDB_0_14067.png", gameId: "JDB_0_14067" },
    { imageSrc: "/assets/jdb/JDB_0_14065.png", gameId: "JDB_0_14065" },
    { imageSrc: "/assets/jdb/JDB_0_14064.png", gameId: "JDB_0_14064" },
    { imageSrc: "/assets/jdb/JDB_0_14063.png", gameId: "JDB_0_14063" },
    { imageSrc: "/assets/jdb/JDB_0_14061.png", gameId: "JDB_0_14061" },
    { imageSrc: "/assets/jdb/JDB_0_14060.png", gameId: "JDB_0_14060" },
    { imageSrc: "/assets/jdb/JDB_0_14059.png", gameId: "JDB_0_14059" },
    { imageSrc: "/assets/jdb/JDB_0_14058.png", gameId: "JDB_0_14058" },
    { imageSrc: "/assets/jdb/JDB_0_14055.png", gameId: "JDB_0_14055" },
    { imageSrc: "/assets/jdb/JDB_0_14054.png", gameId: "JDB_0_14054" },
    { imageSrc: "/assets/jdb/JDB_0_14053.png", gameId: "JDB_0_14053" },
    { imageSrc: "/assets/jdb/JDB_0_14052.png", gameId: "JDB_0_14052" },
    { imageSrc: "/assets/jdb/JDB_0_14051.png", gameId: "JDB_0_14051" },
    { imageSrc: "/assets/jdb/JDB_0_14050.png", gameId: "JDB_0_14050" },
    { imageSrc: "/assets/jdb/JDB_0_14048.png", gameId: "JDB_0_14048" },
    { imageSrc: "/assets/jdb/JDB_0_14047.png", gameId: "JDB_0_14047" },
    { imageSrc: "/assets/jdb/JDB_0_14046.png", gameId: "JDB_0_14046" },
    { imageSrc: "/assets/jdb/JDB_0_14045.png", gameId: "JDB_0_14045" },
    { imageSrc: "/assets/jdb/JDB_0_14044.png", gameId: "JDB_0_14044" },
    { imageSrc: "/assets/jdb/JDB_0_14043.png", gameId: "JDB_0_14043" },
    { imageSrc: "/assets/jdb/JDB_0_14042.png", gameId: "JDB_0_14042" },
    { imageSrc: "/assets/jdb/JDB_0_14041.png", gameId: "JDB_0_14041" },
    { imageSrc: "/assets/jdb/JDB_0_14040.png", gameId: "JDB_0_14040" },
    { imageSrc: "/assets/jdb/JDB_0_14039.png", gameId: "JDB_0_14039" },
    { imageSrc: "/assets/jdb/JDB_0_14038.png", gameId: "JDB_0_14038" },
    { imageSrc: "/assets/jdb/JDB_0_14036.png", gameId: "JDB_0_14036" },
    { imageSrc: "/assets/jdb/JDB_0_14035.png", gameId: "JDB_0_14035" },
    { imageSrc: "/assets/jdb/JDB_0_14034.png", gameId: "JDB_0_14034" },
    { imageSrc: "/assets/jdb/JDB_0_14033.png", gameId: "JDB_0_14033" },
    { imageSrc: "/assets/jdb/JDB_0_14030.png", gameId: "JDB_0_14030" },
    { imageSrc: "/assets/jdb/JDB_0_14029.png", gameId: "JDB_0_14029" },
    { imageSrc: "/assets/jdb/JDB_0_14027.png", gameId: "JDB_0_14027" },
    { imageSrc: "/assets/jdb/JDB_0_14025.png", gameId: "JDB_0_14025" },
    { imageSrc: "/assets/jdb/JDB_0_14022.png", gameId: "JDB_0_14022" },
    { imageSrc: "/assets/jdb/JDB_0_14021.png", gameId: "JDB_0_14021" },
    { imageSrc: "/assets/jdb/JDB_0_14018.png", gameId: "JDB_0_14018" },
    { imageSrc: "/assets/jdb/JDB_0_14016.png", gameId: "JDB_0_14016" },
    { imageSrc: "/assets/jdb/JDB_0_14012.png", gameId: "JDB_0_14012" },
    { imageSrc: "/assets/jdb/JDB_0_14010.png", gameId: "JDB_0_14010" },
    { imageSrc: "/assets/jdb/JDB_0_14008.png", gameId: "JDB_0_14008" },
    { imageSrc: "/assets/jdb/JDB_0_14007.png", gameId: "JDB_0_14007" },
    { imageSrc: "/assets/jdb/JDB_0_14006.png", gameId: "JDB_0_14006" },
    { imageSrc: "/assets/jdb/JDB_0_14005.png", gameId: "JDB_0_14005" },
    { imageSrc: "/assets/jdb/JDB_0_14003.png", gameId: "JDB_0_14003" },
    { imageSrc: "/assets/jdb/JDB_0_15012.png", gameId: "JDB_0_15012" },
    { imageSrc: "/assets/jdb/JDB_0_15010.png", gameId: "JDB_0_15010" },
    { imageSrc: "/assets/jdb/JDB_0_15005.png", gameId: "JDB_0_15005" },
    { imageSrc: "/assets/jdb/JDB_0_15002.png", gameId: "JDB_0_15002" },
    { imageSrc: "/assets/jdb/JDB_0_15001.png", gameId: "JDB_0_15001" },
    { imageSrc: "/assets/jdb/JDB_0_8051.png", gameId: "JDB_0_8051" },
    { imageSrc: "/assets/jdb/JDB_0_8050.png", gameId: "JDB_0_8050" },
    { imageSrc: "/assets/jdb/JDB_0_8049.png", gameId: "JDB_0_8049" },
    { imageSrc: "/assets/jdb/JDB_0_8048.png", gameId: "JDB_0_8048" },
    { imageSrc: "/assets/jdb/JDB_0_8047.png", gameId: "JDB_0_8047" },
    { imageSrc: "/assets/jdb/JDB_0_8046.png", gameId: "JDB_0_8046" },
    { imageSrc: "/assets/jdb/JDB_0_8044.png", gameId: "JDB_0_8044" },
    { imageSrc: "/assets/jdb/JDB_0_8035.png", gameId: "JDB_0_8035" },
    { imageSrc: "/assets/jdb/JDB_0_8028.png", gameId: "JDB_0_8028" },
    { imageSrc: "/assets/jdb/JDB_0_8023.png", gameId: "JDB_0_8023" },
    { imageSrc: "/assets/jdb/JDB_0_8022.png", gameId: "JDB_0_8022" },
    { imageSrc: "/assets/jdb/JDB_0_8021.png", gameId: "JDB_0_8021" },
    { imageSrc: "/assets/jdb/JDB_0_8020.png", gameId: "JDB_0_8020" },
    { imageSrc: "/assets/jdb/JDB_0_8019.png", gameId: "JDB_0_8019" },
    { imageSrc: "/assets/jdb/JDB_0_8018.png", gameId: "JDB_0_8018" },
    { imageSrc: "/assets/jdb/JDB_0_8017.png", gameId: "JDB_0_8017" },
    { imageSrc: "/assets/jdb/JDB_0_8014.png", gameId: "JDB_0_8014" },
    { imageSrc: "/assets/jdb/JDB_0_8007.png", gameId: "JDB_0_8007" },
    { imageSrc: "/assets/jdb/JDB_0_8005.png", gameId: "JDB_0_8005" },
    { imageSrc: "/assets/jdb/JDB_0_8004.png", gameId: "JDB_0_8004" },
    { imageSrc: "/assets/jdb/JDB_0_8003.png", gameId: "JDB_0_8003" },
    { imageSrc: "/assets/jdb/JDB_0_8002.png", gameId: "JDB_0_8002" },
    { imageSrc: "/assets/jdb/JDB_0_8001.png", gameId: "JDB_0_8001" },
  ];

  const popularGames = [
    
      { imageSrc: "/assets/cq9/CQ9_CMCOCKFIGHT02.png", gameId: "CQ9_CMCOCKFIGHT02" },
      { imageSrc: "/assets/cq9/CQ9_246.png", gameId: "CQ9_246" },
      { imageSrc: "/assets/cq9/CQ9_CMCOCKFIGHT01.png", gameId: "CQ9_CMCOCKFIGHT01" },
      { imageSrc: "/assets/cq9/CQ9_AR120.png", gameId: "CQ9_AR120" },
      { imageSrc: "/assets/cq9/CQ9_AR33.png", gameId: "CQ9_AR33" },
      { imageSrc: "/assets/cq9/CQ9_BU32.png", gameId: "CQ9_BU32" },
      { imageSrc: "/assets/cq9/CQ9_GB16.png", gameId: "CQ9_GB16" },
      { imageSrc: "/assets/cq9/CQ9_243.png", gameId: "CQ9_243" },
      { imageSrc: "/assets/cq9/CQ9_242.png", gameId: "CQ9_242" },
      { imageSrc: "/assets/cq9/CQ9_BU31.png", gameId: "CQ9_BU31" },
      { imageSrc: "/assets/cq9/CQ9_AR80.png", gameId: "CQ9_AR80" },
      { imageSrc: "/assets/cq9/CQ9_BU24.png", gameId: "CQ9_BU24" },
      { imageSrc: "/assets/cq9/CQ9_BU15.png", gameId: "CQ9_BU15" },
      { imageSrc: "/assets/cq9/CQ9_BU09.png", gameId: "CQ9_BU09" },
      { imageSrc: "/assets/cq9/CQ9_BU10.png", gameId: "CQ9_BU10" },
      { imageSrc: "/assets/cq9/CQ9_BU25.png", gameId: "CQ9_BU25" },
      { imageSrc: "/assets/cq9/CQ9_BU20.png", gameId: "CQ9_BU20" },
      { imageSrc: "/assets/cq9/CQ9_BU13.png", gameId: "CQ9_BU13" },
      { imageSrc: "/assets/cq9/CQ9_BU12.png", gameId: "CQ9_BU12" },
      { imageSrc: "/assets/cq9/CQ9_BU28.png", gameId: "CQ9_BU28" },
      { imageSrc: "/assets/cq9/CQ9_BU08.png", gameId: "CQ9_BU08" },
      { imageSrc: "/assets/cq9/CQ9_BU21.png", gameId: "CQ9_BU21" },
      { imageSrc: "/assets/cq9/CQ9_BU22.png", gameId: "CQ9_BU22" },
      { imageSrc: "/assets/cq9/CQ9_BU11.png", gameId: "CQ9_BU11" },
      { imageSrc: "/assets/cq9/CQ9_BU19.png", gameId: "CQ9_BU19" },
      { imageSrc: "/assets/cq9/CQ9_BU27.png", gameId: "CQ9_BU27" },
      { imageSrc: "/assets/cq9/CQ9_BU18.png", gameId: "CQ9_BU18" },
      { imageSrc: "/assets/cq9/CQ9_BU23.png", gameId: "CQ9_BU23" },
      { imageSrc: "/assets/cq9/CQ9_BU26.png", gameId: "CQ9_BU26" },
      { imageSrc: "/assets/cq9/CQ9_BU30.png", gameId: "CQ9_BU30" },
      { imageSrc: "/assets/cq9/CQ9_BU07.png", gameId: "CQ9_BU07" },
      { imageSrc: "/assets/cq9/CQ9_BU14.png", gameId: "CQ9_BU14" },
      { imageSrc: "/assets/cq9/CQ9_BU16.png", gameId: "CQ9_BU16" },
      { imageSrc: "/assets/cq9/CQ9_AR107.png", gameId: "CQ9_AR107" },
      { imageSrc: "/assets/cq9/CQ9_BU29.png", gameId: "CQ9_BU29" },
      { imageSrc: "/assets/cq9/CQ9_AR21.png", gameId: "CQ9_AR21" },
      { imageSrc: "/assets/cq9/CQ9_AR37.png", gameId: "CQ9_AR37" },
      { imageSrc: "/assets/cq9/CQ9_AR07.png", gameId: "CQ9_AR07" },
      { imageSrc: "/assets/cq9/CQ9_AR17.png", gameId: "CQ9_AR17" },
      { imageSrc: "/assets/cq9/CQ9_AR06.png", gameId: "CQ9_AR06" },
      { imageSrc: "/assets/cq9/CQ9_AR18.png", gameId: "CQ9_AR18" },
      { imageSrc: "/assets/cq9/CQ9_CC09.png", gameId: "CQ9_CC09" },
      { imageSrc: "/assets/cq9/CQ9_AR22.png", gameId: "CQ9_AR22" },
      { imageSrc: "/assets/cq9/CQ9_AR26.png", gameId: "CQ9_AR26" },
      { imageSrc: "/assets/cq9/CQ9_AR28.png", gameId: "CQ9_AR28" },
      { imageSrc: "/assets/cq9/CQ9_AR04.png", gameId: "CQ9_AR04" },
      { imageSrc: "/assets/cq9/CQ9_AR13.png", gameId: "CQ9_AR13" },
      { imageSrc: "/assets/cq9/CQ9_AR09.png", gameId: "CQ9_AR09" },
      { imageSrc: "/assets/cq9/CQ9_AR41.png", gameId: "CQ9_AR41" },
      { imageSrc: "/assets/cq9/CQ9_AR08.png", gameId: "CQ9_AR08" },
      { imageSrc: "/assets/cq9/CQ9_AR29.png", gameId: "CQ9_AR29" },
      { imageSrc: "/assets/cq9/CQ9_AR25.png", gameId: "CQ9_AR25" },
      { imageSrc: "/assets/cq9/CQ9_AR20.png", gameId: "CQ9_AR20" },
      { imageSrc: "/assets/cq9/CQ9_AR24.png", gameId: "CQ9_AR24" },
      { imageSrc: "/assets/cq9/CQ9_AR15.png", gameId: "CQ9_AR15" },
      { imageSrc: "/assets/cq9/CQ9_AR01.png", gameId: "CQ9_AR01" },
      { imageSrc: "/assets/cq9/CQ9_AR23.png", gameId: "CQ9_AR23" },
      { imageSrc: "/assets/cq9/CQ9_AR05.png", gameId: "CQ9_AR05" },
      { imageSrc: "/assets/cq9/CQ9_AR16.png", gameId: "CQ9_AR16" },
      { imageSrc: "/assets/cq9/CQ9_AR02.png", gameId: "CQ9_AR02" },
      { imageSrc: "/assets/cq9/CQ9_AR11.png", gameId: "CQ9_AR11" },
      { imageSrc: "/assets/cq9/CQ9_AR12.png", gameId: "CQ9_AR12" },
      { imageSrc: "/assets/cq9/CQ9_AR14.png", gameId: "CQ9_AR14" },
      { imageSrc: "/assets/cq9/CQ9_AR03.png", gameId: "CQ9_AR03" },
      { imageSrc: "/assets/cq9/CQ9_AR39.png", gameId: "CQ9_AR39" },
      { imageSrc: "/assets/cq9/CQ9_CC15.png", gameId: "CQ9_CC15" },
      { imageSrc: "/assets/cq9/CQ9_AR81.png", gameId: "CQ9_AR81" },
      { imageSrc: "/assets/cq9/CQ9_BU01.png", gameId: "CQ9_BU01" },
      { imageSrc: "/assets/cq9/CQ9_BU06.png", gameId: "CQ9_BU06" },
      { imageSrc: "/assets/cq9/CQ9_BU02.png", gameId: "CQ9_BU02" },
      { imageSrc: "/assets/cq9/CQ9_BU03.png", gameId: "CQ9_BU03" },
      { imageSrc: "/assets/cq9/CQ9_BU04.png", gameId: "CQ9_BU04" },
      { imageSrc: "/assets/cq9/CQ9_CC02.png", gameId: "CQ9_CC02" },
      { imageSrc: "/assets/cq9/CQ9_CC03.png", gameId: "CQ9_CC03" },
      { imageSrc: "/assets/cq9/CQ9_CC01.png", gameId: "CQ9_CC01" },
      { imageSrc: "/assets/cq9/CQ9_CC07.png", gameId: "CQ9_CC07" },
      { imageSrc: "/assets/cq9/CQ9_CC08.png", gameId: "CQ9_CC08" },
      { imageSrc: "/assets/cq9/CQ9_1074.png", gameId: "CQ9_1074" },
      { imageSrc: "/assets/cq9/CQ9_1067.png", gameId: "CQ9_1067" },
      { imageSrc: "/assets/cq9/CQ9_AS01.png", gameId: "CQ9_AS01" },
      { imageSrc: "/assets/cq9/CQ9_AS19.png", gameId: "CQ9_AS19" },
      { imageSrc: "/assets/cq9/CQ9_AS02.png", gameId: "CQ9_AS02" },
      { imageSrc: "/assets/cq9/CQ9_AS09.png", gameId: "CQ9_AS09" },
      { imageSrc: "/assets/cq9/CQ9_AS20.png", gameId: "CQ9_AS20" },
      { imageSrc: "/assets/cq9/CQ9_AS10.png", gameId: "CQ9_AS10" },
      { imageSrc: "/assets/cq9/CQ9_AS17.png", gameId: "CQ9_AS17" },
    ];
  

    const evolution = [
    
      { imageSrc: "/assets/evolution/EVOLIVE_pezjou3ltf6hvzjk.png", gameId: "EVOLIVE_pezjou3ltf6hvzjk" },
      { imageSrc: "/assets/evolution/EVOLIVE_pv2zgy42anvdwk3l.png", gameId: "EVOLIVE_pv2zgy42anvdwk3l" },
      { imageSrc: "/assets/evolution/EVOLIVE_pv2y4kmsanvdvwgy.png", gameId: "EVOLIVE_pv2y4kmsanvdvwgy" },
      { imageSrc: "/assets/evolution/EVOLIVE_easybj0000000001.png", gameId: "EVOLIVE_easybj0000000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_scabetstack00001.png", gameId: "EVOLIVE_scabetstack00001" },
      { imageSrc: "/assets/evolution/EVOLIVE_CrazyBalls000001.png", gameId: "EVOLIVE_CrazyBalls000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_SalPrivBJ0000015.png", gameId: "EVOLIVE_SalPrivBJ0000015" },
      { imageSrc: "/assets/evolution/EVOLIVE_SalPrivBJ0000016.png", gameId: "EVOLIVE_SalPrivBJ0000016" },
      { imageSrc: "/assets/evolution/EVOLIVE_SalPrivBJ0000017.png", gameId: "EVOLIVE_SalPrivBJ0000017" },
      { imageSrc: "/assets/evolution/EVOLIVE_Always8baccarat0.png", gameId: "EVOLIVE_Always8baccarat0" },
      { imageSrc: "/assets/evolution/EVOLIVE_livespins3000000.png", gameId: "EVOLIVE_livespins3000000" },
      { imageSrc: "/assets/evolution/EVOLIVE_livespins2000000.png", gameId: "EVOLIVE_livespins2000000" },
      { imageSrc: "/assets/evolution/EVOLIVE_livespins1000000.png", gameId: "EVOLIVE_livespins1000000" },
      { imageSrc: "/assets/evolution/EVOLIVE_livespins0000000.png", gameId: "EVOLIVE_livespins0000000" },
      { imageSrc: "/assets/evolution/EVOLIVE_lightningsb00001.png", gameId: "EVOLIVE_lightningsb00001" },
      { imageSrc: "/assets/evolution/EVOLIVE_LightningHindi01.png", gameId: "EVOLIVE_LightningHindi01" },
      { imageSrc: "/assets/evolution/EVOLIVE_774SuperSpeedBac.png", gameId: "EVOLIVE_774SuperSpeedBac" },
      { imageSrc: "/assets/evolution/EVOLIVE_sbjfunfun2100001.png", gameId: "EVOLIVE_sbjfunfun2100001" },
      { imageSrc: "/assets/evolution/EVOLIVE_PlatPrivBJ000003.png", gameId: "EVOLIVE_PlatPrivBJ000003" },
      { imageSrc: "/assets/evolution/EVOLIVE_PlatPrivBJ000001.png", gameId: "EVOLIVE_PlatPrivBJ000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_PlatPrivBJ000002.png", gameId: "EVOLIVE_PlatPrivBJ000002" },
      { imageSrc: "/assets/evolution/EVOLIVE_LightningStorm01.png", gameId: "EVOLIVE_LightningStorm01" },
      { imageSrc: "/assets/evolution/EVOLIVE_blackjack.png", gameId: "EVOLIVE_blackjack" },
      { imageSrc: "/assets/evolution/EVOLIVE_roulette.png", gameId: "EVOLIVE_roulette" },
      { imageSrc: "/assets/evolution/EVOLIVE_top_games.png", gameId: "EVOLIVE_top_games" },
      { imageSrc: "/assets/evolution/EVOLIVE_poker.png", gameId: "EVOLIVE_poker" },
      { imageSrc: "/assets/evolution/EVOLIVE_baccarat_sicbo.png", gameId: "EVOLIVE_baccarat_sicbo" },
      { imageSrc: "/assets/evolution/EVOLIVE_game_shows.png", gameId: "EVOLIVE_game_shows" },
      { imageSrc: "/assets/evolution/EVOLIVE_qhhjdnovai4a3a6k.png", gameId: "EVOLIVE_qhhjdnovai4a3a6k" },
      { imageSrc: "/assets/evolution/EVOLIVE_CrazyTime0000002.png", gameId: "EVOLIVE_CrazyTime0000002" },
      { imageSrc: "/assets/evolution/EVOLIVE_HSpeedBac0000002.png", gameId: "EVOLIVE_HSpeedBac0000002" },
      { imageSrc: "/assets/evolution/EVOLIVE_2uxabtm1rwaxcmdm.png", gameId: "EVOLIVE_2uxabtm1rwaxcmdm" },
      { imageSrc: "/assets/evolution/EVOLIVE_q6wo7mqrrnlhuj6b.png", gameId: "EVOLIVE_q6wo7mqrrnlhuj6b" },
      { imageSrc: "/assets/evolution/EVOLIVE_TRPTable00000001.png", gameId: "EVOLIVE_TRPTable00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_RedDoorRoulette1.png", gameId: "EVOLIVE_RedDoorRoulette1" },
      { imageSrc: "/assets/evolution/EVOLIVE_MonBigBaller0001.png", gameId: "EVOLIVE_MonBigBaller0001" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-topcard00001.png", gameId: "EVOLIVE_rng-topcard00001" },
      { imageSrc: "/assets/evolution/EVOLIVE_RngSicbo00000001.png", gameId: "EVOLIVE_RngSicbo00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-rt-european0.png", gameId: "EVOLIVE_rng-rt-european0" },
      { imageSrc: "/assets/evolution/EVOLIVE_RngMegaBall00001.png", gameId: "EVOLIVE_RngMegaBall00001" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-bj-lightning.png", gameId: "EVOLIVE_rng-bj-lightning" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-dragontiger0.png", gameId: "EVOLIVE_rng-dragontiger0" },
      { imageSrc: "/assets/evolution/EVOLIVE_RngDealNoDeal001.png", gameId: "EVOLIVE_RngDealNoDeal001" },
      { imageSrc: "/assets/evolution/EVOLIVE_RngCraps00000001.png", gameId: "EVOLIVE_RngCraps00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-bj-standard0.png", gameId: "EVOLIVE_rng-bj-standard0" },
      { imageSrc: "/assets/evolution/EVOLIVE_FanTan0000000001.png", gameId: "EVOLIVE_FanTan0000000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_XxxtremeLigh0001.png", gameId: "EVOLIVE_XxxtremeLigh0001" },
      { imageSrc: "/assets/evolution/EVOLIVE_wzg6kdkad1oe7m5k.png", gameId: "EVOLIVE_wzg6kdkad1oe7m5k" },
      { imageSrc: "/assets/evolution/EVOLIVE_THBTable00000001.png", gameId: "EVOLIVE_THBTable00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_SuperSicBo000001.png", gameId: "EVOLIVE_SuperSicBo000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_vctlz20yfnmp1ylr.png", gameId: "EVOLIVE_vctlz20yfnmp1ylr" },
      { imageSrc: "/assets/evolution/EVOLIVE_NoCommBac0000001.png", gameId: "EVOLIVE_NoCommBac0000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_Monopoly00000001.png", gameId: "EVOLIVE_Monopoly00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_MegaBall00000001.png", gameId: "EVOLIVE_MegaBall00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_LightningTable01.png", gameId: "EVOLIVE_LightningTable01" },
      { imageSrc: "/assets/evolution/EVOLIVE_LightningDice001.png", gameId: "EVOLIVE_LightningDice001" },
      { imageSrc: "/assets/evolution/EVOLIVE_LightningSbj0001.png", gameId: "EVOLIVE_LightningSbj0001" },
      { imageSrc: "/assets/evolution/EVOLIVE_LightningBac0001.png", gameId: "EVOLIVE_LightningBac0001" },
      { imageSrc: "/assets/evolution/EVOLIVE_InstantRo0000001.png", gameId: "EVOLIVE_InstantRo0000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_7x0b1tgh7agmf6hv.png", gameId: "EVOLIVE_7x0b1tgh7agmf6hv" },
      { imageSrc: "/assets/evolution/EVOLIVE_otctxzr5fjyggijz.png", gameId: "EVOLIVE_otctxzr5fjyggijz" },
      { imageSrc: "/assets/evolution/EVOLIVE_gwbaccarat000001.png", gameId: "EVOLIVE_gwbaccarat000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_FreeBet000000001.png", gameId: "EVOLIVE_FreeBet000000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_TopCard000000001.png", gameId: "EVOLIVE_TopCard000000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-lbaccarat000.png", gameId: "EVOLIVE_rng-lbaccarat000" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-gwbaccarat00.png", gameId: "EVOLIVE_rng-gwbaccarat00" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-dreamcatcher.png", gameId: "EVOLIVE_rng-dreamcatcher" },
      { imageSrc: "/assets/evolution/EVOLIVE_rngbaccarat00000.png", gameId: "EVOLIVE_rngbaccarat00000" },
      { imageSrc: "/assets/evolution/EVOLIVE_ETHTable00000001.png", gameId: "EVOLIVE_ETHTable00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_MOWDream00000001.png", gameId: "EVOLIVE_MOWDream00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_DragonTiger00001.png", gameId: "EVOLIVE_DragonTiger00001" },
      { imageSrc: "/assets/evolution/EVOLIVE_DoubleBallRou001.png", gameId: "EVOLIVE_DoubleBallRou001" },
      { imageSrc: "/assets/evolution/EVOLIVE_CrazyTime0000001.png", gameId: "EVOLIVE_CrazyTime0000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_Craps00000000001.png", gameId: "EVOLIVE_Craps00000000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_HoldemTable00001.png", gameId: "EVOLIVE_HoldemTable00001" },
      { imageSrc: "/assets/evolution/EVOLIVE_CSPTable00000001.png", gameId: "EVOLIVE_CSPTable00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_zixzea8nrf1675oh.png", gameId: "EVOLIVE_zixzea8nrf1675oh" },
      { imageSrc: "/assets/evolution/EVOLIVE_k2oswnib7jjaaznw.png", gameId: "EVOLIVE_k2oswnib7jjaaznw" },
      { imageSrc: "/assets/evolution/EVOLIVE_oytmvb9m1zysmc44.png", gameId: "EVOLIVE_oytmvb9m1zysmc44" },
      { imageSrc: "/assets/evolution/EVOLIVE_48z5pjps3ntvqc1b.png", gameId: "EVOLIVE_48z5pjps3ntvqc1b" },
      { imageSrc: "/assets/evolution/EVOLIVE_AmericanTable001.png", gameId: "EVOLIVE_AmericanTable001" },
      { imageSrc: "/assets/evolution/EVOLIVE_DHPTable00000001.png", gameId: "EVOLIVE_DHPTable00000001" }
    ];
  const microgaming = [
       { imageSrc: "/assets/microgaming/MG_SMG_almightyDionysusEmpire.png", gameId: "MG_SMG_almightyDionysusEmpire" },
    { imageSrc: "/assets/microgaming/MG_SMG_luckyTwinsAnd9Lions.png", gameId: "MG_SMG_luckyTwinsAnd9Lions" },
    { imageSrc: "/assets/microgaming/MG_SMG_3AngelsPowerCombo.png", gameId: "MG_SMG_3AngelsPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_royalThunderRiders.png", gameId: "MG_SMG_royalThunderRiders" },
    { imageSrc: "/assets/microgaming/MG_SMG_moneyDragon.png", gameId: "MG_SMG_moneyDragon" },
    { imageSrc: "/assets/microgaming/MG_SMG_cashBlitz.png", gameId: "MG_SMG_cashBlitz" },
    { imageSrc: "/assets/microgaming/MG_SMG_pongPongMahjongJackpots.png", gameId: "MG_SMG_pongPongMahjongJackpots" },
    { imageSrc: "/assets/microgaming/MG_SMG_gatesOfAsgardPowerCombo.png", gameId: "MG_SMG_gatesOfAsgardPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_carnavalFiesta.png", gameId: "MG_SMG_carnavalFiesta" },
    { imageSrc: "/assets/microgaming/MG_SMG_frankenstein.png", gameId: "MG_SMG_frankenstein" },
    { imageSrc: "/assets/microgaming/MG_SMG_aztecTripleRichesPowerCombo.png", gameId: "MG_SMG_aztecTripleRichesPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_goldInfinity.png", gameId: "MG_SMG_goldInfinity" },
    { imageSrc: "/assets/microgaming/MG_SMG_mammothTripleRiches.png", gameId: "MG_SMG_mammothTripleRiches" },
    { imageSrc: "/assets/microgaming/MG_SMG_hadesLostTreasures.png", gameId: "MG_SMG_hadesLostTreasures" },
    { imageSrc: "/assets/microgaming/MG_SMG_bookOfWolves.png", gameId: "MG_SMG_bookOfWolves" },
    { imageSrc: "/assets/microgaming/MG_SMG_siennaSteele.png", gameId: "MG_SMG_siennaSteele" },
    { imageSrc: "/assets/microgaming/MG_SMG_candyRushWilds2.png", gameId: "MG_SMG_candyRushWilds2" },
    { imageSrc: "/assets/microgaming/MG_SMG_almightyAthenaEmpire.png", gameId: "MG_SMG_almightyAthenaEmpire" },
    { imageSrc: "/assets/microgaming/MG_SMG_treasureStacks.png", gameId: "MG_SMG_treasureStacks" },
    { imageSrc: "/assets/microgaming/MG_SMG_3LaughingLionsPowerCombo.png", gameId: "MG_SMG_3LaughingLionsPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_crazyBobBonanza.png", gameId: "MG_SMG_crazyBobBonanza" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Baccarat3.png", gameId: "MG_SMG_MGLiveGrand_Baccarat3" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Baccarat2.png", gameId: "MG_SMG_MGLiveGrand_Baccarat2" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Baccarat1.png", gameId: "MG_SMG_MGLiveGrand_Baccarat1" },
    { imageSrc: "/assets/microgaming/MG_SMG_luckyTwinsPowerClusters.png", gameId: "MG_SMG_luckyTwinsPowerClusters" },
    { imageSrc: "/assets/microgaming/MG_SMG_mightyPanda.png", gameId: "MG_SMG_mightyPanda" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackVancouver.png", gameId: "MG_SMG_MGLiveGrand_BlackjackVancouver" },
    { imageSrc: "/assets/microgaming/MG_SMG_massiveGold.png", gameId: "MG_SMG_massiveGold" },
    { imageSrc: "/assets/microgaming/MG_SMG_sharkPlatinum.png", gameId: "MG_SMG_sharkPlatinum" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat12.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat12" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat11.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat11" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat10.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat10" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat9.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat9" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat8.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat8" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat7.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat7" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat6.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat6" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackMontreal.png", gameId: "MG_SMG_MGLiveGrand_BlackjackMontreal" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_CashWheelCarnival.png", gameId: "MG_SMG_MGLiveGrand_CashWheelCarnival" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_TurkishRoulette.png", gameId: "MG_SMG_MGLiveGrand_TurkishRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_CasinoHoldem.png", gameId: "MG_SMG_MGLiveGrand_CasinoHoldem" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_DiamondRoulette.png", gameId: "MG_SMG_MGLiveGrand_DiamondRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_IstanbulRoulette.png", gameId: "MG_SMG_MGLiveGrand_IstanbulRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_WanderlustAdventure.png", gameId: "MG_SMG_MGLiveGrand_WanderlustAdventure" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_HoloRoulette.png", gameId: "MG_SMG_MGLiveGrand_HoloRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBlackjack2.png", gameId: "MG_SMG_MGLiveGrand_SpeedBlackjack2" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBlackjack1.png", gameId: "MG_SMG_MGLiveGrand_SpeedBlackjack1" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_EverplayBlackjack.png", gameId: "MG_SMG_MGLiveGrand_EverplayBlackjack" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_DragonTiger.png", gameId: "MG_SMG_MGLiveGrand_DragonTiger" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_CardsChampion.png", gameId: "MG_SMG_MGLiveGrand_CardsChampion" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat5.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat5" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat4.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat4" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat3.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat3" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat2.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat2" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat1.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat1" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_AutoRoulette.png", gameId: "MG_SMG_MGLiveGrand_AutoRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedRoulette.png", gameId: "MG_SMG_MGLiveGrand_SpeedRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_AmstelRoulette.png", gameId: "MG_SMG_MGLiveGrand_AmstelRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_ClubhouseRoulette.png", gameId: "MG_SMG_MGLiveGrand_ClubhouseRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_AirwaveRoulette.png", gameId: "MG_SMG_MGLiveGrand_AirwaveRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Roulette.png", gameId: "MG_SMG_MGLiveGrand_Roulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackRiga.png", gameId: "MG_SMG_MGLiveGrand_BlackjackRiga" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackBerlin.png", gameId: "MG_SMG_MGLiveGrand_BlackjackBerlin" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackMonteCarlo.png", gameId: "MG_SMG_MGLiveGrand_BlackjackMonteCarlo" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackMadrid.png", gameId: "MG_SMG_MGLiveGrand_BlackjackMadrid" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackToronto.png", gameId: "MG_SMG_MGLiveGrand_BlackjackToronto" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackManchester.png", gameId: "MG_SMG_MGLiveGrand_BlackjackManchester" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackLondon.png", gameId: "MG_SMG_MGLiveGrand_BlackjackLondon" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackAmsterdam.png", gameId: "MG_SMG_MGLiveGrand_BlackjackAmsterdam" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_BaccaratplayboyNC.png", gameId: "MG_SMG_titaniumLiveGames_BaccaratplayboyNC" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Baccarat_Playboy.png", gameId: "MG_SMG_titaniumLiveGames_Baccarat_Playboy" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Roulette.png", gameId: "MG_SMG_titaniumLiveGames_Roulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Sicbo.png", gameId: "MG_SMG_titaniumLiveGames_Sicbo" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_MP_Baccarat.png", gameId: "MG_SMG_titaniumLiveGames_MP_Baccarat" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Baccarat.png", gameId: "MG_SMG_titaniumLiveGames_Baccarat" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_BaccaratNC.png", gameId: "MG_SMG_titaniumLiveGames_BaccaratNC" },
    { imageSrc: "/assets/microgaming/MG_SMG_drWattsUp.png", gameId: "MG_SMG_drWattsUp" },
    { imageSrc: "/assets/microgaming/MG_SMG_luckyLittleDragons.png", gameId: "MG_SMG_luckyLittleDragons" },
    { imageSrc: "/assets/microgaming/MG_SMG_queenOfCairo.png", gameId: "MG_SMG_queenOfCairo" },
    { imageSrc: "/assets/microgaming/MG_SMG_108HeroesWaterMargin.png", gameId: "MG_SMG_108HeroesWaterMargin" },
    { imageSrc: "/assets/microgaming/MG_SMG_almightyZeusWilds.png", gameId: "MG_SMG_almightyZeusWilds" },
    { imageSrc: "/assets/microgaming/MG_SMG_miningPotsOfGold.png", gameId: "MG_SMG_miningPotsOfGold" },
    { imageSrc: "/assets/microgaming/MG_SMG_crazyRichTigers.png", gameId: "MG_SMG_crazyRichTigers" },
    { imageSrc: "/assets/microgaming/MG_SMG_chroniclesOfOlympusIIZeus.png", gameId: "MG_SMG_chroniclesOfOlympusIIZeus" },
    { imageSrc: "/assets/microgaming/MG_SMG_flyX.png", gameId: "MG_SMG_flyX" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDGoldBlastFishing.png", gameId: "MG_SFG_WDGoldBlastFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDFuWaFishing.png", gameId: "MG_SFG_WDFuWaFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDGoldenFortuneFishing.png", gameId: "MG_SFG_WDGoldenFortuneFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDGoldenTyrantFishing.png", gameId: "MG_SFG_WDGoldenTyrantFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDMerryIslandFishing.png", gameId: "MG_SFG_WDMerryIslandFishing" },
    { imageSrc: "/assets/microgaming/MG_SMG_immortalRomanceVideoBingo.png", gameId: "MG_SMG_immortalRomanceVideoBingo" },
    { imageSrc: "/assets/microgaming/MG_SMG_amazingPharaoh.png", gameId: "MG_SMG_amazingPharaoh" },
    { imageSrc: "/assets/microgaming/MG_SMG_pongPongMahjong.png", gameId: "MG_SMG_pongPongMahjong" },
    { imageSrc: "/assets/microgaming/MG_SMG_breakAwayMax.png", gameId: "MG_SMG_breakAwayMax" },
    { imageSrc: "/assets/microgaming/MG_SMG_fishinPotsOfGoldGoldBlitz.png", gameId: "MG_SMG_fishinPotsOfGoldGoldBlitz" },
    { imageSrc: "/assets/microgaming/MG_SMG_9EnchantedBeans.png", gameId: "MG_SMG_9EnchantedBeans" },
    { imageSrc: "/assets/microgaming/MG_SMG_laraCroftTombOfTheSun.png", gameId: "MG_SMG_laraCroftTombOfTheSun" },
    { imageSrc: "/assets/microgaming/MG_SMG_fireAndRosesJollyJoker.png", gameId: "MG_SMG_fireAndRosesJollyJoker" },
    { imageSrc: "/assets/microgaming/MG_SMG_dragonsLoot.png", gameId: "MG_SMG_dragonsLoot" },
    { imageSrc: "/assets/microgaming/MG_SMG_hatchingGoldRoostersRiches.png", gameId: "MG_SMG_hatchingGoldRoostersRiches" },
    { imageSrc: "/assets/microgaming/MG_SMG_reignOfFire.png", gameId: "MG_SMG_reignOfFire" },
    { imageSrc: "/assets/microgaming/MG_SMG_almightyDionysusEmpire.png", gameId: "MG_SMG_almightyDionysusEmpire" },
    { imageSrc: "/assets/microgaming/MG_SMG_luckyTwinsAnd9Lions.png", gameId: "MG_SMG_luckyTwinsAnd9Lions" },
    { imageSrc: "/assets/microgaming/MG_SMG_3AngelsPowerCombo.png", gameId: "MG_SMG_3AngelsPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_royalThunderRiders.png", gameId: "MG_SMG_royalThunderRiders" },
    { imageSrc: "/assets/microgaming/MG_SMG_moneyDragon.png", gameId: "MG_SMG_moneyDragon" },
    { imageSrc: "/assets/microgaming/MG_SMG_cashBlitz.png", gameId: "MG_SMG_cashBlitz" },
    { imageSrc: "/assets/microgaming/MG_SMG_pongPongMahjongJackpots.png", gameId: "MG_SMG_pongPongMahjongJackpots" },
    { imageSrc: "/assets/microgaming/MG_SMG_gatesOfAsgardPowerCombo.png", gameId: "MG_SMG_gatesOfAsgardPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_carnavalFiesta.png", gameId: "MG_SMG_carnavalFiesta" },
    { imageSrc: "/assets/microgaming/MG_SMG_frankenstein.png", gameId: "MG_SMG_frankenstein" },
    { imageSrc: "/assets/microgaming/MG_SMG_aztecTripleRichesPowerCombo.png", gameId: "MG_SMG_aztecTripleRichesPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_goldInfinity.png", gameId: "MG_SMG_goldInfinity" },
    { imageSrc: "/assets/microgaming/MG_SMG_mammothTripleRiches.png", gameId: "MG_SMG_mammothTripleRiches" },
    { imageSrc: "/assets/microgaming/MG_SMG_hadesLostTreasures.png", gameId: "MG_SMG_hadesLostTreasures" },
    { imageSrc: "/assets/microgaming/MG_SMG_bookOfWolves.png", gameId: "MG_SMG_bookOfWolves" },
    { imageSrc: "/assets/microgaming/MG_SMG_siennaSteele.png", gameId: "MG_SMG_siennaSteele" },
    { imageSrc: "/assets/microgaming/MG_SMG_candyRushWilds2.png", gameId: "MG_SMG_candyRushWilds2" },
    { imageSrc: "/assets/microgaming/MG_SMG_almightyAthenaEmpire.png", gameId: "MG_SMG_almightyAthenaEmpire" },
    { imageSrc: "/assets/microgaming/MG_SMG_treasureStacks.png", gameId: "MG_SMG_treasureStacks" },
    { imageSrc: "/assets/microgaming/MG_SMG_3LaughingLionsPowerCombo.png", gameId: "MG_SMG_3LaughingLionsPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_crazyBobBonanza.png", gameId: "MG_SMG_crazyBobBonanza" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Baccarat3.png", gameId: "MG_SMG_MGLiveGrand_Baccarat3" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Baccarat2.png", gameId: "MG_SMG_MGLiveGrand_Baccarat2" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Baccarat1.png", gameId: "MG_SMG_MGLiveGrand_Baccarat1" },
    { imageSrc: "/assets/microgaming/MG_SMG_luckyTwinsPowerClusters.png", gameId: "MG_SMG_luckyTwinsPowerClusters" },
    { imageSrc: "/assets/microgaming/MG_SMG_mightyPanda.png", gameId: "MG_SMG_mightyPanda" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackVancouver.png", gameId: "MG_SMG_MGLiveGrand_BlackjackVancouver" },
    { imageSrc: "/assets/microgaming/MG_SMG_massiveGold.png", gameId: "MG_SMG_massiveGold" },
    { imageSrc: "/assets/microgaming/MG_SMG_sharkPlatinum.png", gameId: "MG_SMG_sharkPlatinum" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat12.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat12" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat11.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat11" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat10.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat10" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat9.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat9" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat8.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat8" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat7.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat7" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat6.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat6" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackMontreal.png", gameId: "MG_SMG_MGLiveGrand_BlackjackMontreal" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_CashWheelCarnival.png", gameId: "MG_SMG_MGLiveGrand_CashWheelCarnival" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_TurkishRoulette.png", gameId: "MG_SMG_MGLiveGrand_TurkishRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_CasinoHoldem.png", gameId: "MG_SMG_MGLiveGrand_CasinoHoldem" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_DiamondRoulette.png", gameId: "MG_SMG_MGLiveGrand_DiamondRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_IstanbulRoulette.png", gameId: "MG_SMG_MGLiveGrand_IstanbulRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_WanderlustAdventure.png", gameId: "MG_SMG_MGLiveGrand_WanderlustAdventure" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_HoloRoulette.png", gameId: "MG_SMG_MGLiveGrand_HoloRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBlackjack2.png", gameId: "MG_SMG_MGLiveGrand_SpeedBlackjack2" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBlackjack1.png", gameId: "MG_SMG_MGLiveGrand_SpeedBlackjack1" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_EverplayBlackjack.png", gameId: "MG_SMG_MGLiveGrand_EverplayBlackjack" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_DragonTiger.png", gameId: "MG_SMG_MGLiveGrand_DragonTiger" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_CardsChampion.png", gameId: "MG_SMG_MGLiveGrand_CardsChampion" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat5.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat5" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat4.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat4" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat3.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat3" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat2.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat2" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat1.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat1" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_AutoRoulette.png", gameId: "MG_SMG_MGLiveGrand_AutoRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedRoulette.png", gameId: "MG_SMG_MGLiveGrand_SpeedRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_AmstelRoulette.png", gameId: "MG_SMG_MGLiveGrand_AmstelRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_ClubhouseRoulette.png", gameId: "MG_SMG_MGLiveGrand_ClubhouseRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_AirwaveRoulette.png", gameId: "MG_SMG_MGLiveGrand_AirwaveRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Roulette.png", gameId: "MG_SMG_MGLiveGrand_Roulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackRiga.png", gameId: "MG_SMG_MGLiveGrand_BlackjackRiga" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackBerlin.png", gameId: "MG_SMG_MGLiveGrand_BlackjackBerlin" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackMonteCarlo.png", gameId: "MG_SMG_MGLiveGrand_BlackjackMonteCarlo" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackMadrid.png", gameId: "MG_SMG_MGLiveGrand_BlackjackMadrid" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackToronto.png", gameId: "MG_SMG_MGLiveGrand_BlackjackToronto" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackManchester.png", gameId: "MG_SMG_MGLiveGrand_BlackjackManchester" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackLondon.png", gameId: "MG_SMG_MGLiveGrand_BlackjackLondon" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackAmsterdam.png", gameId: "MG_SMG_MGLiveGrand_BlackjackAmsterdam" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_BaccaratplayboyNC.png", gameId: "MG_SMG_titaniumLiveGames_BaccaratplayboyNC" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Baccarat_Playboy.png", gameId: "MG_SMG_titaniumLiveGames_Baccarat_Playboy" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Roulette.png", gameId: "MG_SMG_titaniumLiveGames_Roulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Sicbo.png", gameId: "MG_SMG_titaniumLiveGames_Sicbo" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_MP_Baccarat.png", gameId: "MG_SMG_titaniumLiveGames_MP_Baccarat" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Baccarat.png", gameId: "MG_SMG_titaniumLiveGames_Baccarat" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_BaccaratNC.png", gameId: "MG_SMG_titaniumLiveGames_BaccaratNC" },
    { imageSrc: "/assets/microgaming/MG_SMG_drWattsUp.png", gameId: "MG_SMG_drWattsUp" },
    { imageSrc: "/assets/microgaming/MG_SMG_luckyLittleDragons.png", gameId: "MG_SMG_luckyLittleDragons" },
    { imageSrc: "/assets/microgaming/MG_SMG_queenOfCairo.png", gameId: "MG_SMG_queenOfCairo" },
    { imageSrc: "/assets/microgaming/MG_SMG_108HeroesWaterMargin.png", gameId: "MG_SMG_108HeroesWaterMargin" },
    { imageSrc: "/assets/microgaming/MG_SMG_almightyZeusWilds.png", gameId: "MG_SMG_almightyZeusWilds" },
    { imageSrc: "/assets/microgaming/MG_SMG_miningPotsOfGold.png", gameId: "MG_SMG_miningPotsOfGold" },
    { imageSrc: "/assets/microgaming/MG_SMG_crazyRichTigers.png", gameId: "MG_SMG_crazyRichTigers" },
    { imageSrc: "/assets/microgaming/MG_SMG_chroniclesOfOlympusIIZeus.png", gameId: "MG_SMG_chroniclesOfOlympusIIZeus" },
    { imageSrc: "/assets/microgaming/MG_SMG_flyX.png", gameId: "MG_SMG_flyX" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDGoldBlastFishing.png", gameId: "MG_SFG_WDGoldBlastFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDFuWaFishing.png", gameId: "MG_SFG_WDFuWaFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDGoldenFortuneFishing.png", gameId: "MG_SFG_WDGoldenFortuneFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDGoldenTyrantFishing.png", gameId: "MG_SFG_WDGoldenTyrantFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDMerryIslandFishing.png", gameId: "MG_SFG_WDMerryIslandFishing" },
    { imageSrc: "/assets/microgaming/MG_SMG_immortalRomanceVideoBingo.png", gameId: "MG_SMG_immortalRomanceVideoBingo" },
    { imageSrc: "/assets/microgaming/MG_SMG_amazingPharaoh.png", gameId: "MG_SMG_amazingPharaoh" },
    { imageSrc: "/assets/microgaming/MG_SMG_pongPongMahjong.png", gameId: "MG_SMG_pongPongMahjong" },
    { imageSrc: "/assets/microgaming/MG_SMG_breakAwayMax.png", gameId: "MG_SMG_breakAwayMax" },
    { imageSrc: "/assets/microgaming/MG_SMG_fishinPotsOfGoldGoldBlitz.png", gameId: "MG_SMG_fishinPotsOfGoldGoldBlitz" },
    { imageSrc: "/assets/microgaming/MG_SMG_9EnchantedBeans.png", gameId: "MG_SMG_9EnchantedBeans" },
    { imageSrc: "/assets/microgaming/MG_SMG_laraCroftTombOfTheSun.png", gameId: "MG_SMG_laraCroftTombOfTheSun" },
    { imageSrc: "/assets/microgaming/MG_SMG_fireAndRosesJollyJoker.png", gameId: "MG_SMG_fireAndRosesJollyJoker" },
    { imageSrc: "/assets/microgaming/MG_SMG_dragonsLoot.png", gameId: "MG_SMG_dragonsLoot" },
  ]


  const topbet = async (app_id) => {
    console.log(app_id);
    setIsLoading(true);
    try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await axios.post(`${domain}/topbetgaming-login/`, 
        { app_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { code, url } = response.data;
        console.log(url);
        console.log(response.data);
  
        if (code === 0) {
            window.location.href = url;
        }
    } finally {
        setIsLoading(false);
    }
  };

  const jdbcall = async (app_id) => {
    setIsLoading(true);
    try {
        const token = sessionStorage.getItem('token'); // Changed to sessionStorage
        const response = await axios.post(`${domain}/game/launch/jdb/`, 
        { "gameCode": app_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { status, data } = response.data;
       
        console.log(response.data);
  
        if (status === "SC_OK") {
            window.location.href = data.gameUrl;
        }
    } finally {
        setIsLoading(false);
    }
};

  const jili = async (gameId) => {
    setIsLoading(true); // Assuming you want to set loading state when the function is triggered
    try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await axios.post(`${domain}/jilireal-test-login/`, 
        { GameId: gameId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { ErrorCode, Data } = response.data.responseData;
        console.log(response.data.responseData);
  
        if (ErrorCode === 0) {
            window.location.href = Data;
        }
    } finally {
        setIsLoading(false);
    }
  };

  const handleConfirmRecharge = () => {
    // Navigate to recharge page or trigger recharge process
    window.location.href = "/recharge"; // Adjust this path as needed
  };
// Update handleBoxClick with strict deposit check
const handleBoxClick = (gameId, type) => {
  console.log(`Clicked gameId: ${gameId}`);
  
  if (isDepositCheckLoading) {
    return; // Prevent clicks while checking deposit status
  }

  if (!hasDeposit) {
    setSelectedGame({ game: gameId });
    setGameType(type);
    setOpenDialog(true);
    return;
  }
    // Only proceed if deposit requirements are met
    switch(type) {
      case "jili":
        jdbcall(gameId);
        break;
      case "topbet": 
      jdbcall(gameId);
        break;
      case "JDB":
        jdbcall(gameId);
        break;
      default:
        jdbcall(gameId);
    }
  };

const renderGames = (games, type) => {
  return games.map((game, index) => (
    <Grid
      item
      xs={4} // 3 boxes in a row (12/4 = 3)
      sm={4}
      md={4}
      key={index}
      sx={{
        opacity: isDepositCheckLoading ? 0.5 : 1,
        pointerEvents: isDepositCheckLoading ? 'none' : 'auto'
      }}
    >
     <Box
          onClick={() => handleBoxClick(game.gameId, type)}
          sx={{
            width: "100%",
            aspectRatio: "1", // Ensures the box is square
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)", // Add hover effect
            },
          }}
        >
          <img
            src={game.imageSrc}
            alt={`Game ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Grid>
    ));
  };

return (
  <>
  {/* Thin Header with Search Icon */}
  <AppBar position="sticky" sx={{ background: "#FFFFFF", height: 40, justifyContent: "center",  boxShadow: 'none'}}>
    <Toolbar sx={{ minHeight: "40px !important", display: "flex", justifyContent: "space-between", padding: "0 10px" }}>
      <h6 style={{ margin: 0, fontSize: "16px", color: "black" }}>Game</h6>
      <IconButton color="black">
        <SearchIcon />
      </IconButton>
    </Toolbar>
  </AppBar>

  {/* Tabs with Images & No Chevron */}
  <Box sx={{ flexGrow: 1 }}>
  <AppBar position="static" color="default" sx={{ backgroundColor: 'transparent', boxShadow: 'none',marginLeft: '10px' }}>
  <Tabs
  value={tabValue}
  onChange={handleTabChange}
  variant="scrollable"
  scrollButtons="false"
  aria-label="game tabs"
  ref={tabsRef}
  sx={{
     boxShadow: 'none',
    '& .MuiTabs-flexContainer': {
      gap: '8px',
      padding: '8px',
    },
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    '& .MuiTab-root': {
      backgroundColor: '#fff',
      borderRadius: '10px',
      minHeight: '65px',
      minWidth: '100px',
      padding: '6px',
      margin: '0',
      '&.Mui-selected': {
        backgroundColor: '#FF952A',
        color: '#fff',
      },
    },
  }}
>
  {[
    { 
      label: "Jili Games", 
      activeImg: "/assets/banners/w2.png", // Active state image
      inactiveImg: "/assets/banners/b2.png" // Inactive state image
    },
    { 
      label: "JDB Games", 
      activeImg:" /assets/banners/w1.png",
      inactiveImg: "/assets/banners/b1.png"
    },
    { 
      label: "CQ9", 
      activeImg: "/assets/banners/w3.png",
      inactiveImg: "/assets/banners/b3.png"
    },
    {
      label: "EVOLUTION",
      activeImg: "/assets/banners/w4.png",
      inactiveImg: "/assets/banners/b4.png"
    },
    {
      label: "MICROGAMING",
      activeImg: "/assets/banners/w5.png",
      inactiveImg: "/assets/banners/b5.png"
    }
    // ... repeat for other tabs
  ].map((tab, index) => (
    <Tab
      key={index}
      label={
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          padding: '4px'
        }}>
          <img 
            src={tabValue === index ? tab.activeImg : tab.inactiveImg} 
            alt={tab.label} 
            width="45" 
            height="30"
          />
          <Typography sx={{ 
            fontSize: '14px', 
            marginTop: '2px',
            fontWeight:"400",
            fontFamily:"Helvetica",
            color: tabValue === index ? '#fff' : 'inherit'
          }}>
            {tab.label}
          </Typography>
        </Box>
      }
    />
  ))}
</Tabs>
</AppBar>

    {/* Tab Panels */}
    <TabPanel value={tabValue} index={0}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {renderGames(flashGames, "jili")}
      </Grid>
    </TabPanel>
    <TabPanel value={tabValue} index={1}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {renderGames(slotGames, "JDB")}
      </Grid>
    </TabPanel>
    <TabPanel value={tabValue} index={2}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {renderGames(popularGames, "topbet")}
      </Grid>
    </TabPanel>
    <TabPanel value={tabValue} index={3}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {renderGames(evolution, "evolution")}
      </Grid>
    </TabPanel>
    <TabPanel value={tabValue} index={4}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {renderGames(microgaming, "microgaming")}
      </Grid>
    </TabPanel>
  </Box>
</>
);

};

export default App;
