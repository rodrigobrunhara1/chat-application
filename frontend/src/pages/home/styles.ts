import { SxProps } from "@mui/material";

export const backgroundPage = {
  flexGrow: 1,
  background:
    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,113,0.8155637254901961) 36%, rgba(0,212,255,1) 100%)",
  borderRadius: "20px"
} as SxProps;

export const chatCardBox = {
  display: "flex",
  justifyContent: "end",
  alignContent: "end",
  marginRight: "40px",
  flexWrap: "wrap",
  position: "absolute",
  right: 0,
  bottom: "120px",
  "& > :not(style)": {
    m: 1,
    width: 300,
    height: 500,
    borderRadius: "10px",
  }
} as SxProps;

export const CardContainer = {
  overflowY: "scroll",
  height: "55%",
  padding: 0
} as SxProps;

export const ButtonSend = {
  display: "flex",
  justifyContent: "end",
  alignContent: "end",
  width: "100%"
} as SxProps;