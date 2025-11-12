import { Button } from "@/components/ui/button"

export function ShopStory() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Story text */}
          <div>
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-teal-800">
                Our Story
              </h2>
            </div>
            <p className="text-neutral-700 mb-4">
              Pond Boutique was born from a simple belief: women deserve clothing that is both beautiful and
              sustainable. Inspired by the timeless elegance of nature, we set out to create pieces that transcend trends
              and make a positive impact on our planet.
            </p>
            <p className="text-neutral-700 mb-4">
              Every dress at Pond Boutique is carefully designed with comfort in mind and crafted from high-quality,
              sustainable materials that are gentle on your skin and the environment. We believe in creating garments that
              women can rely on for years to come.
            </p>
            <p className="text-neutral-700 mb-6">
              Today, we're proud to serve women worldwide who share our passion for timeless style, comfort, and sustainability.
              Our mission is simple: to empower women through fashion that feels good and does good.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-lg border">
                <p className="text-3xl font-bold text-emerald-600">15K+</p>
                <p className="text-neutral-600">Happy Women</p>
              </div>
              <div className="p-4 rounded-lg border">
                <p className="text-3xl font-bold text-teal-600">500+</p>
                <p className="text-neutral-600">Timeless Pieces</p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              Learn More About Us
            </Button>
          </div>

          {/* Right side - Visual element */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="p-12 text-center h-full flex flex-col justify-center">
              <div className="text-6xl mb-4">👗</div>
              <div className="mb-2">
                <h3 className="text-2xl font-bold text-emerald-900">Timeless & Sustainable</h3>
              </div>
              <p className="text-neutral-700 mb-6">
                Every dress is thoughtfully designed to be both beautiful and kind to the planet.
              </p>
              <div className="space-y-3 flex flex-col items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌳</span>
                  <p className="text-neutral-700">Eco-friendly, sustainable fabrics</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👕</span>
                  <p className="text-neutral-700">Designed for comfort & elegance</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💚</span>
                  <p className="text-neutral-700">Made to last, made with care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
