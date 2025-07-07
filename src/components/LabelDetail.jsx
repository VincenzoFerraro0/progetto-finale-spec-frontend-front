export default function LabelDetail({ text }) {
    return (

        <div
            className="
                    inline-block bg-white text-black hover:bg-[#008cff] hover:text-white font-bold py-2 px-4 
                    rounded-full shadow-lg hover:shado transition- duration-30 ease-in-out
                    text-sm uppercase tracking-wider cursor-pointer"
        >
            {text}
        </div>

    )
}