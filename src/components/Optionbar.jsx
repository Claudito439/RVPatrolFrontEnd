import { Link } from "react-router-dom";

export default function Optionbar({ Children, text, isHovered, route }) {
    return (
        <Link unstable_viewTransition to={route || '#'} className="relative flex items-center w-full h-12 px-3 mt-2 rounded text-gray-800 hover:bg-yellow-300 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out">
            <Children className="flex-shrink-0" width="1.7rem" height="1.7rem" />
            <span className={`ml-2 text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}>
                {text}
            </span>
        </Link>
    )
}