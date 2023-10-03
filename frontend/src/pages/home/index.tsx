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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { socket } from "../../socket";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useSearchParams } from "react-router-dom";
import { Alert, CardActionArea } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import dot from "../../assets/dot.gif";
import verify from "../../assets/verify.png";
import man from "../../assets/man.png";
import woman from "../../assets/woman.png";
import robotfree from "../../assets/robotfree.png";
import robotpay from "../../assets/robotpay.png";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
interface Message {
  userId: number;
  name: string;
  description: string;
  room?: string;
  createdAt?: Date;
  typeUser?: number;
}

interface RoomUser {
  userId: number;
  room: string | undefined;
}

enum TypeUser {
  client = 1,
  chatbot = 2,
  system = 3,
  service = 4,
}

export function Home() {
  const [visible, setVisible] = useState(false);
  const [valueInput, setValueInput] = useState<string>("");
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const [typing, setTyping] = useState(false);

  const [messageList, setMessageList] = useState<Array<Message>>([]);
  const params = useParams();
  const useSearch = useSearchParams();
  const paramsRoom = useSearch[0].get("room");
  const typeServiceRoom = paramsRoom ? 1 : 2;

  const [typeService, setTypeService] = useState(typeServiceRoom);

  const smartContactName = "@Dito";
  const emptyMessages = "Welcome to DITO smart contact!";
  const standardRoom = "sala-home";

  const packagePlans = [
    "One-time payment",
    "Initial configuration",
    "Training and implementation",
    "Training and implementation",
    "Maintenance and support",
    "Integrations",
    "Advanced customization",
    "Reports and analysis",
  ];
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  useEffect(() => {
    const userRoom: RoomUser = {
      userId: TypeUser.client,
      room: paramsRoom ?? standardRoom,
    };

    socket.emit("select_room", userRoom, (response: Message[]) => {
      setMessageList(response);
    });
  }, []);

  useEffect(() => {
    socket.on("typping_message_api", (flag: boolean) => {
      setTyping(flag);
    });
  }, []);

  useEffect(() => {
    socket.on("change_service", (userId: number) => {
      setTypeService(userId);
    });
  }, []);

  useEffect(() => {
    socket.on("update_room", (data: Message[]) => {
      setMessageList([...messageList, ...data]);
    });
  }, [messageList]);

  useEffect(() => {
    if (scrollRef.current) {
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

  useEffect(() => {
    if (useSearch[0].get("open")) {
      setVisible(true);
    }
  }, []);

  function validateButton() {
    return valueInput.length === 0;
  }

  const sendMessageChat = () => {
    const defaultUser = "RodrigoBrunhara";
    const messageSend: Message = {
      userId: 1,
      name: useSearch[0].get("name") ?? defaultUser,
      description: valueInput,
      room: paramsRoom ?? standardRoom,
      createdAt: new Date(),
      typeUser: paramsRoom ? TypeUser.service : TypeUser.client,
    };
    socket.emit("typping_message", messageSend);
    socket.emit("input_message", messageSend, (response: Message[]) => {
      setTyping(false);
    });
    setValueInput("");
  };

  const changeCustomerService = (optionService: string) => {
    const changeService = {
      userId: optionService === "chatBot" ? 2 : 1,
      room: paramsRoom ?? standardRoom,
    };
    const nameHumanService = "HumanService" + Math.floor(Math.random() * 1000);
    socket.emit("change_customer_service", changeService);
    if (optionService === "human") {
      window.open(
        window.location.href +
          `?room=${changeService.room}&userId=${changeService.userId}&name=${nameHumanService}&open=true`,
        "_blank"
      );
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,113,0.8155637254901961) 36%, rgba(0,212,255,1) 100%)",
        borderRadius: "20px",
      }}
    >
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: "2rem",
            width: "100%",
            background: "aliceblue",
            borderRadius: "15px",
          }}
        >
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Plans
          </Link>
        </Breadcrumbs>
      </div>
      <Container>
        <Box sx={{ height: "100vh" }}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
              marginBottom: "30px",
            }}
            variant="h4"
            color="white"
          >
            Plans
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
            variant="h5"
            color="white"
          >
            Choose one of our intelligent and human contact plans!
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Grid item>
                <Card>
                  <CardActionArea
                    sx={{
                      maxWidth: 250,
                      height: 500,
                      width: 250,
                      borderRadius: "10px",
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        textAlign={"center"}
                        variant="h5"
                        component="div"
                      >
                        FREE
                      </Typography>
                      <Typography
                        gutterBottom
                        textAlign={"center"}
                        variant="h3"
                        component="div"
                      >
                        $0
                      </Typography>

                      <Container sx={{ textAlign: "center", padding: "10px" }}>
                        <img src={robotfree} alt="robotfree" />
                      </Container>

                      {}
                      <Typography
                        gutterBottom
                        textAlign={"center"}
                        component="div"
                      >
                        5 Users
                      </Typography>

                      <Typography
                        gutterBottom
                        textAlign={"center"}
                        component="div"
                      >
                        Human service
                      </Typography>
                      <Typography
                        gutterBottom
                        textAlign={"center"}
                        component="div"
                      >
                        1000 messages
                      </Typography>
                      <Typography
                        gutterBottom
                        textAlign={"center"}
                        component="div"
                      >
                        2000 last seen
                      </Typography>

                      <Container sx={{ textAlign: "center", padding: "10px" }}>
                        <Button variant="contained">Buy</Button>
                      </Container>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item>
                <Card>
                  <CardActionArea
                    sx={{
                      maxWidth: 250,
                      height: 500,
                      width: 250,
                      borderRadius: "10px",
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        textAlign={"center"}
                        variant="h5"
                        component="div"
                      >
                        UNLIMITED
                      </Typography>
                      <Typography
                        gutterBottom
                        textAlign={"center"}
                        variant="h3"
                        component="div"
                      >
                        $119
                      </Typography>
                      <Container sx={{ textAlign: "center", padding: "10px" }}>
                        <img src={robotpay} alt="robotpay" />
                      </Container>
                      <Typography
                        gutterBottom
                        textAlign={"center"}
                        component="div"
                      >
                        30 Users
                      </Typography>
                      <Typography
                        gutterBottom
                        textAlign={"center"}
                        component="div"
                      >
                        Human Service / AI
                      </Typography>
                      <Typography
                        gutterBottom
                        textAlign={"center"}
                        component="div"
                      >
                        Unlimited messages
                      </Typography>
                      <Typography
                        gutterBottom
                        textAlign={"center"}
                        component="div"
                      >
                        Unlimited last seen
                      </Typography>
                      <Container sx={{ textAlign: "center", padding: "10px" }}>
                        <Button variant="contained">Buy</Button>
                      </Container>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item>
                <Container sx={{ width: 500, color: "white" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="white"
                  >
                    Each package includes
                  </Typography>
                  {packagePlans.map((packageItem, index) => (
                    <Typography component="div" key={index} color="white">
                      ✔️ {packageItem}
                    </Typography>
                  ))}

                  <p>
                    <Divider />
                  </p>
                  <Typography component="div" color="white">
                    Highly recommended for companies and developers.
                  </Typography>
                  {paramsRoom && (
                    <Alert severity="warning">
                      Are you using: <strong>🧑‍🤝‍🧑 Human Service</strong>
                    </Alert>
                  )}
                </Container>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {visible && (
        <Box
          sx={{
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
            },
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
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
                  <strong>{smartContactName}</strong>{" "}
                  <img src={verify} alt="verify" />
                </>
              }
              subheader="Smart Contact"
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
                    <>
                      {message.userId !== 3 && (
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
                                    : `@${message.name}` ??
                                      smartContactName}{" "}
                                  •{" "}
                                  <small>
                                    {dayjs(message.createdAt).format("HH:mm A")}
                                  </small>
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
                      )}
                      {message.userId === 3 && (
                        <ListItem key={index} alignItems="center">
                          <Box sx={{ width: 300 }}>
                            <Chip
                              sx={{
                                height: "auto",
                                background: "#feffbd",
                                "& .MuiChip-label": {
                                  display: "block",
                                  whiteSpace: "normal",
                                },
                              }}
                              label={message.description}
                            />
                          </Box>
                        </ListItem>
                      )}
                    </>
                  ))}
                  {typing && (
                    <ListItem alignItems="flex-start">
                      <FlutterDashIcon /> <img src={dot} alt="my-gif" />
                    </ListItem>
                  )}

                  {messageList.length === 0 && (
                    <ListItem alignItems="center">
                      <Stack spacing={1}>
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rounded" width={210} height={60} />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rounded" width={210} height={60} />
                      </Stack>
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
              <IconButton
                aria-label="ChatBot Dito"
                title="ChatBot Dito"
                color={typeService === 2 ? "success" : "default"}
                onClick={() => changeCustomerService("chatBot")}
              >
                <FlutterDashIcon />
              </IconButton>
              <IconButton
                color={typeService === 1 ? "success" : "default"}
                aria-label="Human Service"
                title="Human Service"
                onClick={() => changeCustomerService("human")}
              >
                <Badge badgeContent={"New"} color="info">
                  <CoPresentIcon />
                </Badge>
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
