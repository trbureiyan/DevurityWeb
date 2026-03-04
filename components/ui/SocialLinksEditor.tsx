"use client";

import React, { useState, useRef } from "react";
import { Tooltip } from "./Tooltip";
import { URL as URL_CONSTANTS } from "@/lib/constants/validation";

interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

interface SocialLinksEditorProps {
  links: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}

const ALLOWED_PLATFORMS = [
  "GitHub",
  "ORCID",
  "Bento.me",
  "Linktree",
  "YouTube",
  "Twitter",
  "Facebook",
  "LinkedIn",
  "Website",
];

// Función para validar URL
const isValidUrl = (urlString: string): boolean => {
  if (!urlString || urlString.trim() === "") return true; // URLs vacías son válidas (aún no se ha ingresado)
  
  try {
    const url = new URL(urlString.startsWith("http") ? urlString : `https://${urlString}`);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export default function SocialLinksEditor({
  links,
  onChange,
}: SocialLinksEditorProps) {
  const [urlErrors, setUrlErrors] = useState<Map<number, string>>(new Map());
  const [limitError, setLimitError] = useState<string | null>(null);
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);

  // Stable IDs for list keys (avoid index-as-key)
  const nextIdRef = useRef(links.length);
  const linkIdsRef = useRef<number[]>(links.map((_, i) => i));
  // Sync ref length with links (handles external changes)
  while (linkIdsRef.current.length < links.length) {
    linkIdsRef.current.push(nextIdRef.current++);
  }
  linkIdsRef.current.length = links.length;

  const platformKey = (label: string) => label.trim().toLowerCase();

  const handleAddLink = () => {
    const websiteCount = links.filter((link) => platformKey(link.label) === "website").length;
    if (websiteCount >= URL_CONSTANTS.MAX_CUSTOM_WEBSITES) {
      setLimitError(`Máximo ${URL_CONSTANTS.MAX_CUSTOM_WEBSITES} enlaces tipo Website`);
      setShakeIndex(links.findIndex((l) => platformKey(l.label) === "website"));
      setTimeout(() => setShakeIndex(null), 500);
      return;
    }

    linkIdsRef.current.push(nextIdRef.current++);
    onChange([...links, { label: "Website", url: "", icon: "website" }]);
    setLimitError(null);
  };

  const handleRemoveLink = (index: number) => {
    linkIdsRef.current.splice(index, 1);
    const newLinks = [...links];
    newLinks.splice(index, 1);
    onChange(newLinks);
    
    // Limpiar errores del link eliminado
    const newErrors = new Map(urlErrors);
    newErrors.delete(index);
    setUrlErrors(newErrors);
    setLimitError(null);
  };

  const handleLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };

    if (field === "label") {
      const nextPlatform = platformKey(value);
      const websiteCount = links
        .filter((_, i) => i !== index)
        .filter((link) => platformKey(link.label) === "website").length;
      const nextTotal = websiteCount + (nextPlatform === "website" ? 1 : 0);
      if (nextPlatform === "website" && nextTotal > URL_CONSTANTS.MAX_CUSTOM_WEBSITES) {
        setLimitError(`Máximo ${URL_CONSTANTS.MAX_CUSTOM_WEBSITES} enlaces tipo Website`);
        setShakeIndex(index);
        setTimeout(() => setShakeIndex(null), 500);
        return;
      }

      setLimitError(null);
      newLinks[index].icon = nextPlatform;
    }
    
    // Validar URL si se está editando el campo url
    if (field === 'url') {
      const newErrors = new Map(urlErrors);
      
      if (value && !isValidUrl(value)) {
        newErrors.set(index, "URL no válida. Debe incluir https:// o http://");
        setShakeIndex(index);
        setTimeout(() => setShakeIndex(null), 500);
      } else {
        newErrors.delete(index);
      }
      
      setUrlErrors(newErrors);
    }
    
    onChange(newLinks);
  };

  return (
    <div className="space-y-3">
      <Tooltip 
        content="Agrega tus perfiles profesionales. Verifica que las URLs sean correctas antes de guardar. URLs válidas deben comenzar con https:// o http://"
        position="top"
      >
        <div className="text-xs text-white/40 flex items-center gap-1 cursor-help mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
          Enlaces Sociales - Información importante
        </div>
      </Tooltip>
      
      {links.map((link, index) => (
        <div 
          key={linkIdsRef.current[index]} 
          className={`flex gap-2 items-start animate-in fade-in slide-in-from-top-2 duration-200 ${
            shakeIndex === index ? "animate-shake" : ""
          }`}
        >
          <div className="w-1/3">
            <select
              value={link.label}
              onChange={(e) => handleLinkChange(index, "label", e.target.value)}
              className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:border-[#da292e] focus:ring-1 focus:ring-[#da292e] outline-none appearance-none"
            >
              {ALLOWED_PLATFORMS.map((platform) => (
                <option key={platform} value={platform} className="bg-[#1f1a1a] text-white">
                  {platform}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <input
              type="url"
              value={link.url}
              onChange={(e) => handleLinkChange(index, "url", e.target.value)}
              placeholder="https://..."
              className={`w-full bg-black/30 border ${
                urlErrors.has(index) ? "border-red-500" : "border-white/20"
              } rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-[#da292e] focus:ring-1 focus:ring-[#da292e] outline-none transition-colors`}
            />
            {urlErrors.has(index) && (
              <p className="text-xs text-red-400 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                {urlErrors.get(index)}
              </p>
            )}
          </div>
          <button
            onClick={() => handleRemoveLink(index)}
            className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Eliminar enlace"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}

      <button
        onClick={handleAddLink}
        className="flex items-center gap-2 text-sm text-[#da292e] hover:text-red-400 font-medium px-2 py-1 rounded hover:bg-[#da292e]/10 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        Agregar enlace
      </button>
      {limitError && (
        <p className="text-xs text-red-400 mt-1">{limitError}</p>
      )}
    </div>
  );
}
