import React, { useState, useRef,useEffect ,useCallback, memo} from 'react';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { domain } from "./config";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { sub } from 'date-fns';
// import { Grid } from '@mui/system';

// Styled components remain the same
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
  backgroundColor: "#4781ff",
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
}));

// Separate RechargeDialog component with memo
const RechargeDialog = memo(({ open, onClose, onConfirm, selectedGame }) => {
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
          style={{ backgroundColor: "#4781ff", color: "white" }}
        >
          Recharge Now
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  );
});

RechargeDialog.displayName = 'RechargeDialog';
const TabLayout = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [flashPage, setFlashPage] = useState(0);
  const [slotPage, setSlotPage] = useState(0);
  const [sportsPage, setSportsPage] = useState(0);
  const [casinoPage, setCasinoPage] = useState(0);
  const [cardsPage, setCardsPage] = useState(0);
  const [dicePage, setDicePage] = useState(0);
  const [bingoPage, setBingoPage] = useState(0);
  const tabsRef = useRef(null);


  const tabs = [
    {id: 'sports', label: 'Popular', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240127134718aedk.png', bgImage:"url(https://goagameb.com/assets/png/lottery_bg-1edd950a.png)" },
    
    {id: 'lobby', label: 'Lottry', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240127134331wkt7.png',bgImage:"url(https://goagameb.com/assets/png/lottery_bg-1edd950a.png)" },
    {id: 'slot', label: 'Slots', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240127160211wyu9.png', bgImage:"rgb(87,199,221)" },
    { id: 'cards', label: 'Sport', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240127171151ol6s.png', bgcolor: "transparent" },
    {id: 'casino', label: 'Casino', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240127160544mw56.png', bgcolor: "transparent" },
    {id: 'flash', label: 'Rummy', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240127140618epu3.png', bgcolor: "linear-gradient(to bottom, #fbb2ff, #e27bd1)" },
    { id: 'dice', label: 'Fishing', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240306120644tfcu.png', bgcolor: "rgb(253,177,107)" },
    { id: 'original', label: "Original", img: "https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_2023071018441674yw.png", bgcolor: "rgb(245,144,193)" },
  ]

  const lotteryGames = [
    { 
      id: 'wingo', 
      title: 'Win Go',
      subtitle: 'Guess the number',
      desc: 'Green/Purple/Red to win', 
      img: '/assets/banners/wingo.png',
      path: "/timer/30sec" 
    },
    { 
      id: 'k3', 
      title: 'K3',
      subtitle: 'Guess the number',
      desc: 'high/low/odd/even', 
      img: '/assets/banners/k3.png',
      path: "/k3/1min"
    },
    { 
      id: '5d', 
      title: '5D',
      subtitle: 'Guess the number',
      desc: 'high/low/odd/even', 
      img: '/assets/banners/5d.png',
      path: "/5d/1min"
    },
    { 
      id: 'trxwin', 
      title: 'Trx Win',
      subtitle: 'Guess the number',
      desc: 'Green/Purple/Red to win', 
      img: '/assets/banners/trx.png',
      path: "/trx/1min"
    }
  ];
  const gamesByTab = {
    flash: [
      { id: 'aviator', title: 'Aviator', gameId: 'SPB_aviator', img: '/assets/spribe/SPB_aviator.png' },
      { id: 'trader', title: 'Trader', gameId: 'SPB_trader', img: '/assets/spribe/SPB_trader.png' },
      { id: 'starline', title: 'Starline', gameId: 'SPB_starline', img: '/assets/spribe/SPB_starline.png' },
      { id: 'hotline', title: 'Hotline', gameId: 'SPB_hotline', img: '/assets/spribe/SPB_hotline.png' },
      { id: 'mini_roulette', title: 'Mini Roulette', gameId: 'SPB_mini-roulette', img: '/assets/spribe/SPB_mini-roulette.png' },
      { id: 'keno', title: 'Keno', gameId: 'SPB_keno', img: '/assets/spribe/SPB_keno.png' },
      { id: 'hilo', title: 'Hilo', gameId: 'SPB_hi-lo', img: '/assets/spribe/SPB_hi-lo.png' },
      { id: 'mines', title: 'Mines', gameId: 'SPB_mines', img: '/assets/spribe/SPB_mines.png' },
      { id: 'plinko', title: 'Plinko', gameId: 'SPB_plinko', img: '/assets/spribe/SPB_plinko.png' },
      { id: 'dice', title: 'Dice', gameId: 'SPB_dice', img: '/assets/spribe/SPB_dice.png' },
      { id: 'goal', title: 'Goal', gameId: 'SPB_goal', img: '/assets/spribe/SPB_goal.png' },
      
    ],
    popular: [
      { id: 'JL_242', title: 'Game JL_242', gameId: 'JL_242', img: '/assets/jili/JL_242.png' },
      { id: 'JL_241', title: 'Game JL_241', gameId: 'JL_241', img: '/assets/jili/JL_241.png' },
      { id: 'JL_254', title: 'Game JL_254', gameId: 'JL_254', img: '/assets/jili/JL_254.png' },
      { id: 'JL_236', title: 'Game JL_236', gameId: 'JL_236', img: '/assets/jili/JL_236.png' },
      { id: 'JL_235', title: 'Game JL_235', gameId: 'JL_235', img: '/assets/jili/JL_235.png' },
      { id: 'JL_233', title: 'Game JL_233', gameId: 'JL_233', img: '/assets/jili/JL_233.png' },
      { id: 'JL_232', title: 'Game JL_232', gameId: 'JL_232', img: '/assets/jili/JL_232.png' },
      { id: 'JL_229', title: 'Game JL_229', gameId: 'JL_229', img: '/assets/jili/JL_229.png' },
      { id: 'JL_224', title: 'Game JL_224', gameId: 'JL_224', img: '/assets/jili/JL_224.png' },
      { id: 'JL_198', title: 'Game JL_198', gameId: 'JL_198', img: '/assets/jili/JL_198.png' },
    ],
    slot: [
      { id: 'slot1', title: 'Slot Magic', gameId: '223', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20230710184642yw3q.png' ,bgColor:'rgb(77,144,254)'},
      { id: 'slot2', title: 'Super Slots', gameId: '240', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_202307101846164xab.png',bgColor:'rgb(77,144,254)' },
      { id: 'slot3', title: 'Slot Magic', gameId: '180', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20230710184633b9w1.png',bgColor:'rgb(77,144,254)'},
      { id: 'slot4', title: 'Super Slots', gameId: '300', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20230724124135ypq8.png',bgColor:'rgb(77,144,254)' },
      { id: 'slot5', title: 'Slot Magic', gameId: '223', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20230710184550vu9q.png' ,bgColor:'rgb(77,144,254)'},
      { id: 'slot6', title: 'Super Slots', gameId: '240', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20241017050424j8it.png',bgColor:'rgb(77,144,254)' },
      { id: 'slot7', title: 'Slot Magic', gameId: '180', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20240508124035qn6t.png ',bgColor:'rgb(77,144,254)'},
      { id: 'slot8', title: 'Super Slots', gameId: '300', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20230710184642yw3q.png',bgColor:'rgb(77,144,254)' },
    ],
    sports: [
      { id: 'football_sports', title: 'Football', gameId: '403', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_202312301253295lr5.png',subtitle:"Football",desc:"" },
      { id: 'cricket_sports', title: 'Cricket', gameId: '389', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20230724124223a1c6.png',subtitle:"Cricket",desc:"" },
    ],
    casino: [
      { id: 'roulette_casino', title: 'Roulette Game', gameId: 'EVOLIVE_pv2zgy42anvdwk3l', img: '/assets/evolution/EVOLIVE_pv2zgy42anvdwk3l.png' ,subtitle:"Roulette",desc:""},

    ],
    cards: [
      { id: 'poker_cards', title: 'Poker', gameId: 'EVOLIVE_TRPTable00000001', img: '/assets/evolution/EVOLIVE_TRPTable00000001.png',subtitle:"Poker",desc:"365" },
      { id: 'baccarat_cards', title: 'Baccarat', gameId: 'EVOLIVE_Always8baccarat0', img: '/assets/evolution/EVOLIVE_Always8baccarat0.png' ,subtitle:"Baccarat",desc:"365"},
    ],
    dice: [
      { id: 'JL_216', title: 'Dice Game', gameId: 'JL_216', img: '/assets/jili/JL_216.png' },
      { id: 'JL_182', title: 'Dice Game', gameId: 'JL_182', img: '/assets/jili/JL_182.png' },
      { id: 'JL_177', title: 'Dice Game', gameId: 'JL_177', img: '/assets/jili/JL_177.png' },
      { id: 'JL_173', title: 'Dice Game', gameId: 'JL_173', img: '/assets/jili/JL_173.png' },
      { id: 'JL_200', title: 'Dice Game', gameId: 'JL_200', img: '/assets/jili/JL_200.png' },
      { id: 'JL_149', title: 'Dice Game', gameId: 'JL_149', img: '/assets/jili/JL_149.png' },
      { id: 'JL_178', title: 'Dice Game', gameId: 'JL_178', img: '/assets/jili/JL_178.png' },
      { id: 'JL_174', title: 'Dice Game', gameId: 'JL_174', img: '/assets/jili/JL_174.png' },
      { id: 'JL_150', title: 'Dice Game', gameId: 'JL_150', img: '/assets/jili/JL_150.png' },
      { id: 'JL_148', title: 'Dice Game', gameId: 'JL_148', img: '/assets/jili/JL_148.png' },
      { id: 'JL_151', title: 'Dice Game', gameId: 'JL_151', img: '/assets/jili/JL_151.png' },
      { id: 'JL_125', title: 'Dice Game', gameId: 'JL_125', img: '/assets/jili/JL_125.png' },
      { id: 'JL_139', title: 'Dice Game', gameId: 'JL_139', img: '/assets/jili/JL_139.png' },
      { id: 'JL_124', title: 'Dice Game', gameId: 'JL_124', img: '/assets/jili/JL_124.png' },
      { id: 'JL_122', title: 'Dice Game', gameId: 'JL_122', img: '/assets/jili/JL_122.png' },
      { id: 'JL_123', title: 'Dice Game', gameId: 'JL_123', img: '/assets/jili/JL_123.png' },
      { id: 'JL_113', title: 'Dice Game', gameId: 'JL_113', img: '/assets/jili/JL_113.png' },
      { id: 'JL_112', title: 'Dice Game', gameId: 'JL_112', img: '/assets/jili/JL_112.png' },
      { id: 'JL_111', title: 'Dice Game', gameId: 'JL_111', img: '/assets/jili/JL_111.png' },
      { id: 'JL_171', title: 'Dice Game', gameId: 'JL_171', img: '/assets/jili/JL_171.png' },
      { id: 'JL_239', title: 'Dice Game', gameId: 'JL_239', img: '/assets/jili/JL_239.png' },
      { id: 'JL_132', title: 'Dice Game', gameId: 'JL_132', img: '/assets/jili/JL_132.png' },
      { id: 'JL_220', title: 'Dice Game', gameId: 'JL_220', img: '/assets/jili/JL_220.png' },
      { id: 'JL_219', title: 'Dice Game', gameId: 'JL_219', img: '/assets/jili/JL_219.png' },
      { id: 'JL_163', title: 'Dice Game', gameId: 'JL_163', img: '/assets/jili/JL_163.png' },
      { id: 'JL_161', title: 'Dice Game', gameId: 'JL_161', img: '/assets/jili/JL_161.png' },
      { id: 'JL_160', title: 'Dice Game', gameId: 'JL_160', img: '/assets/jili/JL_160.png' },
      { id: 'JL_159', title: 'Dice Game', gameId: 'JL_159', img: '/assets/jili/JL_159.png' },
      { id: 'JL_127', title: 'Dice Game', gameId: 'JL_127', img: '/assets/jili/JL_127.png' },
      { id: 'JL_79', title: 'Dice Game', gameId: 'JL_79', img: '/assets/jili/JL_79.png' },
      { id: 'JL_75', title: 'Dice Game', gameId: 'JL_75', img: '/assets/jili/JL_75.png' },
      { id: 'JL_72', title: 'Dice Game', gameId: 'JL_72', img: '/assets/jili/JL_72.png' },
      { id: 'JL_303', title: 'Dice Game', gameId: 'JL_303', img: '/assets/jili/JL_303.png' },
      { id: 'JL_209', title: 'Dice Game', gameId: 'JL_209', img: '/assets/jili/JL_209.png' },
      { id: 'JL_238', title: 'Dice Game', gameId: 'JL_238', img: '/assets/jili/JL_238.png' },
      { id: 'JL_67', title: 'Dice Game', gameId: 'JL_67', img: '/assets/jili/JL_67.png' },
      { id: 'JL_65', title: 'Dice Game', gameId: 'JL_65', img: '/assets/jili/JL_65.png' },
      { id: 'JL_193', title: 'Dice Game', gameId: 'JL_193', img: '/assets/jili/JL_193.png' },
      { id: 'JL_191', title: 'Dice Game', gameId: 'JL_191', img: '/assets/jili/JL_191.png' },
      { id: 'JL_230', title: 'Dice Game', gameId: 'JL_230', img: '/assets/jili/JL_230.png' },
      { id: 'JL_172', title: 'Dice Game', gameId: 'JL_172', img: '/assets/jili/JL_172.png' },
      { id: 'JL_225', title: 'Dice Game', gameId: 'JL_225', img: '/assets/jili/JL_225.png' },
      { id: 'JL_242', title: 'Dice Game', gameId: 'JL_242', img: '/assets/jili/JL_242.png' },
      { id: 'JL_241', title: 'Dice Game', gameId: 'JL_241', img: '/assets/jili/JL_241.png' },
      { id: 'JL_254', title: 'Dice Game', gameId: 'JL_254', img: '/assets/jili/JL_254.png' },
      { id: 'JL_236', title: 'Dice Game', gameId: 'JL_236', img: '/assets/jili/JL_236.png' },
      { id: 'JL_235', title: 'Dice Game', gameId: 'JL_235', img: '/assets/jili/JL_235.png' },
      { id: 'JL_233', title: 'Dice Game', gameId: 'JL_233', img: '/assets/jili/JL_233.png' },
      { id: 'JL_232', title: 'Dice Game', gameId: 'JL_232', img: '/assets/jili/JL_232.png' },
      { id: 'JL_229', title: 'Dice Game', gameId: 'JL_229', img: '/assets/jili/JL_229.png' },
      { id: 'JL_224', title: 'Dice Game', gameId: 'JL_224', img: '/assets/jili/JL_224.png' },
      { id: 'JL_198', title: 'Dice Game', gameId: 'JL_198', img: '/assets/jili/JL_198.png' },
      { id: 'JL_223', title: 'Dice Game', gameId: 'JL_223', img: '/assets/jili/JL_223.png' },
    ],
    bingo: [
      { id: 'JDB_0_15005', title: 'Bingo Game', gameId: 'JDB_0_15005', img: '/assets/jdb/JDB_0_15005.png' },
      { id: 'JDB_0_15002', title: 'Bingo Game', gameId: 'JDB_0_15002', img: '/assets/jdb/JDB_0_15002.png' },
      { id: 'JDB_0_15001', title: 'Bingo Game', gameId: 'JDB_0_15001', img: '/assets/jdb/JDB_0_15001.png' },
      { id: 'JDB_0_8051', title: 'Bingo Game', gameId: 'JDB_0_8051', img: '/assets/jdb/JDB_0_8051.png' },
      { id: 'JDB_0_8050', title: 'Bingo Game', gameId: 'JDB_0_8050', img: '/assets/jdb/JDB_0_8050.png' },
      { id: 'JDB_0_8049', title: 'Bingo Game', gameId: 'JDB_0_8049', img: '/assets/jdb/JDB_0_8049.png' },
      { id: 'JDB_0_8048', title: 'Bingo Game', gameId: 'JDB_0_8048', img: '/assets/jdb/JDB_0_8048.png' },
      { id: 'JDB_0_8047', title: 'Bingo Game', gameId: 'JDB_0_8047', img: '/assets/jdb/JDB_0_8047.png' },
      { id: 'JDB_0_8046', title: 'Bingo Game', gameId: 'JDB_0_8046', img: '/assets/jdb/JDB_0_8046.png' },
      { id: 'JDB_0_8044', title: 'Bingo Game', gameId: 'JDB_0_8044', img: '/assets/jdb/JDB_0_8044.png' },
      { id: 'JDB_0_8035', title: 'Bingo Game', gameId: 'JDB_0_8035', img: '/assets/jdb/JDB_0_8035.png' },
      { id: 'JDB_0_8028', title: 'Bingo Game', gameId: 'JDB_0_8028', img: '/assets/jdb/JDB_0_8028.png' },
      { id: 'JDB_0_8023', title: 'Bingo Game', gameId: 'JDB_0_8023', img: '/assets/jdb/JDB_0_8023.png' },
      { id: 'JDB_0_8022', title: 'Bingo Game', gameId: 'JDB_0_8022', img: '/assets/jdb/JDB_0_8022.png' },
      { id: 'JDB_0_8021', title: 'Bingo Game', gameId: 'JDB_0_8021', img: '/assets/jdb/JDB_0_8021.png' },
      { id: 'JDB_0_8020', title: 'Bingo Game', gameId: 'JDB_0_8020', img: '/assets/jdb/JDB_0_8020.png' },
      { id: 'JDB_0_8019', title: 'Bingo Game', gameId: 'JDB_0_8019', img: '/assets/jdb/JDB_0_8019.png' },
      { id: 'JDB_0_8018', title: 'Bingo Game', gameId: 'JDB_0_8018', img: '/assets/jdb/JDB_0_8018.png' },
      { id: 'JDB_0_8017', title: 'Bingo Game', gameId: 'JDB_0_8017', img: '/assets/jdb/JDB_0_8017.png' },
      { id: 'JDB_0_8014', title: 'Bingo Game', gameId: 'JDB_0_8014', img: '/assets/jdb/JDB_0_8014.png' },
      { id: 'JDB_0_8007', title: 'Bingo Game', gameId: 'JDB_0_8007', img: '/assets/jdb/JDB_0_8007.png' },
      { id: 'JDB_0_8005', title: 'Bingo Game', gameId: 'JDB_0_8005', img: '/assets/jdb/JDB_0_8005.png' },
      { id: 'JDB_0_8004', title: 'Bingo Game', gameId: 'JDB_0_8004', img: '/assets/jdb/JDB_0_8004.png' },
      { id: 'JDB_0_8003', title: 'Bingo Game', gameId: 'JDB_0_8003', img: '/assets/jdb/JDB_0_8003.png' },
    ]
  };

  const [firstDepositMade, setFirstDepositMade] = useState(true);
  const [needToDepositFirst, setNeedToDepositFirst] = useState(false);
  const [phoneUserUid, setPhoneUserUid] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameType, setGameType] = useState("");
  const [isDepositCheckLoading, setIsDepositCheckLoading] = useState(true);
  const [hasDeposit, setHasDeposit] = useState(false);
  
  const scrollToMiddle = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight / 2,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const checkDepositStatus = async () => {
      setIsDepositCheckLoading(true);
      try {
        const token = sessionStorage.getItem("token"); // Assuming the token is stored in sessionStorage
        const userResponse = await axios.get(`${domain}/user`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const depositResponse = await axios.get(`${domain}/need-to-deposit-first`, {
          withCredentials: true,
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

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const navigate = useNavigate();
  const handleConfirmRecharge = () => {
    // Navigate to recharge page or trigger recharge process
    window.location.href = "/recharge"; // Adjust this path as needed
  };

  const allgame = () => {
    // Navigate to recharge page or trigger recharge process
    window.location.href = "/all-games"; // Adjust this path as needed
  };

  const jili = useCallback(async (gameId) => {
    console.log('Jili game:', gameId);
    try {
      const token = sessionStorage.getItem("token"); // Get the token from session storage
      const response = await axios.post(
        `${domain}/jilireal-test-login/`,
        { GameId: gameId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      const { ErrorCode, Data } = response.data.responseData;
      console.log('Jili game response:', response.data.responseData);
      
      if (ErrorCode === 0) {
        window.location.href = Data;
      }
    } catch (error) {
      console.error('Jili game error:', error);
    }
  }, []);



   const [isLoading, setIsLoading] = useState(true);
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




const handleItemClick = useCallback((path) => {
  
  if (!hasDeposit && !isDepositCheckLoading) {
    setSelectedGame({ game: path.split('/').pop() });
    setOpenDialog(true);
    return;
  }

  if (!path) {
    console.error('No path provided for navigation');
    return;
  }

  try {
    console.log('Navigating to:', path);
    navigate(path);
  } catch (error) {
    console.error('Navigation error:', error);
  }
}, [hasDeposit, isDepositCheckLoading, navigate]);
  


  const contentRef = useRef(null);

const handleTabClick = (index) => {
  setActiveTab(index);
  
  if (contentRef.current) {
    contentRef.current.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};
  
  const SectionHeading = ({ title }) => (
<Box
    sx={{
      fontSize: '15px',
      fontWeight: 800,
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      mb: 5,
      borderLeft: '3px solid #4D8FFF',
      pl: 2, // Add padding to the left
      lineHeight: '1.5', // Adjust line height to control border height
      width: 'fit-content'
    }}
  >
    {title}
  </Box>
);

  const LotteryItem = ({ title, subtitle, desc, img,onClick }) => (
    <Box
    onClick={onClick}
      sx={{
        height: '95px',
        bgcolor: 'rgb(255,142,41)',
        borderRadius: '16px',
        p: 1,
        mb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        color: 'white',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box sx={{ textAlign: 'left', flex: 1 }}>
        <Box sx={{ fontSize: '19px', fontWeight: 700, mb: 1,fontFamily: "Arial, sans-serif" }}>
          {title}
        </Box>
        <Box sx={{ fontSize: '12px', fontWeight: 400, opacity: 0.9, mb: 0.5,fontFamily: "Arial, sans-serif" }}>
          {subtitle}
        </Box>
        <Box sx={{ fontSize: '12px', fontWeight: 400, opacity: 0.9, mb: 0.5,fontFamily: "Arial, sans-serif" }}>
          {desc}
        </Box>
      </Box>
      <Box //This is for the wingo tab
        component="img"
        src={img}
        alt={title}
        sx={{ 
          width: '110px',
          height: 'calc(100% + -10px)',
          objectFit: 'cover',
          borderRadius: '8px',
          ml: 2,
          mt: 1,
          mb: 1,
        }}
      />
    </Box>
  );

 // ...existing code...
 const GameGrid = ({ games, currentPage, setPage, onGameClick }) => {
  const itemsPerPage = 15;
  const currentItems = games.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const totalPages = Math.ceil(games.length / itemsPerPage);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)', // 2 columns for extra small screens (below 600px, which includes your 300px requirement)
          sm: 'repeat(3, 1fr)', // 3 columns for small screens and above
          md: 'repeat(4, 1fr)', // 4 columns for medium screens and above
        },
        gap: 1,
        mb: 2
      }}>
        {currentItems.map((game) => (
         <Box
           key={game.id}
           onClick={() => onGameClick(game.gameId)}
           sx={{
             width: { xs: '100%', sm: 118 }, // Full width on extra small screens, fixed width on larger screens
             height: 140,
             marginRight: 0,
             bgcolor: '#4D8FFF',
             borderRadius: '16px',
             overflow: 'hidden',
             cursor: 'pointer',
             transition: '0.3s',
             '&:hover': {
               transform: 'scale(1.05)'
             }
           }}
         >
           <Box
             component="img"
             src={game.img}
             alt={game.title}
             sx={{
               width: '100%',
               height: '100%',
               objectFit: 'cover',
             }}
           />
         </Box>
        ))}
      </Box>
      
      {totalPages > 1 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: 1,
          mt: 2
        }}>
          <Box 
            onClick={() => setPage(Math.max(0, currentPage - 1))}
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#4D8FFF',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#fff',
              '&:hover': { bgcolor: '#4D8FFF' }
            }}
          >
            {'<'}
          </Box>
          <Box
            onClick={() => setPage(Math.min(totalPages - 1, currentPage + 1))}
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgb(255,142,41)',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#fff',
              '&:hover': { bgcolor: '#4D8FFF' }
            }}
          >
            {'>'}
          </Box>
        </Box>
      )}
    </Box>
  );
};
// ...existing code...

  return (
    <Box sx={{ width: '100%', maxWidth: '4xl', margin: '0 auto' }}>
      <Box sx={{ position: 'relative', px: 1 }}>
        <Box 
          sx={{
            display: 'flex',
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
            position: 'relative',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          
          <Grid 
  container 
  spacing={2} 
  sx={{ 
    mt: 0,
    maxWidth: '100%',
    '& .MuiGrid-item': {
      display: 'flex',
      justifyContent: 'center'
    }
  }} 
  label
>
  {/* First Row (3 items with background images) */}
  {tabs.slice(0, 3).map((tab, index) => (
    <Grid item xs={4} key={tab.id}>
      <Box
        ref={contentRef}
        onClick={() => handleTabClick(index)}
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: 3,
          p: 1,
          width: '100%',
          minHeight: {
            xs: '60px', 
            sm: '80px'
          },
          cursor: "pointer",
          transition: "all 0.3s",
          background: tab.bgImage,
          backgroundSize: "130% 130%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          boxShadow: activeTab === index
            ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
            : "0px 2px 5px rgba(0, 0, 0, 0.1)",
          "&:hover": { transform: "scale(1.05)" },

          // Background overlay for first box
          ...(index === 0 && {
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgb(104,150,234)",
              opacity: 0.6,
              borderRadius: "inherit",
            },
          }),
        }}
      >
        {/* Larger Image Positioned Above the Box - Increased sizes */}
        <Box
          component="img"
          src={tab.img}
          alt={tab.label}
          sx={{
            width: { xs: 75, sm: 110 },  // Increased from 60/100
            height: { xs: 75, sm: 110 }, // Increased from 60/100
            objectFit: "contain",
            position: "absolute",
            top: { xs: "-18px", sm: "-25px" }, // Adjusted for larger images
            zIndex: 3,
          }}
        />
        
        {/* Text below image to keep the box size */}
        <span style={{ 
          fontWeight: "bold", 
          fontSize: "1rem", 
          marginTop: "60px", // Push text lower to maintain box height
          position: "relative", 
          zIndex: 1 
        }}>
          {tab.label}
        </span>
      </Box>
    </Grid>
  ))}

  {/* Second Row (Gradient background with dividers) */}
  <Grid item xs={12}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 0,
        borderRadius: 3,
        position: "relative", // Needed for overlay positioning
        background: "rgb(246,148,114)",
        overflow: "hidden",
        width: '100%',

        // Adding Overlay
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(180, 170, 170, 0)",
          borderRadius: "inherit",
        },
      }}
    >
      {tabs.slice(3, 6).map((tab, index) => (
        <Box
          key={tab.id}
          onClick={() => handleTabClick(index + 3)}
          sx={{
            flex: 1,
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.3s",
            color: "white",
            zIndex: 1, // Keeps text and images above overlay
            "&:hover": { transform: "scale(1.05)" },
            position: "relative",
            py: { xs: 1, sm: 2 }, // Responsive padding

            // Vertical divider except for last item
            "&::after":
              index < 2
                ? {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    top: "10%",
                    width: "2px",
                    height: "80%",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }
                : {},
          }}
        >
          <Box
            component="img"
            src={tab.img}
            alt={tab.label}
            sx={{ 
              width: { xs: 50, sm: 70 },  // Increased from 40/60
              height: { xs: 50, sm: 70 }, // Increased from 40/60
              objectFit: "contain", 
              mb: 1 
            }}
          />
          <br />
          <span style={{ 
            fontWeight: "bold", 
            fontSize: { xs: "0.8rem", sm: "1rem" } 
          }}>
            {tab.label}
          </span>
        </Box>
      ))}
    </Box>
  </Grid>

  {/* Third Row (2 items with solid background colors) */}
  {tabs.slice(6, 8).map((tab, index) => (
    <Grid item xs={6} key={tab.id}>
      <Box
        onClick={() => handleTabClick(index + 6)}
        sx={{
          width: { xs: '100%', sm: 165 },
          height: { xs: 50, sm: 65 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: 3,
          p: 1,
          cursor: "pointer",
          transition: "all 0.3s",
          background: tab.bgcolor,
          color: "white",
          boxShadow: activeTab === index + 6
            ? "0px 4px 10px rgba(0, 0, 0, 0.3)"
            : "0px 2px 5px rgba(0, 0, 0, 0.1)",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center", // Aligns items vertically
            justifyContent: "space-between", // Centers content horizontally
            gap: 1, // Adds space between image and text
            width: '100%'
          }}
        >
          <Box
            component="img"
            src={tab.img}
            alt={tab.label}
            sx={{ 
              width: { xs: 50, sm: 75 },  // Increased from 40/65
              height: { xs: 55, sm: 80 }, // Increased from 45/70
              objectFit: "contain" 
            }}
          />
          <span style={{ 
            fontWeight: "bold", 
            fontSize: { xs: "0.8rem", sm: "1rem" } 
          }}>
            {tab.label}
          </span>
        </Box>
      </Box>
    </Grid>
  ))}
</Grid>

        </Box>
      </Box>

      <Box sx={{ mt: 3, px: 2 }}>
        {activeTab === 1 && (
          <Box>
            <SectionHeading title="Lottery" />
            {lotteryGames.map((game) => (
              <LotteryItem
                key={game.id}
                title={game.title}
                subtitle={game.subtitle}
                desc={game.desc}
                img={game.img}
                onClick={() => handleItemClick(game.path)}
              />
            ))}
          </Box>
        )}
        


{activeTab === 0 && (
  <Box sx={{ width: '100%', overflow: 'hidden' }}>
  <SectionHeading title="Platform Recommended Games" />
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 1,
      mb: 4,
      width: '100%',
      '& > *': {
        width: '100%',
        minWidth: 0,
      }
    }}
  >
    {gamesByTab.flash.slice(0, 9).map((game, index) => (
      <Box 
        key={index}
        onClick={() => {
          if (!hasDeposit && !isDepositCheckLoading) {
            setSelectedGame({ game: 'Flash Game' });
            setOpenDialog(true);
            return;
          }
          jdbcall(game.id);
        }}
        sx={{
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': { transform: 'scale(1.02)' },
        }}
      >
        <img 
          src={game.img} 
          alt={game.title}
          style={{ 
            width: '100%', 
            height: 'auto',
            borderRadius: '8px',
          }} 
        />
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1, 
            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {game.title}
        </Typography>
      </Box>
    ))}
  </Box>
  
  <SectionHeading title="Popular Games" />
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 1,
      mb: 4,
      width: '100%',
      '& > *': {
        width: '100%',
        minWidth: 0,
      }
    }}
  >
    {gamesByTab.popular.slice(0, 9).map((game, index) => (
      <Box 
        key={index}
        onClick={() => {
          if (!hasDeposit && !isDepositCheckLoading) {
            setSelectedGame({ game: 'Flash Game' });
            setOpenDialog(true);
            return;
          }
          jdbcall(game.id);
        }}
        sx={{
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': { transform: 'scale(1.02)' },
        }}
      >
        <img 
          src={game.img} 
          alt={game.title}
          style={{ 
            width: '100%', 
            height: 'auto',
            borderRadius: '8px',
          }} 
        />
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1, 
            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {game.title}
        </Typography>
      </Box>
    ))}
  </Box>
</Box>
)}

{activeTab === 2 && (
  <Box>
    <SectionHeading title="Slot Games" />
    <GameGrid 
      games={gamesByTab.slot}
      currentPage={slotPage}
      setPage={setSlotPage}
      onGameClick={(gameId) => {
        if (!hasDeposit && !isDepositCheckLoading) {
          setSelectedGame({ game: 'Slot Game' });
          setOpenDialog(true);
          return;
        }
        allgame();
      }}
    />
  </Box>
)}


{activeTab === 4 && (
          <Box>
            <SectionHeading title="Casino" />
            {gamesByTab.casino.map((game) => (
              <LotteryItem
                key={game.id}
                title={game.title}
                subtitle={game.subtitle}
                desc={game.desc}
                img={game.img}
                onClick={() => jdbcall(game.gameId)}
              />
            ))}
          </Box>
 )}

{activeTab === 3 && (
  <Box>
    <SectionHeading title="Sports Games" />
    {gamesByTab.sports.map((game) => (
              <LotteryItem
                key={game.id}
                title={game.title}
                subtitle={game.subtitle}
                desc={game.desc}
                img={game.img}
                onClick={() => jdbcall(game.gameId)}
              />
            ))}
  </Box>
)}

{/* {activeTab === 4 && (
  <Box>
    <SectionHeading title="Casino Games" />
    <GameGrid 
      games={gamesByTab.casino}
      currentPage={casinoPage}
      setPage={setCasinoPage}
      onGameClick={(gameId) => {
        if (!hasDeposit && !isDepositCheckLoading) {
          setSelectedGame({ game: 'Casino Game' });
          setOpenDialog(true);
          return;
        }
        jili(gameId);
      }}
    />
  </Box>
)} */}

{activeTab === 5 && (
  <Box>
    <SectionHeading title="Card Games" />
    {gamesByTab.cards.map((game) => (
              <LotteryItem
                key={game.id}
                title={game.title}
                subtitle={game.subtitle}
                desc={game.desc}
                img={game.img}
                onClick={() =>jdbcall(game.gameId)}
              />
            ))}
  </Box>
)}

{activeTab === 6 && (
  <Box>
    <SectionHeading title="Dice Games" />
    <GameGrid 
      games={gamesByTab.dice}
      currentPage={dicePage}
      setPage={setDicePage}
      onGameClick={(gameId) => {
        if (!hasDeposit && !isDepositCheckLoading) {
          setSelectedGame({ game: 'Dice Game' });
          setOpenDialog(true);
          return;
        }
        jdbcall(gameId);
      }}
    />
  </Box>
)}

{activeTab === 7 && (
  <Box>
    <SectionHeading title="Bingo Games" />
    <GameGrid 
      games={gamesByTab.bingo}
      currentPage={bingoPage}
      setPage={setBingoPage}
      onGameClick={(gameId) => {
        if (!hasDeposit && !isDepositCheckLoading) {
          setSelectedGame({ game: 'Bingo Game' });
          setOpenDialog(true);
          return;
        }
        jdbcall(gameId);
      }}
    />
  </Box>
)}
      </Box>
      <RechargeDialog
    open={openDialog}
    onClose={handleCloseDialog}
    onConfirm={handleConfirmRecharge}
    selectedGame={selectedGame}
  />
    </Box>
  );
};

export default TabLayout;