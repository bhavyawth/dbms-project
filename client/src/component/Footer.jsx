import React from "react";
import { Twitter, Linkedin, Github, Home } from "lucide-react";

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/yourprofile", Icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/in/yourprofile", Icon: Linkedin },
  { name: "GitHub", href: "https://github.com/yourprofile", Icon: Github },
];

const Footer = () => {
  return (
    <footer className="bg-[#121417] text-gray-400 font-sans py-10 px-6 sm:px-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">

        <div className="text-center md:text-left space-y-2">
          <h2 className="text-white font-bold text-xl tracking-wider"><div className="text-2xl font-poppins font-semibold tracking-wider text-gray-100 flex items-center">
         <Home className="mr-1"/> Rent<span className="text-gray-600">N</span><span className="text-neutral-0">Go</span>
        </div></h2>
          <p className="text-sm max-w-xs mx-auto md:mx-0">
            Your trusted platform to find the perfect flat. Dark, sleek, and simply amazing.
          </p>
          <p className="text-xs mt-4 opacity-70">&copy; 2025 RentNGo. All rights reserved.</p>
        </div>


        <div className="flex space-x-8">
          {socialLinks.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="hover:text-white transition-colors duration-300"
            >
              <Icon size={24} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
