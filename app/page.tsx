import Header from "@/components/Header";
import Footer from "@/components/Footer";
import '@/app/styles/splide.min.css';
import '@/app/styles/splide-core.min.css';

export default function Home() {
  return (
    <>
      <Header />
      <section className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center h-screen">
            <div className="text-center md:text-left md:w-1/2">
              <h1 className="text-6xl font-bold text-white leading-tight mb-4">Welcome to Our Website</h1>
              <p className="text-2xl text-gray-200 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-4">What We Do</h2>
          <p className="text-xl text-gray-600 text-center mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-2">Web Development</h4>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-2">Web Design</h4>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-2">Web Design</h4>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-2">Web Design</h4>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
