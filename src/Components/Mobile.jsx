// import React, { useEffect, useState } from "react";
// import { Box, Container, useMediaQuery, IconButton } from "@mui/material";
// import Draggable from "react-draggable";
// import { useLocation } from "react-router-dom";
// import telegramIcon from "../../public/headerIcon/telegramIcon.png"
// const Mobile = ({ children }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 20 });
//   const location = useLocation();

//   useEffect(() => {
//     // Disable scrolling on the document body
//     document.body.style.overflow = "hidden";

//     // Load saved position from localStorage
//     const savedPosition = localStorage.getItem('chatButtonPosition');
//     if (savedPosition) {
//       setPosition(JSON.parse(savedPosition));
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const isSmallScreen = useMediaQuery("(max-width:600px)");

//   const handleClick = () => {
//     if (!isDragging) {
//       window.location.href = "/service";
//     }
//   };

//   const handleClick2 = () => {
//     if (!isDragging) {
//       window.location.href = "/tele.me";
//     }
//   };

//   const handleDragStop = (e, data) => {
//     setIsDragging(false);
//     const newPosition = { x: data.x, y: data.y };
//     setPosition(newPosition);
//     localStorage.setItem('chatButtonPosition', JSON.stringify(newPosition));
//   };

//   const showDraggable = ["/home", "/login", "/register"].includes(location.pathname);

//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       minHeight="100vh"
//       bgcolor="grey"
//     >
//       <Container
//         maxWidth={isSmallScreen ? false : "xs"}
//         sx={{
//           height: "100vh",
//           overflow: "hidden",
//           position: "relative",
//           padding: 0,
//           margin: 0,
//           width: "100%",
//           maxWidth: "100%",
//         }}
//       >
//         <Box
//           bgcolor="#f2f2f1"
//           textAlign="center"
//           minHeight="100%"
//           maxHeight="100vh"
//           width="100%"
//           paddingX={0}
//           sx={{
//             overflowY: "auto",
//             "&::-webkit-scrollbar": {
//               display: "none",
//             },
//             wordWrap: "break-word",
//           }}
//         >
//           {children}
//         </Box>
//         {showDraggable && (
//           <Draggable
//             position={position}
//             onStart={() => setIsDragging(false)}
//             onDrag={() => setIsDragging(true)}
//             onStop={handleDragStop}
//           >
            
//             <Box
//               position="absolute"
//               bottom={82}
//               right={32}
//               zIndex={1000}
//             >
//               <IconButton
//                 color="primary"
//                 onClick={handleClick2}
//                 onTouchEnd={handleClick}
//               >
//                 <img src={telegramIcon} style={{width:"62px",height:"60px"}}/>
//               </IconButton>
//               <br></br>
//               <IconButton
//                 color="primary"
//                 onClick={handleClick}
//                 onTouchEnd={handleClick}
//               >
//                 <img src="https://in.piccdn123.com/static/_template_/orange/img/icon_sevice.png?v=2" alt="Customer Care" style={{ width:58 , height: 60 }} />
//               </IconButton>
//             </Box>
//           </Draggable>
          

          
//         )}
//       </Container>
//     </Box>
//   );
// };


// export default Mobile;


import React, { useEffect, useState } from "react";
import { Box, Container, useMediaQuery, IconButton } from "@mui/material";
import Draggable from "react-draggable";
import { useLocation } from "react-router-dom";
import telegramIcon from "../../public/headerIcon/telegramIcon.png";

