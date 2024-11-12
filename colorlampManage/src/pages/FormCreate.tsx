import { FormEvent, useEffect, useMemo, useState } from "react";
import {
    VStack,
    HStack,
    Button,
    Text,
    FormControl,
    FormLabel,
    TextField,
    SegmentedControl,
    SegmentedControlItem,
    FormGroup,
    Checkbox,
    CheckedState,
    Divider,
    FormHelperText,
    ButtonGroup
} from "@channel.io/bezier-react";
import { CancelIcon, SendIcon } from "@channel.io/bezier-icons";

import { callFunction, close, getWamData, setSize } from "../utils/wam";
import { styled } from "styled-components";
import { Form, Navigate, useNavigate, useParams } from "react-router-dom";

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
function FormCreate() {
    useEffect(() => {
        setSize(600, 700);
        // 서버로부터 폼 데이터 가져오기
    }, []);

    const chatTitle = useMemo(() => getWamData("chatTitle") ?? "", []);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState({});

    // 새로운 폼 필드를 추가하기 위한 상태
    const [newField, setNewField] = useState({
        label: "",
        type: "text",
        placeholder: "",
        description: "",
        options: [] as string[],
    });

    // 옵션을 관리하기 위한 상태
    const [optionInput, setOptionInput] = useState("");

    // 옵션 추가 함수
    const addOption = () => {
        if (optionInput.trim() !== "") {
            setNewField({
                ...newField,
                options: [...newField.options, optionInput.trim()],
            });
            setOptionInput("");
        }
    };

    // 옵션 삭제 함수
    const removeOption = (option: string) => {
        setNewField({
            ...newField,
            options: newField.options.filter((opt) => opt !== option),
        });
    };

    // 새로운 폼 필드를 폼 필드 목록에 추가하는 함수
    const addFormField = () => {
        setFormFields([...formFields, newField]);
        // 새로운 필드 초기화
        setNewField({
            label: "",
            type: "text",
            placeholder: "",
            description: "",
            options: [],
        });
        console.log(formFields);
    };

    const appId = useMemo(() => getWamData("appId") ?? "", []);


    const handleSubmit = async () => {
        // 입력된 데이터 취합
        const dataToSubmit = formFields;
        callFunction(appId, "createNewEventSPARCS", {
            name: name,
            description: description,
            form: JSON.stringify(dataToSubmit),
        }).then((result) => { close(); });

    };

    return (<div style={{ overflowY: 'auto', height: '100%' }}>
        <VStack spacing={16} marginTop={10}>
            <HStack justify="between">
                <Text color="txt-black-darkest" typo="24" bold>
                    이벤트 추가
                </Text>
                <Button
                    colorVariant="monochrome-dark"
                    styleVariant="tertiary"
                    leftContent={CancelIcon}
                    onClick={() => close()}
                />
            </HStack>
            <VStack spacing={4}>
                <FormControl>
                    <FormLabel>새로운 이밴트 이름</FormLabel>
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>이밴트 설명</FormLabel>
                    <TextField
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormControl>
                <Divider />
                <FormControl>
                    <FormLabel>새로운 항목 라벨명</FormLabel>
                    <TextField
                        value={newField.label}
                        onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>라벨 설명</FormLabel>
                    <TextField
                        value={newField.description}
                        onChange={(e) => setNewField({ ...newField, description: e.target.value })}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>타입</FormLabel>
                    <SegmentedControl
                        value={newField.type}
                        onValueChange={(value) => setNewField({ ...newField, type: value })}
                    >
                        <SegmentedControlItem value="text">텍스트</SegmentedControlItem>
                        <SegmentedControlItem value="segmented">세그먼트</SegmentedControlItem>
                        <SegmentedControlItem value="checkbox">체크박스</SegmentedControlItem>
                    </SegmentedControl>
                </FormControl>
                {newField.type !== "text" && (
                    <FormControl>
                        <FormLabel>옵션</FormLabel>
                        <HStack>
                            <TextField
                                value={optionInput}
                                onChange={(e) => setOptionInput(e.target.value)}
                                placeholder="옵션을 입력하세요"
                            />
                            <Button text="추가" onClick={addOption} />
                        </HStack>
                        <HStack spacing={2} marginTop={2}>
                            {newField.options.map((option) => (
                                <Button key={option} onClick={() => removeOption(option)} text={option} styleVariant="tertiary" colorVariant="monochrome" />
                            ))}
                        </HStack>
                    </FormControl>
                )}
            </VStack>
            <ButtonGroup justify="center">
                <Button text="필드 추가" onClick={addFormField} />
                <Button onClick={() => { handleSubmit(); }} text="전송하기" leftContent={SendIcon} styleVariant="primary" />
            </ButtonGroup>
            <Divider />
            <VStack spacing={4}>
                {formFields.map((field) => {
                    if (field.type === "text") {
                        return (
                            <FormControl key={field.label}>
                                <FormLabel>{field.label}</FormLabel>
                                <TextField />
                            </FormControl>
                        );
                    } else if (field.type === "segmented") {
                        return (
                            <FormControl key={field.label}>
                                <FormLabel>{field.label}</FormLabel>
                                <SegmentedControl
                                >
                                    {field.options.map((option) => (
                                        <SegmentedControlItem key={option} value={option}>{option}</SegmentedControlItem>
                                    ))}
                                </SegmentedControl>
                            </FormControl>
                        );
                    } else if (field.type === "checkbox") {
                        return (
                            <FormControl key={field.label}>
                                <FormLabel>{field.label}</FormLabel>
                                <FormGroup direction="horizontal">
                                    {field.options.map((option) => (
                                        <Checkbox
                                            key={option}
                                        >
                                            {option}
                                        </Checkbox>
                                    ))}
                                </FormGroup>
                                <FormHelperText>{field.description}</FormHelperText>
                            </FormControl>
                        );
                    }
                })}
            </VStack>
        </VStack></div>
    );
}

export default FormCreate;
