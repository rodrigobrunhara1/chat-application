import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { ItemMessageContainer } from "./styles";

interface PropsSystemMensagens {
  message: any;
  index: number;
}

export const SystemItemMessage = ({ message, index }: PropsSystemMensagens) => {
  return (
    <ListItem key={index} alignItems="center">
      <Box key={index} sx={{ width: 300 }}>
        <Chip sx={ItemMessageContainer} label={message.description} />
      </Box>
    </ListItem>
  );
};
