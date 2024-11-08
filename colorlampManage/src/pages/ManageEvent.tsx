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
import { CancelIcon, ChevronRightIcon, PlusBoldIcon } from "@channel.io/bezier-icons";

import {
  callFunction,
  callNativeFunction,
  close,
  getWamData,
  setSize,
} from "../utils/wam";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

interface EventInfo {
  id: number;
  name: string;
  description: string;
  startAt: number;
  endAt: number;
  formId: number;
  userChatIds: string[];
}

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

function EventAddButton(handleBoxClick: () => void) {
  return <Box
    elevation="3"
    borderRadius="20"
    paddingHorizontal={10}
    paddingVertical={20}
    onClick={handleBoxClick}
    style={{ cursor: 'pointer' }}
    width="100%"
    backgroundColor="bgtxt-orange-lighter"
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
          행사 추가
        </Text>
        <Text typo="12" align="left" truncated={3} style={{
          width: "100%",
          textWrap: "wrap",
        }} >
          새로운 행사를 추가합니다.
        </Text>
      </Stack>
      <Icon source={PlusBoldIcon} />
    </Stack>
  </Box>;
}

function ManageEvent() {
  useEffect(() => {
    setSize(450, 700);
  }, []);

  const navigate = useNavigate();
  const events: EventInfo[] = useMemo(() => (getWamData("events") as unknown) as EventInfo[] || [], []);


  return (
    <VStack spacing={16}>
      <HStack justify="between">
        <Text color="txt-black-darkest" typo="24" bold>
          행사 관리
        </Text>
        <Button
          colorVariant="monochrome-dark"
          styleVariant="tertiary"
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
            width="100%"
          >
            {EventButton(event.name, event.description, () => {
              navigate(`/details/${event.id}`);
            })}
          </Box>
        ))}
        <Box
          width="100%">
          {
            EventAddButton(() => {
              navigate("/form/new");
            })
          }
        </Box>
      </Stack>
    </VStack>
  );
}

export default ManageEvent;
