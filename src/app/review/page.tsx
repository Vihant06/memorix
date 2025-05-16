'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { FiCheck, FiX, FiClock } from 'react-icons/fi'

export default function ReviewPage() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [cards, setCards] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        try {
            const stored = localStorage.getItem('flashcards')
            setCards(stored ? JSON.parse(stored) : [])
        } catch (err) {
            setCards([])
        }
        setLoading(false)
    }, [])

    const currentCard = cards[currentCardIndex]

    const handleResponse = (response: 'easy' | 'hard') => {
        // TODO: Implement spaced repetition logic
        setIsFlipped(false)
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1)
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-white dark:bg-dark-100">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 py-20">
                    <div>Loading...</div>
                </div>
            </main>
        )
    }

    if (!cards.length) {
        return (
            <main className="min-h-screen bg-white dark:bg-dark-100">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 py-20">
                    <h1 className="text-2xl font-bold mb-8">Review Cards</h1>
                    <div className="text-gray-500">No cards to review. Create some flashcards first!</div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-white dark:bg-dark-100">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Review Cards</h1>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                        <FiClock className="w-5 h-5" />
                        <span>Next review: {currentCard.nextReview}</span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentCard.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="relative h-64 perspective-1000"
                    >
                        <div
                            className={`w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''
                                }`}
                        >
                            {/* Front of card */}
                            <div
                                className={`absolute w-full h-full backface-hidden p-6 rounded-xl bg-white dark:bg-dark-200 shadow-lg border border-gray-200 dark:border-dark-300 cursor-pointer ${isFlipped ? 'hidden' : ''
                                    }`}
                                onClick={() => setIsFlipped(true)}
                            >
                                <div className="h-full flex items-center justify-center text-center">
                                    <p className="text-xl">{currentCard.front}</p>
                                </div>
                            </div>

                            {/* Back of card */}
                            <div
                                className={`absolute w-full h-full backface-hidden p-6 rounded-xl bg-white dark:bg-dark-200 shadow-lg border border-gray-200 dark:border-dark-300 rotate-y-180 ${!isFlipped ? 'hidden' : ''
                                    }`}
                            >
                                <div className="h-full flex flex-col">
                                    <div className="flex-1 flex items-center justify-center text-center">
                                        <p className="text-xl">{currentCard.back}</p>
                                    </div>
                                    <div className="flex justify-center space-x-4 mt-4">
                                        <button
                                            onClick={() => handleResponse('hard')}
                                            className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center space-x-2"
                                        >
                                            <FiX className="w-5 h-5" />
                                            <span>Hard</span>
                                        </button>
                                        <button
                                            onClick={() => handleResponse('easy')}
                                            className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors flex items-center space-x-2"
                                        >
                                            <FiCheck className="w-5 h-5" />
                                            <span>Easy</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="mt-8 text-center text-gray-600 dark:text-gray-300">
                    <p>Current interval: {currentCard.interval}</p>
                    <p className="mt-2">
                        Card {currentCardIndex + 1} of {cards.length}
                    </p>
                </div>
            </div>
        </main>
    )
} 