'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'

type Card = {
  id: number
  content: string
  isFlipped: boolean
  isMatched: boolean
}

const cardImages = [
  '/card1.png',
  '/card2.png',
  '/card3.png',
  '/card4.png',
  '/card5.png',
  '/card6.png',
  '/card7.png',
  '/card8.png'
]

const difficulties = {
  beginner: 3,
  intermediate: 5,
  hard: 8
}

const puzzleDifficulties = {
  easy: { totalTiles: 6, cols: 3 },
  medium: { totalTiles: 9, cols: 3 },
  hard: { totalTiles: 16, cols: 4 }
}

export default function Mentalhealthnwellnessgames() {
  const [selectedGame, setSelectedGame] = useState<'card' | 'puzzle' | null>(null)

  // CARD
  const [cards, setCards] = useState<Card[]>([])
  const [firstCard, setFirstCard] = useState<Card | null>(null)
  const [secondCard, setSecondCard] = useState<Card | null>(null)
  const [disabled, setDisabled] = useState(false)
  const [difficulty, setDifficulty] = useState<keyof typeof difficulties | null>(null)

  // PUZZLE
  const [puzzleTiles, setPuzzleTiles] = useState<(number | null)[]>([])
  const [puzzleDifficulty, setPuzzleDifficulty] = useState<keyof typeof puzzleDifficulties | null>(null)

  // ================= CARD LOGIC =================

  const shuffleCards = (pairCount: number) => {
    const selected = cardImages.slice(0, pairCount)
    const shuffled = [...selected, ...selected]
      .map((content, index) => ({
        id: index + 1,
        content,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5)

    setCards(shuffled)
    setFirstCard(null)
    setSecondCard(null)
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true)

      if (firstCard.content === secondCard.content) {
        setCards(prev =>
          prev.map(c =>
            c.content === firstCard.content ? { ...c, isMatched: true } : c
          )
        )
        reset()
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, isFlipped: false }
                : c
            )
          )
          reset()
        }, 700)
      }
    }
  }, [firstCard, secondCard])

  const reset = () => {
    setFirstCard(null)
    setSecondCard(null)
    setDisabled(false)
  }

  const handleCardClick = (card: Card) => {
    if (disabled || card.isFlipped || card.isMatched) return

    const updated = { ...card, isFlipped: true }
    setCards(prev => prev.map(c => (c.id === card.id ? updated : c)))

    if (!firstCard) setFirstCard(updated)
    else setSecondCard(updated)
  }

  const handleDifficulty = (level: keyof typeof difficulties) => {
    setDifficulty(level)
    shuffleCards(difficulties[level])
  }

  // ================= PUZZLE =================

  const startPuzzle = (level: keyof typeof puzzleDifficulties) => {
    const { totalTiles } = puzzleDifficulties[level]
    const numbers = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1)
    const shuffled = [...numbers, null].sort(() => Math.random() - 0.5)

    setPuzzleTiles(shuffled)
    setPuzzleDifficulty(level)
  }

  const moveTile = (index: number) => {
    if (!puzzleDifficulty) return

    const emptyIndex = puzzleTiles.indexOf(null)
    const cols = puzzleDifficulties[puzzleDifficulty].cols

    const valid =
      index === emptyIndex - 1 ||
      index === emptyIndex + 1 ||
      index === emptyIndex - cols ||
      index === emptyIndex + cols

    if (!valid) return

    const copy = [...puzzleTiles]
    ;[copy[index], copy[emptyIndex]] = [copy[emptyIndex], copy[index]]
    setPuzzleTiles(copy)
  }

  const getCols = () => {
    if (!puzzleDifficulty) return ''
    return `grid-cols-${puzzleDifficulties[puzzleDifficulty].cols}`
  }

  const getPuzzleImage = (tile: number | null) => {
    if (!tile) return null
    if (puzzleDifficulty === 'easy') return `/easy${tile}.jpeg`
    if (puzzleDifficulty === 'medium') return `/medium${tile}.jpeg`
    return `/hard${tile}.jpeg`
  }

  // ================= UI =================

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white px-6 py-10">

      {/* HEADER */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-3">
          <Sparkles className="text-purple-400" size={30} />
        </div>
        <h1 className="text-5xl font-bold tracking-tight">
          Mental Wellness Studio
        </h1>
        <p className="text-gray-400 mt-3">
          Relax • Train Mind • Improve Focus
        </p>
      </div>

      {/* GAME SELECT */}
      {!selectedGame && (
        <div className="flex justify-center gap-6">
          
          <button
            onClick={() => setSelectedGame('card')}
            className="w-60 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition"
          >
            <h2 className="text-xl font-semibold">🃏 Card Match</h2>
            <p className="text-sm text-gray-400 mt-2">
              Memory training game
            </p>
          </button>

          <button
            onClick={() => setSelectedGame('puzzle')}
            className="w-60 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition"
          >
            <h2 className="text-xl font-semibold">🧩 Puzzle Game</h2>
            <p className="text-sm text-gray-400 mt-2">
              Image sliding challenge
            </p>
          </button>

        </div>
      )}

      {/* ================= CARD GAME ================= */}
      {selectedGame === 'card' && (
        <div className="mt-10 text-center">

          {!difficulty && (
            <div className="flex gap-4 justify-center">
              {Object.keys(difficulties).map(l => (
                <button
                  key={l}
                  onClick={() => handleDifficulty(l as any)}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition"
                >
                  {l}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-4 gap-5 mt-10 justify-center">
            {cards.map(card => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="w-28 h-36 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center cursor-pointer hover:scale-105 transition"
              >
                {card.isFlipped || card.isMatched ? (
                  <Image src={card.content} alt="" width={90} height={120} />
                ) : (
                  <span className="text-3xl">🂠</span>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ================= PUZZLE GAME ================= */}
      {selectedGame === 'puzzle' && (
        <div className="mt-10 text-center">

          {!puzzleDifficulty ? (
            <div className="flex gap-4 justify-center">
              {Object.keys(puzzleDifficulties).map(l => (
                <button
                  key={l}
                  onClick={() => startPuzzle(l as any)}
                  className="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 transition text-black font-semibold"
                >
                  {l}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex justify-center gap-10 mt-10">

              {/* PREVIEW CARD */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-sm mb-3 text-gray-400">Preview</p>
                <Image
                  src={
                    puzzleDifficulty === 'easy'
                      ? '/easy1.jpeg'
                      : puzzleDifficulty === 'medium'
                      ? '/medium1.jpeg'
                      : '/hard1.jpeg'
                  }
                  alt="preview"
                  width={220}
                  height={220}
                  className="rounded-xl"
                />
              </div>

              {/* PUZZLE BOARD */}
              <div className={`grid ${getCols()} gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl`}>
                {puzzleTiles.map((tile, i) => (
                  <div
                    key={i}
                    onClick={() => moveTile(i)}
                    className="w-24 h-24 rounded-xl bg-black/40 flex items-center justify-center cursor-pointer hover:scale-105 transition"
                  >
                    {tile && (
                      <Image
                        src={getPuzzleImage(tile) || ''}
                        alt=""
                        width={96}
                        height={96}
                        className="rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      )}

      {/* BACK */}
      {selectedGame && (
        <div className="text-center mt-12">
          <button
            onClick={() => {
              setSelectedGame(null)
              setDifficulty(null)
              setPuzzleDifficulty(null)
              setCards([])
              setPuzzleTiles([])
            }}
            className="px-6 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20"
          >
            Back
          </button>
        </div>
      )}

    </div>
  )
}