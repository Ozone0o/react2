import { useAppContext } from "@/components/appcontext"
import Button from "@/components/common/Button"
import { MdInfo } from "react-icons/md"

export default function Toolbar() {
    return (
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-500 flex p-2 justify-between rounded-r-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)]'>
<Button
                                icon={MdInfo}
                variant='primary'
            />
        </div>
    )
}