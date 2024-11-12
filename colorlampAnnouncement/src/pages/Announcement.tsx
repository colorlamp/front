import { useEffect, useMemo, useCallback, useState } from "react";
import {
  VStack,
  HStack,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  TextArea,
  Select,
  ListItem,
} from "@channel.io/bezier-react";
import { CancelIcon } from "@channel.io/bezier-icons";

import {
  callFunction,
  callNativeFunction,
  close,
  getWamData,
  setSize,
} from "../utils/wam";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

function Announcement() {
  useEffect(() => {
    setSize(390, 390);
  }, []);

  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [selectText, setSelectText] = useState("");
  const [chatIds, setChatIds] = useState([]);
  const [selectEvent, setSelectEvent] = useState(undefined);

  interface EventInfo {
    id: number;
    name: string;
    description: string;
    startAt: number;
    endAt: number;
    formId: number;
    userChatIds: string[];
  }

  const events: EventInfo[] = useMemo(
    () => (getWamData("events") as unknown as EventInfo[]) || [],
    []
  );

  // console.log(events);

  // callFunction(appId, "getEventChatIds")

  async function sendMessageToUserChat() {
    const channelId = window.ChannelIOWam.getWamData("channelId");
    const managerId = window.ChannelIOWam.getWamData("managerId");
    // const chatIdCheck = window.ChannelIOWam.getWamData("chatId");
    // const chatIds = [
    //   "672e5d571bb0913761dd",
    //   "672e468ec05c0831c7ea",
    //   "672e602f504daa5b3acc",
    // ];
    // console.log(chatIdCheck);
    for (const userChatId of chatIds) {
      await window.ChannelIOWam.callNativeFunction({
        name: "writeUserChatMessageAsManager",
        params: {
          channelId,
          userChatId,
          dto: {
            plainText: content,
            managerId,
          },
        },
      });
    }
  }

  const handleSelectEvent = (event: EventInfo) => {
    setSelectEvent(event["id"]);
    setSelectText(event["name"]);
    setChatIds(event.userChatIds);
  }

  return (
    <VStack spacing={16}>
      <HStack justify="between">
        <Text color="txt-black-darkest" typo="24" bold>
          공지하기
        </Text>
        <Button
          colorVariant="monochrome-dark"
          styleVariant="tertiary"
          leftContent={CancelIcon}
          onClick={() => close()}
        />
      </HStack>
      <HStack justify="center">
        <FormControl
          id="form"
          labelPosition="top"
          size="m"
          style={{
            width: 400,
          }}
        >
          <FormLabel typo="16">공지 내용</FormLabel>
          <TextArea
            placeholder="공지 내용을 작성해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            hasError={!!error}
          />
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      </HStack>
      <Select placeholder="공지 대상 선택" text={selectText}>
        {events.map((event) => (
          <div key={event.name} onClick={() => handleSelectEvent(event)}>
            <ListItem content={event.name} />
          </div>
        ))}
      </Select>
      <Button
        colorVariant="blue"
        styleVariant="primary"
        text="공지 전송하기"
        onClick={sendMessageToUserChat}
      />
    </VStack>
  );
}

export default Announcement;
