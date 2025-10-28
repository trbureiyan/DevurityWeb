"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface TagSelectorProps {
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
}

export function TagSelector({ selectedTags, onTagsChange, placeholder }: TagSelectorProps) {
  // Mock data - esto se reemplazará con fetch de la BD
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // useEffect para cargar tags desde la BD (por ahora usa mock data)
  useEffect(() => {
    // TODO: Reemplazar con fetch real
    // fetch('/api/tags').then(res => res.json()).then(data => setAvailableTags(data))

    // Mock data temporal
    const mockTags = [
      "CSS",
      "JAVA",
      "RUST",
      "JavaScript",
      "TypeScript",
      "Python",
      "React",
      "Node.js",
      "Vue.js",
      "Angular",
      "HTML",
      "SQL",
      "MongoDB",
      "Docker",
      "Git",
      "AWS",
      "UI/UX Design",
      "Figma",
      "Photoshop",
      "Illustrator",
    ]
    setAvailableTags(mockTags)
  }, [])

  // Filtrar tags disponibles basado en el input y excluir los ya seleccionados
  const filteredTags = availableTags.filter(
    (tag) => tag.toLowerCase().includes(inputValue.toLowerCase()) && !selectedTags.includes(tag),
  )

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag])
    }
    setInputValue("")
    setShowSuggestions(false)
  }

  const handleTagRemove = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter((tag) => tag !== tagToRemove))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setShowSuggestions(true)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Si presiona Enter y hay un tag exacto que coincide, lo selecciona
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      const exactMatch = availableTags.find((tag) => tag.toLowerCase() === inputValue.toLowerCase())
      if (exactMatch && !selectedTags.includes(exactMatch)) {
        handleTagSelect(exactMatch)
      } else if (filteredTags.length > 0) {
        // Si no hay coincidencia exacta pero hay sugerencias, selecciona la primera
        handleTagSelect(filteredTags[0])
      }
    }
  }

  return (
    <div className="space-y-3">
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-[#CA2B26] hover:bg-[#a82320] text-white px-3 py-1 text-sm"
            >
              {tag}
              <button type="button" onClick={() => handleTagRemove(tag)} className="ml-2 hover:text-gray-200">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input Field */}
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder || "Escribe para buscar habilidades..."}
          className="bg-[#2e2e2e] border-none text-white placeholder:text-gray-500 focus-visible:ring-[#CA2B26]"
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredTags.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-[#2e2e2e] border border-[#3e3e3e] rounded-md shadow-lg max-h-48 overflow-y-auto">
            {filteredTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagSelect(tag)}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#3e3e3e] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
