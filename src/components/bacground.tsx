"use client";

import { FC } from "react";
import VideoPlaylist from "./videos";

interface BackgroundElementProps {
    isLoading: boolean
    onLoadingChange?: (isLoading: boolean) => void;
}

const BackgroundElement: FC<BackgroundElementProps> = ({ isLoading, onLoadingChange }) => {

    // Your video sources
    const videoSources = [
        "https://res.cloudinary.com/dtuc9xp9q/video/upload/v1758906870/video_4_zdibpp.mp4",
        "https://res.cloudinary.com/dtuc9xp9q/video/upload/v1758906868/video_3_ktsvu5.mp4",
        "https://res.cloudinary.com/dtuc9xp9q/video/upload/v1758906858/video_1_mgbulw.mp4",
        "https://res.cloudinary.com/dtuc9xp9q/video/upload/v1758906857/video_6_x5mara.mp4",
        "https://res.cloudinary.com/dtuc9xp9q/video/upload/v1758906853/video_5_o2u6l6.mp4",
        "https://res.cloudinary.com/dtuc9xp9q/video/upload/v1758906848/video_7_tfssj3.mp4",
        "https://res.cloudinary.com/dtuc9xp9q/video/upload/v1758906847/video_2_imng1e.mp4",
        // Add more video URLs as needed
    ];

    return (
        <div className="relative -z-50">
            {/* Your VideoPlaylist component */}
            <VideoPlaylist
                sources={videoSources}
                loading={isLoading}
                onLoadingChange={onLoadingChange}
                className="custom-video-class"
                overlayOpacity={0.6}
                preloadCount={2}
            />
        </div>
    );
}

export default BackgroundElement;