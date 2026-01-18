"use client";

import { motion } from "framer-motion";
import {
    MediaPlayer,
    MediaProvider,
    Poster,
} from "@vidstack/react";
import {
    defaultLayoutIcons,
    DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

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
            <MediaPlayer
                title="Continuum Multi-Tool Orchestration Demo"
                src={videoUrl}
                poster={posterUrl}
                className="w-full aspect-video bg-background text-foreground rounded-2xl overflow-hidden"
                viewType="video"
                playsinline
            >
                <MediaProvider />
                {posterUrl && <Poster className="absolute inset-0 w-full h-full object-cover" />}

                <DefaultVideoLayout
                    icons={defaultLayoutIcons}
                    className="[&_vds-controls]:bg-linear-to-t [&_vds-controls]:from-black/80 [&_vds-controls]:to-transparent"
                />
            </MediaPlayer>
        </motion.div>
    );
}
