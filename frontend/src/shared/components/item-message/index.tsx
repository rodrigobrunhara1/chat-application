import dayjs from "dayjs";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import man from "../../../assets/man.png";
import woman from "../../../assets/woman.png";
import { Message } from "../../typing/Message";
import { TypeUser } from "../../typing/enuns/TypeUser";
import Avatar from "@mui/material/Avatar";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import Typography from "@mui/material/Typography";

interface ItemMessageProps {
  message: Message;
  index: number | null | undefined;
  nameBot: any;
}

export const ItemMessage = ({ message, index, nameBot }: ItemMessageProps) => {
  return (
    <>
      <ListItem key={index} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="Logo"
            src={`${
              message.userId === 2
                ? ""
                : message.typeUser === TypeUser.service
                ? woman
                : message.typeUser === TypeUser.client
                ? man
                : ""
            }`}
            sx={{
              bgcolor:
                message.userId === 2
                  ? "#0000ff"
                  : message.typeUser === TypeUser.service
                  ? "gold"
                  : message.typeUser === TypeUser.client
                  ? "aquamarine"
                  : "",
              width: 40,
              height: 40,
            }}
            aria-label="recipe"
          >
            {message.userId === 1 ? "" : <FlutterDashIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography variant="subtitle2" gutterBottom>
                {message.userId === 1
                  ? `@${message.name}`
                  : `@${message.name}` ?? nameBot}{" "}
                • <small>{dayjs(message.createdAt).format("HH:mm A")}</small>
              </Typography>
            </>
          }
          secondary={
            <>
              <Typography variant="caption" display="block" gutterBottom>
                {message.description}
              </Typography>
            </>
          }
        />
      </ListItem>
    </>
  );
};
