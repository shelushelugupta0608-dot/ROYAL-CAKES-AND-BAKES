import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface Product {
  name: string;
  description: string;
  price: string;
  image: string;
  tag: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  deliveryNote: string;
}

export interface BusinessHours {
  weekdays: string;
  sunday: string;
  note: string;
}

export interface HeroContent {
  badge: string;
  title1: string;
  title2: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
}

export interface AboutContent {
  title: string;
  paragraphs: string[];
}

export interface SiteData {
  brandName: string;
  brandEmoji: string;
  hero: HeroContent;
  features: Feature[];
  about: AboutContent;
  stats: Stat[];
  products: Product[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  businessHours: BusinessHours;
  footerText: string;
}

const defaultData: SiteData = {
  brandName: "Sweet Bliss",
  brandEmoji: "🧁",
  hero: {
    badge: "🥚 100% Eggless Cakes",
    title1: "Homemade Cakes",
    title2: "Baked with Love",
    description: "Indulge in our delicious 100% eggless cakes, freshly baked in our home kitchen with premium ingredients and lots of love. Perfect for every celebration!",
    primaryButton: "Explore Cakes",
    secondaryButton: "Contact Us"
  },
  features: [
    {
      icon: "🥚",
      title: "100% Eggless",
      description: "All our cakes are completely egg-free, perfect for vegetarians and those with egg allergies"
    },
    {
      icon: "🏠",
      title: "Homemade with Love",
      description: "Baked fresh in our home kitchen with traditional family recipes passed down generations"
    },
    {
      icon: "🌿",
      title: "Fresh Ingredients",
      description: "We use only the finest, freshest ingredients - no preservatives or artificial flavors"
    },
    {
      icon: "🎨",
      title: "Custom Designs",
      description: "Personalized cakes for birthdays, weddings, anniversaries and all special occasions"
    }
  ],
  about: {
    title: "Our Sweet Story",
    paragraphs: [
      "Welcome to Sweet Bliss Bakery – where every cake tells a story! What started as a passion for baking in our home kitchen has blossomed into a beloved local bakery specializing in 100% eggless cakes.",
      "We believe that everyone deserves to enjoy delicious cakes, regardless of dietary preferences. That's why all our creations are completely egg-free, using traditional recipes perfected over generations.",
      "From birthdays to weddings, anniversaries to festivals – we pour our heart into every cake we bake, making your celebrations extra special!"
    ]
  },
  stats: [
    { value: "500+", label: "Happy Customers" },
    { value: "50+", label: "Cake Varieties" },
    { value: "5⭐", label: "Customer Rating" },
    { value: "3+", label: "Years Experience" }
  ],
  products: [
    {
      name: "Classic Vanilla Dream",
      description: "Light, fluffy vanilla sponge with creamy buttercream frosting",
      price: "₹599",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "Bestseller"
    },
    {
      name: "Rich Chocolate Truffle",
      description: "Decadent dark chocolate layers with ganache coating",
      price: "₹699",
      image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "Popular"
    },
    {
      name: "Red Velvet Delight",
      description: "Velvety red cake with cream cheese frosting",
      price: "₹749",
      image: "https://images.unsplash.com/photo-1586788680434-30d32443d4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "Premium"
    },
    {
      name: "Fresh Fruit Paradise",
      description: "Vanilla sponge topped with seasonal fresh fruits",
      price: "₹799",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "Healthy"
    },
    {
      name: "Butterscotch Bliss",
      description: "Caramel infused cake with crunchy butterscotch bits",
      price: "₹649",
      image: "https://images.unsplash.com/photo-1542826438-bd32fcf02d27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "Classic"
    },
    {
      name: "Black Forest Classic",
      description: "Chocolate layers with cherries and whipped cream",
      price: "₹679",
      image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "Traditional"
    }
  ],
  testimonials: [
    {
      name: "Priya Sharma",
      text: "The best eggless cake I've ever had! My kids loved the chocolate truffle cake. Will definitely order again!",
      rating: 5
    },
    {
      name: "Rahul Mehta",
      text: "Ordered a birthday cake for my mom. The taste was amazing and the design was exactly what we wanted!",
      rating: 5
    },
    {
      name: "Anita Patel",
      text: "Finally found a bakery that makes truly delicious eggless cakes. The red velvet is to die for!",
      rating: 5
    }
  ],
  contact: {
    phone: "+91 98765 43210",
    email: "hello@sweetbliss.com",
    location: "Sector 15, Noida, UP",
    deliveryNote: "We deliver within 10km radius. Free delivery on orders above ₹1000!"
  },
  businessHours: {
    weekdays: "Monday - Saturday: 9 AM - 8 PM",
    sunday: "Sunday: 10 AM - 6 PM",
    note: "⏰ Order 24 hrs in advance for best results!"
  },
  footerText: "© 2024 Sweet Bliss Bakery. Made with 💖 | All Rights Reserved"
};

interface SiteContextType {
  data: SiteData;
  updateData: (newData: SiteData) => void;
  resetData: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(() => {
    const saved = localStorage.getItem('siteData');
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('siteData', JSON.stringify(data));
  }, [data]);

  const updateData = (newData: SiteData) => {
    setData(newData);
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem('siteData');
  };

  return (
    <SiteContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteProvider');
  }
  return context;
}
