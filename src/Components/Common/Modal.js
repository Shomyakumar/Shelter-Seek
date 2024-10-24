



export default function Modal({modalData}){
    return (
        <div className="fixed inset-0   z-[500] bg-indigo-300 flex justify-center items-center  bg-opacity-10 backdrop-blur-sm ">
            <div className="flex items-center flex-col gap-4 bg-indigo-100 p-4 rounded-md">
                <p className="font-semibold text-xl">{modalData.text1}</p>
                <p className="text-lg">{modalData.text2}</p>
                <div className="flex gap-4 items-center">
                    <button onClick={modalData.btn1Handler}
                       className=" px-4 py-2 rounded-md font-semibold bg-indigo-800 text-white hover:bg-indigo-600"
                    >
                        {modalData.btn1Text}
                    </button>
                    <button onClick={modalData.btn2Handler}
                        className=" px-4 py-2 rounded-md font-semibold bg-indigo-800 text-white hover:bg-indigo-600"
                    >
                        {modalData.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}