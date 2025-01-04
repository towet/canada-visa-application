"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function HeroSection() {
  const router = useRouter()

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white">
      <Image
        src="https://canadiangeographic.ca/wp-content/uploads/2022/10/amazing-toronto-skyline-1.jpg"
        alt="Beautiful Toronto skyline at twilight"
        layout="fill"
        objectFit="cover"
        priority
        className="object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <motion.div 
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Canadian Dream Starts Here</h1>
        <p className="text-xl md:text-2xl mb-8">Seamless Visa Application Process for a Brighter Future</p>
        <Button 
          size="lg" 
          className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          onClick={() => router.push('/apply')}
        >
          Start Application
        </Button>
      </motion.div>
    </section>
  )
}
