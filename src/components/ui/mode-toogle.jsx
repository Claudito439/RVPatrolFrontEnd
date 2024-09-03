import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/theme-provider"

export function ModeToggle() {
  const { theme,setTheme } = useTheme()

  return (

    <div className="relative cursor-pointer flex items-center w-full h-12 ">
        <Button className=" cursor-pointer flex items-center w-full h-12 px-3 mt-2 rounded text-gray-800 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out" 
        variant="ghost"  onClick={() => theme==="light" ? setTheme("dark") : setTheme("light") }>
          <Sun className="h-[1.7rem] w-[1.7rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.7rem] w-[1.7rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
    
    </div>
  )
}
