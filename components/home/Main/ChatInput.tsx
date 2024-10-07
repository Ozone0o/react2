import Button from "@/components/common/Button"
import { MdRefresh } from "react-icons/md"
import { PiStopBold } from "react-icons/pi"
import { IoMdSend } from "react-icons/io";
import TextareaAutoSize from "react-textarea-autosize"
import { useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Message } from "@/types/chat"
import { useAppContext } from "@/components/appcontext"
import { MessageRequestBody } from "@/types/chat"
import { ActionType } from "@/reducers/appreducer"
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { BsPaperclip } from "react-icons/bs";

export default function ChatInput() {
    const [messageText, setMessageText] = useState("")
    const stopRef = useRef(false)
    const {
        state: { messageList, streamingId },dispatch
    } = useAppContext()

    async function send() {
        const message: Message = {
            id: uuidv4(),
            role: "user",
            content: messageText,
type: ""
        }
const messages = messageList.concat([message])
        dispatch({ type: ActionType.ADD_MESSAGE, message })
        doSend( messages )
    }

    async function resend() {
        const messages = [...messageList]
        if (
            messages.length !== 0 &&
            messages[messages.length - 1].role === "assistant"
        ) {
            dispatch({
                type: ActionType.REMOVE_MESSAGE,
                message: messages[messages.length - 1]
            })
            messages.splice(messages.length - 1, 1)
        }
        doSend(messages)
    }

 async function doSend(messages: Message[]) {
const body: MessageRequestBody = { messages }
                setMessageText("")
        const controller = new AbortController()
        const response = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
signal: controller.signal,
                        body: JSON.stringify(body)
        })
        if (!response.ok) {
            console.log(response.statusText)
            return
        }
        if (!response.body) {
            console.log("body error")
            return
        }
        const responseMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: "",
            type: ""
        }
        dispatch({ type: ActionType.ADD_MESSAGE, message: responseMessage })
        dispatch({
            type: ActionType.UPDATE,
            field: "streamingId",
            value: responseMessage.id
        })
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false
        let content = ""
        while (!done) {
            if (stopRef.current) {
stopRef.current = false
                controller.abort()
                                break
            }
            const result = await reader.read()
            done = result.done
            const chunk = decoder.decode(result.value)
            content += chunk
            dispatch({
                type: ActionType.UPDATE_MESSAGE,
                message: { ...responseMessage, content }
            })
        }
        dispatch({
            type: ActionType.UPDATE,
            field: "streamingId",
            value: ""
        })
    }

    return (
        <div className='absolute bottom-5 inset-x-0  pt-10'>
            <div className='w-full mx-auto flex flex-col items-center px-10 space-y-4'>
                {messageList.length !== 0 &&
                    (streamingId !== "" ? (
                        <Button
                            icon={PiStopBold}
                            variant='primary'
                            onClick={() => {
                                stopRef.current = true
                            }}
                            className='font-medium'
                        >
                            停止生成
                        </Button>
                    ) : (
                        <Button
                            icon={MdRefresh}
                            variant='primary'
                            onClick={() => {
                                resend()
                            }}
                            className='font-medium'
                        >
                            重新生成
                        </Button>
                    ))}
                <div className='flex items-center w-full bg-white rounded-lg border-2 border-[#004C9F] py-4'>
                    <TextareaAutoSize
                        className='outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black resize-none border-0 mx-4'
                        placeholder='输入一条消息...'
                        rows={1}
                        value={messageText}
                        onChange={(e) => {
                            setMessageText(e.target.value)
                        }}
                    />
                    <Button
                        className='mx-1 !rounded-lg'
                        icon={HiOutlineFaceSmile}
                        disabled={
                            messageText.trim() === "" || streamingId !== ""
                        }
                        variant='primary'
                    />
                    <Button
                        className='mx-1 !rounded-lg'
                        icon={BsPaperclip}
                        disabled={
                            messageText.trim() === "" || streamingId !== ""
                        }
                        variant='primary'
                    />
                    <Button
                        className='mx-3 !rounded-lg'
                        icon={IoMdSend}
                        disabled={
                            messageText.trim() === "" || streamingId !== ""
                        }
                        variant='outline'
                        onClick={send}
                    />
                </div>
                            </div>
        </div>
    )
}