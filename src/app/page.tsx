'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import Link from 'next/link'

export default function Home() {
    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0, 1], [0, -300])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <main className="min-h-screen bg-white dark:bg-dark-100">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-transparent" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                </motion.div>

                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent"
                    >
                        Master Any Subject with Spaced Repetition
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
                    >
                        Create, review, and track your learning progress with our intelligent flashcard system
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link
                            href="/create"
                            className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                        >
                            Get Started
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Why Choose Memorix?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-white dark:bg-dark-200 shadow-lg"
                            >
                                <div className="text-primary-500 mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

const features = [
    {
        title: 'Smart Spaced Repetition',
        description: 'Our algorithm adapts to your learning pace, showing cards at the optimal time for maximum retention.',
        icon: '📊'
    },
    {
        title: 'Beautiful Interface',
        description: 'Enjoy a clean, modern design that makes learning a pleasure. Dark mode support included.',
        icon: '🎨'
    },
    {
        title: 'Track Progress',
        description: 'Visualize your learning journey with detailed statistics and progress tracking.',
        icon: '📈'
    }
] 