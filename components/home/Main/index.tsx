import Menu from "./Menu"
import ChatInput from "./ChatInput"
import MessageList from "./MessageList"

export default function Main() {
    return (
        <div className="flex-1 relative ">
        <main className='overflow-y-auto  h-full w-full text-black'>
            <Menu />
            <MessageList />
            <ChatInput />
        </main>
        </div>
    )
}