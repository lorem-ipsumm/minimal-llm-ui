"use client";

import { ChatOllama } from "langchain/chat_models/ollama";
import { useEffect, useRef, useState } from "react";
import ModelsDropdown from "./modelsDropdown";

type Props = {
  documentName: string;
  setDocumentName: Function;
  activeModel: string;
  availableModels: any[];
  setActiveModel: Function;
  setOllama: Function;
};

export default function AppNavbar({
  documentName,
  setDocumentName,
  activeModel,
  availableModels,
  setActiveModel,
  setOllama,
}: Props) {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDocumentName(value); // Call the callback function to update the parent component
  };

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      if (
        isShareMenuOpen &&
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target)
      ) {
        setIsShareMenuOpen(false);
        setIsModelDropdownOpen(false);
      }

      if (
        isProfileMenuOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
        setIsModelDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isShareMenuOpen, isProfileMenuOpen]);

  function setCurrentModel(
    newModel: any
  ) {
    setActiveModel(newModel.name);
    const newOllama = new ChatOllama({
      baseUrl: "http://localhost:11434",
      model: newModel.name,
    });
    //store in local storage
    localStorage.setItem("initialLocalLM", newModel.name);
    setOllama(newOllama);
  }

  const shareMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <nav className="sticky left-0 top-0 z-20 w-full border-b border-white/10 bg-black">
        <div className="mx-auto flex flex-wrap items-center justify-between pl-20 pr-5 py-2.5">
          <div className="flex space-x-8">
            <input
              className="w-64 ring-none flex cursor-text items-center gap-x-2 rounded-md border-transparent bg-transparent px-2 py-1 text-xs font-medium text-white outline-none placeholder:text-white/80 hover:bg-white/10 "
              placeholder="Untitled"
              value={documentName}
              onChange={handleInputChange}
            ></input>
          </div>
          <button
            className="cursor-pointer text-xs text-white transition-colors hover:bg-white/10 rounded-md px-2 py-1 relative min-w-[250px]"
            contentEditable={false}
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
          >
            {activeModel}
            {isModelDropdownOpen &&
              <ModelsDropdown
                activeModel={activeModel}
                availableModels={availableModels}
                setIsModelsDropdownOpen={setIsModelDropdownOpen}
                setCurrentModel={setCurrentModel}
              />
            }
          </button>
        </div>
      </nav>
    </>
  );
}