const Mobile = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 20 });
  const location = useLocation();

  useEffect(() => {
    // Disable scrolling on the document body
    document.body.style.overflow = "hidden";

    // Load saved position from localStorage
    const savedPosition = localStorage.getItem('chatButtonPosition');
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleClick = () => {
    if (!isDragging) {
      window.location.href = "/service";
    }
  };

  const handleClick2 = () => {
    if (!isDragging) {
      window.location.href = "/tele.me";
    }
  };

  const handleDragStop = (e, data) => {
    setIsDragging(false);
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    localStorage.setItem('chatButtonPosition', JSON.stringify(newPosition));
  };

  const showDraggable = ["/home", "/login", "/register"].includes(location.pathname);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="grey"
    >
      <Container
        maxWidth={isSmallScreen ? false : "xs"}
        sx={{
          height: "100vh",
          overflow: "hidden",
          position: "relative",
          padding: 0,
          margin: 0,
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Box
          bgcolor="#f2f2f1"
          textAlign="center"
          minHeight="100%"
          maxHeight="100vh"
          width="100%"
          paddingX={0}
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            wordWrap: "break-word",
          }}
        >
          {children}
        </Box>
        {showDraggable && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              pointerEvents: 'none' // This allows clicks to pass through to underlying elements
            }}
          >
         <Draggable
  position={position}
  onStart={(e, data) => {
    setIsDragging(true);
    return true; // Allow dragging to start
  }}
  onDrag={() => setIsDragging(true)}
  onStop={(e, data) => {
    // Check if this was a click rather than a drag
    if (!isDragging || (data.x === 0 && data.y === 0)) {
      setIsDragging(false);
    } else {
      handleDragStop(e, data);
      // Short delay before allowing clicks again
      setTimeout(() => setIsDragging(false), 100);
    }
  }}
  cancel=".cancel-drag" // Add this class to elements that shouldn't trigger dragging
>
  <Box
    position="absolute"
    bottom={82}
    right={32}
    zIndex={1000}
    sx={{
      pointerEvents: 'auto'
    }}
  >
    <IconButton
      className="cancel-drag" // Add this class
      color="primary"
      onClick={(e) => {
        if (!isDragging) handleClick2(e);
      }}
      onTouchEnd={(e) => {
        if (!isDragging) handleClick2(e);
      }}
    >
      <img src={telegramIcon} style={{width:"62px", height:"60px"}} alt="Telegram" />
    </IconButton>
    <br />
    <IconButton
      className="cancel-drag" // Add this class
      color="primary"
      onClick={(e) => {
        if (!isDragging) handleClick(e);
      }}
      onTouchEnd={(e) => {
        if (!isDragging) handleClick(e);
      }}
    >
      <img
        src="https://in.piccdn123.com/static/_template_/orange/img/icon_sevice.png?v=2"
        alt="Customer Care"
        style={{ width: 58, height: 60 }}
      />
    </IconButton>
  </Box>
</Draggable>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Mobile;




// import React, { useEffect, useState, useRef } from "react";
// import { Box, Container, useMediaQuery, IconButton } from "@mui/material";
// import Draggable from "react-draggable";
// import { useLocation } from "react-router-dom";
// import telegramIcon from "../../public/headerIcon/telegramIcon.png";

// const Mobile = ({ children }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 20 });
//   const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

//   const location = useLocation();
//   const isSmallScreen = useMediaQuery("(max-width:600px)");

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     const savedPosition = localStorage.getItem("chatButtonPosition");
//     if (savedPosition) {
//       setPosition(JSON.parse(savedPosition));
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const handleDragStart = (e, data) => {
//     setStartPosition({ x: data.x, y: data.y });
//     setIsDragging(false); // Assume it's a click initially
//   };

//   const handleDragStop = (e, data) => {
//     const distance = Math.sqrt(
//       Math.pow(data.x - startPosition.x, 2) +
//       Math.pow(data.y - startPosition.y, 2)
//     );

//     if (distance > 5) {
//       setIsDragging(true); // Significant movement = drag
//     } else {
//       setIsDragging(false); // Minimal movement = regular click
//     }

//     const newPosition = { x: data.x, y: data.y };
//     setPosition(newPosition);
//     localStorage.setItem("chatButtonPosition", JSON.stringify(newPosition));
//   };

//   const handleClickService = () => {
//     if (!isDragging) {
//       window.location.href = "/service";
//     }
//   };

//   const handleClickTelegram = () => {
//     if (!isDragging) {
//       window.location.href = "/tele.me";
//     }
//   };

//   const showDraggable = ["/home", "/login", "/register"].includes(location.pathname);

//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       minHeight="100vh"
//       bgcolor="grey"
//     >
//       <Container
//         maxWidth={isSmallScreen ? false : "xs"}
//         sx={{
//           height: "100vh",
//           overflow: "hidden",
//           position: "relative",
//           padding: 0,
//           margin: 0,
//           width: "100%",
//           maxWidth: "100%",
//         }}
//       >
//         <Box
//           bgcolor="#f2f2f1"
//           textAlign="center"
//           minHeight="100%"
//           maxHeight="100vh"
//           width="100%"
//           paddingX={0}
//           sx={{
//             overflowY: "auto",
//             "&::-webkit-scrollbar": {
//               display: "none",
//             },
//             wordWrap: "break-word",
//           }}
//         >
//           {children}
//         </Box>

//         {showDraggable && (
//           <Box
//             sx={{
//               position: "absolute",
//               width: "100%",
//               height: "100%",
//               top: 0,
//               left: 0,
//               pointerEvents: "none", // Let clicks pass through to content below
//             }}
//           >
//             <Draggable
//               position={position}
//               onStart={handleDragStart}
//               onStop={handleDragStop}
//               bounds="parent"
//             >
//               <Box
//                 position="absolute"
//                 bottom={82}
//                 right={32}
//                 zIndex={1000}
//                 sx={{
//                   pointerEvents: "auto",
//                   cursor: isDragging ? "grabbing" : "grab",
//                 }}
//               >
//                 <IconButton
//                   color="primary"
//                   onDoubleClick={(e) => {
//                     if (!isDragging) handleClickTelegram();
//                   }}
//                   sx={{ cursor: "pointer" }}
//                 >
//                   <img
//                     src={telegramIcon}
//                     style={{ width: "62px", height: "60px" }}
//                     alt="Telegram"
//                   />
//                 </IconButton>
//                 <br />
//                 <IconButton
//                   color="primary"
//                   onDoubleClick={(e) => {
//                     if (!isDragging) handleClickService();
//                   }}
//                   sx={{ cursor: "pointer" }}
//                 >
//                   <img
//                     src="https://in.piccdn123.com/static/_template_/orange/img/icon_sevice.png?v=2"
//                     alt="Customer Care"
//                     style={{ width: 58, height: 60 }}
//                   />
//                 </IconButton>
//               </Box>
//             </Draggable>
//           </Box>
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default Mobile;


// import React, { useEffect, useState } from "react";
// import { Box, Container, useMediaQuery, IconButton, Button } from "@mui/material";
// import Draggable from "react-draggable";
// import { useLocation } from "react-router-dom";
// import telegramIcon from "../../public/headerIcon/telegramIcon.png"
// const Mobile = ({ children }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 20 });
//   const location = useLocation();

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     const savedPosition = localStorage.getItem("chatButtonPosition");
//     if (savedPosition) {
//       setPosition(JSON.parse(savedPosition));
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const isSmallScreen = useMediaQuery("(max-width:600px)");

//   const handleDragStop = (e, data) => {
//     setIsDragging(false);
//     const newPosition = { x: data.x, y: data.y };
//     setPosition(newPosition);
//     localStorage.setItem("chatButtonPosition", JSON.stringify(newPosition));
//   };

//   const showDraggable = ["/home", "/login", "/register"].includes(location.pathname);
//   const showDesktopIcon = ["/home"].includes(location.pathname); 

//   return (
//     <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="grey">
//       <Container
//         maxWidth={isSmallScreen ? false : "xs"}
//         sx={{ height: "100vh", overflow: "hidden", position: "relative", padding: 0, margin: 0, width: "100%" }}
//       >
//         <Box
//           bgcolor="#f2f2f1"
//           textAlign="center"
//           minHeight="100%"
//           width="100%"
//           sx={{
//             overflowY: "auto",
//             "&::-webkit-scrollbar": { display: "none" },
//             wordWrap: "break-word",
//           }}
//         >
//           {children}
//         </Box>

//         {showDraggable && (
//           <Draggable position={position} onStart={() => setIsDragging(false)} onDrag={() => setIsDragging(true)} onStop={handleDragStop}>
//             <Box position="absolute" bottom={82} right={32} zIndex={1000}>
//               <IconButton color="primary">
//                 <img src={telegramIcon} style={{ width: "60px", height: "60px" }} />
//               </IconButton>
//               <br />
//               <IconButton color="primary">
//                 <img src="https://in.piccdn123.com/static/_template_/orange/img/icon_sevice.png?v=2" alt="Customer Care" style={{ width: 60, height: 60 }} />
//               </IconButton>
//             </Box>
//           </Draggable>
//         )}

//         {/* Floating "Add to Desktop" Button */}
//         {showDesktopIcon && (<Button
//           variant="contained"
//           color="primary"
//           sx={{
//             position: "fixed",
//             bottom: 100,
//             left: "50%",
//             transform: "translateX(-50%)",
//             zIndex: 1200,
//             padding: "5px 10px",
//             fontSize: "10px",
//             fontWeight: "bold",
//             borderRadius: "50px",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//             backgroundColor:"rgb(255,149,42)",
          
//           }}
//         >
//           {/* <img src ="https://res.inbofa999.com/india/upload/1099/c3034099e4e0172c75d00063c14f1afb.png" style={{
//             width:"25px"
//           }}/> */}
//           Add to Desktop
//         </Button>)}
//       </Container>
//     </Box>
//   );
// };

// export default Mobile;




// import React, { useEffect, useState } from "react";
// import { Box, Container, useMediaQuery, IconButton, Button } from "@mui/material";
// import Draggable from "react-draggable";
// import { useLocation } from "react-router-dom";
// import telegramIcon from "../../public/headerIcon/telegramIcon.png"
// const Mobile = ({ children }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 20 });
//   const location = useLocation();

//   useEffect(() => {
//     const savedPosition = localStorage.getItem("chatButtonPosition");
//     if (savedPosition) {
//       setPosition(JSON.parse(savedPosition));
//     }
//   }, []);

//   const isSmallScreen = useMediaQuery("(max-width:600px)");

//   const handleDragStop = (e, data) => {
//     setIsDragging(false);
//     const newPosition = { x: data.x, y: data.y };
//     setPosition(newPosition);
//     localStorage.setItem("chatButtonPosition", JSON.stringify(newPosition));
//   };

//   const showDraggable = ["/home", "/login", "/register"].includes(location.pathname);
//   const showDesktopIcon = ["/home"].includes(location.pathname);

//   return (
//     <Box 
//       className="min-h-screen bg-gray-200"
//     >
//       <Container
//         maxWidth={isSmallScreen ? false : "xs"}
//         className="h-screen relative p-0 m-0 w-full"
//       >
//         <Box
//           className="min-h-full w-full bg-[#f2f2f1] text-center overflow-y-auto"
//           sx={{
//             wordWrap: "break-word",
//             // Only hide scrollbar while maintaining functionality
//             "&::-webkit-scrollbar": { display: "none" },
//             scrollbarWidth: "none", // For Firefox
//             msOverflowStyle: "none", // For IE/Edge
//           }}
//         >
//           {children}
//         </Box>

//         {showDraggable && (
//           <Draggable 
//             position={position} 
//             onStart={() => setIsDragging(false)} 
//             onDrag={() => setIsDragging(true)} 
//             onStop={handleDragStop}
//           >
//             <Box className="absolute bottom-20 right-8 z-50">
//               <IconButton color="primary">
//                 <img 
//                   src={telegramIcon} 
//                   className="w-16 h-16" 
//                   alt="Telegram"
//                 />
//               </IconButton>
//               <br />
//               <IconButton color="primary">
//                 <img 
//                   src="https://in.piccdn123.com/static/_template_/orange/img/icon_sevice.png?v=2" 
//                   alt="Customer Care" 
//                   className="w-16 h-16"
//                 />
//               </IconButton>
//             </Box>
//           </Draggable>
//         )}

//         {showDesktopIcon && (
//           <Button
//             variant="contained"
//             className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 px-3 py-1 text-sm font-bold rounded-full"
//             sx={{
//               backgroundColor: "rgb(255,149,42)",
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//             }}
//           >
//             Add to Desktop
//           </Button>
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default Mobile;



/*

import React, { useEffect, useState } from "react";
import { Box, Container, useMediaQuery, IconButton, Button } from "@mui/material";
import Draggable from "react-draggable";
import { useLocation } from "react-router-dom";
import telegramIcon from "../../public/headerIcon/telegramIcon.png"

const Mobile = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 20 });
  const location = useLocation();

  useEffect(() => {
    // ❌ ISSUE 1: This prevents scrolling globally
    document.body.style.overflow = "hidden";
    const savedPosition = localStorage.getItem("chatButtonPosition");
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleDragStop = (e, data) => {
    setIsDragging(false);
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    localStorage.setItem("chatButtonPosition", JSON.stringify(newPosition));
  };

  const showDraggable = ["/home", "/login", "/register"].includes(location.pathname);
  const showDesktopIcon = ["/home"].includes(location.pathname);
  
  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="grey">
      <Container
        maxWidth={isSmallScreen ? false : "xs"}
        // ❌ ISSUE 2: Container has overflow hidden and height constraint
        sx={{ height: "100vh", overflow: "hidden", position: "relative", padding: 0, margin: 0, width: "100%" }}
      >
        <Box
          bgcolor="#f2f2f1"
          textAlign="center"
          minHeight="100%"
          width="100%"
          sx={{
            // ❌ ISSUE 3: Conflicting overflow settings
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
            wordWrap: "break-word",
          }}
        >
          {children}
        </Box>

       
        
        </Container>
        </Box>
      );
    };
    
    export default Mobile;
*/