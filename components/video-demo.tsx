"use client";

import { motion } from "framer-motion";

interface VideoDemoProps {
    videoUrl: string;
    posterUrl?: string; // Optional thumbnail/poster image
}

export function VideoDemo({ videoUrl, posterUrl }: VideoDemoProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-2xl overflow-hidden border border-border bg-card/50 shadow-2xl"
        >
            <video
                className="w-full h-auto"
                controls
                preload="metadata"
                poster={posterUrl}
                style={{
                    maxWidth: "100%",
                    height: "auto",
                }}
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </motion.div>
    );
}
