import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './phase3.css';

const codeSnippets = [
    `// C# Programming Language

using System;

public class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Factorial of 5 is: " + Factorial(5));
    }

    public static int Factorial(int n)
    {
        if (n == 0)
            return 1;
        else
            return n * Factorial(n - 1);
    }
}
------------------------------------------------------
// Java Programming Language

import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("apple", "banana", "cherry");
        Iterator<String> it = list.iterator();
        while(it.hasNext()) {
            String item = it.next();
            if(item.equals("banana")) {
                list.remove(item);
            }
        }
        System.out.println(list);
    }
}

------------------------------------------------------
// Python Programming Language

def find_element(lst, target):
    left, right = 0, len(lst) - 1
    while left <= right:
        mid = (left + right) // 2
        if lst[mid] == target:
            return mid
        elif lst[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

lst = [1, 3, 5, 7, 9]
print(find_element(lst, 2))
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
    document.title = "Phase 3";
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
    navigate('/phase4');
};

return (
    <div className="flex flex-col items-center min-h-screen bg-teal-600 px-4 sm:px-6 py-4 sm:py-6">
    <ToastContainer />
    <h1 className="text-4xl sm:text-6xl md:text-8xl text-white font-bold mb-6 sm:mb-10 text-center">
        Phase 3
    </h1>
    
    <div className="w-full sm:w-11/12 md:w-4/5 max-w-4xl h-[75vh] sm:h-3/4 bg-black border-2 border-green-500 p-3 sm:p-5 shadow-lg shadow-green-500/30 rounded-md overflow-auto">
        <pre className="text-sm sm:text-base text-green-500 font-mono whitespace-pre-wrap">
        {displayText}
        </pre>
    </div>
    
    {showTimer && (
        <div className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl bg-black px-4 sm:px-6 py-2 sm:py-3 rounded-full border-4 border-black text-yellow-300 font-mono">
        Time left: {timeLeft} seconds
        </div>
    )}
    
    <div className="w-full max-w-6xl flex justify-end mt-4 px-4 sm:px-0">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:px-6 rounded-lg shadow-lg transition-colors duration-300 flex items-center text-sm sm:text-base"
            onClick={handleNextClick}
            >
            Next
            <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
            </svg>
        </button>
    </div>
    </div>
);
}