"use client"

import { useAppContext } from "@/components/appcontext"
import Button from "@/components/common/Button"
import { ActionType } from "@/reducers/appreducer"
import { LuPanelLeft } from "react-icons/lu"

export default function Menu() {
    const {
        state: { displayNavigation },
        dispatch
    } = useAppContext()
    return (
        <Button
            icon={LuPanelLeft}
            className={`${
                displayNavigation ? "hidden" : ""
            } fixed left-2 top-2`}
            variant='primary'
            onClick={() => {
                dispatch({
                    type: ActionType.UPDATE,
                    field: "displayNavigation",
                    value: true
                })
            }}
        />
    )
}