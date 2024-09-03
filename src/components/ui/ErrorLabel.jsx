export default function ErrorLabel({error}) {
    return (
        error && <span className=' text-yellow-300 text-sm italic text-border'>{error.message}</span>
    )
} 