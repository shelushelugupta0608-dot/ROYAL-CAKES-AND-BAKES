import { useState } from 'react';
import { useSiteData } from '../context/SiteContext';

// Icons as components
const CakeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 003 15.546V18a2 2 0 002 2h14a2 2 0 002-2v-2.454z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11V6a3 3 0 116 0v5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11h14v4H5z" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ProductCard = ({ product, contactPhone }: { product: any, contactPhone: string }) => {
  const [weight, setWeight] = useState(0.5);

  // Helper to parse price string like "₹599"
  const getBasePrice = (priceStr: string) => {
    const num = parseInt(priceStr.replace(/[^0-9]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  // Assuming the price in DB is for 0.5 kg (Half Kg)
  const basePrice = getBasePrice(product.price);
  const totalPrice = Math.round(basePrice * (weight / 0.5));

  // Format phone for WhatsApp
  const cleanPhone = contactPhone.replace(/[^0-9]/g, '');
  const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hi! I'd like to order ${weight} kg of ${product.name} (Total: ₹${totalPrice}). Is it available?`
  )}`;

  const weightOptions = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5];

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg card-3d-hover group border border-pink-50 flex flex-col h-full">
      <div className="h-64 bg-gray-100 relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            // Fallback to emoji if image fails
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-pink-100');
            const span = document.createElement('span');
            span.innerText = '🎂';
            span.className = 'text-8xl';
            e.currentTarget.parentElement?.appendChild(span);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
        
        <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-pink-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
          {product.tag}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow relative bg-white">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">{product.description}</p>
        
        {/* Weight and Price Section */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Weight:</span>
            <div className="relative">
              <select
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="appearance-none bg-pink-50 text-pink-700 font-bold text-sm rounded-lg border-none pl-4 pr-8 py-1.5 focus:ring-2 focus:ring-pink-500 cursor-pointer shadow-sm hover:bg-pink-100 transition-colors"
              >
                {weightOptions.map(w => (
                  <option key={w} value={w}>{w} kg</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-pink-600">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
             <div className="flex flex-col">
               <span className="text-xs text-gray-400">Total Price</span>
               <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                 ₹{totalPrice}
               </span>
             </div>
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md hover:shadow-xl hover:shadow-pink-200 transition-all transform active:scale-95 flex items-center gap-2"
            >
              Order Now 
              <span className="text-xs opacity-90">via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

interface WebsiteProps {
  onOpenAdmin: () => void;
}

export function Website({ onOpenAdmin }: WebsiteProps) {
  const { data } = useSiteData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: '', phone: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Admin Button */}
      <button
        onClick={onOpenAdmin}
        className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-full shadow-xl hover:bg-gray-800 transition-all flex items-center gap-2 group"
      >
        <span className="text-lg">⚙️</span>
        <span className="hidden group-hover:inline font-medium">Admin Panel</span>
      </button>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{data.brandEmoji}</span>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                {data.brandName}
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">About</a>
              <a href="#cakes" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Our Cakes</a>
              <a href="#contact" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Contact</a>
              <a href="#contact" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-pink-200 transition-all">
                Order Now
              </a>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#home" className="block text-gray-700 hover:text-pink-600 py-2">Home</a>
              <a href="#about" className="block text-gray-700 hover:text-pink-600 py-2">About</a>
              <a href="#cakes" className="block text-gray-700 hover:text-pink-600 py-2">Our Cakes</a>
              <a href="#contact" className="block text-gray-700 hover:text-pink-600 py-2">Contact</a>
              <a href="#contact" className="block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-full font-medium text-center">
                Order Now
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden perspective-1000">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-white to-rose-100/50"></div>
        
        {/* Floating 3D Background Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-30 animate-float blur-[1px]">🎂</div>
        <div className="absolute bottom-40 right-10 text-6xl opacity-30 animate-float-delayed blur-[1px]">🧁</div>
        <div className="absolute top-40 right-1/4 text-5xl opacity-20 animate-float-slow blur-[2px]">🍰</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 animate-float blur-[1px]">🍪</div>
        <div className="absolute top-10 right-10 text-4xl opacity-20 animate-float-delayed">🍩</div>
        
        {/* Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm animate-float">
                {data.hero.badge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 drop-shadow-sm">
                {data.hero.title1}
                <span className="block bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300 origin-left">
                  {data.hero.title2}
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                {data.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#cakes" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:shadow-pink-200 transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95">
                  {data.hero.primaryButton}
                </a>
                <a href="#contact" className="bg-white/50 backdrop-blur-sm border-2 border-pink-500 text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all transform hover:-translate-y-1">
                  {data.hero.secondaryButton}
                </a>
              </div>
            </div>
            
            <div className="flex justify-center perspective-1000">
              <div className="relative transform-style-3d animate-float-slow hover:pause">
                <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full flex items-center justify-center shadow-2xl relative z-10 transform transition-transform duration-500 hover:rotate-y-12 hover:rotate-x-12">
                   {/* Main Hero Image/Emoji */}
                  <span className="text-[150px] md:text-[200px] drop-shadow-2xl transform hover:scale-110 transition-transform duration-500">🎂</span>
                  
                  {/* Floating Rings */}
                  <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-spin-slow" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
                  <div className="absolute inset-[-20px] border-2 border-pink-200/50 rounded-full animate-spin-slow animation-delay-2000" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', animationDirection: 'reverse' }}></div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -top-10 -right-10 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl animate-float-delayed z-20 transform hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-4xl block mb-1">🍓</span>
                  <span className="text-xs font-bold text-gray-600">Fresh Fruit</span>
                </div>
                
                <div className="absolute -bottom-10 -left-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl animate-float z-20 transform hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-4xl block mb-1">🍫</span>
                  <span className="text-xs font-bold text-gray-600">Rich Cocoa</span>
                </div>

                <div className="absolute top-1/2 -right-16 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-xl animate-float z-0 transform hover:scale-110 transition-transform cursor-pointer">
                   <div className="flex items-center gap-2">
                     <span className="text-2xl">⭐</span>
                     <span className="text-xs font-bold text-gray-600">5.0 Rating</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 perspective-1000">
            {data.features.map((feature, index) => (
              <div 
                key={index} 
                className="group text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-transparent hover:border-pink-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                
                <span className="text-4xl mb-4 block transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 inline-block drop-shadow-md">
                  {feature.icon}
                </span>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-100 to-rose-200 rounded-3xl p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  {data.stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-md">
                      <span className="text-5xl block mb-2">{stat.value}</span>
                      <span className="text-gray-600 text-sm">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {data.about.title}
              </h2>
              {data.about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-4">
                  {index === 0 ? (
                    <>
                      Welcome to <span className="font-semibold text-pink-600">{data.brandName} Bakery</span> – {paragraph.split('–')[1] || paragraph}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-pink-600">
                  <HeartIcon />
                  <span className="font-medium">Made with Love</span>
                </div>
                <div className="flex items-center gap-2 text-pink-600">
                  <CakeIcon />
                  <span className="font-medium">100% Vegetarian</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="cakes" className="py-20 bg-pink-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-10 text-9xl opacity-5 rotate-12">🍰</div>
          <div className="absolute bottom-40 -right-10 text-9xl opacity-5 -rotate-12">🎂</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Delicious Cakes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our range of mouthwatering eggless cakes, perfect for any occasion. Each cake is freshly baked with love and premium ingredients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {data.products.map((product, index) => (
              <ProductCard key={index} product={product} contactPhone={data.contact.phone} />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">Looking for something custom? We create personalized cakes for all occasions!</p>
            <a href="#contact" className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 hover:underline underline-offset-4 transition-all">
              Request Custom Cake <span className="animate-bounce-x">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">Don't just take our word for it – hear from our happy customers!</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {data.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 shadow-lg">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-800">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-pink-50 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Let's Make Your Celebration Sweet!
              </h2>
              <p className="text-gray-600 mb-8">
                Ready to order? Have a custom request? Get in touch with us and we'll make your cake dreams come true!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                    <PhoneIcon />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call or WhatsApp</p>
                    <p className="font-semibold text-gray-800">{data.contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                    <MailIcon />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <p className="font-semibold text-gray-800">{data.contact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                    <LocationIcon />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Home Bakery Location</p>
                    <p className="font-semibold text-gray-800">{data.contact.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-pink-200/50 rounded-xl">
                <p className="text-sm text-pink-800">
                  <span className="font-semibold">📦 Delivery Available:</span> {data.contact.deliveryNote}
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h3>
              
              {formSubmitted && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl">
                  Thank you! We'll get back to you soon! 🎂
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Message / Order Details</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your cake requirements..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-200 transition-all transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">{data.brandEmoji}</span>
                <span className="text-xl font-bold">{data.brandName} Bakery</span>
              </div>
              <p className="text-gray-400">
                Spreading sweetness one cake at a time! 100% eggless, 100% delicious.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#home" className="block text-gray-400 hover:text-pink-400 transition-colors">Home</a>
                <a href="#about" className="block text-gray-400 hover:text-pink-400 transition-colors">About Us</a>
                <a href="#cakes" className="block text-gray-400 hover:text-pink-400 transition-colors">Our Cakes</a>
                <a href="#contact" className="block text-gray-400 hover:text-pink-400 transition-colors">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Business Hours</h4>
              <div className="text-gray-400 space-y-1">
                <p>{data.businessHours.weekdays}</p>
                <p>{data.businessHours.sunday}</p>
                <p className="text-pink-400 mt-2">{data.businessHours.note}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>{data.footerText}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
