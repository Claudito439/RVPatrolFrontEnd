export default function Title({ text, subtext }) {
    return (
        <div className="text-center p-3 md:p-5 my-6" >
            <h1 className="bg-gradient-to-br from-blue-950 via-blue-900 to-yellow-300 dark:from-blue-900 dark:via-blue-600 dark:to-yellow-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl uppercase ">
                {text}
                <span className="sm:block"> {subtext}</span>
            </h1>
        </div>
    )
}