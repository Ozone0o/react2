import Button from "@/components/common/Button"
import { MdRefresh } from "react-icons/md"
import { PiLightningFill, PiStopBold } from "react-icons/pi"
import { FiSend } from "react-icons/fi"
import TextareaAutoSize from "react-textarea-autosize"
import { useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Message } from "@/types/chat"
import { useAppContext } from "@/components/appcontext"
import { MessageRequestBody } from "@/types/chat"
import { ActionType } from "@/reducers/appreducer"

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
        <div className='absolute bottom-0 inset-x-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[12%] to-black/10 to-[54.73%] pt-10 '>
            <div className='w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4'>
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
                <div className='flex items-end w-full border border-black/20 bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] py-4'>
                    <div className='mx-3 mb-2.5 text-sky-500'>
                        <PiLightningFill />
                    </div>
                    <TextareaAutoSize
                        className='outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black resize-none border-0'
                        placeholder='输入一条消息...'
                        rows={1}
                        value={messageText}
                        onChange={(e) => {
                            setMessageText(e.target.value)
                        }}
                    />
                    <Button
                        className='mx-3 !rounded-lg'
                        icon={FiSend}
                        disabled={
                            messageText.trim() === "" || streamingId !== ""
                        }
                        variant='primary'
                        onClick={send}
                    />
                </div>
                            </div>
        </div>
    )
}