import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  VStack,
  HStack,
  Button,
  Text,
  Icon,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  TextField,
  SegmentedControl,
  SegmentedControlItem,
  FormGroup,
  Checkbox,
  CheckedState
} from "@channel.io/bezier-react";
import { CancelIcon, SendIcon } from "@channel.io/bezier-icons";

import { callFunction, close, getWamData, setSize } from "../utils/wam";
import { styled } from "styled-components";
import { Navigate, useNavigate, useParams } from "react-router-dom";

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
function Form() {
  useEffect(() => {
    setSize(600, 500);
    // 서버로부터 폼 데이터 가져오기
    fetchFormData();
  }, []);

  const chatTitle = useMemo(() => getWamData("chatTitle") ?? "", []);
  const [name, setName] = useState("");
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});

  const fetchFormData = async () => {
    const event = events.find(e => e.id === Number(eventId));
    if (event) {
      setName(event.name);
    }
    const result = await callFunction(appId, "getFormFields", { eventId: parseInt(eventId) });
    console.log("result", result);
    console.log("result.form.content", JSON.parse(result.result.form.content));
    setFormFields(JSON.parse(result.result.form.content));
    // setFormFields([
    //   {
    //     label: "이름",
    //     type: "text",
    //     placeholder: "이름을 입력하세요",
    //     description: "이름을 입력하세요",
    //   },
    //   {
    //     label: "사이즈",
    //     type: "segmented",
    //     options: ["S", "M", "L", "XL"],
    //     description: "사이즈를 선택하세요",
    //   },
    //   {
    //     label: "색상",
    //     type: "checkbox",
    //     options: ["빨강", "파랑", "노랑", "초록"],
    //     description: "색상을 선택하세요",
    //   },
    // ])
  };

  const handleInputChange = (fieldName: string, value: string) => {
    const field = formFields.find(f => f.label === fieldName);
    if (field?.type === "checkbox") {
      setFormData((prev) => {
        const currentValues: string[] = prev[fieldName] || [];
        if (currentValues.includes(value)) {
          return { ...prev, [fieldName]: currentValues.filter(v => v !== value) };
        } else {
          return { ...prev, [fieldName]: [...currentValues, value] };
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    }
  };

  const appId = useMemo(() => getWamData("appId") ?? "", []);
  const userId = useMemo(() => getWamData("userId") ?? "", []);

  const events: EventInfo[] = useMemo(() => (getWamData("events") as unknown) as EventInfo[] || [], []);



  const navigate = useNavigate();
  const { eventId } = useParams();

  const handleSubmit = () => {
    // 입력된 데이터 취합
    const dataToSubmit = formData;
    callFunction(appId, "submitFormAnswer", {
      userId: userId,
      eventId: parseInt(eventId),
      answer: JSON.stringify(dataToSubmit)
    });
    navigate(`/finishForm/${name}`);
  };


  return (
    <VStack spacing={16} marginTop={10}>
      <HStack justify="between">
        <Text color="txt-black-darkest" typo="24" bold>
          {name}
        </Text>
        <Button
          colorVariant="monochrome-dark"
          styleVariant="tertiary"
          leftContent={CancelIcon}
          onClick={() => close()}
        />
      </HStack>
      <VStack justify="start" spacing={10}>
        {formFields.map((field) => (
          <FormControl
            id=""
            labelPosition="top"
            size="m"
          >
            <FormLabel>{field.label}</FormLabel>
            {field.type === "text" ? (
              <TextField
                placeholder={field.placeholder}
                value={formData[field.label] || ""}
                onChange={(e) => handleInputChange(field.label, (e.target as HTMLInputElement).value)}
              />
            ) : field.type === "segmented" ? (
              <SegmentedControl
                onValueChange={
                  (value) => handleInputChange(field.label, value)
                }
              >
                {
                  field.options.map((option) => (
                    <SegmentedControlItem key={option} value={option} >
                      {option}
                    </SegmentedControlItem >
                  ))
                }
              </SegmentedControl>
            ) : field.type === "checkbox" ? (

              <FormGroup
                direction="horizontal"
                spacing={10}
              >
                {
                  field.options.map((option) => (
                    <Checkbox
                      key={option}
                      checked={formData[field.label]?.includes(option)}
                      onCheckedChange={(checked: CheckedState) => {
                        handleInputChange(field.label, option);
                      }}
                    >
                      {option}
                    </Checkbox>
                  ))
                }
              </FormGroup>
            ) : null}
            {/* <FormHelperText>
              {field.description}
            </FormHelperText> */}
            {/* <FormErrorMessage>
              Error!
            </FormErrorMessage> */}
          </FormControl>
        ))}
      </VStack>
      <Button onClick={handleSubmit} text="전송하기" leftContent={SendIcon} styleVariant="primary" />
    </VStack>
  );
}

export default Form;
