import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './phase1.css';

const codeSnippets = [
`// C Programming Language

#include <stdio.h>

typedef struct {
    int id;
    char name[20];
} Person;

int main() {
    typedef Person personList[3];
    personList people = {
        {1, "Alice"},
        {2, "Bob"},
        {3, "Charlie"}
    };

    for (int i = 0; i < 3; i++) {
        printf("ID: %d, Name: %s\\n", people[i.id], people[i].name);
    }

    return 0;
}
----------------------------------------
// C Programming Language
    
#include <stdio.h>

void execute(void (*func)(int)) {
    func(10);
}

void printNumber(int number) {
    printf("Number: %d\\n", number);
}

int main() {
    void execute(void (*f)(int));
    execute(printNumber);

    return 0;
}
----------------------------------------
// C Programming Language
    
#include <stdio.h>

#define CREATE_ARRAY(type, name, size)
    type name[size];
    for (int i = 0; i < size; i++) {
        name[i] = 0;
    }

int main() {
    CREATE_ARRAY(int, myArray, 5);

    for (int i = 0; i < 5; i++) {
        printf("%d ", myArray[i]);
    }

    return 0;
}
`
];

export default function TerminalCodeDisplay() {
const navigate = useNavigate();
const [displayText, setDisplayText] = useState('');
const [timeLeft, setTimeLeft] = useState(30);
const [showTimer, setShowTimer] = useState(false);
const [snippetIndex, setSnippetIndex] = useState(0);
const [charIndex, setCharIndex] = useState(0);
const [typingComplete, setTypingComplete] = useState(false);
const [hasShownAlert, setHasShownAlert] = useState(false);
const timerRef = useRef(null);
useEffect(() => {
    document.title = "Phase 1";
    }, []);

useEffect(() => {
    // Type writer effect
    if (snippetIndex < codeSnippets.length) {
    const snippet = codeSnippets[snippetIndex];
    if (charIndex < snippet.length) {
        const timeoutId = setTimeout(() => {
        setDisplayText(prev => prev + snippet.charAt(charIndex));
        setCharIndex(charIndex + 1);
        }, 20);
        
        return () => clearTimeout(timeoutId);
    } else {
        setDisplayText(prev => prev + '\n\n');
        setCharIndex(0);
        setSnippetIndex(snippetIndex + 1);
    }
    } else if (!typingComplete) {
    setTypingComplete(true);
    setShowTimer(true);
    }
}, [snippetIndex, charIndex, typingComplete]);

useEffect(() => {
    // Timer countdown
    if (showTimer && timeLeft > 0) {
    timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timerRef.current);
    } else if (timeLeft === 0 && !hasShownAlert) {
    setShowTimer(false);
    setHasShownAlert(true);
    toast.error('Time is up!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    }
}, [showTimer, timeLeft, hasShownAlert]);

const handleNextClick = () => {
    navigate('/phase2');
};

return (
    <div className="flex flex-col items-center min-h-screen bg-teal-600 py-6">
    <ToastContainer />
    <h1 className="text-6xl md:text-8xl text-white font-bold mb-10">
        Phase 1
    </h1>
    
    <div className="w-11/12 md:w-4/5 max-w-4xl h-3/4 bg-black border-2 border-green-500 p-5 shadow-lg shadow-green-500/30 rounded-md overflow-auto">
        <pre className="text-green-500 font-mono whitespace-pre-wrap">
        {displayText}
        </pre>
    </div>
    
    {showTimer && (
        <div className="mt-6 text-2xl md:text-3xl bg-black px-6 py-3 rounded-full border-4 border-black text-yellow-300 font-mono">
        Time left: {timeLeft} seconds
        </div>
    )}
    
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