
export function Header(){
    return(
        <div className={'w-full h-14 flex flex-row justify-between bg-accent-dark'}>
            <div className={'flex flex-row'}>
                <div className={'flex flex-row items-center h-full text-3xl px-3 font-bold text-white'}>
                    Finger Independence
                </div>
                <div className={"flex flex-row items-center h-full text-xl px-3 text-gray-300"}>
                    piano training app
                </div>
            </div>
            <div className={'flex flex-row'}>
                <div className={"flex flex-row items-center h-full text-xl self-end px-3 text-white"}>
                    Login
                </div>
                <div className={"flex flex-row items-center h-full text-xl self-end px-3 text-white"}>
                    Register
                </div>
            </div>


        </div>
    )
}