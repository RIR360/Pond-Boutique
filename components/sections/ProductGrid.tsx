import { ProductCard } from "@/components/ProductCard"

const products = [
  {
    id: "dress-linen-001",
    name: "Linen Midi Dress",
    price: 89,
    image: "https://images.pexels.com/photos/18898092/pexels-photo-18898092.jpeg",
    alt: "Linen midi dress in natural tone",
    label: "New",
  },
  {
    id: "shirt-cotton-002",
    name: "Cotton Boxy Tee",
    price: 32,
    image: "https://images.pexels.com/photos/18898092/pexels-photo-18898092.jpeg",
    alt: "Neutral cotton boxy t-shirt",
  },
  {
    id: "pants-linen-003",
    name: "Relaxed Linen Pants",
    price: 74,
    image: "https://images.pexels.com/photos/18898092/pexels-photo-18898092.jpeg",
    alt: "Relaxed linen pants in beige",
    label: "Bestseller",
  },
  {
    id: "shirt-oxford-004",
    name: "Light Oxford Shirt",
    price: 58,
    image: "https://images.pexels.com/photos/18898092/pexels-photo-18898092.jpeg",
    alt: "Light oxford shirt on hanger",
  },
  {
    id: "jacket-canvas-005",
    name: "Canvas Chore Jacket",
    price: 119,
    image: "https://images.pexels.com/photos/18898092/pexels-photo-18898092.jpeg",
    alt: "Neutral canvas chore jacket",
  },
  {
    id: "skirt-pleated-006",
    name: "Pleated Midi Skirt",
    price: 69,
    image: "https://images.pexels.com/photos/18898092/pexels-photo-18898092.jpeg",
    alt: "Pleated midi skirt in soft tone",
  },
  {
    id: "sweater-cotton-007",
    name: "Cotton Knit Sweater",
    price: 84,
    image: "https://images.pexels.com/photos/18898092/pexels-photo-18898092.jpeg",
    alt: "Cream cotton knit sweater folded",
  },
  {
    id: "bag-straw-008",
    name: "Woven Straw Tote",
    price: 54,
    image: "https://images.pexels.com/photos/18898092/pexels-photo-18898092.jpeg",
    alt: "Woven straw tote bag",
  },
]

export function ProductGrid() {
  return (
    <section id="new-arrivals" className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold md:text-3xl mb-0 text-emerald-700">New arrivals</h2>
        <p className="text-sm text-neutral-600">Limited time offer.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} image={p.image} alt={p.alt} label={p.label} />
        ))}
      </div>
    </section>
  )
}