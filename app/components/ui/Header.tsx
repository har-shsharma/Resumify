'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed w-full px-[45px] pt-[40px] flex justify-between items-center bg-transparent z-90">
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}>
                <Link href="/" className="text-[24px] font-medium tracking-wide text-white/60 hover:text-white transition cursor-pointer">
                    RESUMIFY
                </Link>
            </motion.div>

            <nav className="hidden md:flex gap-6 text-[24px] font-medium text-white/60">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}>
                    <Link href="/create-resume" className="hover:text-white transition">Create</Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}>
                    <Link href="/about-us" className="hover:text-white transition">About Us</Link>
                </motion.div>
            </nav>

            <div className="md:hidden z-20 text-white/60">
                <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
                    {isOpen ? (
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                        >
                            <X size={28} />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ rotate: 180 }}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Menu size={28} />
                        </motion.div>
                    )}
                </button>
            </div>

            {isOpen && (
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-full left-0 w-full flex flex-col items-center py-4 md:hidden backdrop-blur"
                >
                    <Link href="/create-resume" className="py-2 text-[24px] font-medium text-white/60 hover:text-white transition">Create</Link>
                    <Link href="/about-us" className="py-2 text-[24px] font-medium text-white/60 hover:text-white transition">About Us</Link>
                </motion.nav>
            )}
        </header>
    );
}

export default Header;
