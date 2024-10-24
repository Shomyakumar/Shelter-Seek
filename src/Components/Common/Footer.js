import { GrInstagram } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineAppRegistration } from "react-icons/md";
import { LuArrowUpWideNarrow } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";

export default function Footer() {
    return (
        <div className="bg-indigo-900 py-8">
            <div className="w-11/12 max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
                {/* Brand Section */}
                <div className="flex flex-col items-center sm:items-start">
                    <p className="text-2xl text-white font-semibold">Shelter Seek</p>
                    <p className="text-white font-semibold text-lg  hidden md:inline mt-2">
                        - Keep Exploring & <br /> keep Enjoying
                    </p>
                </div>

                {/* Quick Links Section */}
                <div className="hidden md:block">
                    <h3 className="text-white font-semibold">Quick Links</h3>
                    <ul className="text-white space-y-2">
                        <li><Link to="/about" className="hover:underline">About Us</Link></li>
                        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                        <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
                    
                    </ul>
                </div>

              

                {/* Contact Information Section */}
                <div className="text-center md:text-left">
                    <h3 className="text-white font-semibold">Contact Us</h3>
                    <p className="text-white">Phone: (91) 45145-99056</p>
                    <p className="text-white">Email: shelterseek421@gmail.com</p>
                </div>

                {/* Copyright and Social Links */}
                <div className="text-center">
                    <p className="text-white">Copyright ©2024</p>
                    <p className="text-white font-semibold ">Designed by Shomya</p>
                    <p className="text-white font-semibold text-lg">Follow me on</p>
                    <div className="flex justify-center gap-4 mt-2">
                        <Link to="https://www.instagram.com/invites/contact/?i=1f6eifg9px192&utm_content=fkhuuwn">
                            <p className="text-xl text-white"><GrInstagram /></p>
                        </Link>
                        <Link to="https://www.linkedin.com/in/shomya-kumar-9b06a7220">
                            <p className="text-xl text-white"><FaLinkedin /></p>
                        </Link>
                        <Link to="https://github.com/Shomyakumar">
                            <p className="text-xl text-white"><FaGithub /></p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
