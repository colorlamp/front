import { useEffect, useMemo, useCallback, useState } from "react";
import {
  VStack,
  HStack,
  Button,
  Text,
  Icon,
  ButtonGroup,
} from "@channel.io/bezier-react";
import { CancelIcon, SendIcon } from "@channel.io/bezier-icons";

import {
  callFunction,
  callNativeFunction,
  close,
  getWamData,
  setSize,
} from "../utils/wam";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const CenterTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;
interface EventInfo {
  id: number;
  name: string;
  description: string;
  startAt: number;
  endAt: number;
  formId: number;
  userChatIds: string[];
}

interface Result {
  userId: string;
  content: string;
}
function EventDetail() {
  useEffect(() => {
    setSize(1000, 400);
  }, []);

  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const { eventId } = useParams();
  const events: EventInfo[] = useMemo(
    () => (getWamData("events") as unknown as EventInfo[]) || [],
    []
  );
  const event = events.find((e) => e.id === Number(eventId));
  const navigate = useNavigate();

  const appId = useMemo(() => getWamData("appId") ?? "", []);
  useEffect(() => {
    async function fetchEventDetails() {
      setLoading(true);
      try {
        const params = { eventId: parseInt(eventId) };
        const fetchedResults = await callFunction(
          appId,
          "getFormAnswers",
          params
        );
        console.log(fetchedResults);

        // fetchedResults가 배열이 아닐 경우 빈 배열로 설정
        setResults(fetchedResults.result.answers);
      } catch (error) {
        console.error("Failed to fetch event details:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    if (eventId && appId) {
      fetchEventDetails();
    }
  }, [eventId, appId]);

  console.log(results);

  return (
    <VStack spacing={16}>
      <HStack justify="between">
        <Text color="txt-black-darkest" typo="24" bold>
          {event?.name} 신청 내역
        </Text>
        <Button
          colorVariant="monochrome-dark"
          styleVariant="tertiary"
          leftContent={CancelIcon}
          onClick={() => close()}
        />
      </HStack>
      {loading ? ( // 로딩 중일 때 표시할 내용
        <Text color="txt-black-darkest" typo="18">
          로딩 중...
        </Text>
      ) : (
        <VStack>
          {results.map((r, index) => (
            <Text color="txt-black-darkest" typo="18" key={index}>
              {r?.content}
            </Text>
          ))}
        </VStack>
      )}

      <Button
        colorVariant="blue"
        styleVariant="primary"
        text="이전 페이지로 돌아가기"
        onClick={() => {
          navigate("/manageEvent");
        }}
      />
    </VStack>
  );
}

export default EventDetail;
