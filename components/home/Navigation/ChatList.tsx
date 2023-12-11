import { groupByDate } from "@/common/util"
import { Chat } from "@/types/chat"
import { useMemo, useState } from "react"
import ChatItem from "./ChatItem"

export default function ChatList() {
    const [chatList, setChatList] = useState<Chat[]>([
        {
            id: "1",
            title: "入学以后能转专业吗？",
            updateTime: Date.now()
        },
        {
            id: "2",
            title: "保研、读研比例？就业情况？中外合作办学专业是否也可以保研？",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "3",
            title: "北京邮电大学（宏福校区）和北京邮电大学是怎么回事？",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "4",
            title: "学校是否设置专业级差？",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "5",
            title: "学校是否设置本硕博贯通培养实验班？",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "6",
            title: "学校2023年本科招生的变化点和亮点有哪些？",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "7",
            title: "学校有没有各省本科招生咨询电话和咨询QQ群？",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "8",
            title: "学校2023年海南学院中外合作办学专业的招生计划？",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "9",
            title: "学校今年招生专业中有新增专业吗？",
            updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: "15",
            title: "保研、读研比例？就业情况？中外合作办学专业是否也可以保研？",
            updateTime: Date.now() + 2
        }
    ])
    const [selectedChat, setSelectedChat] = useState<Chat>()
    const groupList = useMemo(() => {
        return groupByDate(chatList)
    }, [chatList])
    return (
        <div className='flex-1 mb-[48px] mt-2 flex flex-col overflow-y-auto'>
            {groupList.map(([date, list]) => {
                return (
                    <div key={date}>
                        <div className='sticky top-0 z-10 p-3 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded shadow-[0_0_15px_rgba(0,0,0,0.2)]'>
                            {date}
                        </div>
                        <ul>
                            {list.map((item) => {
                                const selected = selectedChat?.id === item.id
                                return (
                                    <ChatItem
                                        key={item.id}
                                        item={item}
                                        selected={selected}
                                        onSelected={(chat) => {
                                            setSelectedChat(chat)
                                        }}
                                    />
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}