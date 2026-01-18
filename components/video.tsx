"use client";

import { VideoDemo } from "./video-demo";

interface VideoProps {
    videoUrl?: string;
    posterUrl?: string; // Optional thumbnail for direct video
}

export function Video({ videoUrl, posterUrl }: VideoProps) {
    // Use direct video player with GCS URL
    if (videoUrl) {
        return <VideoDemo videoUrl={videoUrl} posterUrl={posterUrl} />;
    }

    // Fallback if no video URL is provided
    return (
        <div className="flex justify-center items-center p-12 border border-border rounded-lg bg-card/50">
            <p className="text-muted-foreground">Video URL not configured</p>
        </div>
    );
}
