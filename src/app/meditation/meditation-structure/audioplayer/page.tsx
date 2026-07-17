"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Repeat,
  Volume2,
  Music2,
  Wind,
  Mic2,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { api, MeditationDetails } from "@/lib/api";

const STEP_TYPE_MAP: Record<string, { label: string; color: string }> = {
  greeting: { label: "Begrüßung", color: "bg-blue-500/20 border-blue-400/30 text-blue-200" },
  personal: { label: "Persönlich", color: "bg-purple-500/20 border-purple-400/30 text-purple-200" },
  introduction: { label: "Einführung", color: "bg-cyan-500/20 border-cyan-400/30 text-cyan-200" },
  suggestion: { label: "Suggestion", color: "bg-lime-500/20 border-lime-400/30 text-lime-200" },
  affirmation: { label: "Affirmation", color: "bg-orange-500/20 border-orange-400/30 text-orange-200" },
  confirmation: { label: "Affirmation", color: "bg-orange-500/20 border-orange-400/30 text-orange-200" },
  visualization: { label: "Visualisierung", color: "bg-rose-500/20 border-rose-400/30 text-rose-200" },
  conclusion: { label: "Abschluss", color: "bg-amber-500/20 border-amber-400/30 text-amber-200" },
};

function parseDurationToSeconds(durationStr: string) {
  const parts = durationStr.split(":");
  if (parts.length === 3) {
    return parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
  }
  return 0;
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function AudioPlayerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [meditation, setMeditation] = useState<MeditationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStepAudioTime, setCurrentStepAudioTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [musicLevel, setMusicLevel] = useState(50);
  const [natureLevel, setNatureLevel] = useState(75);
  const [isLiked, setIsLiked] = useState(false);

  const [loopSettings, setLoopSettings] = useState<Record<string, number | "infinity">>({
    affirmation: 0,
    suggestion: 0,
    visualization: 0,
  });
  const [repeatCount, setRepeatCount] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isDelaying, setIsDelaying] = useState(false);

  // Outro phase: 30-second block after voice ends where music/nature continue
  const OUTRO_DURATION = 30; // seconds
  const OUTRO_FADE_START = 25; // fade begins at this second
  const [isOutro, setIsOutro] = useState(false);
  const [outroElapsed, setOutroElapsed] = useState(0);
  const outroIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const outroStartTimeRef = useRef<number>(0);
  const savedMusicLevelRef = useRef<number>(50);
  const savedNatureLevelRef = useRef<number>(75);

  // Refs for tracking delays, timeouts, seeking, and playing state
  const playbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delayDurationRef = useRef<number>(0);
  const isPlayingRef = useRef(isPlaying);
  const seekOffsetRef = useRef<number>(0);

  // Keep isPlayingRef in sync with isPlaying
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Reset repeat count when step index changes
  useEffect(() => {
    setRepeatCount(0);
  }, [currentStepIndex]);

  // HTML5 Audio Refs
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const natureAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio API refs for iOS volume control
  const audioContextRef = useRef<AudioContext | null>(null);
  const voiceGainNodeRef = useRef<GainNode | null>(null);
  const musicGainNodeRef = useRef<GainNode | null>(null);
  const natureGainNodeRef = useRef<GainNode | null>(null);

  const isIOS = () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  };

  const initAudioContext = () => {
    if (typeof window === "undefined") return;
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
  };

  const connectAudioToWebAudio = (audioElement: HTMLAudioElement, type: "voice" | "music" | "nature") => {
    if (!isIOS()) return;

    initAudioContext();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    audioElement.crossOrigin = "anonymous";

    try {
      let gainNode: GainNode;
      if (type === "voice") {
        if (!voiceGainNodeRef.current) {
          voiceGainNodeRef.current = ctx.createGain();
          voiceGainNodeRef.current.connect(ctx.destination);
        }
        gainNode = voiceGainNodeRef.current;
        gainNode.gain.value = volume / 100;
      } else if (type === "music") {
        if (!musicGainNodeRef.current) {
          musicGainNodeRef.current = ctx.createGain();
          musicGainNodeRef.current.connect(ctx.destination);
        }
        gainNode = musicGainNodeRef.current;
        gainNode.gain.value = musicLevel / 100;
      } else {
        if (!natureGainNodeRef.current) {
          natureGainNodeRef.current = ctx.createGain();
          natureGainNodeRef.current.connect(ctx.destination);
        }
        gainNode = natureGainNodeRef.current;
        gainNode.gain.value = natureLevel / 100;
      }

      const source = ctx.createMediaElementSource(audioElement);
      source.connect(gainNode);
    } catch (err) {
      console.error(`Failed to connect ${type} audio to Web Audio API:`, err);
    }
  };

  // Clean up AudioContext on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(err => console.error("Failed to close AudioContext:", err));
        audioContextRef.current = null;
      }
    };
  }, []);

  const handleStepEnded = () => {
    if (!meditation) return;
    const currentStep = meditation.steps[currentStepIndex];
    const rawStepType = currentStep?.step_type;
    const stepType = rawStepType === "confirmation" ? "affirmation" : rawStepType;
    const loopSetting = loopSettings[stepType] ?? 0;

    if (loopSetting !== 0 && (loopSetting === "infinity" || repeatCount < loopSetting)) {
      setRepeatCount((prev) => prev + 1);
      setCurrentStepAudioTime(0);
      if (voiceAudioRef.current) {
        voiceAudioRef.current.currentTime = 0;
        if (isPlaying) {
          if (playbackTimeoutRef.current) {
            clearTimeout(playbackTimeoutRef.current);
          }
          setIsDelaying(true);
          playbackTimeoutRef.current = setTimeout(() => {
            setIsDelaying(false);
            playbackTimeoutRef.current = null;
          }, 2000); // 2 seconds delay on loop repeat
        }
      }
    } else {
      if (currentStepIndex < meditation.steps.length - 1) {
        delayDurationRef.current = 2000; // 2 seconds delay before next step starts
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        // Voice ended on last step — start 30-second outro phase
        startOutro();
      }
    }
  };

  const handleStepEndedRef = useRef(handleStepEnded);
  useEffect(() => {
    handleStepEndedRef.current = handleStepEnded;
  });

  // Start the 30-second outro phase
  const startOutro = () => {
    // Save current levels for fade calculation
    savedMusicLevelRef.current = musicLevel;
    savedNatureLevelRef.current = natureLevel;
    setIsOutro(true);
    setOutroElapsed(0);
    outroStartTimeRef.current = Date.now();

    // Voice audio stops
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
    }

    // Music and nature keep playing (they are already looping)
    // Start interval to track elapsed time and handle fade
    outroIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - outroStartTimeRef.current) / 1000;
      setOutroElapsed(elapsed);

      if (elapsed >= OUTRO_FADE_START) {
        // Fade out over the last 5 seconds
        const fadeProgress = Math.min((elapsed - OUTRO_FADE_START) / (OUTRO_DURATION - OUTRO_FADE_START), 1);
        const fadeMultiplier = 1 - fadeProgress;

        if (musicAudioRef.current) {
          musicAudioRef.current.volume = (savedMusicLevelRef.current / 100) * fadeMultiplier;
        }
        if (musicGainNodeRef.current && audioContextRef.current) {
          musicGainNodeRef.current.gain.setValueAtTime((savedMusicLevelRef.current / 100) * fadeMultiplier, audioContextRef.current.currentTime);
        }
        if (natureAudioRef.current) {
          natureAudioRef.current.volume = (savedNatureLevelRef.current / 100) * fadeMultiplier;
        }
        if (natureGainNodeRef.current && audioContextRef.current) {
          natureGainNodeRef.current.gain.setValueAtTime((savedNatureLevelRef.current / 100) * fadeMultiplier, audioContextRef.current.currentTime);
        }
      }

      if (elapsed >= OUTRO_DURATION) {
        // Outro complete — stop everything
        endOutro();
      }
    }, 50); // Update every 50ms for smooth fade
  };

  const endOutro = () => {
    if (outroIntervalRef.current) {
      clearInterval(outroIntervalRef.current);
      outroIntervalRef.current = null;
    }
    setIsOutro(false);
    setOutroElapsed(0);
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setCurrentStepAudioTime(0);

    // Reset volumes back to saved levels
    if (musicAudioRef.current) {
      musicAudioRef.current.volume = savedMusicLevelRef.current / 100;
      musicAudioRef.current.pause();
    }
    if (musicGainNodeRef.current && audioContextRef.current) {
      musicGainNodeRef.current.gain.setValueAtTime(savedMusicLevelRef.current / 100, audioContextRef.current.currentTime);
    }
    if (natureAudioRef.current) {
      natureAudioRef.current.volume = savedNatureLevelRef.current / 100;
      natureAudioRef.current.pause();
    }
    if (natureGainNodeRef.current && audioContextRef.current) {
      natureGainNodeRef.current.gain.setValueAtTime(savedNatureLevelRef.current / 100, audioContextRef.current.currentTime);
    }
    if (voiceAudioRef.current) {
      voiceAudioRef.current.currentTime = 0;
    }
  };

  // Fetch Meditation details
  useEffect(() => {
    async function loadMeditation() {
      try {
        setLoading(true);
        setError("");
        setImageError(false);
        let targetId = id;

        if (!targetId) {
          const archiveRes = await api.meditation.getArchive(1, 1);
          if (archiveRes.results && archiveRes.results.length > 0) {
            targetId = archiveRes.results[0].id.toString();
          }
        }

        if (!targetId) {
          setError("Keine Meditation gefunden.");
          setLoading(false);
          return;
        }

        const details = await api.meditation.getDetails(targetId);
        setMeditation(details);
      } catch (err: any) {
        console.error("Failed to load meditation:", err);
        setError(err.message || "Fehler beim Laden der Meditation.");
      } finally {
        setLoading(false);
      }
    }
    loadMeditation();
  }, [id]);

  // Set up nature sound background loop
  useEffect(() => {
    if (meditation?.nature_sound?.file) {
      const natureAudio = new Audio(meditation.nature_sound.file);
      natureAudio.loop = true;
      natureAudio.volume = natureLevel / 100;
      connectAudioToWebAudio(natureAudio, "nature");
      if (isPlaying) {
        natureAudio.play().catch(err => console.error("Nature sound playback failed:", err));
      }
      natureAudioRef.current = natureAudio;
    }
    return () => {
      if (natureAudioRef.current) {
        natureAudioRef.current.pause();
        natureAudioRef.current = null;
      }
    };
  }, [meditation?.nature_sound?.file]);

  // Set up background music loop
  useEffect(() => {
    if (meditation?.music?.file) {
      const musicAudio = new Audio(meditation.music.file);
      musicAudio.loop = true;
      musicAudio.volume = musicLevel / 100;
      connectAudioToWebAudio(musicAudio, "music");
      if (isPlaying) {
        musicAudio.play().catch(err => console.error("Music sound playback failed:", err));
      }
      musicAudioRef.current = musicAudio;
    }
    return () => {
      if (musicAudioRef.current) {
        musicAudioRef.current.pause();
        musicAudioRef.current = null;
      }
    };
  }, [meditation?.music?.file]);

  // Manage voice audio instance when step changes or meditation loads
  useEffect(() => {
    if (!meditation || meditation.steps.length === 0) return;

    const voiceUrl = meditation.steps[currentStepIndex]?.audio_file;

    // Pause previous audio
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current = null;
    }

    // Clear any existing delay timer
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current);
      playbackTimeoutRef.current = null;
    }
    setIsDelaying(false);

    if (voiceUrl) {
      const audio = new Audio(voiceUrl);
      audio.volume = volume / 100;
      connectAudioToWebAudio(audio, "voice");
      
      const initialTime = seekOffsetRef.current;
      seekOffsetRef.current = 0; // reset
      audio.currentTime = initialTime;
      setCurrentStepAudioTime(initialTime);

      audio.ontimeupdate = () => {
        setCurrentStepAudioTime(audio.currentTime);
      };

      audio.onended = () => {
        handleStepEndedRef.current();
      };

      voiceAudioRef.current = audio;

      if (isPlaying) {
        const delay = delayDurationRef.current;
        delayDurationRef.current = 0; // reset

        if (delay > 0) {
          setIsDelaying(true);
          playbackTimeoutRef.current = setTimeout(() => {
            setIsDelaying(false);
            playbackTimeoutRef.current = null;
          }, delay);
        } else {
          audio.play().catch(err => console.error("Voice playback failed:", err));
        }
      }
    }

    return () => {
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
      }
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
      }
      if (outroIntervalRef.current) {
        clearInterval(outroIntervalRef.current);
        outroIntervalRef.current = null;
      }
    };
  }, [meditation, currentStepIndex]);

  // Sync play/pause state
  useEffect(() => {
    if (isPlaying) {
      if (!isDelaying && !isOutro) {
        voiceAudioRef.current?.play().catch(err => console.error("Voice play error:", err));
      }
      natureAudioRef.current?.play().catch(err => console.error("Nature play error:", err));
      musicAudioRef.current?.play().catch(err => console.error("Music play error:", err));
    } else {
      voiceAudioRef.current?.pause();
      if (isDelaying) {
        if (playbackTimeoutRef.current) {
          clearTimeout(playbackTimeoutRef.current);
          playbackTimeoutRef.current = null;
        }
        setIsDelaying(false);
      }
      // If we're stopping during outro, clean up the outro
      if (isOutro) {
        endOutro();
        return;
      }
      natureAudioRef.current?.pause();
      musicAudioRef.current?.pause();
    }
  }, [isPlaying, isDelaying]);

  // Volume controls sync
  useEffect(() => {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.volume = volume / 100;
    }
    if (voiceGainNodeRef.current && audioContextRef.current) {
      voiceGainNodeRef.current.gain.setValueAtTime(volume / 100, audioContextRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    if (natureAudioRef.current) {
      natureAudioRef.current.volume = natureLevel / 100;
    }
    if (natureGainNodeRef.current && audioContextRef.current) {
      natureGainNodeRef.current.gain.setValueAtTime(natureLevel / 100, audioContextRef.current.currentTime);
    }
  }, [natureLevel]);

  useEffect(() => {
    if (musicAudioRef.current) {
      musicAudioRef.current.volume = musicLevel / 100;
    }
    if (musicGainNodeRef.current && audioContextRef.current) {
      musicGainNodeRef.current.gain.setValueAtTime(musicLevel / 100, audioContextRef.current.currentTime);
    }
  }, [musicLevel]);

  // Step helper calculations
  const stepStartTimes = React.useMemo(() => {
    if (!meditation) return [];
    let acc = 0;
    return meditation.steps.map((step) => {
      const start = acc;
      acc += parseDurationToSeconds(step.duration);
      return start;
    });
  }, [meditation]);

  const voiceDuration = meditation ? meditation.total_duration : 0;
  const totalDuration = voiceDuration + OUTRO_DURATION;
  const currentProgress = isOutro
    ? voiceDuration + outroElapsed
    : (stepStartTimes[currentStepIndex] || 0) + currentStepAudioTime;



  const handleSkipForward = () => {
    initAudioContext();
    if (meditation && currentStepIndex < meditation.steps.length - 1) {
      delayDurationRef.current = 1000; // 1 second delay for manual skip
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleSkipBackward = () => {
    initAudioContext();
    if (currentStepIndex > 0) {
      delayDurationRef.current = 1000; // 1 second delay for manual skip
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      if (voiceAudioRef.current) {
        voiceAudioRef.current.currentTime = 0;
      }
      setCurrentStepAudioTime(0);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    initAudioContext();
    if (!meditation) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickedPercentage = clickX / width;
    const clickedTime = clickedPercentage * totalDuration;

    let accumulatedTime = 0;
    for (let i = 0; i < meditation.steps.length; i++) {
      const stepDuration = parseDurationToSeconds(meditation.steps[i].duration);
      if (clickedTime >= accumulatedTime && clickedTime <= accumulatedTime + stepDuration) {
        const offset = clickedTime - accumulatedTime;
        if (i !== currentStepIndex) {
          seekOffsetRef.current = offset;
        }
        delayDurationRef.current = 0; // Seek is instant
        setCurrentStepIndex(i);
        setCurrentStepAudioTime(offset);
        if (voiceAudioRef.current) {
          voiceAudioRef.current.currentTime = offset;
        }
        break;
      }
      accumulatedTime += stepDuration;
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center pt-32 min-h-[60vh]">
        <Loader2 className="animate-spin text-accent mb-4" size={48} />
        <p className="text-white/60">Meditation wird geladen...</p>
      </div>
    );
  }

  if (error || !meditation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center pt-32 text-center px-6 min-h-[60vh] gap-6">
        <p className="text-red-400 font-bold text-lg max-w-md">{error || "Meditation nicht gefunden"}</p>
        <Link
          href="/meditation/neue-meditation"
          className="bg-accent text-[#0b0f17] px-8 py-3 rounded-full font-bold transition-all hover:scale-105"
        >
          Neue Meditation erstellen
        </Link>
      </div>
    );
  }

  const activeStep = meditation.steps[currentStepIndex];
  const rawActiveStepType = activeStep?.step_type;
  const stepType = rawActiveStepType === "confirmation" ? "affirmation" : rawActiveStepType;
  const stepMeta = stepType ? (STEP_TYPE_MAP[stepType] || { label: stepType, color: "bg-blue-500/20 border-blue-400/30 text-blue-200" }) : null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 gap-5 max-w-4xl mx-auto w-full pt-28 relative">
      {/* Top Card: Player Info & Visualization */}
      <div className="glass-card w-full p-6 md:p-10 flex flex-col items-center relative overflow-hidden rounded-[2rem] z-10">

        {/* Back navigation */}
        <Link
          href={`/meditation/meditation-structure?id=${meditation.id}`}
          className="absolute top-6 left-6 text-white/40 hover:text-white transition-all flex items-center gap-1 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          <span>Struktur</span>
        </Link>

        {/* Favorite Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-6 right-6 transition-all duration-300 hover:scale-110 ${isLiked ? "text-accent fill-accent" : "text-white/40 hover:text-white"}`}
        >
          <Heart size={24} />
        </button>

        {/* Rounded Banner Music Player Circle */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-6 mt-2">
          {/* Animated Ripples */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`absolute border border-accent/20 rounded-full transition-all duration-[2000ms] ease-out pointer-events-none ${isPlaying ? "animate-[ripple_4s_infinite]" : "opacity-20"
                }`}
              style={{
                width: `${i * 25}%`,
                height: `${i * 25}%`,
                animationDelay: `${i * 1000}ms`,
                opacity: 0.3 - (i * 0.05)
              }}
            />
          ))}

          {/* Yellowish spinning player with Banner Image */}
          <div
            className="relative w-52 h-52 rounded-full bg-gradient-to-br from-accent/20 via-accent/5 to-accent-dark/25 border-4 border-accent/30 flex items-center justify-center shadow-[0_0_35px_rgba(242,202,80,0.25)] animate-spin-slow"
            style={{ animationPlayState: isPlaying ? "running" : "paused" }}
          >
            {/* Subtle inner accent ring design */}
            <div className="absolute inset-3 rounded-full border border-accent/20 pointer-events-none" />
            <div className="absolute inset-6 rounded-full border border-accent/10 pointer-events-none" />

            {/* Inner Cover Art Circle */}
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-accent/20 shadow-[0_8px_20px_rgba(0,0,0,0.4)] bg-[#10141f]">
              {meditation.banner_url && !imageError ? (
                <img
                  src={meditation.banner_url}
                  alt={meditation.title}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent-dark/20 flex items-center justify-center">
                  <Music2 className="text-accent/60" size={40} />
                </div>
              )}
              {/* Glossy diagonal overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Text Information */}
        <div className="text-center flex flex-col items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
            {meditation.title}
          </h1>
          <p className="text-white/60 text-base font-medium">
            Geführt von {meditation.charecter_voice.name} - {formatTime(totalDuration)} Min.
          </p>

          {isOutro ? (
            <div className="mt-1 px-3 py-1 rounded-full border flex items-center gap-1.5 transition-all duration-300 bg-emerald-500/20 border-emerald-400/30 text-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Nachklang
              </span>
            </div>
          ) : stepMeta && (
            <div className={`mt-1 px-3 py-1 rounded-full border flex items-center gap-1.5 transition-all duration-300 ${isDelaying ? "bg-accent/20 border-accent/40 text-accent" : stepMeta.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full bg-current ${isDelaying ? "animate-ping" : "animate-pulse"}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {isDelaying ? "Atempause" : stepMeta.label}
              </span>
            </div>
          )}

          {(activeStep || isOutro) && (
            <div className="h-10 mt-3 flex items-center justify-center">
              <p className="text-white/40 text-xs max-w-[500px] line-clamp-2 italic px-4 text-center">
                {isOutro ? (
                  <span className={`font-medium not-italic transition-opacity duration-1000 ${
                    outroElapsed >= OUTRO_FADE_START ? 'text-white/20' : 'text-emerald-300/70 animate-pulse'
                  }`}>Lassen Sie die Klänge sanft ausklingen...</span>
                ) : isDelaying ? (
                  <span className="animate-pulse text-accent font-medium not-italic">Atmen Sie tief ein und aus...</span>
                ) : (
                  `"${activeStep?.content}"`
                )}
              </p>
            </div>
          )}
        </div>

        {/* Main Progress Bar */}
        <div className="w-full mt-8 flex flex-col gap-2.5">
          <div
            onClick={handleProgressBarClick}
            className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden group cursor-pointer"
          >
            <div
              className={`absolute h-full transition-all duration-300 shadow-[0_0_10px_rgba(242,202,80,0.5)] ${isOutro ? 'bg-emerald-400' : 'bg-accent'}`}
              style={{ width: `${(currentProgress / totalDuration) * 100}%` }}
            />
            {/* Markers representing steps */}
            {stepStartTimes.slice(1).map((startTime, idx) => (
              <div
                key={idx}
                className="absolute h-full w-[2px] bg-white/20"
                style={{ left: `${(startTime / totalDuration) * 100}%` }}
              />
            ))}
            {/* Outro start marker */}
            <div
              className="absolute h-full w-[2px] bg-emerald-400/40"
              style={{ left: `${(voiceDuration / totalDuration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-white/50 text-xs font-medium tabular-nums">
            <span>{formatTime(currentProgress)}</span>
            <span>-{formatTime(Math.max(0, totalDuration - currentProgress))}</span>
          </div>
        </div>
      </div>

      {/* Bottom Card: Controls & Mixer */}
      <div className="glass-card w-full p-6 md:p-8 flex flex-col gap-8 rounded-[2rem] z-10">

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-6 md:gap-10">
          <button
            onClick={handleSkipBackward}
            className="text-white/40 hover:text-white transition-colors"
          >
            <SkipBack size={24} />
          </button>

          <button
            onClick={() => {
              initAudioContext();
              setIsPlaying(!isPlaying);
            }}
            className="w-16 h-16 rounded-full bg-accent text-[#0b0f17] flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(242,202,80,0.4)] hover:scale-105 hover:bg-accent group"
          >
            {isPlaying ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={28} fill="currentColor" className="ml-1" />
            )}
          </button>

          <button
            onClick={handleSkipForward}
            className="text-white/40 hover:text-white transition-colors"
          >
            <SkipForward size={24} />
          </button>
        </div>

        {/* Feature Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureToggle
            title="Affirmationen"
            description="Affirmationsabschnitt wiederholen"
            icon={<Mic2 size={16} />}
            value={loopSettings.affirmation}
            onChange={(val) => setLoopSettings(prev => ({ ...prev, affirmation: val }))}
          />
          <FeatureToggle
            title="Suggestionen"
            description="Suggestionsabschnitt wiederholen"
            icon={<Repeat size={16} />}
            value={loopSettings.suggestion}
            onChange={(val) => setLoopSettings(prev => ({ ...prev, suggestion: val }))}
          />
          <FeatureToggle
            title="Visualisierung"
            description="Landschaftsabschnitt wiederholen"
            icon={<Repeat size={16} />}
            value={loopSettings.visualization}
            onChange={(val) => setLoopSettings(prev => ({ ...prev, visualization: val }))}
          />
        </div>

        {/* Audio Mixer */}
        <div className="flex flex-col gap-5 pt-3 border-t border-white/5">
          <MixerSlider
            icon={<Volume2 size={18} />}
            value={volume}
            onChange={setVolume}
            label="Hauptstimme"
          />
          <MixerSlider
            icon={<Music2 size={18} />}
            value={musicLevel}
            onChange={setMusicLevel}
            label="Hintergrundmusik"
          />
          <MixerSlider
            icon={<Wind size={18} />}
            value={natureLevel}
            onChange={setNatureLevel}
            label="Naturgeräusche"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureToggle({
  title,
  description,
  icon,
  value,
  onChange
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: number | "infinity";
  onChange: (val: number | "infinity") => void;
}) {
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (val: number | "infinity") => {
    onChange(val);
    setShowOptions(false);
  };

  useEffect(() => {
    if (!showOptions) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between min-h-[32px]">
        <span className="text-white/80 font-bold text-sm tracking-wide">{title}</span>

        <div className="relative" ref={containerRef}>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold transition-all duration-300 ${value !== 0
                ? "bg-accent/20 border-accent text-accent shadow-[0_0_10px_rgba(242,202,80,0.2)] hover:bg-accent/30"
                : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
          >
            <Repeat size={10} />
            {value === 0 ? "LOOP" : (value === "infinity" ? "∞" : `${value}x`)}
          </button>

          {showOptions && (
            <div className="absolute bottom-full right-0 mb-2 flex items-center gap-1 bg-[#10141f]/95 border border-white/15 rounded-full p-1 shadow-[0_10px_25px_rgba(0,0,0,0.6)] backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
              {([0, 1, 2, 3, "infinity"] as const).map((option) => {
                const isActive = value === option;
                let label = "";
                if (option === 0) label = "Off";
                else if (option === "infinity") label = "∞";
                else label = `${option}x`;

                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all whitespace-nowrap ${isActive
                        ? "bg-accent text-[#0b0f17] shadow-[0_0_8px_rgba(242,202,80,0.3)]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <p className="text-white/30 text-[11px] leading-tight">
        {description}
      </p>
    </div>
  );
}

function MixerSlider({ icon, value, onChange, label }: { icon: React.ReactNode, value: number, onChange: (v: number) => void, label: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="text-white/40 group-hover:text-accent transition-colors duration-300">
        {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 18 })}
      </div>
      <div className="flex-1 relative h-1 flex items-center">
        <div className="absolute w-full h-full bg-white/10 rounded-full" />
        <div
          className="absolute h-full bg-accent rounded-full shadow-[0_0_8px_rgba(242,202,80,0.3)] transition-all duration-100"
          style={{ width: `${value}%` }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          aria-label={label}
        />
      </div>
      <span className="text-white/40 text-[10px] font-bold tabular-nums w-7 text-right group-hover:text-white transition-colors">
        {value}%
      </span>
    </div>
  );
}

export default function AudioPlayerPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex flex-col items-center justify-center pt-32 min-h-[60vh]">
        <Loader2 className="animate-spin text-accent mb-4" size={48} />
        <p className="text-white/60">Meditation Player wird geladen...</p>
      </div>
    }>
      <AudioPlayerContent />
    </Suspense>
  );
}
