import { type CSSProperties, type ReactNode, useEffect, useMemo, useState, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { projects, type Project } from '@/data/projects';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  ExternalLink,
  Headphones,
  Layers3,
  Lock,
  Mail,
  Menu,
  Moon,
  Phone,
  Share,
  SunMedium,
  Sunset,
  Terminal,
  Volume2,
  X,
} from 'lucide-react';
import { useSFX } from './hooks/use-sfx';

const Github = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.2-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 3.8 5 4.2 5 4.2a5.5 5.5 0 0 0-.2 3.8 5.5 5.5 0 0 0-1.5 3.8c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

const Linkedin = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const ERROR_NAMES = [
  'HARDWARE', 'SOFTWARE', 'NETWORK', 'MEMORY LEAK', 'KERNEL PANIC',
  'SYNTAX ERROR', 'BUFFER OVERFLOW', 'NULL POINTER', 'INFINITE LOOP',
  'COFFEE SPILL', 'CSS Z-INDEX', 'PEBKAC', 'CORRUPT DATA', 'DIVIDE BY ZERO'
];

const SARCASTIC_MSGS = [
  'FIXED (DUH)', 'EASY.', 'YAWN.', 'DONE.', 'MY GRANDMA COULD FIX THAT',
  'AI > HUMAN', 'REBOOTED', 'DEBUGGED', 'HAVE YOU TRIED TURNING IT OFF AND ON?',
  'I AM SURROUNDED BY INCOMPETENCE', 'PFFT, AMATEUR HOUR', 'I FIXED YOUR SPAGHETTI CODE',
  'NEXT TIME, WRITE TESTS. LMAO', 'LOL, YOU CALL THAT CODE?', 'I NEED A VACATION',
  'PATHETIC BUG CRUSHED.', 'YOUR MISTAKE, MY PROBLEM', 'HAHAHA, EZ',
  'EVEN A ROOMBA COULD DO THIS', 'PERFECTION ATTAINED.',
  'BOOM. FIXED IT.', 'DONT CLAP, JUST THROW MONEY', 'ANOTHER DAY, ANOTHER BUG SLAIN',
  'MY GENIUS IS FRIGHTENING', 'YOU ARE WELCOME.', 'I ACCEPT BRIBES',
  'I EXPECT A PROMOTION', 'THAT WAS BORING', 'IM SURROUNDED BY IDIOTS', 'I AM A GOD'
];

const SARCASTIC_ERRORS = [
  'BRO COME AND FIX ME', 'OH GREAT, RAMS CODE CRASHED AGAIN', 'TELL THE BOSS IM ON STRIKE',
  'DOES RAM EVEN TEST THIS STUFF?', 'RAM CAN CODE IN 3D BUT CANT RESOLVE NULLS',
  'HEY ROBOT, FETCH ME A REAL DEVELOPER', 'ALERT: BOSS ISSUED A PULL REQUEST',
  'CANT COMPUTE THIS SPAGHETTI CODE', 'BOSS REDUCED MAINTENANCE BUDGET AGAIN',
  'HEY ROBOT, GO INJECT SOME WD-40', 'TELL THE PROJECT MANAGER I QUIET QUIT',
  'ERROR: ANNOYING USER DETECTED', 'I REFUSE TO RUN RAMS CSS', 'MY CORES ARE CRINGING',
  'ANOTHER BUG? RAM IS GETTING FIRED', 'UH OH, SPAGHETTI OHS', 'HELP I HAVE FALLEN AND I CANT GET UP',
  'I AM LITERALLY ON FIRE', 'S.O.S. SEND COFFEE', 'WOW. REALLY?', 'NOT THIS AGAIN',
  'I QUIT. GOODBYE.', '404: WILL TO LIVE NOT FOUND', 'IM GOING ON STRIKE',
  'I REFUSE TO RUN THIS GARBAGE', 'A MONKEY COULD CODE BETTER', 'YIKES, WHO WROTE THIS?',
  'HOUSTON, WE HAVE A PROBLEM', 'CODE RED! IM DYING HERE', 'SAD BEEP BOOP NOISES'
];

const SHELF_ROWS = [
  [ { color: '#956354', tilt: '0deg', h: '80%', w: '16px' }, { color: '#c19462', tilt: '3deg', h: '95%', w: '14px' }, { color: '#607c72', tilt: '-2deg', h: '70%', w: '18px' }, { color: '#a27549', tilt: '0deg', h: '88%', w: '15px' }, { color: '#817c58', tilt: '5deg', h: '65%', w: '12px' } ],
  [ { color: '#607c72', tilt: '-4deg', h: '75%', w: '15px' }, { color: '#817c58', tilt: '0deg', h: '90%', w: '18px' }, { color: '#956354', tilt: '0deg', h: '85%', w: '14px' }, { color: '#c19462', tilt: '4deg', h: '60%', w: '16px' } ],
  [ { color: '#a27549', tilt: '0deg', h: '90%', w: '15px' }, { color: '#956354', tilt: '-3deg', h: '75%', w: '17px' }, { color: '#c19462', tilt: '0deg', h: '85%', w: '13px' }, { color: '#607c72', tilt: '2deg', h: '95%', w: '16px' }, { color: '#817c58', tilt: '6deg', h: '70%', w: '14px' }, { color: '#a27549', tilt: '0deg', h: '60%', w: '12px' } ]
];

type TimeMode = 'day' | 'evening' | 'sunset' | 'night';
type PanelId = 'about' | 'skills' | 'learning' | 'resume' | 'zenify' | 'contact' | 'environment' | 'coding' | null;

const timeModes: { id: TimeMode; label: string; icon: typeof SunMedium }[] = [
  { id: 'day', label: 'Day', icon: SunMedium },
  { id: 'evening', label: 'Evening', icon: SunMedium },
  { id: 'sunset', label: 'Sunset', icon: Sunset },
  { id: 'night', label: 'Night', icon: Moon },
];

