'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { FiSun, FiMoon, FiMenu } from 'react-icons/fi'
import { motion } from 'framer-motion'

export function Navbar() {
    const { theme, setTheme } = useTheme()
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-dark-100/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-dark-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="flex items-center">
                                <span className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl">M</span>
                                <span className="ml-3 text-2xl font-extrabold text-white">Memorix</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/create" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                            Create
                        </Link>
                        <Link href="/review" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                            Review
                        </Link>
                        <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                            Dashboard
                        </Link>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-dark-200 hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors"
                        >
                            {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-dark-200 hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors"
                        >
                            <FiMenu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <motion.div
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                variants={{
                    open: { opacity: 1, height: 'auto' },
                    closed: { opacity: 0, height: 0 }
                }}
                className="md:hidden overflow-hidden"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-dark-100 border-b border-gray-200 dark:border-dark-200">
                    <Link href="/create" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                        Create
                    </Link>
                    <Link href="/review" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                        Review
                    </Link>
                    <Link href="/dashboard" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                        Dashboard
                    </Link>
                </div>
            </motion.div>
        </nav>
    )
} 