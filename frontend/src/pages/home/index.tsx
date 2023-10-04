import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { socket } from "../../socket";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import { useSearchParams } from "react-router-dom";
import dot from "../../assets/dot.gif";
import { Menu } from "../../shared/components/menu";
import { SystemItemMessage } from "../../shared/components/system-item-message";
import { ChatSkeleton } from "../../shared/components/chat-skeleton";
import { TypeUser } from "../../shared/typing/enuns/TypeUser";
import { Message } from "../../shared/typing/Message";
import { RoomUser } from "../../shared/typing/RoomUser";
import { ContainerPlan } from "../../shared/components/container-plan";
import { ItemMessage } from "../../shared/components/item-message";
import { CardHeaderChat } from "../../shared/components/card-header-chat";
import { ButtonChat } from "../../shared/components/button-chat";
import { TitlePage } from "../../shared/components/title-page";
import {
  backgroundPage,
  ButtonSend,
  CardContainer,
  chatCardBox,
} from "./styles";

export function Home() {
  const [visible, setVisible] = useState(false);
  const [valueInput, setValueInput] = useState<string>("");
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const [typing, setTyping] = useState(false);
  const [messageList, setMessageList] = useState<Array<Message>>([]);
  const useSearch = useSearchParams();
  const paramsRoom = useSearch[0].get("room");
  const typeServiceRoom = paramsRoom ? 1 : 2;
  const [typeService, setTypeService] = useState(typeServiceRoom);
  const smartContactName = "@Dito";
  const standardRoom = "sala-home";

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
    socket.emit("input_message", messageSend, () => {
      setTyping(false);
    });
    setValueInput("");
  };

  const changeCustomerService = (optionService: string) => {
    const changeService = {
      userId: optionService === "chatBot" ? TypeUser.chatbot : TypeUser.client,
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
    <Box sx={backgroundPage}>
      <Menu />
      <Container>
        <Box sx={{ height: "100vh" }}>
          <TitlePage />
          <ContainerPlan roomUrl={paramsRoom} />
        </Box>
      </Container>
      {visible && (
        <Box sx={chatCardBox}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeaderChat openChat={openChat} nameBot={smartContactName} />
            <CardContent sx={CardContainer}>
              <List sx={{ width: "100%" }}>
                <div ref={scrollRef}>
                  {messageList.map((message, index) => (
                    <>
                      {message.userId !== 3 && (
                        <ItemMessage
                          message={message}
                          index={index}
                          nameBot={smartContactName}
                        />
                      )}
                      {message.userId === 3 && (
                        <SystemItemMessage message={message} index={index} />
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
                      <ChatSkeleton />
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
              <Box sx={ButtonSend}>
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
      <ButtonChat openChat={openChat} />
    </Box>
  );
}
