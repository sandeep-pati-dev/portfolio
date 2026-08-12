'use client'
import { Badge } from '@/components/ui/badge'
import { ArrowDown, BookOpen, Eye, GithubIcon, LinkIcon, Mail } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import dynamic from "next/dynamic";
import AllProjects from '@/components/AllProjects'
import Link from 'next/link'
import { motion } from "framer-motion";
import { projects } from "./projectsData";

const FeaturedProjectsSlider = dynamic(() => import("@/components/FeaturedProjectsSlider"), { ssr: false });

const Projects= () => {
  return (
    <>
    <div className='lg:mt-[20vh] mt-32 flex flex-col gap-5 animate-fade-in'>
      <div className='flex flex-col justify-center items-center text-center'>
        <h1 className="mt-3 text-4xl font-black">Featured Projects</h1>
        <span className="mt-0.5 max-w-2xl mx-auto text-gray-600 font-semibold text-sm">A showcase of my latest work and experiments.</span>
      </div>

      <div className='md:w-full md:h-full'>
        <FeaturedProjectsSlider />

        <div className="hidden lg:flex justify-center items-center">
          <Link href="#allProjects" className="group fixed bottom-0 md:right-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl overflow-hidden bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#06b6d4] text-white shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30">
            <div className="absolute inset-0 bg-black/20 translate-x-full transition-transform duration-500 group-hover:translate-x-0"/>
            <div className="relative z-10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20 transition-all duration-300 group-hover:bg-white/30">
                <ArrowDown size={18} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-y-1"/>
              </div>
              <div className="leading-tight">
                <p className="font-bold text-sm">View All Projects</p>
                <p className="text-[11px] opacity-80">Explore My Work</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>

    <div id='allProjects' className='scroll-mt-28 md:mb-7'><AllProjects/></div>

    <section className="relative py-16 px-5 border-t border-white/10 overflow-hidden">
    
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-black text-blue-700">Let's Work Together</h2>
    
        <p className="mt-4 max-w-2xl text-sm md:text-lg text-gray-600 font-semibold">
          Thank you for exploring my portfolio. If you have an idea, project, or opportunity, feel free to reach out and let's create something meaningful.
        </p>
    
        <Link href="/contact" className="group relative mt-8 flex items-center gap-3 px-5 py-3 rounded-2xl overflow-hidden bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#06b6d4] text-white shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30">
          <div className="absolute inset-0 bg-black/20 translate-x-full transition-transform duration-500 group-hover:translate-x-0"/>
    
          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/20 transition-all duration-300 group-hover:bg-white/30">
              <Mail size={18} className="transition-transform duration-300 group-hover:rotate-12"/>
            </div>
    
            <div className="leading-tight text-left">
              <p className="font-bold text-sm">Contact Me</p>
              <p className="text-[11px] opacity-80">Start a Conversation</p>
            </div>
    
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </div>
        </Link>
    
        <span className="mt-10 text-[15px] md:text-[17px] font-semibold text-gray-400">
          Thank you for visiting my work.
        </span>
      </div>
    </section>
    </>
  )
}

export default Projects