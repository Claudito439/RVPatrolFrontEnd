import React, { useState } from 'react';
import { BarChartIcon, FileTextIcon, HomeIcon, MagnifyingGlassIcon, MaskOnIcon, PersonIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Optionbar from "./Optionbar";
import { ModeToggle } from './ui/mode-toogle';
import { useAuth } from '@/context/AuthProvider';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { logout } = useAuth();

    return (
        <>
            {/* Botón de hamburguesa para móviles */}
            <button
                className="fixed top-4 left-4 z-20 bg-white p-2 border border-gray-700 rounded-xl dark:bg-gray-900 md:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                <HamburgerMenuIcon className="dark:text-white w-6 h-6" />
            </button>

            {/* Overlay para cerrar el sidebar en móviles */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-card  border-r border-gray-950 rounded-r-xl items-start h-full overflow-hidden text-gray-400 transition-all duration-300 ease-in-out
                ${isOpen ? 'w-64' : 'w-0'} 
                md:w-16 md:hover:w-48`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="w-full">
                    <Link unstable_viewTransition to={'/'} className="relative cursor-pointer flex items-center w-full h-12 px-3 mt-2 rounded text-gray-800  dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out">
                        <img src="/logo.png" className="flex-shrink-0 w-12" alt="logo emi" />
                        <span className={`ml-2 text-md font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}>
                            Control
                        </span>
                    </Link>
                    <div className="flex flex-col items-start w-full mt-3 border-t border-gray-700 gap-2">
                        <Optionbar route='/' Children={HomeIcon} text="Inicio" isHovered={isHovered || isOpen} />
                        <Optionbar route='dashboard' Children={BarChartIcon} text="Estadísticas" isHovered={isHovered || isOpen} />
                        <Optionbar route='reports' Children={FileTextIcon} text="Documentos" isHovered={isHovered || isOpen} />
                        <Optionbar route='users' Children={PersonIcon} text="Usuarios" isHovered={isHovered || isOpen} />

                    </div>
                    {/** 
                     <div className="flex flex-col items-start w-full mt-3 border-t border-gray-700 gap-2">
                        <Optionbar Children={HomeIcon} text="Opción 1" isHovered={isHovered || isOpen} />
                        <Optionbar Children={MagnifyingGlassIcon} text="Opción 2" isHovered={isHovered || isOpen} />
                        <Optionbar Children={BarChartIcon} text="Opción 3" isHovered={isHovered || isOpen} />
                        <Optionbar Children={FileTextIcon} text="Opción 4" isHovered={isHovered || isOpen} />
                    </div>
                    */}

                </div>
                <div className="flex flex-col items-center justify-start w-full  mt-auto">
                    <ModeToggle></ModeToggle>

                    <button onClick={logout} className="relative cursor-pointer flex items-center w-full  rounded text-gray-800 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out">
                        <Optionbar Children={PersonIcon} text="Cerrar Sesion" isHovered={isHovered || isOpen} />

                    </button>
                </div>
            </div>
        </>
    )
}