import { useAppContext } from "@/components/appcontext"
import Markdown from "@/components/common/markdown"
import { AiOutlineRobot } from "react-icons/ai"

export default function MessageList() {
    const {
        state: { messageList,streamingId }
    } = useAppContext()

    return (
        <div className='w-full pt-10 pb-48 text-sky-500'>
            <ul>
                {messageList.map((message) => {
                    const isUser = message.role === "user"
                    return (
                        <li
                            key={message.id}
                            className={`${
                                isUser
                                    ? "bg-transparent rounded-3xl max-w-4xl mx-auto "
                                    : "bg-blue-200  rounded-3xl max-w-4xl mx-auto shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                            }`}
                                                    >
                            <div className='w-full max-w-4xl mx-auto flex space-x-6 px-4 py-6 text-lg'>
                                <div className='text-3xl leading-[1]'>
                                    {isUser ? "😊" : <AiOutlineRobot />}
                                </div>
                                <div className='flex-1 max-w-4xl'>
                                    <Markdown>{`${message.content}${
                                            message.id === streamingId ? "▍" : ""
                                        }`}</Markdown>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
