import { ProductCard } from "@/components/ProductCard"

export const products = [
  {
    id: "three-piece-001",
    name: "Cotton Three Piece",
    price: 3200,
    image: "/images/pexels-photo-28213774.jpeg",
    alt: "Cotton three piece set",
    label: "New",
  },
  {
    id: "kurti-002",
    name: "Casual Kurti",
    price: 2450,
    image: "/images/pexels-photo-22064227.jpeg",
    alt: "Simple casual kurti",
  },
  {
    id: "kameez-003",
    name: "Designer Kameez",
    price: 4800,
    image: "/images/pexels-photo-22431192.jpeg",
    alt: "Embroidered designer kameez",
    label: "Bestseller",
  },
  {
    id: "kameez-004",
    name: "Ruby Kameez",
    price: 3900,
    image: "/images/pexels-photo-31874446.jpeg",
    alt: "Classic cotton panjabi",
  },
]


export function ProductGrid() {
  return (
    <section id="new-arrivals" className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold md:text-3xl mb-0 text-emerald-700">New arrivals</h2>
        <p className="text-neutral-600">Limited time offer!</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} image={p.image} alt={p.alt} label={p.label} />
        ))}
      </div>
    </section>
  )
}