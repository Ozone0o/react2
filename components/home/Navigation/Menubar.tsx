import { useAppContext } from "@/components/appcontext"
import Button from "@/components/common/Button"
import { ActionType } from "@/reducers/appreducer"
import { HiPlus } from "react-icons/hi"
import { LuPanelLeft } from "react-icons/lu"

export default function Menubar() {
    const { dispatch } = useAppContext()
    return (
        <div className='flex space-x-2'>
            <Button
                icon={HiPlus}
                variant='primary'
                className='flex-1'
            >
                新建对话
            </Button>
            <Button
                icon={LuPanelLeft}
                variant='primary'
                onClick={() => {
                    dispatch({
                        type: ActionType.UPDATE,
                        field: "displayNavigation",
                        value: false
                    })
                }}
            />
        </div>
    )
}