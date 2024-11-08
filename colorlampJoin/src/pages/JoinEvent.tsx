import { useEffect, useMemo, useCallback } from "react";
import {
  VStack,
  HStack,
  Button,
  Text,
  Icon,
  ButtonGroup,
  Stack,
  Box,
} from "@channel.io/bezier-react";

import { ChevronRightIcon, PlusBoldIcon, CancelIcon } from "@channel.io/bezier-icons";

import {
  callFunction,
  callNativeFunction,
  close,
  getWamData,
  setSize,
} from "../utils/wam";
import { useNavigate } from "react-router-dom";


function EventButton(title: string, description: string, handleBoxClick: () => void) {
  return <Box
    elevation="3"
    borderRadius="20"
    paddingHorizontal={10}
    paddingVertical={20}
    onClick={handleBoxClick}
    style={{ cursor: 'pointer' }}
    width="100%"
  >
    <Stack
      align="center"
      direction="horizontal"
      justify="between"
    >
      <Stack
        align="start"
        direction="vertical"
        justify="between"
        width="100%"
        paddingHorizontal={10}
        spacing={5}
        wrap
      >
        <Text typo="18" bold align="left">
          {title}
        </Text>
        <Text typo="12" align="left" truncated={3} style={{
          width: "100%",
          textWrap: "wrap",
        }} >
          {description}
        </Text>
      </Stack>
      <Icon source={ChevronRightIcon} />
    </Stack>
  </Box>;
}

interface EventInfo {
  id: number;
  name: string;
  description: string;
  startAt: number;
  endAt: number;
  formId: number;
  userChatIds: string[];
}

function JoinEvent() {
  useEffect(() => {
    setSize(600, 600);
  }, []);

  const chatTitle = useMemo(() => getWamData("chatTitle") ?? "", []);

  const appId = useMemo(() => getWamData("appId") ?? "", []);
  const channelId = useMemo(() => getWamData("channelId") ?? "", []);
  const managerId = useMemo(() => getWamData("managerId") ?? "", []);
  const message = useMemo(() => getWamData("message") ?? "", []);
  const chatId = useMemo(() => getWamData("chatId") ?? "", []);
  const chatType = useMemo(() => getWamData("chatType") ?? "", []);
  const broadcast = useMemo(
    () => Boolean(getWamData("broadcast") ?? false),
    []
  );
  const rootMessageId = useMemo(() => getWamData("rootMessageId"), []);
  const userId = useMemo(() => getWamData("userId"), []);
  const events: EventInfo[] = useMemo(() => (getWamData("events") as unknown) as EventInfo[] || [], []);

  const navigate = useNavigate();

  return (
    <Stack
      align="start"
      direction="vertical"
      justify="center"
      paddingHorizontal={30}
      paddingVertical={25}
      borderRadius={"20"}
      spacing={20}
      wrap
    >
      <HStack justify="between" width={"100%"}>
        <Text bold={true} typo="24" align="left">
          행사 참여하기
        </Text>
        <Button
          styleVariant="tertiary"
          colorVariant="monochrome-dark"
          leftContent={CancelIcon}
          onClick={() => close()}
        />
      </HStack>
      <Stack
        align="center"
        direction="vertical"
        justify="start"
        paddingVertical={5}
        spacing={10}
        width="100%"
        wrap
      >
        {events.map((event) => (
          <Box
            key={event.id}
          >
            {EventButton(event.name, event.description, () => {
              navigate(`/form/${event.id}`);
            })}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

export default JoinEvent;
