'use client'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, GithubIcon, LinkIcon, BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { projects } from "../projectsData"

const All = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen mt-[20vh] animate-fade-in pb-16'>
      <div className='flex justify-center items-center mb-7 px-4'>
        <div className='flex flex-col justify-center items-center text-center'>
           <h1 className='font-black text-3xl md:text-4xl gradient-text'>My Work & Projects</h1>
           <span className='text-sm md:text-lg text-gray-600 font-semibold mt-2'>From small ideas to complete applications — this is my work.</span>
        </div>
      </div>
      
      <div className='flex justify-center items-center px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl w-full'>
          {projects.map((project, index) => (
             <div key={project.id} className='group relative rounded-3xl overflow-hidden bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-blue-500/20 transition duration-500 aspect-[16/11]'>
                 <Link href={`/projects/${project.id}`}>
                   <Image className='w-full h-full object-cover transition duration-700 group-hover:scale-110 cursor-pointer' src={project.img} alt={project.name} width={600} height={400}/>
                 </Link>

                 {index < 3 && (
                   <Badge className='absolute top-3 left-3 bg-blue-600 text-white border-0 px-3 py-1 z-30 animate-bounce'>
                     New
                   </Badge>
                 )}

                 <Link
                   href={`/projects/${project.id}`}
                   className="absolute z-30 top-3 right-3 p-2 rounded-xl bg-black/40 backdrop-blur-md text-white hover:bg-blue-600 transition"
                 >
                   <BookOpen size={16} />
                 </Link>

                 {/* Overlay Background Link */}
                 <Link
                   href={`/projects/${project.id}`}
                   className='absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-10'
                 />

                 {/* Overlay Content */}
                 <div className='absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl flex items-center justify-center z-20 p-4'>
                   <div className='flex flex-col gap-3 items-center text-center pointer-events-auto'>
                     <Link href={`/projects/${project.id}`}>
                       <h2 className='text-white hover:text-blue-400 text-xl md:text-3xl font-black transition cursor-pointer'>
                         {project.name}
                       </h2>
                     </Link>
                     <p className='text-gray-300 text-xs max-w-[280px] line-clamp-2 px-2 hidden sm:block'>
                       {project.desc}
                     </p>
                     <div className='flex justify-center items-center gap-3 mt-1'>
                       <Link href={project.url} target="_blank" className='flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#06b6d4] text-white text-xs font-bold shadow-md hover:scale-105 transition'>
                         <LinkIcon size={14} color='white' strokeWidth={2.5}/>
                         Demo
                       </Link>
                       <Link href={project.github} target="_blank" className='flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold backdrop-blur-md hover:scale-105 transition'>
                         <GithubIcon size={14} color='white' strokeWidth={2.5}/>
                         Code
                       </Link>
                     </div>
                   </div>
                 </div>
             </div>
          ))}
        </div>
      </div>
      
      <div className='flex justify-center items-center mt-10'>
         <button onClick={()=>router.replace('/projects')} className='group relative flex items-center gap-2 px-5 py-3 rounded-2xl overflow-hidden bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#06b6d4] text-white shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 font-bold z-30'>
           <div className="absolute inset-0 bg-black/20 translate-x-full group-hover:translate-x-0 duration-500" />
           <ArrowLeft size={16} className="group-hover:-translate-x-1 duration-300" />
           <span>Back to Gallery</span>
         </button>
      </div>
    </div>
  )
}

export default All
