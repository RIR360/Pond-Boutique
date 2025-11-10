"use client"

import { useEffect, useState } from "react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Rukhsar Begum",
      role: "Fashion Enthusiast",
      image: "👩",
      content: "I absolutely love the quality and style of Pond Boutique's dresses! The sustainable materials feel amazing, and I know I'm making an eco-conscious choice. Highly recommended!",
      rating: 5
    },
    {
      name: "Sraboni Sengupta",
      role: "Sustainable Fashion Advocate",
      image: "👩‍🦰",
      content: "Finally, a brand that combines timeless design with real sustainability. Their pieces are so versatile and comfortable. I've made Pond Boutique my go-to for everyday wear.",
      rating: 5
    },
    {
      name: "Esha Saha",
      role: "Style Blogger",
      image: "👩‍🦱",
      content: "As a fashion blogger, I'm impressed by Pond Boutique's commitment to quality and sustainability. Their designs are elegant, and each piece is truly made to last.",
      rating: 5
    },
    {
      name: "Mahika Chatterjee",
      role: "Professional Woman",
      image: "👩‍",
      content: "These dresses transition beautifully from office to evening. The comfort and elegance make them perfect for busy women like me. Customer service is exceptional too!",
      rating: 5
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-2">
            <h2 className="text-3xl font-bold text-teal-800">What Our Customers Say</h2>
          </div>
          <p className="max-w-2xl text-lg mx-auto text-neutral-600">Join thousands of women who've discovered timeless, sustainable fashion</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border transition-all duration-500 transform ${
                index === currentIndex
                  ? "border-amber-400 bg-amber-50 scale-105 shadow-lg"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-2xl">★</span>
                ))}
              </div>
              <p className="text-neutral-600 mb-4 italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-bold text-teal-800">{testimonial.name}</p>
                  <p className="text-sm text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-amber-400" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
