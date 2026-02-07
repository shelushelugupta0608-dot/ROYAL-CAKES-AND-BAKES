import { useState } from 'react';
import { useSiteData, SiteData, Product, Feature, Testimonial, Stat } from '../context/SiteContext';

const tabs = [
  { id: 'brand', label: '🏷️ Brand' },
  { id: 'hero', label: '🏠 Hero' },
  { id: 'features', label: '✨ Features' },
  { id: 'about', label: '📖 About' },
  { id: 'stats', label: '📊 Stats' },
  { id: 'products', label: '🎂 Products' },
  { id: 'testimonials', label: '💬 Reviews' },
  { id: 'contact', label: '📞 Contact' },
  { id: 'footer', label: '🔻 Footer' },
];

interface AdminPanelProps {
  onClose: () => void;
  onLogout?: () => void;
}

export function AdminPanel({ onClose, onLogout }: AdminPanelProps) {
  const { data, updateData, resetData } = useSiteData();
  const [activeTab, setActiveTab] = useState('brand');
  const [localData, setLocalData] = useState<SiteData>(JSON.parse(JSON.stringify(data)));
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateData(localData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data to defaults?')) {
      resetData();
      setLocalData(JSON.parse(JSON.stringify(data)));
      window.location.reload();
    }
  };

  const updateField = (path: string, value: unknown) => {
    const newData = { ...localData };
    const keys = path.split('.');
    let current: Record<string, unknown> = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]] as Record<string, unknown>;
    }
    current[keys[keys.length - 1]] = value;
    setLocalData(newData as SiteData);
  };

  const addProduct = () => {
    const newProducts = [...localData.products, {
      name: "New Cake",
      description: "Delicious cake description",
      price: "₹499",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "New"
    }];
    setLocalData({ ...localData, products: newProducts });
  };

  const removeProduct = (index: number) => {
    const newProducts = localData.products.filter((_, i) => i !== index);
    setLocalData({ ...localData, products: newProducts });
  };

  const updateProduct = (index: number, field: keyof Product, value: string) => {
    const newProducts = [...localData.products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setLocalData({ ...localData, products: newProducts });
  };

  const addFeature = () => {
    const newFeatures = [...localData.features, {
      icon: "⭐",
      title: "New Feature",
      description: "Feature description"
    }];
    setLocalData({ ...localData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = localData.features.filter((_, i) => i !== index);
    setLocalData({ ...localData, features: newFeatures });
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...localData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setLocalData({ ...localData, features: newFeatures });
  };

  const addTestimonial = () => {
    const newTestimonials = [...localData.testimonials, {
      name: "Customer Name",
      text: "Customer review text",
      rating: 5
    }];
    setLocalData({ ...localData, testimonials: newTestimonials });
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = localData.testimonials.filter((_, i) => i !== index);
    setLocalData({ ...localData, testimonials: newTestimonials });
  };

  const updateTestimonial = (index: number, field: keyof Testimonial, value: string | number) => {
    const newTestimonials = [...localData.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setLocalData({ ...localData, testimonials: newTestimonials });
  };

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    const newStats = [...localData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setLocalData({ ...localData, stats: newStats });
  };

  const updateAboutParagraph = (index: number, value: string) => {
    const newParagraphs = [...localData.about.paragraphs];
    newParagraphs[index] = value;
    setLocalData({ ...localData, about: { ...localData.about, paragraphs: newParagraphs } });
  };

  const addAboutParagraph = () => {
    const newParagraphs = [...localData.about.paragraphs, "New paragraph text"];
    setLocalData({ ...localData, about: { ...localData.about, paragraphs: newParagraphs } });
  };

  const removeAboutParagraph = (index: number) => {
    const newParagraphs = localData.about.paragraphs.filter((_, i) => i !== index);
    setLocalData({ ...localData, about: { ...localData.about, paragraphs: newParagraphs } });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                ✓ Saved!
              </span>
            )}
            <button
              onClick={handleReset}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Reset All
            </button>
            <button
              onClick={handleSave}
              className="bg-white text-pink-600 px-6 py-2 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
            >
              💾 Save Changes
            </button>
            <button
              onClick={onClose}
              className="bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              ✕ Close
            </button>
            {onLogout && (
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1"
              >
                🚪 Logout
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-48 shrink-0">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-pink-500 text-white'
                      : 'text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Brand Tab */}
              {activeTab === 'brand' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">🏷️ Brand Settings</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                      <input
                        type="text"
                        value={localData.brandName}
                        onChange={(e) => updateField('brandName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brand Emoji</label>
                      <input
                        type="text"
                        value={localData.brandEmoji}
                        onChange={(e) => updateField('brandEmoji', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Hero Tab */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">🏠 Hero Section</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={localData.hero.badge}
                      onChange={(e) => updateField('hero.badge', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title Line 1</label>
                      <input
                        type="text"
                        value={localData.hero.title1}
                        onChange={(e) => updateField('hero.title1', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title Line 2 (Gradient)</label>
                      <input
                        type="text"
                        value={localData.hero.title2}
                        onChange={(e) => updateField('hero.title2', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={localData.hero.description}
                      onChange={(e) => updateField('hero.description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
                      <input
                        type="text"
                        value={localData.hero.primaryButton}
                        onChange={(e) => updateField('hero.primaryButton', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
                      <input
                        type="text"
                        value={localData.hero.secondaryButton}
                        onChange={(e) => updateField('hero.secondaryButton', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">✨ Features</h2>
                    <button
                      onClick={addFeature}
                      className="bg-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                    >
                      + Add Feature
                    </button>
                  </div>
                  {localData.features.map((feature, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-gray-500">Feature {index + 1}</span>
                        <button
                          onClick={() => removeFeature(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          🗑️ Remove
                        </button>
                      </div>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Icon (Emoji)</label>
                          <input
                            type="text"
                            value={feature.icon}
                            onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-600 mb-1">Title</label>
                          <input
                            type="text"
                            value={feature.title}
                            onChange={(e) => updateFeature(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="block text-xs text-gray-600 mb-1">Description</label>
                        <textarea
                          value={feature.description}
                          onChange={(e) => updateFeature(index, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* About Tab */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">📖 About Section</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                    <input
                      type="text"
                      value={localData.about.title}
                      onChange={(e) => updateField('about.title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700">Paragraphs</h3>
                    <button
                      onClick={addAboutParagraph}
                      className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
                    >
                      + Add Paragraph
                    </button>
                  </div>
                  {localData.about.paragraphs.map((paragraph, index) => (
                    <div key={index} className="relative">
                      <label className="block text-xs text-gray-600 mb-1">Paragraph {index + 1}</label>
                      <textarea
                        value={paragraph}
                        onChange={(e) => updateAboutParagraph(index, e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-16"
                      />
                      <button
                        onClick={() => removeAboutParagraph(index)}
                        className="absolute top-6 right-2 text-red-500 hover:text-red-700 text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Stats Tab */}
              {activeTab === 'stats' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Statistics</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {localData.stats.map((stat, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <span className="text-sm font-medium text-gray-500 mb-2 block">Stat {index + 1}</span>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Value</label>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => updateStat(index, 'value', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Label</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => updateStat(index, 'label', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Tab */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">🎂 Products / Cakes</h2>
                    <button
                      onClick={addProduct}
                      className="bg-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                    >
                      + Add Cake
                    </button>
                  </div>
                  {localData.products.map((product, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-gray-500">Cake {index + 1}</span>
                        <button
                          onClick={() => removeProduct(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          🗑️ Remove
                        </button>
                      </div>
                      <div className="grid md:grid-cols-4 gap-3 mb-3">
                        <div className="md:col-span-4 mb-2">
                          <label className="block text-xs text-gray-600 mb-1">Image URL</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={product.image}
                              onChange={(e) => updateProduct(index, 'image', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                              placeholder="https://..."
                            />
                            <div className="w-10 h-10 rounded overflow-hidden border bg-gray-100 flex-shrink-0">
                               <img src={product.image} alt="" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-3">
                          <label className="block text-xs text-gray-600 mb-1">Name</label>
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) => updateProduct(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Tag</label>
                          <input
                            type="text"
                            value={product.tag}
                            onChange={(e) => updateProduct(index, 'tag', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-4 gap-3">
                        <div className="md:col-span-3">
                          <label className="block text-xs text-gray-600 mb-1">Description</label>
                          <input
                            type="text"
                            value={product.description}
                            onChange={(e) => updateProduct(index, 'description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Price (Base: 0.5 kg)</label>
                          <input
                            type="text"
                            value={product.price}
                            onChange={(e) => updateProduct(index, 'price', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            placeholder="e.g. ₹599"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Testimonials Tab */}
              {activeTab === 'testimonials' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">💬 Testimonials</h2>
                    <button
                      onClick={addTestimonial}
                      className="bg-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                    >
                      + Add Review
                    </button>
                  </div>
                  {localData.testimonials.map((testimonial, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-gray-500">Review {index + 1}</span>
                        <button
                          onClick={() => removeTestimonial(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          🗑️ Remove
                        </button>
                      </div>
                      <div className="grid md:grid-cols-3 gap-3 mb-3">
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-600 mb-1">Customer Name</label>
                          <input
                            type="text"
                            value={testimonial.name}
                            onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Rating (1-5)</label>
                          <select
                            value={testimonial.rating}
                            onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          >
                            {[1, 2, 3, 4, 5].map((n) => (
                              <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Review Text</label>
                        <textarea
                          value={testimonial.text}
                          onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">📞 Contact Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={localData.contact.phone}
                        onChange={(e) => updateField('contact.phone', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="text"
                        value={localData.contact.email}
                        onChange={(e) => updateField('contact.email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={localData.contact.location}
                      onChange={(e) => updateField('contact.location', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Note</label>
                    <input
                      type="text"
                      value={localData.contact.deliveryNote}
                      onChange={(e) => updateField('contact.deliveryNote', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  
                  <hr className="my-6" />
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🕒 Business Hours</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Weekdays</label>
                      <input
                        type="text"
                        value={localData.businessHours.weekdays}
                        onChange={(e) => updateField('businessHours.weekdays', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sunday</label>
                      <input
                        type="text"
                        value={localData.businessHours.sunday}
                        onChange={(e) => updateField('businessHours.sunday', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                    <input
                      type="text"
                      value={localData.businessHours.note}
                      onChange={(e) => updateField('businessHours.note', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Footer Tab */}
              {activeTab === 'footer' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">🔻 Footer Settings</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Footer Copyright Text</label>
                    <input
                      type="text"
                      value={localData.footerText}
                      onChange={(e) => updateField('footerText', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
