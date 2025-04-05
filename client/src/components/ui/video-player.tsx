import { useState, useRef, forwardRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Play, Pause, VolumeX, Volume2, Maximize } from 'lucide-react';
import { motion } from 'framer-motion';

type VideoPlayerProps = {
  url: string;
  thumbnail?: string;
  title?: string;
  className?: string;
};

export const VideoPlayer = forwardRef<HTMLDivElement, VideoPlayerProps>(
  ({ url, thumbnail, title, className = '' }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [played, setPlayed] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const playerRef = useRef<ReactPlayer>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePlayPause = () => {
      setIsPlaying(!isPlaying);
    };

    const handleMute = () => {
      setIsMuted(!isMuted);
    };

    const handleProgress = (state: { played: number }) => {
      setPlayed(state.played);
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setPlayed(value);
      if (playerRef.current) {
        playerRef.current.seekTo(value);
      }
    };

    const toggleFullscreen = () => {
      if (!containerRef.current) return;
      
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    };

    return (
      <div 
        ref={ref} 
        className={`relative group ${className}`}
        onDoubleClick={toggleFullscreen}
      >
        <div ref={containerRef} className="relative w-full h-full rounded-lg overflow-hidden">
          <ReactPlayer
            ref={playerRef}
            url={url}
            width="100%"
            height="100%"
            playing={isPlaying}
            muted={isMuted}
            onProgress={handleProgress}
            progressInterval={500}
            style={{ background: '#000' }}
            light={thumbnail}
            controls={false}
          />
          
          {/* Video Overlay - appears when hovered or paused */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end ${!isPlaying ? 'opacity-100' : ''}`}>
            {title && (
              <div className="px-4 py-2">
                <h3 className="text-white text-lg font-['Montserrat'] font-semibold">{title}</h3>
              </div>
            )}
            
            {/* Video Controls */}
            <div className="p-4 flex flex-col">
              {/* Progress Bar */}
              <div className="w-full mb-4">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={played}
                  onChange={handleSeekChange}
                  className="w-full h-1 appearance-none bg-white/30 rounded-full outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00F0FF]"
                />
              </div>
              
              {/* Controls Bar */}
              <div className="flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlayPause}
                  className="text-white hover:text-[#00F0FF] transition-colors"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </motion.button>
                
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleMute}
                    className="text-white hover:text-[#00F0FF] transition-colors"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFullscreen}
                    className="text-white hover:text-[#00F0FF] transition-colors"
                  >
                    <Maximize size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';
