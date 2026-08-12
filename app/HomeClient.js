"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import styles from "@/components/AnimatedBackground.module.css";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Database,
  FileText,
  Mail,
  Rocket,
} from "lucide-react";
import { projects } from "./projects/projectsData";
import AboutPreview from "@/components/AboutPreview";
import FloatingContact from "@/components/FloatingContact";
import dynamic from "next/dynamic";

const AvatarViewer = dynamic(() => import("@/components/AvatarViewer"), { ssr: false });
const TechBalls = dynamic(() => import("@/components/TechBalls"), { ssr: false });

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Register model-viewer + preload GLB during intro
    import("@google/model-viewer").catch(() => { });

    const introShown = sessionStorage.getItem("introShown");
    if (!introShown) {
      setShowIntro(true);
      const timer = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem("introShown", "true");
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (showIntro) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full border border-white/5 animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-[350px] h-[350px] rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <div className="relative">
              <div className="absolute -inset-5 rounded-full border border-white/10 animate-pulse" />
              <Image
                src="/mypic.jpeg"
                alt="logo"
                width={100}
                height={100}
                className="rounded-3xl border border-white/20 shadow-2xl object-cover"
              />
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs tracking-[0.5em] uppercase text-gray-500"
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-5xl md:text-7xl font-black tracking-tight"
          >
            Sandeep Pati
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-5 text-gray-400 text-lg md:text-xl font-medium"
          >
            <Typewriter
              options={{
                strings: [
                  "Software Developer",
                  "Building Scalable Systems",
                  "Java Enthusiast",
                ],
                autoStart: true,
                loop: true,
                pauseFor: 1000,
                typeSpeed: 40,
                deleteSpeed: 30,
                cursor: "",
              }}
            />
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="h-px bg-white/30 mt-10"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 max-w-sm text-center text-sm text-gray-500 mx-2"
          >
            Designing and developing modern web applications with clean code and
            thoughtful experiences.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowIntro(false)}
            className="group relative mx-1.5 mt-10 flex items-center gap-3 px-7 py-3 rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-md text-sm uppercase tracking-[0.25em] text-gray-400 overflow-hidden transition-all duration-500 hover:border-white/40 hover:text-white cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">Enter Portfolio</span>
            <span className=" relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              {" "}
              →
            </span>
          </motion.button>
        </div>
        {/* Hidden preloader — downloads GLB during intro screen */}
        <model-viewer
          src="/my-avatar.glb"
          style={{ position: "absolute", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="w-full animate-fade-in pt-28 pb-10 sm:pt-32 sm:pb-14 lg:pt-36 lg:pb-16 flex justify-center items-center md:min-h-[85vh]">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-16 xl:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex w-full flex-col items-center justify-center lg:items-start"
          >
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-bold text-4xl lg:text-5xl"
            >
              Hey, I'm Sandeep Pati
            </motion.h1>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-bold text-[26px] md:text-3xl lg:text-4xl drop-shadow-lg gradient-text"
            >
              <Typewriter
                options={{
                  strings: [
                    "Software Developer",
                    "Full Stack Developer",
                    "Java Enthusiast",
                  ],
                  autoStart: true,
                  loop: true,
                  pauseFor: 700,
                  typeSpeed: 100,
                  backSpeed: 50,
                  cursor: "_",
                }}
              />
            </motion.span>
            <div className="max-w-lg text-center lg:text-start">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-medium md:text-[18px] mt-1"
              >
                I'm a passionate software developer with a strong foundation in Java, web development, and problem-solving. I enjoy building responsive web applications, designing efficient backend systems, and continuously expanding my knowledge through real-world projects.
              </motion.p>
              <div className="flex flex-wrap gap-2.5 mt-5 justify-center lg:justify-start">
                {[
                  "Full-Stack Development",
                  "Java Application Development",
                  "Backend Development",
                  "Problem Solving",
                ].map((tech) => (
                  <motion.div
                    initial={{ opacity: 0, y: 7 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    key={tech}
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/20 hover:bg-purple-500/10 hover:border-blue-700/40 cursor-pointer duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#06b6d4] group-hover:scale-125 duration-300"></span>
                    <span className="text-xs sm:text-sm font-medium duration-300">
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 justify-center items-center mt-5">
              {/* <Link href="/resume1.pdf" target="_blank" className="backdrop-blur-lg bg-black/5 px-3 py-2.5 rounded-lg font-semibold cursor-pointer hover:bg-white/10 duration-300 border-[1] border-gray-200 transition-transform transform hover:scale-105">View Resume</Link>
              <Link href={'/projects'} className="backdrop-blur-lg bg-black/5 px-3 py-2.5 rounded-lg font-semibold cursor-pointer hover:bg-white/10 duration-300 border-[1] border-gray-200 transition-transform transform hover:scale-105">View Projects</Link> */}

              <div className="flex flex-wrap gap-4 mt-3 justify-center lg:justify-start">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link
                    href="/resume1.pdf"
                    target="_blank"
                    className="group relative flex items-center gap-3 px-6 py-3.5 rounded-2xl overflow-hidden md:backdrop-blur-xl bg-white/10 border border-gray-300 shadow-lg cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#06b6d4] opacity-0 group-hover:opacity-100 duration-500"></div>
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/20 duration-300">
                        <FileText
                          size={20}
                          className="group-hover:rotate-12 duration-300"
                        />
                      </div>
                      <div>
                        <p className="font-bold">View Resume</p>
                        <p className="text-xs opacity-70">
                          My Experience & Skills
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Link
                    href="/projects"
                    className="group relative flex items-center gap-3 px-6 py-3.5 rounded-2xl overflow-hidden bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#06b6d4] text-white shadow-lg cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-black/20 translate-x-full group-hover:translate-x-0 duration-500"></div>
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/20">
                        <Code2
                          size={20}
                          className="group-hover:rotate-12 duration-300"
                        />
                      </div>
                      <div>
                        <p className="font-bold">Explore Projects</p>
                        <p className="text-xs opacity-80">See My Work</p>
                      </div>
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-2 duration-300"
                      />
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
          {/* <motion.div initial={{ opacity: 0, x: 70 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="lg:mt-[15vh] flex flex-col justify-center items-center">
            <Image src='/avator.png' alt="hero_img" height={300} width={300} loading="eager" className="animate-float-space animate-float-space-scale drop-shadow-[0_3px_5px_rgba(126,34,206,0.6)] h-85 md:h-full w-70"></Image>
            <div className="w-55 h-50 bg-gradient-to-r ffrom-[#2563eb] via-[#3b82f6] to-[#06b6d4] rounded-full [transform:rotateX(-70deg)] shadow-[0_20px_40px_rgba(0,0,0,0.4)] -mt-7 border-[5] border-gray-200 hover:scale-110 duration-300 cursor-pointer"></div>
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative flex w-full min-w-0 items-center justify-center"
          >
            {/* Glow */}
            <div className="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-purple-700 to-pink-600 md:blur-3xl opacity-25 hidden lg:inline" />

            {/* Avatar */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative flex items-center justify-center min-h-[420px]">
              {/* Main Glow */}
              <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }} transition={{ duration: 5, repeat: Infinity }} className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 md:blur-[100px] hidden md:inline" />
              {/* Orbit Circle 1 (5 Tech Symbols) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="absolute w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full border border-white/10 flex items-center justify-center z-10"
              >
                {/* 1. React.js (Top) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className="p-1.5 rounded-full bg-[#20232a] border border-[#61dafb]/50 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition duration-300"
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-5.5 h-5.5 sm:w-7 sm:h-7 object-contain" />
                  </motion.div>
                </div>
                {/* 2. Node.js (Top-Right) */}
                <div className="absolute top-[34.5%] left-[97.5%] -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className="p-1.5 rounded-full bg-[#333333] border border-[#339933]/50 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition duration-300"
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node" className="w-5.5 h-5.5 sm:w-7 sm:h-7 object-contain" />
                  </motion.div>
                </div>
                {/* 3. Express.js (Bottom-Right) */}
                <div className="absolute top-[90.5%] left-[79.4%] -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className="p-1.5 rounded-full bg-[#ffffff] border border-[#dddddd] w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition duration-300"
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" className="w-5.5 h-5.5 sm:w-7 sm:h-7 object-contain" />
                  </motion.div>
                </div>
                {/* 4. Redux (Bottom-Left) */}
                <div className="absolute top-[90.5%] left-[20.6%] -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className="p-1.5 rounded-full bg-[#764abc] border border-white/20 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition duration-300"
                  >
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/redux.svg" alt="Redux" className="w-5.5 h-5.5 sm:w-7 sm:h-7 object-contain invert" />
                  </motion.div>
                </div>
                {/* 5. Git (Top-Left) */}
                <div className="absolute top-[34.5%] left-[2.5%] -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className="p-1.5 rounded-full bg-[#ffffff] border border-[#f05032]/40 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition duration-300"
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-5.5 h-5.5 sm:w-7 sm:h-7 object-contain" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Orbit Circle 2 (5 Tech Symbols) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[230px] h-[230px] md:w-[330px] md:h-[330px] rounded-full border border-blue-400/20 flex items-center justify-center z-10"
              >
                {/* 6. Next.js (Top) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-1.5 rounded-full bg-[#ffffff] border border-black/20 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition duration-300"
                  >
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/nextdotjs.svg" alt="Next" className="w-5.5 h-5.5 sm:w-7 sm:h-7 object-contain" />
                  </motion.div>
                </div>
                {/* 7. JavaScript (Top-Right) */}
                <div className="absolute top-[34.5%] left-[97.5%] -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-1.5 rounded-full bg-[#f7df1e] border border-white/20 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition duration-300"
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-5.5 h-5.5 sm:w-7 sm:h-7 object-contain" />
                  </motion.div>
                </div>
                {/* 8. TypeScript (Bottom-Right) */}
                <div className="absolute top-[90.5%] left-[79.4%] -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-1.5 rounded-full bg-[#3178c6] border border-white/20 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition duration-300"
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-5.5 h-5.5 sm:w-7 sm:h-7 object-contain" />
                  </motion.div>
                </div>
                {/* 9. MongoDB (Bottom-Left) */}
                <div className="absolute top-[90.5%] left-[20.6%] -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-1.5 rounded-full bg-[#ffffff] border border-[#47a248]/40 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition duration-300"
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-5.5 h-5.5 sm:w-7 sm:h-7 object-contain" />
                  </motion.div>
                </div>
                {/* 10. Tailwind CSS (Top-Left) */}
                <div className="absolute top-[34.5%] left-[2.5%] -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-1.5 rounded-full bg-[#0f172a] border border-[#38bdf8]/50 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shadow-lg hover:scale-110 transition duration-300"
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" className="w-5.5 h-5.5 sm:w-7 sm:h-7 object-contain" />
                  </motion.div>
                </div>
              </motion.div>

              {/* 3D Avatar Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-20"
              >
                <AvatarViewer />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <FloatingContact />

      {/* About Me Preview */}

      <AboutPreview />


      {/* Terminal */}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-[#2563eb] font-semibold">Developer Environment</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            {" "}
            Behind The Code
          </h2>
          <p className="mt-3 max-w-xl mx-auto">
            A quick look at my development workflow, tools and deployment
            process.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-white/10 bg-black/90 backdrop-blur-sm overflow-hidden"
        >
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />

            <p className="md:ml-3 ml-1 text-sm text-gray-400">
              sandeep@portfolio:~
            </p>
          </div>

          <div className="p-5 sm:p-7 font-mono text-sm sm:text-base space-y-4 text-gray-300">
            <p>
              <span className="text-blue-700">$</span> npm run build
            </p>

            <p className="text-green-400">
              ✔ Application compiled successfully
            </p>

            <p>
              <span className="text-blue-700">$</span> database.connect()
            </p>

            <p className="text-green-400">✔ MongoDB connected</p>

            <p>
              <span className="text-blue-700">$</span> deploy --production
            </p>

            <p className="text-green-400">
              ✔ Deployment completed successfully
            </p>
          </div>
        </motion.div>
      </section>

      {/* Stats */}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {[
            {
              icon: <Code2 />,
              number: `${projects.length + 4}+`,
              title: "Projects Built",
            },
            {
              icon: <Rocket />,
              number: `${projects.length}+`,
              title: "Live Projects",
            },
            {
              icon: <Database />,
              number: "∞",
              title: "Learning",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -8 }}
              className="rounded-2xl p-6 bg-black/5 border border-white/10 text-center hover:border-blue-700 duration-300"
            >
              <div className="text-blue-700 mb-3">{item.icon}</div>

              <h2 className="text-3xl font-bold">{item.number}</h2>

              <p className="font-semibold">{item.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Tech Stack */}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pb-20">
        <div className="text-center mb-10">
          <p className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">
            Interactive playground
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            My
            Tech Stack
          </h2>

        </div>

        {/* Skill Pills Grid */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {[
            "Java",
            "JavaScript",
            "HTML5",
            "CSS3",
            "React.js",
            "Tailwind CSS",
            "Node.js",
            "Express.js",
            "REST APIs",
            "MongoDB",
            "MySQL",
            "SQL",
            "Object-Oriented Programming (OOP)",
            "Data Structures & Algorithms",
            "Problem Solving",
            "Git",
            "GitHub",
            "VS Code",
            "IntelliJ IDEA",
            "Eclipse",
            "Postman",
          ].map((skill) => (
            <motion.div
              key={skill}
              whileHover={{ scale: 1.08 }}
              className="px-4 py-2 rounded-xl bg-black/5 border border-white/10 hover:border-blue-700 hover:-translate-y-1 duration-300 transition text-sm"
            >
              {skill}
            </motion.div>
          ))}
        </div>

        {/* 3D Tech Balls Canvas */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden" style={{ height: "480px" }}>
          <TechBalls />
        </div>
      </section>
    </div>
  );
}
