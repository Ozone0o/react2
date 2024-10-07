import ChatInput from "./ChatInput"
import MessageList from "./MessageList"
import Information from "./Information"

export default function Main() {
    return (
        <nav className="flex-grow flex flex-col">
        <main className='overflow-y-auto  border border-[#B4CAEE] flex-grow rounded-2xl m-2 relative'>
            <Information/>
            <MessageList />
            <ChatInput />
        </main>
        </nav>
    )
}