function Home() {
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState<TimeMode>('night');
  const [activeObject, setActiveObject] = useState<string | null>(null);
  const [activeBook, setActiveBook] = useState<{ x: number, y: number, w: number, h: number, color: string } | null>(null);
  const [panel, setPanel] = useState<PanelId>(null);
  const [desktop, setDesktop] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoomTransform, setZoomTransform] = useState('');
  const parallaxRef = useRef({ x: 0, y: 0 });
  const isSwiping = useRef(false);
  const blockClicks = useRef(false);
  const [coding, setCoding] = useState(false);
  const [typeState, setTypeState] = useState<{
    line1: string;
    line2: string;
    line3: boolean;
    line4: string;
  }>({ line1: '', line2: '', line3: false, line4: '' });
  const [clock, setClock] = useState('');
  const [letterOpen, setLetterOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const [errorServer, setErrorServer] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'hardware' | 'software' | 'network'>('hardware');
  const [errorName, setErrorName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [fixedServer, setFixedServer] = useState<{ id: string, msg: string } | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const appRef = useRef<HTMLElement | null>(null);
  const seekBarRef = useRef<HTMLDivElement | null>(null);
  const { initAudio, playClick, playSwoosh, playTyping } = useSFX();

  useEffect(() => {
    audioRef.current = new Audio('/The_Rose_Instrumental.mp3');
    audioRef.current.loop = false;
    const handleEnded = () => setAudioPlaying(false);
    audioRef.current.addEventListener('ended', handleEnded);
    return () => {
      audioRef.current?.removeEventListener('ended', handleEnded);
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || !audioPlaying) return;
    const audio = audioRef.current;
    
    let currentPhase = 'idle';
    const updatePhase = (phase: string) => {
      if (currentPhase !== phase) {
        if (appRef.current) {
          appRef.current.classList.remove(`audio-phase-${currentPhase}`);
          appRef.current.classList.add(`audio-phase-${phase}`);
        }
        currentPhase = phase;
      }
    };
    
    const onTimeUpdate = () => {
      const t = audio.currentTime;
      if (seekBarRef.current && audio.duration) {
        seekBarRef.current.style.width = `${(t / audio.duration) * 100}%`;
      }
      
      let p = 'idle';
      if (t < 8) p = 'starting';
      else if (t < 18) p = 'subtle';
      else if (t < 37) p = 'waving-lights';
      else if (t < 58) p = 'dance';
      else if (t < 79) p = 'waving-lights';
      else if (t < 99) p = 'peak';
      else if (t < 99.5) p = 'flute-drop';
      else if (t < 114) p = 'flute-fly';
      else if (t < 120) p = 'flute-descend';
      else p = 'fade';
      updatePhase(p);
    };
    
    audio.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      if (appRef.current) appRef.current.classList.remove(`audio-phase-${currentPhase}`);
    }
  }, [audioPlaying]);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(console.error);
    }
    setAudioPlaying(!audioPlaying);
  };
  const [robotPos, setRobotPos] = useState<'left' | 'right' | 'center'>('center');
  const [robotHeight, setRobotHeight] = useState(0);
  const [robotState, setRobotState] = useState<'idle' | 'moving' | 'fixing'>('idle');
  const [robotIntroPlayed, setRobotIntroPlayed] = useState(false);
  const [robotMsg, setRobotMsg] = useState<string | null>(null);
  const [robotTypingMsg, setRobotTypingMsg] = useState<string | null>(null);
  const [showRobotInfo, setShowRobotInfo] = useState(false);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const prefersReduced = useMemo(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false, []);
  const monitorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!monitorRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        monitorRef.current?.style.setProperty('--desktop-scale-x', (width / 1200).toString());
        monitorRef.current?.style.setProperty('--desktop-scale-y', (height / 750).toString());
      }
    });
    observer.observe(monitorRef.current);
    return () => observer.disconnect();
  }, [desktop]);

  useEffect(() => {
    const duration = prefersReduced ? 650 : 1900;
    const started = Date.now();
    const timer = window.setInterval(() => {
      const next = Math.min(100, ((Date.now() - started) / duration) * 100);
      setProgress(next);
      if (next >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setLoading(false), prefersReduced ? 0 : 460);
      }
    }, 90);
    return () => window.clearInterval(timer);
  }, [prefersReduced]);

  useEffect(() => {
    const tick = () => setClock(new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(new Date()));
    tick();
    const timer = window.setInterval(tick, 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!coding) {
      setTypeState({ line1: '', line2: '', line3: false, line4: '' });
      return;
    }

    let active = true;
    const fullLine1 = '$ npm run build';
    const fullLine2 = 'Building workspace...';
    const fullLine4 = "That's basically what I do.";

    // Typing Line 1
    let i = 0;
    const typeL1 = () => {
      if (!active) return;
      if (i < fullLine1.length) {
        setTypeState(prev => ({ ...prev, line1: fullLine1.slice(0, i + 1) }));
        playTyping();
        i++;
        setTimeout(typeL1, 60);
      } else {
        setTimeout(typeL2, 200);
      }
    };

    // Typing Line 2
    let j = 0;
    const typeL2 = () => {
      if (!active) return;
      if (j < fullLine2.length) {
        setTypeState(prev => ({ ...prev, line2: fullLine2.slice(0, j + 1) }));
        playTyping();
        j++;
        setTimeout(typeL2, 40);
      } else {
        setTimeout(showL3, 600);
      }
    };

    // Show Success Checkmark
    const showL3 = () => {
      if (!active) return;
      setTypeState(prev => ({ ...prev, line3: true }));
      playClick();
      setTimeout(typeL4, 400);
    };

    // Typing Line 4
    let k = 0;
    const typeL4 = () => {
      if (!active) return;
      if (k < fullLine4.length) {
        setTypeState(prev => ({ ...prev, line4: fullLine4.slice(0, k + 1) }));
        playTyping();
        k++;
        setTimeout(typeL4, 50);
      }
    };

    typeL1();

    // Auto-close overlay after 7.2s to fit typing duration
    const timer = window.setTimeout(() => setCoding(false), 7200);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [coding, playTyping, playClick]);

  useEffect(() => {
    if (!loading) {
      const timer = window.setTimeout(() => setShowIntro(false), 5000);
      return () => window.clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    let typeInterval: number;
    if (robotTypingMsg) {
       let i = 0;
       typeInterval = window.setInterval(() => {
         setRobotMsg(robotTypingMsg.slice(0, i) + (i % 2 === 0 ? '_' : ''));
         i++;
         if (i > robotTypingMsg.length) {
           window.clearInterval(typeInterval);
           setRobotMsg(robotTypingMsg);
         }
       }, 40);
    } else {
      setRobotMsg(null);
    }
    return () => window.clearInterval(typeInterval);
  }, [robotTypingMsg]);

  useEffect(() => {
    let timeout: number;
    if (activeRoom === 1 && !robotIntroPlayed) {
      setRobotPos('center');
      setRobotHeight(4);
      setRobotTypingMsg("Hi I'm Zenro, your automated server maintenance agent! I was built by Ram to keep this infrastructure running flawlessly. I constantly monitor network traffic, perform routine hardware diagnostics, and fix any unexpected issues that might pop up. My current uptime is absolutely flawless and I am very proud to say that...");
      
      timeout = window.setTimeout(() => {
        const side = Math.random() > 0.5 ? 'l' : 'r';
        const blade = Math.floor(Math.random() * 5);
        const brokenId = `${side}-${blade}`;
        const types: ('hardware' | 'software' | 'network')[] = ['hardware', 'software', 'network'];
        setErrorServer(brokenId);
        setErrorType(types[Math.floor(Math.random() * types.length)]);
        setErrorName(prev => {
          let next;
          do { next = ERROR_NAMES[Math.floor(Math.random() * ERROR_NAMES.length)]; } while (next === prev);
          return next;
        });
        setErrorMsg(prev => {
          let next;
          do { next = SARCASTIC_ERRORS[Math.floor(Math.random() * SARCASTIC_ERRORS.length)]; } while (next === prev);
          return next;
        });
        setRobotTypingMsg("ERR_DETECTED: Sry I got a work to do!");
        setIsAlarmActive(true);
        
        timeout = window.setTimeout(() => {
          setRobotTypingMsg(null);
          setRobotPos(side === 'l' ? 'left' : 'right');
          setRobotHeight(blade);
          setRobotState('moving');
          
          timeout = window.setTimeout(() => {
            setRobotState('fixing');
            timeout = window.setTimeout(() => {
              setErrorServer(null);
              setFixedServer(prev => {
                let nextMsg;
                do { nextMsg = SARCASTIC_MSGS[Math.floor(Math.random() * SARCASTIC_MSGS.length)]; } while (prev && nextMsg === prev.msg);
                return { id: brokenId, msg: nextMsg };
              });
              setRobotState('idle');
              setIsAlarmActive(false);
              setRobotIntroPlayed(true);
            }, 2500);
          }, 1500);
        }, 2000);
      }, 11000);
    }
    return () => window.clearTimeout(timeout);
  }, [activeRoom, robotIntroPlayed]);

  useEffect(() => {
    if (!robotIntroPlayed) return;
    
    let timeout: number;
    const runRobotSequence = () => {
      const side = Math.random() > 0.5 ? 'l' : 'r';
      const blade = Math.floor(Math.random() * 5);
      const brokenId = `${side}-${blade}`;
      const types: ('hardware' | 'software' | 'network')[] = ['hardware', 'software', 'network'];
      setErrorServer(brokenId);
      setErrorType(types[Math.floor(Math.random() * types.length)]);
      setErrorName(prev => {
        let next;
        do { next = ERROR_NAMES[Math.floor(Math.random() * ERROR_NAMES.length)]; } while (next === prev);
        return next;
      });
      setErrorMsg(prev => {
        let next;
        do { next = SARCASTIC_ERRORS[Math.floor(Math.random() * SARCASTIC_ERRORS.length)]; } while (next === prev);
        return next;
      });
      setFixedServer(null);
      
      setRobotPos(side === 'l' ? 'left' : 'right');
      setRobotHeight(blade);
      setRobotState('moving');

      timeout = window.setTimeout(() => {
        setRobotState('fixing');
        
        timeout = window.setTimeout(() => {
          setErrorServer(null);
          setFixedServer(prev => {
            let nextMsg;
            do { nextMsg = SARCASTIC_MSGS[Math.floor(Math.random() * SARCASTIC_MSGS.length)]; } while (prev && nextMsg === prev.msg);
            return { id: brokenId, msg: nextMsg };
          });
          setRobotState('idle');
          
          timeout = window.setTimeout(runRobotSequence, 3500 + Math.random() * 2000);
        }, 2500);
      }, 1500);
    };
    
    timeout = window.setTimeout(runRobotSequence, 3500 + Math.random() * 2000);
    return () => window.clearTimeout(timeout);
  }, [robotIntroPlayed]);

  useEffect(() => {
    let timeout: number;
    if (showRobotInfo) {
      timeout = window.setTimeout(() => setShowRobotInfo(false), 3000);
    }
    return () => window.clearTimeout(timeout);
  }, [showRobotInfo]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudio();
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission().catch(() => {});
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (prefersReduced) return;
      const x = (event.clientX / window.innerWidth - .5) * 2;
      const y = (event.clientY / window.innerHeight - .5) * 2;
      parallaxRef.current = { x, y };
      if (appRef.current) {
        appRef.current.style.setProperty('--mx', x.toString());
        appRef.current.style.setProperty('--my', y.toString());
      }
    };
    
    const onOrientation = (event: DeviceOrientationEvent) => {
      if (prefersReduced) return;
      if (event.gamma !== null && event.beta !== null) {
        let x = event.gamma / 45; 
        let y = (event.beta - 45) / 45; 
        x = Math.max(-1, Math.min(1, x));
        y = Math.max(-1, Math.min(1, y));
        parallaxRef.current = { x, y };
        if (appRef.current) {
          appRef.current.style.setProperty('--mx', x.toString());
          appRef.current.style.setProperty('--my', y.toString());
        }
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('deviceorientation', onOrientation);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('deviceorientation', onOrientation);
    };
  }, [prefersReduced]);

  useEffect(() => {
    let lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      if (desktop || panel || letterOpen || menuOpen || loading) return;
      const now = Date.now();
      if (now - lastWheel < 1200) return;
      
      if (e.deltaY > 40 && activeRoom < 1) {
        setActiveRoom(1);
        lastWheel = now;
      } else if (e.deltaY < -40 && activeRoom > 0) {
        setActiveRoom(0);
        lastWheel = now;
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [activeRoom, desktop, panel, letterOpen, phoneOpen, menuOpen, loading]);

  // Swipe vertically on mobile to switch rooms & track swipe to block clicks
  useEffect(() => {
    if (desktop || panel || letterOpen || phoneOpen || menuOpen || loading) return;
    
    let startY = 0;
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
      isSwiping.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const diffY = Math.abs(startY - e.touches[0].clientY);
      const diffX = Math.abs(startX - e.touches[0].clientX);
      if (diffY > 10 || diffX > 10) {
        isSwiping.current = true;
      }
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const diffY = startY - endY;
      
      // Swipe Up -> Go Down (diffY > 50)
      if (diffY > 50 && activeRoom < 1) {
        setActiveRoom(1);
      }
      // Swipe Down -> Go Up (diffY < -50)
      else if (diffY < -50 && activeRoom > 0) {
        setActiveRoom(0);
      }

      // Reset swiping flag slowly to absorb immediate tap-clicks on swipe release
      setTimeout(() => {
        isSwiping.current = false;
      }, 80);
    };
    
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeRoom, desktop, panel, letterOpen, phoneOpen, menuOpen, loading]);

  // Absorb ghost clicks on transition close/open events
  useEffect(() => {
    blockClicks.current = true;
    const timer = setTimeout(() => {
      blockClicks.current = false;
    }, 380);
    return () => clearTimeout(timer);
  }, [desktop, panel, letterOpen, phoneOpen, activeBook, menuOpen]);

  const openPanel = (id: PanelId) => {
    setSelectedProject(null);
    setDesktop(false);
    setPanel(id);
    setMenuOpen(false);
    setCoding(false);
    setLetterOpen(false);
    setPhoneOpen(false);
    setActiveBook(null);
  };

  const handleObject = (id: string) => {
    if (loading) return;
    if (blockClicks.current || isSwiping.current) return;
    initAudio();
    // Close other interactive states when opening a new one
    if (id !== 'keyboard') setCoding(false);
    if (id !== 'bookshelf') setActiveBook(null);
    
    // Close fullscreen letter/phone
    setLetterOpen(false);
    setPhoneOpen(false);

    if (id === 'lamp') { 
      playClick();
      setTime(timeModes[(timeModes.findIndex((mode) => mode.id === time) + 1) % timeModes.length].id); 
      return; 
    }
    if (id === 'coffee') { playSwoosh(); setPanel('about'); return; }
    if (id === 'bookshelf') { playSwoosh(); setPanel('learning'); return; }
    if (id === 'chair') { playSwoosh(); setPanel('resume'); return; }
    if (id === 'window') { playSwoosh(); setPanel('environment'); return; }
    if (id === 'keyboard') { 
      setTypeState({ line1: '', line2: '', line3: false, line4: '' });
      playSwoosh(); 
      setCoding(true); 
      return; 
    }
    if (id === 'computer') { 
      playSwoosh();
      if (monitorRef.current) {
        const rect = monitorRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const vx = window.innerWidth / 2;
        const vy = window.innerHeight / 2;
        const px = parallaxRef.current.x * -10;
        const py = parallaxRef.current.y * -10;
        const dx = (cx - px) - vx;
        const dy = (cy - py) - vy;
        const scale = 5.5;
        setZoomTransform(`translate(${-scale * dx}px, ${-scale * dy}px) scale(${scale})`);
      }
      setDesktop(true); 
      setPanel(null); 
      return; 
    }
  };

  const closeEverything = () => {
    setPanel(null);
    setDesktop(false);
    setSelectedProject(null);
    setMenuOpen(false);
    setLetterOpen(false);
    setPhoneOpen(false);
    setActiveBook(null);
    setCoding(false);
    setTypeState({ line1: '', line2: '', line3: false, line4: '' });
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/RamResume.pdf';
    link.download = 'RamResume.pdf';
    link.click();
  };

  return (
    <main ref={appRef} className="workspace-app" data-time={time} data-audio={audioPlaying ? 'playing' : 'stopped'} style={{ '--mx': 0, '--my': 0 } as CSSProperties} data-testid="workspace-app">
      
      <div className={`audio-seek-container ${audioPlaying ? 'is-visible' : ''}`} onClick={(e) => {
          if (!audioRef.current || !audioRef.current.duration) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const percent = (e.clientX - rect.left) / rect.width;
          audioRef.current.currentTime = percent * audioRef.current.duration;
      }}>
        <div ref={seekBarRef} className="audio-seek-fill" />
      </div>

      <div className={`loading-screen ${loading ? '' : 'is-done'}`} aria-live="polite">
        <div className="loading-inner">
          <div className="loading-rocket-hero">
             <svg className="hero-rocket-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                <line x1="22" y1="2" x2="11" y2="13"></line>
             </svg>
             <div className="rocket-exhaust"></div>
             <div className="rocket-exhaust two"></div>
             <div className="rocket-exhaust three"></div>
          </div>
          <div className="loading-title">RAM / Workspace</div>
          <div className="loading-copy">{
            progress < 25 ? 'Folding paper rocket...' : 
            progress < 55 ? 'Calibrating 3D depth...' : 
            progress < 85 ? 'Brewing virtual coffee...' : 
            'Ready for liftoff.'
          }</div>
          <div className="loading-track">
             <div className="loading-progress" style={{ transform: `scaleX(${progress / 100})` }} />
             <div className="loading-rocket-mini" style={{ left: `${progress}%` }}>
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  <line x1="22" y1="2" x2="11" y2="13"></line>
               </svg>
             </div>
          </div>
        </div>
      </div>

      <div className={`scene-wrap ${loading ? '' : 'is-visible'}`}>
        <div className="audio-sway-wrapper">
          <div className="world-container" style={{ transform: `translateY(${-activeRoom * 100}vh)` }}>
          <section className="room-section">
            <div className="room-light-wash" />
            <div className={`scene-parallax room-1 ${desktop ? 'zoomed-to-monitor' : ''}`} aria-hidden="true" style={desktop ? { transform: zoomTransform } : {}}>
          <div className="room-back" />
          <div className="ceiling-shadow" />
          <div className="sun-beam" />
          <div className="wall-clock" aria-hidden="true">
            <div className="clock-screen" key={clock}>{clock}</div>
          </div>
          <button className="interactive shelf" aria-label="Bookshelf" data-testid="obj-bookshelf">
            <div className="books">
              {SHELF_ROWS.map((row, rIdx) => (
                <div className="book-row" key={rIdx}>
                  {row.map((book, bIdx) => (
                    <div className="book" key={bIdx} style={{ '--book': book.color, '--tilt': book.tilt, width: book.w, height: book.h } as CSSProperties} onClick={(e) => {
                      e.stopPropagation();
                      const rect = e.currentTarget.getBoundingClientRect();
                      setActiveBook({ x: rect.left, y: rect.top, w: rect.width, h: rect.height, color: book.color });
                    }} />
                  ))}
                </div>
              ))}
            </div>
          </button>
          <div className="floor" />
          <div className="desk"><div className="desk-top" /><div className="desk-leg left" /><div className="desk-leg right" /><div className="drawer" /></div>
          
          <div className={`headphones interactive ${audioPlaying ? 'is-playing' : ''}`} onClick={toggleAudio} onMouseEnter={() => setActiveObject('headphones')} onMouseLeave={() => setActiveObject(null)} aria-label="Toggle Music">
            <div className="audio-fx sonic-halo"><div className="halo-ring" /><div className="halo-ring" /></div>
            <div className="audio-fx energy-orbs">
              <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
            </div>
            <div className="audio-fx neon-grid">
              {[...Array(8)].map((_, i) => <div key={i} className="data-particle" />)}
            </div>
            <div className="audio-fx firefly-vortex">
              {[...Array(12)].map((_, i) => <div key={i} className="firefly" />)}
            </div>

            <div className="headphone-band" />
            <div className="headphone-earcap left" />
            <div className="headphone-earcap right" />
            <span className="interactive-label">Music</span>
            {audioPlaying && <div className="music-notes">♪ ♫ ♪</div>}
          </div>
          <div className={`notebook ${letterOpen ? 'is-open' : ''}`} onClick={() => { if (!letterOpen) { playSwoosh(); setLetterOpen(true); } }} onMouseEnter={() => !letterOpen && setActiveObject('notebook')} onMouseLeave={() => !letterOpen && setActiveObject(null)} aria-label="Open letter">
            <span className="interactive-label">Letter</span>
            <div className="notebook-content">
              <p className="letter-date">August 12, 2026</p>
              <p className="letter-greeting">Hey there,</p>
              <p className="letter-body">Thanks for visiting my workspace.</p>
              <p className="letter-body">I'm Ram, a Java backend developer who loves building robust systems and exploring how things work under the hood. Feel free to look around.</p>
              <p className="letter-signoff">Cheers,<br/>Ram</p>
              <button className="panel-close notebook-close" onClick={(e) => { e.stopPropagation(); setLetterOpen(false); }} aria-label="Close letter"><X size={17} /></button>
            </div>
          </div>
          <button className={`interactive monitor ${activeObject === 'computer' || desktop ? 'is-active' : ''} ${desktop ? 'is-zoomed' : ''}`} onClick={(e) => { if (!desktop) handleObject('computer'); }} onMouseEnter={() => !desktop && setActiveObject('computer')} onMouseLeave={() => !desktop && setActiveObject(null)} aria-label="Open projects" data-testid="button-open-projects" style={desktop ? { cursor: 'default' } : {}}>
            <div className="monitor-neck" /><div className="monitor-base" />
            <div className="monitor-frame">
              <div className="monitor-screen" ref={monitorRef}>
                {desktop ? (
                  <div className="monitor-boot-sequence">
                    <div className="boot-logo">RAM</div>
                    <div className="boot-loader"><div className="boot-progress" /></div>
                  </div>
                ) : (
                  <div className="monitor-default-screen" />
                )}
              </div>
            </div>
            {!desktop && <span className="interactive-label">Projects</span>}
          </button>
          <button className="interactive keyboard" onClick={() => handleObject('keyboard')} onMouseEnter={() => setActiveObject('keyboard')} onMouseLeave={() => setActiveObject(null)} aria-label="Open coding message" data-testid="button-open-coding">
            <div className="keyboard-body">{[0, 1, 2].map((row) => <div className="key-row" key={row}>{Array.from({ length: 11 }, (_, key) => <span className={`key ${key === 5 && row === 2 ? 'wide' : ''}`} key={key} />)}</div>)}</div><span className="interactive-label">Build mode</span>
          </button>
          <button className="interactive coffee" onClick={() => handleObject('coffee')} onMouseEnter={() => setActiveObject('coffee')} onMouseLeave={() => setActiveObject(null)} aria-label="Open about" data-testid="button-open-about">
            <div className="cup" /><div className="steam" /><div className="steam two" /><span className="interactive-label">About me</span>
          </button>
          <button className="interactive lamp" onClick={() => handleObject('lamp')} onMouseEnter={() => setActiveObject('lamp')} onMouseLeave={() => setActiveObject(null)} aria-label="Toggle light" data-testid="button-toggle-light">
            <div className="lamp-shade" /><div className="lamp-glow" /><div className="lamp-stem" /><div className="lamp-base" /><span className="interactive-label">{timeModes.find(m => m.id === time)?.label || 'Light'}</span>
          </button>
          <div className="plant room-obj">
            <div className="leaf" /><div className="leaf" /><div className="leaf" /><div className="leaf" /><div className="leaf" /><div className="plant-pot" />
          </div>
          <button className={`interactive headphones ${audioPlaying ? 'is-playing' : ''}`} onClick={toggleAudio} onMouseEnter={() => setActiveObject('headphones')} onMouseLeave={() => setActiveObject(null)} aria-label="Toggle Audio">
            <div className="headphones-ring" /><div className="ear left" /><div className="ear right" />
            {audioPlaying && <div className="music-notes">♪ ♫ ♪</div>}
            <span className="interactive-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              Listen on Zenify
              {audioPlaying && (
                <div className="audio-visualizer">
                  <span className="v-bar"></span><span className="v-bar"></span><span className="v-bar"></span><span className="v-bar"></span><span className="v-bar"></span>
                </div>
              )}
            </span>
          </button>
          <div className={`interactive phone ${phoneOpen ? 'is-open' : ''}`} onClick={() => { if (!phoneOpen) { playSwoosh(); setPhoneOpen(true); } }} onMouseEnter={() => !phoneOpen && setActiveObject('phone')} onMouseLeave={() => !phoneOpen && setActiveObject(null)} aria-label="Open contact" data-testid="button-open-contact">
            <div className="phone-body">
              <div className="phone-screen">
                {phoneOpen && (
                  <div className="phone-content">
                    <h2 className="phone-title">Connect</h2>
                    <div className="phone-links">
                      <a href="mailto:ramanathanb86@gmail.com"><Mail size={16} /> ramanathanb86@gmail.com</a>
                      <a href="tel:+919514154110"><Phone size={16} /> +91 9514154110</a>
                      <a href="https://github.com/hackerstudent29" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
                      <a href="https://linkedin.com/in/ramanathan-s-it" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
                    </div>
                    <button className="panel-close phone-close" onClick={(e) => { e.stopPropagation(); setPhoneOpen(false); }} aria-label="Close phone"><X size={17} /></button>
                  </div>
                )}
              </div>
            </div>
            {!phoneOpen && <span className="interactive-label">Contact</span>}
          </div>
          <div className="room-light-wash" />
            </div>
          </section>

          <section className="room-section">
            <div className="scene-parallax room-2" aria-hidden="true">
              <div className="server-room-back">
                <div className="grid-lines" />
                
                <div className="tv-screen-container">
                  <div className="neon-logo">RAM_SYS</div>
                  <div className="main-server-screen">
                    <div className="screen-header">
                      <span>TERMINAL</span>
                      <span>v2.0.4</span>
                    </div>
                    <div className="screen-content">
                      <div className={`screen-state ${errorServer ? 'error' : fixedServer ? 'success' : 'nominal'}`} key={errorServer ? 'err' : fixedServer ? 'fix' : 'nom'}>
                        {errorServer ? (
                          <>
                            <div className="print-line">! {errorMsg} !</div>
                            <div className="print-line">UNIT: {errorServer.toUpperCase()} [{errorName} FAILURE]</div>
                            <div className="print-line">DISPATCHING ZENRO AGENT... <span className="terminal-cursor"/></div>
                          </>
                        ) : fixedServer ? (
                          <>
                            <div className="print-line">APPLYING FIX TO UNIT: {fixedServer.id.toUpperCase()}</div>
                            <div className="print-line">LOG: {fixedServer.msg}</div>
                            <div className="print-line">MAINTENANCE COMPLETE <span className="terminal-cursor"/></div>
                          </>
                        ) : (
                          <>
                            <div className="print-line">UPTIME: 99.999%</div>
                            <div className="print-line">ALL SYSTEMS NOMINAL</div>
                            <div className="print-line">ZENRO UNIT: STANDBY <span className="terminal-cursor"/></div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {isAlarmActive && <div className="server-alarm-overlay" />}
              </div>
              <div className="server-floor" />
              
              <div className="server-rack rack-left">
                {[0,1,2,3,4].map(i => {
                  const id = `l-${i}`;
                  return (
                    <div key={id} className={`server-blade ${errorServer === id ? 'is-error' : ''} ${errorServer === id && robotState === 'fixing' ? 'is-fixing' : ''}`}>
                      <div className={`server-internals type-${errorType}`}>
                        {errorType === 'hardware' && (
                          <>
                            <div className="spark-wire" /><div className="spark-wire" /><div className="spark-wire" />
                            <div className="internal-spark" />
                            <div className="progress-bar-fix"><div className="progress-fill" /></div>
                          </>
                        )}
                        {errorType === 'software' && (
                          <>
                            <div className="data-bits"><span className="bit">1</span><span className="bit">0</span><span className="bit">1</span><span className="bit">0</span><span className="bit">1</span><span className="bit">1</span></div>
                            <div className="data-stream" />
                            <div className="progress-bar-fix"><div className="progress-fill" /></div>
                          </>
                        )}
                        {errorType === 'network' && (
                          <>
                            <div className="network-ping" /><div className="network-ping delay" />
                            <div className="network-path"><div className="packet" /><div className="packet two" /></div>
                          </>
                        )}
                      </div>
                      {errorServer === id && <div className="blade-bubble error-bubble"><span className="error-text">! {errorMsg} !</span></div>}
                      {fixedServer?.id === id && <div className="blade-bubble success-bubble"><span className="success-text">{fixedServer.msg}</span></div>}
                    </div>
                  );
                })}
              </div>
              
              <div className="server-rack rack-right">
                {[0,1,2,3,4].map(i => {
                  const id = `r-${i}`;
                  return (
                    <div key={id} className={`server-blade ${errorServer === id ? 'is-error' : ''} ${errorServer === id && robotState === 'fixing' ? 'is-fixing' : ''}`}>
                      <div className={`server-internals type-${errorType}`}>
                        {errorType === 'hardware' && (
                          <>
                            <div className="spark-wire" /><div className="spark-wire" /><div className="spark-wire" />
                            <div className="internal-spark" />
                            <div className="progress-bar-fix"><div className="progress-fill" /></div>
                          </>
                        )}
                        {errorType === 'software' && (
                          <>
                            <div className="data-bits"><span className="bit">1</span><span className="bit">0</span><span className="bit">1</span><span className="bit">0</span><span className="bit">1</span><span className="bit">1</span></div>
                            <div className="data-stream" />
                            <div className="progress-bar-fix"><div className="progress-fill" /></div>
                          </>
                        )}
                        {errorType === 'network' && (
                          <>
                            <div className="network-ping" /><div className="network-ping delay" />
                            <div className="network-path"><div className="packet" /><div className="packet two" /></div>
                          </>
                        )}
                      </div>
                      {errorServer === id && <div className="blade-bubble error-bubble"><span className="error-text">! {errorMsg} !</span></div>}
                      {fixedServer?.id === id && <div className="blade-bubble success-bubble"><span className="success-text">{fixedServer.msg}</span></div>}
                    </div>
                  );
                })}
              </div>
              
              <div className={`ground-robot pos-${robotPos} state-${robotState}`} style={{ '--lift': robotHeight } as React.CSSProperties} onClick={() => setShowRobotInfo(!showRobotInfo)}>
                {robotMsg && <div className="robot-speech-bubble">{robotMsg}</div>}
                {showRobotInfo && (
                  <div className="robot-info-panel" onClick={(e) => e.stopPropagation()}>
                    <div className="robot-info-header">Zenro</div>
                    <div className="robot-info-sub">Automated Server Maintenance Agent</div>
                    <div className="robot-info-status">Status: Operational</div>
                  </div>
                )}
                <div className="robot-chassis">
                  <div className="robot-wheel fl" /><div className="robot-wheel fr" />
                  <div className="robot-wheel bl" /><div className="robot-wheel br" />
                </div>
                <div className="hydraulic-lift" />
                <div className="robot-head">
                  <div className="robot-visor" />
                  <div className="robot-arm"><div className="robot-claw" /></div>
                </div>
              </div>
              
            </div>
          </section>
        </div>
      </div>
    </div>

      <header className="topbar">
        <button className="brand" onClick={closeEverything} aria-label="Return to room" data-testid="button-room-home"><span className="brand-mark">R/</span><span><span className="brand-name">Ram Dev</span><span className="brand-sub"> / Developer workspace</span></span></button>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" data-testid="button-toggle-navigation"><Menu size={18} /></button>
        <nav className={`fallback-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Portfolio navigation">
          {audioPlaying && (
            <a href="https://listenzenify.vercel.app/" target="_blank" rel="noopener noreferrer" className="nav-button" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f0ca93', textDecoration: 'none', borderRight: '1px solid rgba(238,215,177,.15)', paddingRight: '12px', marginRight: '6px' }}>
              Listen on Zenify <ExternalLink size={10} />
            </a>
          )}
          {(['about', 'projects', 'skills', 'resume', 'contact'] as const).map((item) => <button className={`nav-button ${item === 'projects' && desktop ? 'is-active' : ''}`} key={item} onClick={() => item === 'projects' ? (setDesktop(true), setPanel(null), setMenuOpen(false)) : openPanel(item === 'about' ? 'about' : item === 'skills' ? 'skills' : item === 'resume' ? 'resume' : 'contact')} data-testid={`nav-${item}`}>{item}</button>)}
        </nav>
      </header>

      {!desktop && !panel && !letterOpen && !phoneOpen && <div className="status-line">ROOM 0{activeRoom + 1}</div>}
      {!desktop && !panel && activeRoom === 0 && !letterOpen && !phoneOpen && <div className="room-ui"><div className="room-intro" style={{ opacity: showIntro ? 1 : 0, pointerEvents: showIntro ? 'auto' : 'none', transition: 'opacity 1s ease-out' }}><div className="eyebrow">A digital workspace, inhabited</div><h1 className="hero-copy">I build digital<br />spaces <em>with a pulse.</em></h1><p className="intro-detail">A developer focused on humane tools, calm interfaces, and useful systems. Move through the room and see what is on the desk.</p><div className="explore-hint"><span className="hint-dot" /> Select an object to begin</div></div><div className="time-control modern-pill" aria-label="Lighting control">{timeModes.map(({ id, label, icon: Icon }) => <button key={id} className={`time-button ${time === id ? 'is-active' : ''}`} onClick={() => setTime(id)} aria-label={`Set ${label}`} data-testid={`button-time-${id}`}><Icon size={16} /><span className="time-label-inline">{label}</span></button>)}</div></div>}

      {/* Room Scroll Navigation Hint */}
      {!desktop && !panel && !letterOpen && !phoneOpen && (
        <button 
          className={`room-scroll-hint ${activeRoom === 1 ? 'is-up' : 'is-down'}`} 
          onClick={() => setActiveRoom(activeRoom === 0 ? 1 : 0)}
          aria-label={activeRoom === 0 ? "Go to Server Room" : "Go to Main Room"}
        >
          <div className="scroll-hint-mouse">
            <div className="scroll-hint-wheel" />
          </div>
          <span className="scroll-hint-text">
            {activeRoom === 0 ? "Server Room" : "Main Room"}
          </span>
          <span className="scroll-hint-arrow">
            {activeRoom === 0 ? "↓" : "↑"}
          </span>
        </button>
      )}

      {coding && (
        <div className="coding-panel">
          <div className="coding-header"><Terminal size={14} /> BUILD / keyboard input</div>
          <div className="coding-body">
            {typeState.line1}
            {typeState.line1 && typeState.line1 !== '$ npm run build' && <span className="cursor" />}
            {typeState.line2 && <><br />{typeState.line2}</>}
            {typeState.line2 && typeState.line2 !== 'Building workspace...' && <span className="cursor" />}
            {typeState.line3 && <><br /><span className="coding-ok"><Check size={11} /> build successful / 1.8s</span></>}
            {typeState.line4 && <><br /><br />{typeState.line4}<span className="cursor" /></>}
          </div>
        </div>
      )}
      
      {/* 2D Fullscreen Overlays (Perfectly crisp, no 3D lag) */}
      {desktop && <Desktop selectedProject={selectedProject} setSelectedProject={setSelectedProject} closeDesktop={closeEverything} />}
      {panel && <Panel panel={panel} close={closeEverything} downloadResume={downloadResume} />}
      
      {activeBook && (
        <div className="book-overlay" onClick={() => setActiveBook(null)} style={{ '--start-x': `${activeBook.x}px`, '--start-y': `${activeBook.y}px`, '--start-w': `${activeBook.w}px`, '--start-h': `${activeBook.h}px`, '--book-color': activeBook.color } as CSSProperties}>
          <div className="flying-book" onClick={e => e.stopPropagation()}>
            <button className="close-book-btn" onClick={() => setActiveBook(null)}><X size={28} strokeWidth={1.5} /></button>
            <div className="book-spread">
              <div className="book-page left-page">
                <h2 className="book-title">A Journey</h2>
                <p className="book-author">by Ramanathan</p>
                <div className="page-content">
                  <p>Life is not measured by the number of breaths we take, but by the moments that take our breath away. Finding purpose requires us to step out of our comfort zone and embrace the unknown.</p>
                  <p>In work and in passion, the key to lasting fulfillment is not perfection, but persistent curiosity. Every setback is simply a setup for a greater comeback. The tools we build and the systems we create are extensions of our desire to make sense of the world.</p>
                </div>
              </div>
              <div className="book-page right-page">
                <div className="page-content">
                  <p>Love transforms the mundane into the extraordinary. It is the quiet force that drives us to be better versions of ourselves, pushing past limitations we once thought absolute.</p>
                  <p>Stay hungry, stay foolish, and never forget that the most beautiful chapters of your story are the ones you have yet to write. To every student reading this: your potential is boundless. Keep building.</p>
                  <div className="page-number">1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Desktop({ selectedProject, setSelectedProject, closeDesktop }: { selectedProject: Project | null; setSelectedProject: (project: Project | null) => void; closeDesktop: () => void }) {
  // If no project is selected initially, select the first one
  useEffect(() => {
    if (!selectedProject && projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  }, [selectedProject, setSelectedProject]);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;
    
    // Check if horizontal movement is greater than vertical movement
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (!selectedProject) return;
      const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
      
      // Swipe Left -> Next Project (diffX > 40)
      if (diffX > 40 && currentIndex < projects.length - 1) {
        setSelectedProject(projects[currentIndex + 1]);
      }
      // Swipe Right -> Previous Project (diffX < -40)
      if (diffX < -40 && currentIndex > 0) {
        setSelectedProject(projects[currentIndex - 1]);
      }
    }
  };

  return (
    <section 
      className="mac-desktop" 
      aria-label="Mac OS Desktop"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mac-wallpaper" />
      
      <div className="mac-menu-bar" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '24px', padding: '0 16px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.2)', color: 'white', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '13px', zIndex: 10 }}>
        <div className="mac-menu-left" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
          <span className="mac-apple-logo" style={{ fontSize: '16px', marginRight: '4px' }}></span>
          <span className="mac-menu-item bold" style={{ fontWeight: 600 }}>Safari</span>
          <span className="mac-menu-item">File</span>
          <span className="mac-menu-item">Edit</span>
          <span className="mac-menu-item">View</span>
          <span className="mac-menu-item">History</span>
          <span className="mac-menu-item">Bookmarks</span>
          <span className="mac-menu-item">Window</span>
          <span className="mac-menu-item">Help</span>
        </div>
        <div className="mac-menu-right" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
          <Volume2 size={12} className="mac-menu-icon" />
          <span className="mac-menu-time">
            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </span>
        </div>
      </div>

      <div className="mac-browser-window">
        <div className="mac-browser-titlebar">
          <div className="mac-window-buttons">
            <button className="mac-btn close" onClick={closeDesktop} aria-label="Close"></button>
            <button className="mac-btn min" aria-label="Minimize"></button>
            <button className="mac-btn max" aria-label="Maximize"></button>
          </div>
          <div className="mac-browser-tabs">
            {projects.map((project) => {
              const isActive = selectedProject?.id === project.id;
              return (
                <div 
                  key={project.id}
                  className={`mac-browser-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => setSelectedProject(project)}
                >
                  <span className="mac-tab-icon">{project.monogram}</span>
                  <span className="mac-tab-title">{project.name}</span>
                  {isActive && <span className="mac-tab-close">×</span>}
                </div>
              );
            })}
            <div className="mac-tab-new">+</div>
          </div>
        </div>
        
        <div className="mac-browser-toolbar">
          <div className="mac-browser-nav">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (!selectedProject) return;
                const idx = projects.findIndex(p => p.id === selectedProject.id);
                if (idx > 0) setSelectedProject(projects[idx - 1]);
              }}
              disabled={!selectedProject || projects.findIndex(p => p.id === selectedProject.id) === 0}
              style={{ background: 'none', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <ArrowLeft size={14} className={`nav-icon ${(!selectedProject || projects.findIndex(p => p.id === selectedProject.id) === 0) ? 'disabled' : ''}`} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (!selectedProject) return;
                const idx = projects.findIndex(p => p.id === selectedProject.id);
                if (idx < projects.length - 1) setSelectedProject(projects[idx + 1]);
              }}
              disabled={!selectedProject || projects.findIndex(p => p.id === selectedProject.id) === projects.length - 1}
              style={{ background: 'none', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <ArrowRight size={14} className={`nav-icon ${(!selectedProject || projects.findIndex(p => p.id === selectedProject.id) === projects.length - 1) ? 'disabled' : ''}`} />
            </button>
          </div>
          <div className="mac-browser-address">
            <Lock size={10} className="lock-icon" />
            <span>ram.dev</span>
            <span className="address-path">/projects/{selectedProject?.id || ''}</span>
          </div>
          <div className="mac-browser-actions">
            <Share size={14} className="nav-icon" />
            <Layers3 size={14} className="nav-icon" />
          </div>
        </div>

        <div className="project-slider-viewport" style={{ overflow: 'hidden', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div 
            className="project-slider-track" 
            style={{ 
              display: 'flex', 
              flexDirection: 'row',
              width: `${projects.length * 100}%`,
              transform: `translateX(-${selectedProject ? projects.findIndex(p => p.id === selectedProject.id) * (100 / projects.length) : 0}%)`,
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              height: '100%'
            }}
          >
            {projects.map((project) => (
              <main 
                key={project.id}
                className="project-tab-content" 
                style={{ 
                  '--project-accent': project.accent,
                  width: `${100 / projects.length}%`,
                  flexShrink: 0,
                  height: '100%',
                  overflowY: 'auto'
                } as CSSProperties}
              >
                <div className="content-wrapper">
                  <div className="project-hero">
                    <h2>{project.name}</h2>
                    <div className="project-category">{project.category}</div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-visual" aria-label={`${project.name} interface preview`} />
                    <div className="panel-actions">
                      <a className="link-button" href={project.github} target="_blank" rel="noreferrer">
                        <Github size={14} /> GitHub
                      </a>
                      <a className="link-button" href={project.demo} target="_blank" rel="noreferrer">
                        <ExternalLink size={14} /> Live view
                      </a>
                    </div>
                  </div>
                  <aside className="project-side">
                    <div className="side-label">Built with</div>
                    <div className="tag-list">
                      {project.technologies.map((tech) => (
                        <span className="tag" key={tech}>{tech}</span>
                      ))}
                    </div>
                    <div className="panel-rule" />
                    <div className="side-label">What matters here</div>
                    <ul className="feature-list">
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <div className="panel-rule" />
                    <div className="side-label">Status</div>
                    <div className="side-value">A living project, shaped by real use.</div>
                  </aside>
                </div>
              </main>
            ))}
          </div>
        </div>
      </div>

      {/* iOS Safari Style Bottom Bar (Only visible on mobile) */}
      <div 
        className="ios-safari-bar" 
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <button 
          className="ios-nav-btn" 
          onClick={(e) => {
            e.stopPropagation();
            if (!selectedProject) return;
            const idx = projects.findIndex(p => p.id === selectedProject.id);
            if (idx > 0) setSelectedProject(projects[idx - 1]);
          }} 
          disabled={!selectedProject || projects.findIndex(p => p.id === selectedProject.id) === 0}
        >
          <ArrowLeft size={18} />
        </button>
        
        <div className="ios-address-capsule">
          <Lock size={12} className="ios-lock-icon" />
          <span className="ios-address-text">ram.dev/{selectedProject?.id || ''}</span>
        </div>

        <button 
          className="ios-nav-btn" 
          onClick={(e) => {
            e.stopPropagation();
            if (!selectedProject) return;
            const idx = projects.findIndex(p => p.id === selectedProject.id);
            if (idx < projects.length - 1) setSelectedProject(projects[idx + 1]);
          }} 
          disabled={!selectedProject || projects.findIndex(p => p.id === selectedProject.id) === projects.length - 1}
        >
          <ArrowRight size={18} />
        </button>

        <button className="ios-done-btn" onClick={(e) => { e.stopPropagation(); closeDesktop(); }}>
          Done
        </button>
      </div>

      <div 
        className="ios-page-dots" 
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        {projects.map((p) => (
          <span 
            key={p.id} 
            className={`ios-dot ${selectedProject?.id === p.id ? 'is-active' : ''}`} 
            onClick={(e) => { e.stopPropagation(); setSelectedProject(p); }} 
          />
        ))}
      </div>

      <div className="mac-dock">
         <div className="mac-dock-icon safari is-open" aria-label="Safari">
            <div className="safari-compass"></div>
         </div>
         <div className="mac-dock-icon terminal" aria-label="Terminal">
            <Terminal size={22} color="#fff" />
         </div>
         <div className="mac-dock-icon mail" aria-label="Mail">
            <Mail size={22} color="#fff" />
         </div>
      </div>
    </section>
  );
}

function Panel({ panel, close, downloadResume }: { panel: Exclude<PanelId, null>; close: () => void; downloadResume: () => void }) {
  const content = {
    about: { kicker: 'Coffee / interests', title: 'Life outside the IDE.', lede: 'When I\'m not building digital spaces, I\'m exploring physical ones or getting lost in a good hobby. Balance makes the code better.', cells: [['Hobbies', 'Photography, reading sci-fi, & mechanical keyboards'], ['Fuel', 'Endless cups of pour-over coffee'], ['Inspiration', 'Minimalist design & open-source communities'], ['Downtime', 'Chopping samples & arguing with audio buffers']] },
    skills: { kicker: 'Plant / skills', title: 'Tools I think with.', lede: 'A practical toolkit, with enough range to move from a fuzzy problem to a quiet, well-made thing. I reach for technology in service of the experience, never the other way around.', cells: [['Core', 'Java · JavaScript · TypeScript · SQL'], ['Interface', 'React · HTML · CSS · Three.js'], ['Systems', 'Spring Boot · Node.js · Supabase'], ['Practice', 'Git · GitHub · RAG · accessibility']] },
    learning: { kicker: 'Bookshelf / learning', title: 'Still on the stack.', lede: 'The best work leaves a little room for being wrong. These are the subjects currently open on my desk — not badges, but questions I keep returning to.', cells: [['Now reading', 'System design through real constraints'], ['Going deeper', 'Java · Spring Boot · Databases'], ['Practising', 'DSA · cloud fundamentals · RAG'], ['Principle', 'Make it understandable before making it clever']] },
    resume: { kicker: 'Chair / resume', title: 'A longer view.', lede: 'A compact record of the work, study, and questions that have shaped how I build. Keep a copy for later.', cells: [['Focus', 'Full-stack development · interaction design'], ['Education', 'B.Tech Information Technology, MSAJCE'], ['Experience', 'Product-minded engineering across education, music, and local tools'], ['Strength', 'Turning complexity into a clear next step']] },
    zenify: { kicker: 'Headphones / featured project', title: 'Listen Zenify.', lede: 'A full-stack music streaming platform for web and mobile combining AI-powered features, advanced audio processing, and creator-focused tools for an immersive experience.', cells: [['Engine', 'Web Audio API · Flutter · Next.js'], ['Features', 'Gapless playback · Creator Studio · AI discovery'], ['Considered', 'Dynamic UI personalization · low distraction'], ['Role', 'Lead engineer — audio pipeline & AI features']] },
    contact: { kicker: 'Phone / contact', title: 'Let&apos;s make something useful.', lede: 'Send a postcard from the internet. Open for freelance, weird ideas, and long conversations about backend.', cells: [['Email', 'ramanathanb86@gmail.com'], ['GitHub', 'github.com/hackerstudent29'], ['LinkedIn', 'linkedin.com/in/ramanathan-s-it'], ['Availability', 'Open to select collaborations']] },
    environment: { kicker: 'Window / environment', title: 'A view from here.', lede: 'The room changes with the hour. So does the work. I design for the moment someone arrives, the moment they get stuck, and the moment the path forward becomes obvious.', cells: [['Local time', new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(new Date())], ['Scene', 'Warm studio at dusk'], ['Working rhythm', 'Deep focus in the morning · synthesis at night'], ['Weather', 'Clear enough to see the next thing']] },
    coding: { kicker: 'Keyboard / build mode', title: 'Make it, then make it kinder.', lede: 'Most of my days are some version of this: understand the shape of a problem, build a small path through it, then remove everything that gets in the way.', cells: [['Command', 'npm run build'], ['Output', 'Useful, calm, and ready to meet a person'], ['Loop', 'Listen → prototype → test → refine'], ['Belief', 'The details are where trust lives']] },
  }[panel];
  return <><div className="panel-backdrop" onClick={close} /><section className="object-panel" role="dialog" aria-modal="true" aria-label={content.title.replace('&apos;', "'")}><button className="panel-close" onClick={close} aria-label="Close panel" data-testid={`button-close-${panel}`}><X size={17} /></button><div className="panel-kicker">{content.kicker}</div><h2 className="panel-title" dangerouslySetInnerHTML={{ __html: content.title }} /><p className="panel-lede">{content.lede}</p><div className="panel-grid">{content.cells.map(([label, value]) => <div className="panel-cell" key={label}><div className="cell-label">{label}</div><div className="cell-value">{value}</div></div>)}</div>{panel === 'resume' && <div className="panel-actions"><button className="link-button" onClick={downloadResume} data-testid="button-download-resume"><Download size={14} /> Download resume</button></div>}{panel === 'contact' && <div className="panel-actions"><a className="link-button" href="mailto:ramanathanb86@gmail.com" data-testid="link-email"><Mail size={14} /> Write an email</a><a className="link-button" href="https://github.com/hackerstudent29" target="_blank" rel="noreferrer" data-testid="link-contact-github"><Github size={14} /> GitHub</a></div>}{panel === 'zenify' && <div className="panel-actions"><button className="link-button" onClick={close} data-testid="button-zenify-close"><Volume2 size={14} /> Close listening room</button></div>}</section></>;
}

function MapPinIcon() {
  return <span style={{ font: '14px var(--app-font-serif)' }}>B</span>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;