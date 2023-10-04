import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import verify from "../../../assets/verify.png";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";

interface CardHeaderProps {
  openChat: () => void;
  nameBot: string;
}

export const CardHeaderChat = ({ openChat, nameBot }: CardHeaderProps) => {
  return (
    <>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "blue" }} aria-label="recipe">
            {<FlutterDashIcon /> ?? "D"}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={() => openChat()}>
            <CloseIcon />
          </IconButton>
        }
        title={
          <>
            <strong>{nameBot}</strong> <img src={verify} alt="verify" />
          </>
        }
        subheader="Smart Contact"
      />
    </>
  );
};
