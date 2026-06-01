import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { Product, Booking, Segment } from '../types';
import { Check, Trash2, Package, Calendar, LogOut, Edit, Plus, Upload, X } from 'lucide-react';
import { Toast } from '../components/Toast';

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'bookings'>('products');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const segments: Segment[] = ['Catering', 'Cake Making & Pastries', 'Gift Items'];

  const [formData, setFormData] = useState({
    segment: 'Catering' as Segment,
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(
        (data || []).map((row) => ({
          id: row.id,
          segment: row.segment,
          name: row.name,
          description: row.description,
          price: row.price,
          imageUrl: row.image_url ?? '',
        }))
      );
    } catch (error) {
      console.error('Error fetching products:', error);
      setToast({ message: 'Failed to load products', type: 'error' });
    }
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setToast({ message: 'Failed to load bookings', type: 'error' });
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }

    void (async () => {
      await fetchProducts();
      await fetchBookings();
    })();
  }, [user, navigate]);

  // Upload image to Supabase Storage
  const uploadImage = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `product-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('sofalia-product-image')
        .upload(fileName, file, { upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('sofalia-product-image')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      setToast({ message: 'Failed to upload image', type: 'error' });
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add or update product
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price) {
      setToast({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }

    try {
      let imageUrl = formData.imageUrl;

      // Upload new image if selected
      if (selectedImageFile) {
        imageUrl = await uploadImage(selectedImageFile);
      }

      if (editingId) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update({
            segment: formData.segment,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            image_url: imageUrl,
          })
          .eq('id', editingId);

        if (error) throw error;
        setToast({ message: 'Product updated successfully!', type: 'success' });
      } else {
        // Add new product
        const { error } = await supabase.from('products').insert([
          {
            segment: formData.segment,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            image_url: imageUrl || 'https://via.placeholder.com/300x200?text=No+Image',
          },
        ]);

        if (error) throw error;
        setToast({ message: 'Product added successfully!', type: 'success' });
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      setToast({ message: 'Failed to save product', type: 'error' });
    }
  };

  const resetForm = () => {
    setFormData({ segment: 'Catering', name: '', description: '', price: '', imageUrl: '' });
    setEditingId(null);
    setSelectedImageFile(null);
    setImagePreview('');
  };

  const handleEditProduct = (product: Product) => {
    setFormData({
      segment: product.segment,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setImagePreview(product.imageUrl);
    setEditingId(product.id);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);

      if (error) throw error;
      setToast({ message: 'Product deleted successfully', type: 'success' });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setToast({ message: 'Failed to delete product', type: 'error' });
    }
  };

  const handleMarkAsSeen = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ seen: true })
        .eq('id', bookingId);

      if (error) throw error;
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      setToast({ message: 'Failed to update booking', type: 'error' });
    }
  };

  const handleMarkAllAsSeen = async () => {
    try {
      const unseenBookings = bookings.filter((b) => !b.seen).map((b) => b.id);

      if (unseenBookings.length === 0) {
        setToast({ message: 'All bookings already seen', type: 'success' });
        return;
      }

      const { error } = await supabase
        .from('bookings')
        .update({ seen: true })
        .in('id', unseenBookings);

      if (error) throw error;
      setToast({ message: 'All bookings marked as seen', type: 'success' });
      fetchBookings();
    } catch (error) {
      console.error('Error updating bookings:', error);
      setToast({ message: 'Failed to mark bookings as seen', type: 'error' });
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const unseenCount = bookings.filter((b) => !b.seen).length;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white px-6 py-4 sticky top-0 z-20 shadow-lg">
        <div className="container-max flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Sofalia Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 px-5 py-2 rounded-full transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="container-max py-8">
        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 pb-3 font-semibold transition ${
              activeTab === 'products'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            <Package className="w-4 h-4" /> Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 pb-3 font-semibold transition relative ${
              activeTab === 'bookings'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            <Calendar className="w-4 h-4" /> Bookings
            {unseenCount > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {unseenCount}
              </span>
            )}
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-500" />
                  {editingId ? 'Edit Product' : 'Add Product'}
                </h2>

                <form onSubmit={handleProductSubmit} className="space-y-4">
                  {/* Segment */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Segment *
                    </label>
                    <select
                      value={formData.segment}
                      onChange={(e) =>
                        setFormData({ ...formData, segment: e.target.value as Segment })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {segments.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Executive Lunch Platter"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      placeholder="Brief description of the product"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., ₦25,000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Image
                    </label>
                    <div className="border-2 border-dashed border-amber-300 rounded-lg p-4 text-center cursor-pointer hover:border-amber-500 transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload image</p>
                      </label>
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mt-4 relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview('');
                            setSelectedImageFile(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-2 rounded-lg font-semibold transition"
                    >
                      {uploading ? 'Uploading...' : editingId ? 'Update Product' : 'Add Product'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Products List */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                All Products
              </h2>

              {segments.map((segment) => {
                const segmentProducts = products.filter((p) => p.segment === segment);
                if (segmentProducts.length === 0) return null;

                return (
                  <div key={segment} className="mb-8">
                    <h3 className="text-lg font-semibold text-amber-600 mb-4">{segment}</h3>
                    <div className="grid gap-4">
                      {segmentProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white rounded-lg shadow-md p-4 flex gap-4 hover:shadow-lg transition"
                        >
                          {/* Image */}
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />

                          {/* Info */}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{product.name}</h4>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {product.description}
                            </p>
                            <p className="font-semibold text-amber-600 mt-1">{product.price}</p>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="p-2 bg-amber-100 rounded-lg hover:bg-amber-200 transition"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4 text-amber-700" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {products.length === 0 && (
                <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                  No products yet. Add your first product!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-gray-800">
                Booking Requests ({bookings.length})
              </h2>
              {unseenCount > 0 && (
                <button
                  onClick={handleMarkAllAsSeen}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Mark All Seen
                </button>
              )}
            </div>

            {bookings.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-gray-500">
                No bookings yet.
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Interest
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Budget
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Message
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className={`border-t border-gray-200 transition ${
                            !booking.seen ? 'bg-amber-50' : 'opacity-70'
                          }`}
                        >
                          <td className="px-6 py-3">
                            <button
                              onClick={() => handleMarkAsSeen(booking.id)}
                              className={`p-2 rounded-lg transition ${
                                booking.seen
                                  ? 'bg-green-200'
                                  : 'bg-yellow-200 hover:bg-yellow-300'
                              }`}
                              title={booking.seen ? 'Seen' : 'Mark as seen'}
                            >
                              <Check className="w-4 h-4 text-gray-700" />
                            </button>
                          </td>
                          <td className="px-6 py-3 font-medium text-gray-900">
                            {booking.name}
                          </td>
                          <td className="px-6 py-3 text-gray-700">{booking.email}</td>
                          <td className="px-6 py-3 text-gray-700">{booking.reason}</td>
                          <td className="px-6 py-3 text-gray-700">
                            {booking.budget || '—'}
                          </td>
                          <td className="px-6 py-3 text-gray-700">
                            {new Date(booking.timestamp).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-3 text-gray-700 max-w-xs truncate">
                            {booking.message || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};