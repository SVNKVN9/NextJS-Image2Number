'use client'

import React, { useRef, useEffect, useState } from 'react';

interface DrawingCanvasProps {
    canvasWidth: number;
    canvasHeight: number;
    onImageChange: (imageDataUrl: string) => void;
}

const Draw: React.FC<DrawingCanvasProps> = ({ canvasWidth, canvasHeight, onImageChange }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (!ctx) return

            setContext(ctx);
        }
    }, []);

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!context) return

        context.lineWidth = 10;
        context.lineCap = 'round';
        context.strokeStyle = '#000';
        context.beginPath();
        context.moveTo(event.clientX - canvasRef.current!.offsetLeft, event.clientY - canvasRef.current!.offsetTop);

        setIsDrawing(true);
    };

    const draw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (isDrawing && context) {
            context.lineTo(event.clientX - canvasRef.current!.offsetLeft, event.clientY - canvasRef.current!.offsetTop);
            context.stroke();
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);

        if (!context) return

        const imageDetailUrl = canvasRef.current!.toDataURL();

        onImageChange(imageDetailUrl)
    };

    const clearCanvas = () => {
        if (!context) return

        context.clearRect(0, 0, canvasWidth * window.devicePixelRatio, canvasHeight * window.devicePixelRatio);
    };

    return (
        <div>
            <canvas
                className='bg-white border-2 rounded-lg'
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
            />

            <button onClick={clearCanvas} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
                Clear Screen
            </button>
        </div>
    );
};

export default Draw;
