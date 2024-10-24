
// bg-gradient-to-r from-[#f2f0f7] to-indigo-100

export default function Section1() {
    return (
        <div className="bg-[#f2f0f7] py-16">
            <div className="w-11/12 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">

                {/* Left part of the page */}
                <div className="md:w-6/12 text-center md:text-left">
                    <h1 className="text-[48px] md:text-[64px] font-bold leading-tight text-indigo-900">
                        Welcome to <br /> Shelter Seek
                    </h1>
                    <p className="text-xl text-gray-700 mb-6 md:mb-10 mt-4">
                        Your one-stop solution for finding and listing rooms.
                    </p>
                    <button className="px-8 py-3 bg-indigo-800 text-white text-lg font-semibold
                                       rounded-lg shadow-lg hover:scale-105 transition-all duration-200">
                        Get Started
                    </button>
                </div>

                {/* Image part */}
                <div className="md:w-5/12 py-10">
                    <div className="relative group">
                        <img
                            className="rounded-lg shadow-lg transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
                            src="https://img.freepik.com/free-photo/small-hotel-room-interior-with-double-bed-bathroom_1262-12489.jpg?size=626&ext=jpg&ga=GA1.1.362276051.1725382996&semt=ais_hybrid"
                            alt="bedroom"
                        />
                        {/* Decorative Overlay */}
                        <div className="absolute inset-0 rounded-lg bg-indigo-900 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}
