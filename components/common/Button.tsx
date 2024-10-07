import { ComponentPropsWithoutRef } from "react"
import { IconType } from "react-icons"

type ButtonProps = {
    icon?: IconType
    variant?: "default" | "outline" | "text" | "primary"
} & ComponentPropsWithoutRef<"button">

export default function Button({
    children,
    className = "",
    icon: Icon,
    variant = "default",
    ...props
}: ButtonProps) {
    return (
        <button
            className={`transition-colors inline-flex items-center min-w-[50px] min-h-[50px] rounded px-3 py-1.5
            ${
                variant === "default"
                    ? "text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900"
                    : variant === "outline"
                    ? "text-white  bg-[#004C9F] hover:bg-[#007AFF] "
                    : variant === "primary"
                    ? "bg-white text-[#004C9F] hover:bg-white hover:text-black shadow-sm rounded-lg"
                    : "text-black  bg-transparent hover:bg-gray-200 "
            }
            ${className}`}
            {...props}
        >
            {Icon && <Icon className={`text-3xl ${children ? "mr-1" : ""}`} />}
            {children}
        </button>
    )
}