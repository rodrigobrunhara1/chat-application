import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import TextField from "@mui/material/TextField";
import Face6Icon from "@mui/icons-material/Face6";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { socket } from "../../socket";
import dot from "../../assets/dot.gif";
interface Message {
  userId: number;
  description: string;
  room?: string;
  createdAt?: string;
}

interface RoomUser {
  userId: number;
  room: string | undefined;
}
// User 1 = Pessoa
// User 2 = ChatGpt

export function Home() {
  const [visible, setVisible] = useState(false);
  const [valueInput, setValueInput] = useState<string>("");
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const [typing, setTyping] = useState(false);
  const userId = 1;
  const [messageList, setMessageList] = useState<Array<Message>>([]);

  useEffect(() => {
    const userRoom: RoomUser = {
      userId: userId,
      room: "sala-home",
    };
    console.log("select_room");
    console.log(userRoom);
    socket.emit("select_room", userRoom, (response: Message[]) => {
      setMessageList(response);
      console.log("response->", response);
    });
  }, []);

  useEffect(() => {
    socket.on("typping_message_api", (flag: boolean) => {
      setTyping(flag);
    });
  }, []);

  useEffect(() => {
    socket.on("update_room", (data: Message[]) => {
      console.log("update_room:", data);
      setMessageList([...messageList, ...data]);
    });
  }, [messageList]);

  useEffect(() => {
    if (scrollRef.current) {
      console.log(scrollRef.current);
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messageList, visible, typing]);

  const openChat = () => {
    setVisible((prev) => !prev);
  };

  function validateButton() {
    return valueInput.length === 0;
  }

  const sendMessageChat = () => {
    const messageSend: Message = {
      userId: 1,
      description: valueInput,
      room: "sala-home",
      createdAt: Date.now().toString(),
    };
    console.log(messageSend);
    socket.emit("typping_message", messageSend);
    socket.emit("input_message", messageSend, (response: Message[]) => {
      setTyping(false);
    });
    setValueInput("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {visible && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignContent: "end",
            marginRight: "40px",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 300,
              height: 500,
            },
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "blue" }} aria-label="recipe">
                  {1 == 1 ? <FlutterDashIcon /> : "R"}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings" onClick={() => openChat()}>
                  <CloseIcon />
                </IconButton>
              }
              title="Dito"
              subheader="Contato Inteligente"
            />

            <CardContent
              sx={{
                overflowY: "scroll",
                height: "55%",
                padding: 0,
              }}
            >
              <List sx={{ width: "100%" }}>
                <div ref={scrollRef}>
                  {messageList.map((message, index) => (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: message.userId === 2 ? "blue" : "green",
                          }}
                          aria-label="recipe"
                        >
                          {message.userId === 1 ? (
                            <Face6Icon />
                          ) : (
                            <FlutterDashIcon />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            <Typography variant="subtitle2" gutterBottom>
                              {message.userId === 1 ? "Visitante" : "Dito"} •{" "}
                              <small>{message.createdAt}</small>
                            </Typography>
                          </>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              {message.description}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                  {typing && (
                    <ListItem alignItems="flex-start">
                      <FlutterDashIcon /> <img src={dot} alt="my-gif" />
                    </ListItem>
                  )}
                  {messageList.length === 0 && (
                    <ListItem alignItems="center">
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        textAlign="center"
                      >
                        <p>• • •</p>
                        <i>Seja bem vindo ao contato inteligente DiTO!</i>
                        <p>• • •</p>
                      </Typography>
                    </ListItem>
                  )}
                </div>
              </List>
            </CardContent>
            <CardActions disableSpacing>
              <TextField
                id="outlined-multiline-static"
                multiline
                fullWidth
                rows={2}
                placeholder="Write a message"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
              />
              <Divider />
            </CardActions>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignContent: "end",
                  width: "100%",
                }}
              >
                <Button
                  variant="outlined"
                  endIcon={<SendIcon />}
                  disabled={validateButton()}
                  onClick={() => sendMessageChat()}
                >
                  Send
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      )}
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          left: -20,
          bottom: "50px",
          textAlign: "end",
          "& > :not(style)": { m: 1 },
        }}
      >
        <Fab color="primary" aria-label="chat" onClick={() => openChat()}>
          <ChatIcon />
        </Fab>
      </Box>
    </Box>
  );
}
