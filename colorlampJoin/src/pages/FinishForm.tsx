import { useEffect, useMemo, useCallback } from "react";
import {
  VStack,
  HStack,
  Button,
  Text,
  Icon,
  ButtonGroup,
} from "@channel.io/bezier-react";
import { CancelIcon, CheckAllIcon, SendIcon } from "@channel.io/bezier-icons";

import {
  callFunction,
  callNativeFunction,
  close,
  getWamData,
  setSize,
} from "../utils/wam";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";

const CenterTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

function FinishForm() {
  const { eventTitle } = useParams()
  useEffect(() => {
    setSize(600, 300);
  }, []);


  return (
    <VStack spacing={16} marginTop={10} justify="center" align="center">
      <Text color="txt-black-darkest" typo="24" bold>
        {eventTitle}
      </Text>
      <Text color="txt-black-darkest" typo="16">
        {eventTitle} 참여 신청이 완료되었습니다.
        문의가 있으면 담당자에게 문의해주세요.
      </Text>
      <Button
        colorVariant="green"
        text="완료하기"
        leftContent={CheckAllIcon}
        onClick={() => close()}
      />
    </VStack>
  );
}

export default FinishForm;
