import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
import { buttonChat } from "./styles";

interface ButtonChatProps {
  openChat: () => void;
}

export const ButtonChat = ({ openChat }: ButtonChatProps) => {
  return (
    <>
      <Box sx={buttonChat}>
        <Fab color="primary" aria-label="chat" onClick={() => openChat()}>
          <ChatIcon />
        </Fab>
      </Box>
    </>
  );
};
