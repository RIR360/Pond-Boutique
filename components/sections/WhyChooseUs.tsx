export function WhyChooseUs() {
  const reasons = [
    {
      icon: "🌳",
      title: "Sustainable Materials",
      description: "All our clothing is crafted from high-quality, eco-friendly fabrics that are gentle on your skin and the environment."
    },
    {
      icon: "🌟",
      title: "Timeless Design",
      description: "Each piece is inspired by nature and designed to be worn for years, transcending seasonal trends."
    },
    {
      icon: "👕",
      title: "Ultimate Comfort",
      description: "Designed with the modern woman in mind, our pieces prioritize comfort without compromising style."
    },
    {
      icon: "✨",
      title: "Premium Quality",
      description: "Carefully crafted with attention to detail, ensuring every garment meets our high standards of excellence."
    },
    {
      icon: "🌍",
      title: "Ethical Production",
      description: "We partner with fair-trade suppliers and support responsible manufacturing practices worldwide."
    },
    {
      icon: "💚",
      title: "Made to Last",
      description: "Invest in quality pieces that withstand the test of time, reducing waste and supporting sustainable fashion."
    }
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-2">
            <h2 className="text-3xl font-bold text-teal-800">Why Choose Pond Boutique?</h2>
          </div>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            We believe in creating beautiful, sustainable clothing that empowers women to feel confident and comfortable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">{reason.icon}</div>
              <h3 className="text-xl text-teal-800 font-bold mb-2">{reason.title}</h3>
              <p className="text-neutral-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
