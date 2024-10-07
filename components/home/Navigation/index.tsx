import ChatList from "./ChatList"


export default function Navigation() {

    return (
        <nav
        className={`
        flex-shrink-0 w-1/4`}
        >
        <div className="p-2 flex flex-col h-full">
<ChatList />
        </div>
        </nav>
    )
}