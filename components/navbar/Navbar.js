import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  // State to track whether the mobile menu is open
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm fixed w-full z-50 shadow-lg px-4 sm:px-8 rounded-lg">
      <div className="container flex flex-wrap justify-between items-center py-3">
        {/* Company Name with Advanced Text Decoration */}
        <motion.div
          className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Flashcard SaaS
        </motion.div>

        {/* Hamburger Icon for Mobile */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden lg:flex flex-grow items-center justify-center space-x-6 sm:space-x-8 mt-2 sm:mt-0">
          <Link href="/" legacyBehavior>
            <a className="hover:text-blue-500 transition-colors duration-300">
              Home
            </a>
          </Link>
          <SignedIn>
            <Link href="/flashcards" legacyBehavior>
              <a className="hover:text-blue-500 transition-colors duration-300">
                My Flashcards
              </a>
            </Link>
            <Link href="/generate" legacyBehavior>
              <a
                className="block text-center text-gray-800 hover:bg-gray-100 py-2 rounded transition-colors duration-300"
                onClick={toggleMenu} // Close menu on link click
              >
                Generate
              </a>
            </Link>
          </SignedIn>
          <Link href="/AboutUs" legacyBehavior>
            <a className="hover:text-blue-500 transition-colors duration-300">
              About
            </a>
          </Link>
          <Link href="/Contact" legacyBehavior>
            <a className="hover:text-blue-500 transition-colors duration-300">
              Contact
            </a>
          </Link>
        </div>

        {/* Action Buttons with Animated Border */}
        <SignedOut>
          <div className="hidden lg:flex space-x-2 sm:space-x-4 mt-2 sm:mt-0">
            <motion.a
              className="bg-white text-black rounded-full px-4 sm:px-5 py-2 font-semibold relative overflow-hidden group"
              whileHover={{ backgroundColor: "#000", color: "#fff" }}
              href="/sign-in"
            >
              Log In
              <motion.span
                className="absolute inset-0 w-full h-full border-2 border-transparent rounded-full group-hover:border-white"
                initial={{ scaleX: 0, scaleY: 0 }}
                animate={{ scaleX: 1, scaleY: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </motion.a>
            <motion.a
              className="bg-black text-white rounded-full px-4 sm:px-5 py-2 font-semibold relative overflow-hidden group"
              whileHover={{ backgroundColor: "#fff", color: "#000" }}
              href="/sign-up"
            >
              Sign In
              <motion.span
                className="absolute inset-0 w-full h-full border-2 border-transparent rounded-full group-hover:border-black"
                initial={{ scaleX: 0, scaleY: 0 }}
                animate={{ scaleX: 1, scaleY: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </motion.a>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="hidden lg:flex space-x-2 sm:space-x-4 mt-2 sm:mt-0">
            <UserButton />
          </div>
        </SignedIn>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden mt-2 space-y-4">
          <Link href="/" legacyBehavior>
            <a
              className="block text-center text-gray-800 hover:bg-gray-100 py-2 rounded transition-colors duration-300"
              onClick={toggleMenu} // Close menu on link click
            >
              Home
            </a>
          </Link>
          <SignedIn>
            {" "}
            <Link href="/flashcards" legacyBehavior>
              <a
                className="block text-center text-gray-800 hover:bg-gray-100 py-2 rounded transition-colors duration-300"
                onClick={toggleMenu} // Close menu on link click
              >
                My Flashcards
              </a>
            </Link>{" "}
            <Link href="/generate" legacyBehavior>
              <a
                className="block text-center text-gray-800 hover:bg-gray-100 py-2 rounded transition-colors duration-300"
                onClick={toggleMenu} // Close menu on link click
              >
                Generate
              </a>
            </Link>{" "}
          </SignedIn>
          <Link href="/AboutUs" legacyBehavior>
            <a
              className="block text-center text-gray-800 hover:bg-gray-100 py-2 rounded transition-colors duration-300"
              onClick={toggleMenu} // Close menu on link click
            >
              About
            </a>
          </Link>
          <Link href="/Contact" legacyBehavior>
            <a
              className="block text-center text-gray-800 hover:bg-gray-100 py-2 rounded transition-colors duration-300"
              onClick={toggleMenu} // Close menu on link click
            >
              Contact
            </a>
          </Link>
          <SignedOut>
            <div className="hidden lg:flex space-x-2 sm:space-x-4 mt-2 sm:mt-0">
              <motion.a
                className="bg-white text-black rounded-full px-4 sm:px-5 py-2 font-semibold relative overflow-hidden group"
                whileHover={{ backgroundColor: "#000", color: "#fff" }}
                href="/sign-in"
              >
                Log In
                <motion.span
                  className="absolute inset-0 w-full h-full border-2 border-transparent rounded-full group-hover:border-white"
                  initial={{ scaleX: 0, scaleY: 0 }}
                  animate={{ scaleX: 1, scaleY: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </motion.a>
              <motion.a
                className="bg-black text-white rounded-full px-4 sm:px-5 py-2 font-semibold relative overflow-hidden group"
                whileHover={{ backgroundColor: "#fff", color: "#000" }}
                href="/sign-up"
              >
                Sign In
                <motion.span
                  className="absolute inset-0 w-full h-full border-2 border-transparent rounded-full group-hover:border-black"
                  initial={{ scaleX: 0, scaleY: 0 }}
                  animate={{ scaleX: 1, scaleY: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </motion.a>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="hidden lg:flex space-x-2 sm:space-x-4 mt-2 sm:mt-0">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      )}
    </div>
  );
}
