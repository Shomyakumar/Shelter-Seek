import React from 'react';
import { IoHomeOutline, IoPeopleOutline } from 'react-icons/io5';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import dots from "../assets/feature-section1-dottedrows.png"

export default function About() {
  return (
    <div className="bg-[#f2f0f7] py-12">
       <div className="w-11/12 max-w-[1200px] mx-auto rounded-md">

            {/* Intro Section */}
            <div className="py-8 bg-indigo-100">
                <h1 className="text-center text-5xl font-semibold pb-6">About Shelter Seek</h1>
                <p className="text-center text-xl max-w-[800px] mx-auto">
                    Shelter Seek is your one-stop platform connecting students with property owners. Our goal is to make the 
                    search for accommodation stress-free, secure, and tailored to your specific needs.
                </p>
            </div>

            {/* Mission and Vision Section */}
            <div className="py-12 bg-indigo-100 rounded-lg">
                <h2 className="text-center text-4xl font-semibold text-indigo-900 mb-6">Our Mission</h2>
                <p className="text-center text-xl max-w-[800px] mx-auto mb-4">
                    We aim to create a safe and trusted community where students can find affordable and verified accommodation 
                    options, while property owners can easily list and manage their properties.
                </p>
                <div className="flex justify-center py-8">
                    <img className="absolute left-[-100px] top-[-100px] -z-10 hidden md:flex" src={dots} alt="dots"></img>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="py-12">
                <h2 className="text-center text-4xl font-semibold pb-8">Our Core Values</h2>

                <div className="flex flex-wrap justify-center gap-8 py-8">
                    {/* Value 1 */}
                    <div className="p-4 max-w-[250px] flex flex-col gap-2 items-start bg-indigo-100 relative z-10">
                        <div className="m-2">
                            <p className="rounded-full p-2 bg-indigo-900 text-white"><IoPeopleOutline size={24} /></p>
                        </div>
                        <p className="font-semibold text-lg">Community-Driven</p>
                        <p>We build trust through a supportive community that connects students and property owners seamlessly.</p>
                        <img className="absolute left-[-100px] top-[-100px] -z-10 hidden md:flex" src={dots} alt="dots"></img>
                    </div>

                    {/* Value 2 */}
                    <div className="p-4 max-w-[250px] flex flex-col gap-2 items-start bg-indigo-100">
                        <div className="m-2">
                            <p className="rounded-full p-2 bg-indigo-900 text-white"><IoHomeOutline size={24} /></p>
                        </div>
                        <p className="font-semibold text-lg">Verified Listings</p>
                        <p>All properties on our platform are verified to provide transparency and ensure trustworthiness.</p>
                    </div>

                    {/* Value 3 */}
                    <div className="p-4 max-w-[250px] flex flex-col gap-2 items-start bg-indigo-100 relative z-10">
                        <div className="m-2">
                            <p className="rounded-full p-2 bg-indigo-900 text-white"><MdOutlineVerifiedUser size={24} /></p>
                        </div>
                        <p className="font-semibold text-lg">Trusted Partnerships</p>
                        <p>We partner with reliable landlords to offer safe and secure accommodations for students.</p>
                        <img className="absolute right-[-100px] top-[-50px] -z-10 hidden md:flex rotate-90" src={dots} alt="dots"></img>
                    </div>
                </div>
            </div>

        {/* Call to Action */}
        <div className="py-10 w-full flex justify-center">
          <button className="px-6 py-3 bg-indigo-900 text-white text-lg font-semibold rounded-md hover:scale-95 transition-all duration-200">
            Thank you
          </button>
        </div>

      </div>
    </div>
  );
}
