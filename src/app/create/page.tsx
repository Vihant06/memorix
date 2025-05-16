'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { FiPlus, FiX } from 'react-icons/fi'

export default function CreatePage() {
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('')
    const [front, setFront] = useState('')
    const [back, setBack] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [cards, setCards] = useState<any[]>([])

    useEffect(() => {
        setLoading(true)
        try {
            const stored = localStorage.getItem('flashcards')
            setCards(stored ? JSON.parse(stored) : [])
        } catch (err) {
            setError('Failed to load cards')
        }
        setLoading(false)
    }, [])

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault()
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()])
            }
            setTagInput('')
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const handleCreate = async () => {
        setLoading(true)
        setError(null)
        const newCard = {
            tags,
            front,
            back,
            createdAt: new Date().toISOString(),
        }
        // Optimistically update UI
        const updatedCards = [newCard, ...cards]
        setCards(updatedCards)
        setFront('')
        setBack('')
        setTags([])
        try {
            localStorage.setItem('flashcards', JSON.stringify(updatedCards))
        } catch (err) {
            setError('Failed to create card')
        }
        setLoading(false)
    }

    return (
        <main className="min-h-screen bg-white dark:bg-dark-100">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-6"
                >
                    <h1 className="text-2xl font-bold mb-6">Create New Flashcard</h1>
                    {error && <div className="mb-4 text-red-500">{error}</div>}

                    {/* Tags Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {tags.map(tag => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                                >
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-2 hover:text-primary-900 dark:hover:text-primary-100"
                                    >
                                        <FiX className="w-4 h-4" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            placeholder="Type a tag and press Enter"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    {/* Front Content */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Front
                        </label>
                        <textarea
                            value={front}
                            onChange={(e) => setFront(e.target.value)}
                            placeholder="Enter the question or prompt"
                            className="w-full h-32 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Back Content */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Back
                        </label>
                        <textarea
                            value={back}
                            onChange={(e) => setBack(e.target.value)}
                            placeholder="Enter the answer or explanation"
                            className="w-full h-32 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-60"
                    >
                        <FiPlus className="w-5 h-5" />
                        <span>{loading ? 'Creating...' : 'Create Flashcard'}</span>
                    </button>
                </motion.div>

                {/* List of created cards */}
                <div className="mt-10">
                    <h2 className="text-xl font-bold mb-4">Your Flashcards</h2>
                    {loading && <div>Loading...</div>}
                    {cards.length === 0 && !loading && <div className="text-gray-500">No cards yet.</div>}
                    <div className="grid gap-4">
                        {cards.map(card => (
                            <div key={card.id} className="p-4 rounded-lg bg-white dark:bg-dark-200 shadow border border-gray-200 dark:border-dark-300">
                                <div className="mb-2 text-sm text-gray-400">Tags: {card.tags?.join(', ')}</div>
                                <div className="font-semibold">Front: {card.front}</div>
                                <div>Back: {card.back}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
} 