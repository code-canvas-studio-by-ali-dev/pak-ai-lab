"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type VideoPlaylistProps = {
    sources: string[]; // array of video URLs
    loading?: boolean; // external loading state
    onLoadingChange?: (isLoading: boolean) => void; // callback to update external loading state
    autoPlay?: boolean;
    muted?: boolean;
    controls?: boolean;
    className?: string;
    overlayOpacity?: number; // 0-1, controls darkness of overlay
    preloadCount?: number; // number of videos to preload ahead
};

export default function VideoPlaylist({
    sources,
    loading = false,
    onLoadingChange,
    autoPlay = true,
    muted = true,
    controls = false,
    className = "",
    overlayOpacity = 0.3,
    preloadCount = 1,
}: VideoPlaylistProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [internalLoading, setInternalLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const preloadRefs = useRef<HTMLVideoElement[]>([]);
    const isFirstLoad = useRef(true);

    // Combined loading state - true if either external loading or internal loading
    const isLoading = loading || internalLoading;

    // Notify parent about loading changes
    const updateLoadingState = useCallback((newLoadingState: boolean) => {
        if (onLoadingChange) {
            onLoadingChange(newLoadingState);
        }
    }, [onLoadingChange]);

    // Handle when video starts playing for the first time
    const handlePlaying = useCallback(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            updateLoadingState(false);
        }
        setInternalLoading(false);
    }, [updateLoadingState]);

    // Handle when video can start playing
    const handleCanPlay = useCallback(() => {
        setInternalLoading(false);
    }, []);

    // Handle loading start
    const handleLoadStart = useCallback(() => {
        setInternalLoading(true);
    }, []);

    // Handle when video ends and moves to next
    const handleEnded = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % sources.length);
    }, [sources.length]);

    // Handle video errors
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleError = useCallback((error: any) => {
        console.warn("Video error:", error);
        setInternalLoading(false);
        // Optionally skip to next video on error
        // setCurrentIndex((prev) => (prev + 1) % sources.length);
    }, []);

    // Preload next videos for smoother transitions
    useEffect(() => {
        // Clean up existing preload elements
        preloadRefs.current.forEach(video => {
            if (video.parentNode) {
                video.parentNode.removeChild(video);
            }
        });
        preloadRefs.current = [];

        // Create preload elements for next videos
        for (let i = 1; i <= preloadCount && i < sources.length; i++) {
            const nextIndex = (currentIndex + i) % sources.length;
            if (sources[nextIndex]) {
                const preloadVideo = document.createElement('video');
                preloadVideo.preload = 'metadata';
                preloadVideo.muted = true;
                preloadVideo.src = sources[nextIndex];
                preloadVideo.style.display = 'none';
                preloadVideo.style.position = 'absolute';
                preloadVideo.style.left = '-9999px';
                document.body.appendChild(preloadVideo);
                preloadRefs.current.push(preloadVideo);
            }
        }

        return () => {
            // Cleanup on effect re-run
            preloadRefs.current.forEach(video => {
                if (video.parentNode) {
                    video.parentNode.removeChild(video);
                }
            });
        };
    }, [currentIndex, sources, preloadCount]);

    // Handle video loading and playing
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !sources[currentIndex]) return;

        const loadAndPlayVideo = async () => {
            try {
                // Set loading state when changing video
                setInternalLoading(true);

                video.src = sources[currentIndex];

                // Load the video
                await new Promise<void>((resolve, reject) => {
                    const handleLoad = () => {
                        video.removeEventListener('loadeddata', handleLoad);
                        video.removeEventListener('error', handleError);
                        resolve();
                    };

                    const handleError = () => {
                        video.removeEventListener('loadeddata', handleLoad);
                        video.removeEventListener('error', handleError);
                        reject(new Error('Video failed to load'));
                    };

                    video.addEventListener('loadeddata', handleLoad);
                    video.addEventListener('error', handleError);
                });

                // Auto play if enabled
                if (autoPlay) {
                    await video.play();
                }

            } catch (error) {
                console.warn("Video load/play failed:", error);
                setInternalLoading(false);
            }
        };

        loadAndPlayVideo();
    }, [currentIndex, autoPlay, sources]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            preloadRefs.current.forEach(video => {
                if (video.parentNode) {
                    video.parentNode.removeChild(video);
                }
            });
        };
    }, []);

    // Early return for no sources
    if (!sources.length) {
        return (
            <div className={`fixed inset-0 bg-black flex items-center justify-center ${className}`}>
                <p className="text-white text-xl">No videos to display</p>
            </div>
        );
    }

    return (
        <div className={`fixed inset-0 overflow-hidden ${className}`}>
            {/* Video Background */}
            <video
                ref={videoRef}
                onEnded={handleEnded}
                onCanPlay={handleCanPlay}
                onPlaying={handlePlaying}
                onLoadStart={handleLoadStart}
                onError={handleError}
                autoPlay={autoPlay}
                muted={muted}
                controls={controls}
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: -2 }}
            >
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay for Text Readability */}
            <div
                className="absolute inset-0 bg-black pointer-events-none"
                style={{
                    opacity: overlayOpacity,
                    zIndex: -1
                }}
            />

            {/* Loading Indicator */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            )}

            {/* Content Area - Your text/components go here */}
            <div className="relative z-20 h-full w-full">
                {/* This is where you put your content that needs to be visible over the video */}
            </div>
        </div>
    );
}