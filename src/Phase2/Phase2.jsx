import React from 'react';
import { useState, useRef, useEffect  } from 'react';
import "./phase2.css";
import { useNavigate } from 'react-router-dom';

export default function TextEditor() {
    const navigate = useNavigate();

const editorRef = useRef(null);
const [isFocused, setIsFocused] = useState(false);
useEffect(() => {
    document.title = "Phase 2";
    }, []);

    const handleNextClick = () => {
        navigate('/phase3');
    };

// Function to execute commands
const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
    editorRef.current.focus();
    }
};

// Editor button component
const EditorButton = ({ command, children, className = "" }) => (
    <button
    onClick={() => execCommand(command)}
    className={`px-3 py-2 rounded transition-colors hover:bg-teal-100 active:bg-teal-200 ${className}`}
    title={command.charAt(0).toUpperCase() + command.slice(1)}
    >
    {children}
    </button>
);

return (
    <div className="min-h-screen bg-teal-600 flex flex-col items-center justify-center p-4">
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-10 text-center">
        Phase 2
    </h1>
    
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
        <EditorButton command="bold">
            <span className="font-bold">B</span>
        </EditorButton>
        <EditorButton command="italic">
            <span className="italic">I</span>
        </EditorButton>
        <EditorButton command="underline">
            <span className="underline">U</span>
        </EditorButton>
        <EditorButton command="strikeThrough">
            <span className="line-through">S</span>
        </EditorButton>
        
        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        
        <EditorButton command="insertUnorderedList">
            <span>&bull; List</span>
        </EditorButton>
        <EditorButton command="insertOrderedList">
            <span>1. List</span>
        </EditorButton>
        
        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        
        <EditorButton command="justifyLeft">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="15" y2="12"></line>
            <line x1="3" y1="18" x2="18" y2="18"></line>
            </svg>
        </EditorButton>
        <EditorButton command="justifyCenter">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="6" y1="12" x2="18" y2="12"></line>
            <line x1="5" y1="18" x2="19" y2="18"></line>
            </svg>
        </EditorButton>
        <EditorButton command="justifyRight">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="9" y1="12" x2="21" y2="12"></line>
            <line x1="6" y1="18" x2="21" y2="18"></line>
            </svg>
        </EditorButton>
        <EditorButton command="justifyFull">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </EditorButton>
        
        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        
        <EditorButton command="undo">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7v6h6"></path>
            <path d="M21 17a9 9 0 0 0-9-9H3"></path>
            </svg>
        </EditorButton>
        <EditorButton command="redo">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 7v6h-6"></path>
            <path d="M3 17a9 9 0 0 1 9-9h9"></path>
            </svg>
        </EditorButton>
        </div>
        
        {/* Editor Area */}
        <div
        ref={editorRef}
        contentEditable="true"
        className={`min-h-96 p-4 focus:outline-none ${isFocused ? 'bg-blue-50' : 'bg-white'}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        />
    </div>
    
    {/* Navigation Button */}
    <div className="w-full max-w-6xl flex justify-end mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 flex items-center"
            onClick={handleNextClick}
            >
            Next
            <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
            </svg>
        </button>
    </div>
    </div>
);
}