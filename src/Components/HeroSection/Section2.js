import { MdOutlineAppRegistration } from "react-icons/md";
import { LuArrowUpWideNarrow } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";

export default function Section2() {
    return (
        <div className="relative bg-gradient-to-b from-[#eacffe] to-[#f2f0f7] py-16 overflow-hidden">
            <div className="relative w-11/12 max-w-[1200px] mx-auto rounded-lg bg-white shadow-lg py-12 px-6 md:px-12">
                
                <div className="py-8 text-center">
                    <h2 className="text-4xl font-bold text-indigo-900 pb-4 leading-tight">
                        For House Owners
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        List your property with us and reach out to thousands of potential tenants, making the process easy, fast, and effective.
                    </p>
                </div>

                {/* Feature Boxes */}
                <div className="flex flex-wrap justify-center gap-12 py-8">
                    {/* Card 1 */}
                    <div className="p-6 w-[280px] flex flex-col items-center gap-4 bg-[#f7e6ff] border border-[#8a31ce] shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
                        <div className="rounded-full p-3 bg-[#a843f5] text-white">
                            <MdOutlineAppRegistration size={30} />
                        </div>
                        <h3 className="font-bold text-lg text-[#8a31ce] leading-snug">
                            Easy Listing
                        </h3>
                        <p className="text-center text-gray-600 leading-relaxed">
                            List your property quickly and effortlessly using our user-friendly platform.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-6 w-[280px] flex flex-col items-center gap-4 bg-[#f7e6ff] border border-[#8a31ce] shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
                        <div className="rounded-full p-3 bg-[#a843f5] text-white">
                            <LuArrowUpWideNarrow size={30} />
                        </div>
                        <h3 className="font-bold text-lg text-[#8a31ce] leading-snug">
                            Wider Reach
                        </h3>
                        <p className="text-center text-gray-600 leading-relaxed">
                            Your listing will be seen by thousands of potential tenants across various platforms.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-6 w-[280px] flex flex-col items-center gap-4 bg-[#f7e6ff] border border-[#8a31ce] shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
                        <div className="rounded-full p-3 bg-[#a843f5] text-white">
                            <BiSupport size={30} />
                        </div>
                        <h3 className="font-bold text-lg text-[#8a31ce] leading-snug">
                            Customer Support
                        </h3>
                        <p className="text-center text-gray-600 leading-relaxed">
                            Our dedicated support team is ready to assist you every step of the way.
                        </p>
                    </div>
                </div>

                {/* Call to Action Button */}
                <div className="py-10 w-full flex justify-center">
                    <button className="px-8 py-3 bg-[#8a31ce] text-white text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300">
                        List your property
                    </button>
                </div>
            </div>
        </div>
    );
}
