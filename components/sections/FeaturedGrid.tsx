import Link from "next/link"

const categories = [
  {
    title: "Sultry Sundresses",
    href: "#",
    image: "/images/pexels-photo-28213774.jpeg",
    alt: "Flowy summer dress outdoors",
  },
  {
    title: "Dresses That Dazzle",
    href: "#",
    image: "/images/pexels-photo-22064227.jpeg",
    alt: "Casual cotton tops neatly arranged",
  },
  {
    title: "Linen Luxe Dresses",
    href: "#",
    image: "/images/pexels-photo-22431192.jpeg",
    alt: "Neutral linen pants stacked",
  },
  {
    title: "Dress Up Your Style",
    href: "#",
    image: "/images/pexels-photo-31874446.jpeg",
    alt: "Straw bag and hat flatlay",
  },
]

export function FeaturedGrid() {
  return (
    <section id="featured" className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold md:text-3xl mb-0 text-emerald-700">Featured Categories</h2>
        <Link href="/products" className="text-sm font-medium text-emerald-700 hover:underline">
          View all
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href="/products/demo"
            className="group relative overflow-hidden rounded-xl"
            aria-label={cat.title}
          >
            <img
              src={cat.image || "/placeholder.svg"}
              width={560}
              height={400}
              alt={cat.alt}
              className="h-[400px] w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-[500px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 rounded text-white px-3 py-1 text-xl font-medium text-neutral-900 shadow">
              {cat.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
