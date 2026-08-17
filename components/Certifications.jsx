import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FileBadge } from "lucide-react";

const Certifications = () => {
  const certificates = [
    {
      name: "The Joy of Computing Using Python",
      issuer: "NPTEL | IIT Madras",
      issuerUrl: "https://nptel.ac.in",
      issuerColor: "text-blue-600 dark:text-blue-400",
      img: "/certificates/nptel-joy-of-computing.png",
      url: "/certificates/nptel-joy-of-computing.png",
      duration: "12 Weeks (Jul - Oct 2024)",
      grade: "Elite + Silver Medal (Score: 86%)",
      desc: "A comprehensive certification covering algorithm design, file processing, data structures, database connectivity, and core programming paradigms in Python.",
    },
    {
      name: "Programming, Data Structures and Algorithms using Python",
      issuer: "NPTEL | IIT Madras",
      issuerUrl: "https://nptel.ac.in",
      issuerColor: "text-blue-600 dark:text-blue-400",
      img: "/certificates/nptel-dsa-python.png",
      url: "/certificates/nptel-dsa-python.png",
      duration: "8 Weeks (Jan - Mar 2024)",
      grade: "Elite Tag (Score: 62%)",
      desc: "Rigorous academic study of algorithmic complexity, sorting/searching techniques, dynamic programming structures, and optimal object-oriented patterns.",
    },
    {
      name: "Java Internship Program",
      issuer: "1stop.ai",
      issuerUrl: "https://1stop.ai",
      issuerColor: "text-orange-600 dark:text-orange-400",
      img: "/certificates/image.png",
      url: "/certificates/image.png",
      duration: "2 Months (May - Jun 2025)",
      grade: "Completed",
      desc: "Hands-on software development training focused on core Java programming, object-oriented software design, and database integration.",
    },
    {
      name: "DevOps Internship Program",
      issuer: "Rest Coder Academy",
      issuerUrl: "https://restcoder.com",
      issuerColor: "text-emerald-600 dark:text-emerald-400",
      img: "/certificates/devops.png",
      url: "/certificates/devops.png",
      duration: "15 Days (Jun 15 - Jun 30, 2025)",
      grade: "Completed",
      desc: "Practical training in DevOps automation pipelines, Docker containerization, version control workflows, and cloud-based systems integration.",
    },
  ];

  return (
    <section className="pb-16 px-4">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black gradient-text w-fit mx-auto">
          Certifications & Internships
        </h2>
        <p className="mt-3 text-sm font-semibold text-gray-500 max-w-2xl mx-auto">
          Verified academic credentials, professional course completions, and hands-on developer training.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="group w-full rounded-3xl p-5 bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Certificate Image Preview */}
              <a href={cert.url} target="_blank" rel="noopener noreferrer">
                <div className="overflow-hidden rounded-2xl bg-white border border-gray-100 dark:border-white/5 aspect-[16/11] flex items-center justify-center relative cursor-pointer shadow-sm">
                  <Image
                    src={cert.img}
                    alt={cert.name}
                    width={600}
                    height={412}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              </a>

              {/* Content */}
              <div className="mt-5">
                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                  {cert.duration}
                </span>
                
                <h3 className="text-lg md:text-xl font-black mt-1.5 leading-snug">
                  {cert.name}
                </h3>

                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <span className="text-xs font-semibold text-gray-500">Issued by:</span>
                  <a
                    href={cert.issuerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-bold ${cert.issuerColor} hover:underline`}
                  >
                    {cert.issuer}
                  </a>
                </div>

                {cert.grade && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-500/20 dark:border-blue-400/20">
                    <FileBadge size={14} />
                    <span>{cert.grade}</span>
                  </div>
                )}

                <p className="mt-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                  {cert.desc}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#06b6d4] text-white font-bold hover:scale-[1.01] transition-all duration-300 shadow-md hover:shadow-blue-500/20"
              >
                <FileBadge size={18} />
                <span>View Full Certificate</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;