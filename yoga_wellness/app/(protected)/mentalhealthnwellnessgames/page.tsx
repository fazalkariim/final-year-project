'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

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

// Updated puzzleDifficulties with total tiles count (numbered tiles + 1 empty)
const puzzleDifficulties = {
  easy: { totalTiles: 6, rows: 2, cols: 3 },    // 5 numbers + 1 null
  medium: { totalTiles: 9, rows: 3, cols: 3 },  // 8 numbers + 1 null
  hard: { totalTiles: 12, rows: 4, cols: 3 }    // 11 numbers + 1 null
}

export default function Mentalhealthnwellnessgames() {
  const [selectedGame, setSelectedGame] = useState<'card' | 'puzzle' | null>(null)

  // === Card Game States ===
  const [cards, setCards] = useState<Card[]>([])
  const [firstCard, setFirstCard] = useState<Card | null>(null)
  const [secondCard, setSecondCard] = useState<Card | null>(null)
  const [disabled, setDisabled] = useState(false)
  const [difficulty, setDifficulty] = useState<keyof typeof difficulties | null>(null)
  const [gameWon, setGameWon] = useState(false)

  // === Puzzle Game States ===
  const [puzzleTiles, setPuzzleTiles] = useState<(number | null)[]>([])
  const [puzzleDifficulty, setPuzzleDifficulty] = useState<keyof typeof puzzleDifficulties | null>(null)

  // === Card Game Logic ===
  const shuffleCards = (pairCount: number) => {
    const selectedImages = cardImages.slice(0, pairCount)
    const shuffled = [...selectedImages, ...selectedImages]
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
    setDisabled(false)
    setGameWon(false)
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true)
      if (firstCard.content === secondCard.content) {
        setCards(prev =>
          prev.map(card =>
            card.content === firstCard.content ? { ...card, isMatched: true } : card
          )
        )
        resetTurn()
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          )
          resetTurn()
        }, 800)
      }
    }
  }, [firstCard, secondCard])

  useEffect(() => {
    if (difficulty && cards.length > 0 && cards.every(card => card.isMatched)) {
      setTimeout(() => setGameWon(true), 300)
    }
  }, [cards, difficulty])

  const handleCardClick = (card: Card) => {
    if (disabled || card.isFlipped || card.isMatched) return

    const flippedCard = { ...card, isFlipped: true }
    setCards(prev => prev.map(c => (c.id === card.id ? flippedCard : c)))

    if (!firstCard) {
      setFirstCard(flippedCard)
    } else {
      setSecondCard(flippedCard)
    }
  }

  const resetTurn = () => {
    setFirstCard(null)
    setSecondCard(null)
    setDisabled(false)
  }

  const handleDifficultySelect = (level: keyof typeof difficulties) => {
    setDifficulty(level)
    shuffleCards(difficulties[level])
  }

  const handleCardBack = () => {
    setDifficulty(null)
    setGameWon(false)
    setCards([])
  }

  // === Puzzle Game Logic ===
  const startPuzzle = (level: keyof typeof puzzleDifficulties) => {
    const { totalTiles } = puzzleDifficulties[level]
    const numbers = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1)
    const shuffled = shuffleArray([...numbers, null])
    setPuzzleTiles(shuffled)
    setPuzzleDifficulty(level)
  }

  // Fisher-Yates shuffle to ensure random distribution
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  const moveTile = (index: number) => {
    if (!puzzleDifficulty) return
    const emptyIndex = puzzleTiles.indexOf(null)
    const { rows, cols } = puzzleDifficulties[puzzleDifficulty]

    // Calculate possible moves: tile must be adjacent (left, right, up, down) to empty space
    const isAdjacent =
      (index === emptyIndex - 1 && emptyIndex % cols !== 0) || // left neighbor (empty is right)
      (index === emptyIndex + 1 && index % cols !== 0) ||       // right neighbor (empty is left)
      index === emptyIndex - cols ||                            // above neighbor
      index === emptyIndex + cols                                // below neighbor

    if (!isAdjacent) return

    const newTiles = [...puzzleTiles]
    ;[newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]]
    setPuzzleTiles(newTiles)

    // Check if solved: tiles sorted ascending with null at the end
    const isSolved = newTiles.slice(0, -1).every((val, i) => val === i + 1)
    if (isSolved) {
      setTimeout(() => alert('🎉 Puzzle Solved!'), 300)
    }
  }

  const handlePuzzleBack = () => {
    setPuzzleDifficulty(null)
    setPuzzleTiles([])
  }

  const getGridCols = () => {
    if (!puzzleDifficulty) return ''
    return `grid-cols-${puzzleDifficulties[puzzleDifficulty].cols}`
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-2 py-10 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Mental Wellness Games</h1>

      {!selectedGame && (
        <div className="space-x-6 flex">
  <button
    onClick={() => setSelectedGame('card')}
    className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition flex items-center space-x-3"
  >
    <Image src="/cardsfinal.png" alt="Card Match" width={200} height={80} />
    <span>Card Match</span>
  </button>

  <button
    onClick={() => setSelectedGame('puzzle')}
    className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-yellow-600 transition flex items-center space-x-3"
  >
    <Image src="/puzzlefinal.png" alt="Puzzle Game" width={200} height={40} />
    <span>Puzzle Game</span>
  </button>
</div>
      )}

      {/* === CARD GAME === */}
      {selectedGame === 'card' && (
        <>
          {!difficulty && (
            <div className="mt-6 space-x-4">
              {Object.keys(difficulties).map(level => (
                <button
                  key={level}
                  onClick={() => handleDifficultySelect(level as keyof typeof difficulties)}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition"
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          )}

          {difficulty && (
            <>
              {!gameWon && (
                <>
                  <div
                    className={`grid gap-4 mt-6
                      ${difficulty === 'beginner' ? 'grid-cols-3' : ''}
                      ${difficulty === 'intermediate' ? 'grid-cols-5' : ''}
                      ${difficulty === 'hard' ? 'grid-cols-4 grid-rows-2' : ''}
                    `}
                  >
                    {cards.map(card => (
                      <div
                        key={card.id}
                        onClick={() => handleCardClick(card)}
                        className="cursor-pointer rounded-lg shadow-lg flex items-center justify-center bg-white"
                        style={{ width: 80, height: 110 }}
                      >
                        {card.isFlipped || card.isMatched ? (
                          <Image
                            src={card.content}
                            alt="card"
                            width={80}
                            height={110}
                            className="object-contain select-none"
                          />
                        ) : (
                          <div className="text-3xl">🂠</div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {gameWon && (
            <div className="text-center mt-12">
              <h2 className="text-3xl font-semibold text-green-700 mb-4">🎉 Congratulations! You completed the game!</h2>
              
            </div>
          )}
        </>
      )}

      {/* === PUZZLE GAME === */}
      {selectedGame === 'puzzle' && (
        <>
          {!puzzleDifficulty ? (
            <div className="mt-6 space-x-4">
              {Object.keys(puzzleDifficulties).map(level => (
                <button
                  key={level}
                  onClick={() => startPuzzle(level as keyof typeof puzzleDifficulties)}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-yellow-600 transition"
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col md:flex-row gap-6 items-start">
              {/* Left Side: Final Image */}
              <div>
                <h3 className="text-lg font-medium mb-2 mr-56 text-center">Final Image</h3>
                <Image
                  src={
                    puzzleDifficulty === 'easy'
                      ? '/easyfinal.jpeg'
                      : puzzleDifficulty === 'medium'
                      ? '/meduimfinal.jpeg'
                      : '/hardfinal.jpeg'
                  }
                  alt="Final Puzzle"
                  width={270}
                  height={270}
                  className="rounded-lg shadow-md mr-64"
                />
              </div>

              {/* Right Side: Puzzle Board */}
              <div
                className={`grid gap-1 p-4 rounded-xl shadow-lg ${getGridCols()} bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100`}
              >
                {puzzleTiles.map((tile, index) => {
                  const getImageSrc = () => {
                    if (tile === null) return null
                    if (puzzleDifficulty === 'easy') return `/easy${tile}.jpeg`
                    if (puzzleDifficulty === 'medium') return `/medium${tile}.jpeg`
                    if (puzzleDifficulty === 'hard') return `/hard${tile}.jpeg`
                    return ''
                  }

                  return (
                    <div
                      key={index}
                      onClick={() => moveTile(index)}
                      className="w-28 h-28 bg-gray-200 flex items-center justify-center rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                    >
                      {tile !== null ? (
                        <Image
                          src={getImageSrc() || ''}
                          alt={`Tile ${tile}`}
                          width={112}
                          height={112}
                          className="rounded object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-white rounded-lg border-2 border-dashed border-gray-400" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}

      {(selectedGame === 'card' || selectedGame === 'puzzle') && (
        <div className="mt-8">
          <button
            onClick={() => {
              setSelectedGame(null)
              setDifficulty(null)
              setPuzzleDifficulty(null)
              setGameWon(false)
              setCards([])
              setPuzzleTiles([])
            }}
            className="h-11 w-[120px] rounded-xl bg-blue-400 text-white hover:font-bold"
          >
            Back to Game
          </button>
        </div>
      )}
    </div>
  )
}