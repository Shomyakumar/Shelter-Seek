import { MdOutlineAppRegistration } from "react-icons/md";
import { IoShieldCheckmark, IoOptions } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import dots from "../../assets/feature-section1-dottedrows.png";

export default function Section3() {
    return (
        <div className="relative bg-gradient-to-b from-[#f2f0f7] to-indigo-50 py-8 overflow-hidden">
            {/* Decorative Dots Background */}
            <img className="absolute top-[-100px] left-[-100px] opacity-40 hidden md:block" src={dots} alt="dots" />
            <img className="absolute bottom-[-100px] right-[-100px] opacity-40 hidden md:block" src={dots} alt="dots" />

            <div className="relative w-11/12 max-w-[1200px] mx-auto rounded-lg bg-white shadow-lg py-12 px-6 md:px-12">
                <div className="py-8 text-center">
                    <h2 className="text-4xl font-bold text-indigo-900 pb-4">For Students</h2>
                    <p className="text-lg text-gray-700">Find your perfect room from our extensive listings.</p>
                </div>

                {/* Feature Boxes */}
                <div className="flex flex-wrap justify-center gap-12 py-8">
                    {/* Feature Card 1 */}
                    <div className="p-6 w-[280px] flex flex-col gap-4 items-start bg-indigo-100 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300 relative">
                        <div className="rounded-full p-3 bg-indigo-900 text-white">
                            <IoOptions size={30} />
                        </div>
                        <h3 className="font-bold text-lg text-indigo-900">Wide Range of Choices</h3>
                        <p className="text-gray-700">Choose from a wide range of rooms according to your preference.</p>
                        <img className="absolute left-[-100px] top-[-100px] -z-10 hidden md:block" src={dots} alt="dots" />
                    </div>

                    {/* Feature Card 2 */}
                    <div className="p-6 w-[280px] flex flex-col gap-4 items-start bg-indigo-100 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
                        <div className="rounded-full p-3 bg-indigo-900 text-white">
                            <IoShieldCheckmark size={30} />
                        </div>
                        <h3 className="font-bold text-lg text-indigo-900">Secure Booking</h3>
                        <p className="text-gray-700">Book your room securely through our platform.</p>
                    </div>

                    {/* Feature Card 3 */}
                    <div className="p-6 w-[280px] flex flex-col gap-4 items-start bg-indigo-100 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300 relative">
                        <div className="rounded-full p-3 bg-indigo-900 text-white">
                            <GiReceiveMoney size={30} />
                        </div>
                        <h3 className="font-bold text-lg text-indigo-900">Affordable Options</h3>
                        <p className="text-gray-700">Find rooms that fit your budget without compromising on comfort.</p>
                        <img className="absolute right-[-100px] top-[-50px] -z-10 hidden md:block rotate-90" src={dots} alt="dots" />
                    </div>

                    {/* Feature Card 4 */}
                    <div className="p-6 w-[280px] flex flex-col gap-4 items-start bg-indigo-100 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
                        <div className="rounded-full p-3 bg-indigo-900 text-white">
                            <MdOutlineAppRegistration size={30} />
                        </div>
                        <h3 className="font-bold text-lg text-indigo-900">Verified Listings</h3>
                        <p className="text-gray-700">All our listings are verified to ensure you get what you see.</p>
                    </div>
                </div>

                {/* Call to Action Button */}
                <div className="py-10 w-full flex justify-center">
                    <button className="px-8 py-3 bg-indigo-900 text-white text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300">
                        Start Searching
                    </button>
                </div>
            </div>
        </div>
    );
}
