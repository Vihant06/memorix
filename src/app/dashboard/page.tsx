'use client'

import { Navbar } from '@/components/navbar'
import { motion } from 'framer-motion'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'
import { useEffect, useState } from 'react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

export default function DashboardPage() {
    const [cards, setCards] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        try {
            const stored = localStorage.getItem('flashcards')
            setCards(stored ? JSON.parse(stored) : [])
        } catch (err) {
            // Optionally handle error
        }
        setLoading(false)
    }, [])

    // Compute stats
    const totalCards = cards.length
    const cardsDue = cards.filter(card => {
        // Example: due if createdAt is before now (customize as needed)
        if (!card.createdAt) return false
        const created = card.createdAt.seconds ? new Date(card.createdAt.seconds * 1000) : new Date(card.createdAt)
        return created <= new Date()
    }).length
    const averageScore = 'N/A' // Placeholder, depends on your data model
    const streak = 'N/A' // Placeholder, depends on your data model

    // Chart data (example: cards created per day)
    const reviewData = {
        labels: [],
        datasets: [
            {
                label: 'Cards Created',
                data: [],
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
                tension: 0.4,
            },
        ],
    }
    // Fill in reviewData.labels and data
    const dateMap: Record<string, number> = {}
    cards.forEach(card => {
        if (!card.createdAt) return
        const d = card.createdAt.seconds ? new Date(card.createdAt.seconds * 1000) : new Date(card.createdAt)
        const dateStr = d.toISOString().slice(0, 10)
        dateMap[dateStr] = (dateMap[dateStr] || 0) + 1
    })
    reviewData.labels = Object.keys(dateMap).sort()
    reviewData.datasets[0].data = reviewData.labels.map(date => dateMap[date])

    // Performance chart placeholder
    const performanceData = {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [
            {
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(234, 179, 8, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                ],
                borderColor: [
                    'rgb(34, 197, 94)',
                    'rgb(234, 179, 8)',
                    'rgb(239, 68, 68)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const stats = [
        { label: 'Total Cards', value: totalCards },
        { label: 'Cards Due', value: cardsDue },
        { label: 'Average Score', value: averageScore },
        { label: 'Streak', value: streak },
    ]

    return (
        <main className="min-h-screen bg-white dark:bg-dark-100">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-20">
                <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-6"
                                >
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                        {stat.label}
                                    </p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Charts Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Review Activity Chart */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-6"
                            >
                                <h2 className="text-lg font-semibold mb-4">Review Activity</h2>
                                <Line
                                    data={reviewData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top' as const,
                                            },
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                            },
                                        },
                                    }}
                                />
                            </motion.div>

                            {/* Performance Chart */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-6"
                            >
                                <h2 className="text-lg font-semibold mb-4">Performance</h2>
                                <div className="h-64">
                                    <Doughnut
                                        data={performanceData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    position: 'bottom' as const,
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </div>
        </main>
    )
} 