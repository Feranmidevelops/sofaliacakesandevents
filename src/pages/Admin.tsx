// src/pages/Admin.tsx
import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { Product, Booking, Segment } from '../types';
import { initialProducts } from '../utils/initialData';
import { generateId } from '../utils/generateId';
import { Check, Trash2, Package, Calendar, LogOut, Edit, Plus } from 'lucide-react';
import { Toast } from '../components/Toast';

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [products, setProducts] = useLocalStorage<Product[]>('products', initialProducts);
  const [bookings, setBookings] = useLocalStorage<Booking[]>('bookings', []);
  const [activeTab, setActiveTab] = useState<'products' | 'bookings'>('products');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [formData, setFormData] = useState({
    segment: 'Catering' as Segment,
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const segments: Segment[] = ['Catering', 'Cake Making & Pastries', 'Gift Items'];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price) {
      setToast({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }
    if (editingId) {
      setProducts(products.map((p) => p.id === editingId ? { ...p, ...formData, imageUrl: formData.imageUrl || 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' } : p));
      setToast({ message: 'Product updated successfully!', type: 'success' });
    } else {
      const newProduct: Product = { id: generateId(), ...formData, imageUrl: formData.imageUrl || 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' };
      setProducts([...products, newProduct]);
      setToast({ message: 'Product added successfully!', type: 'success' });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ segment: 'Catering', name: '', description: '', price: '', imageUrl: '' });
    setEditingId(null);
  };

  const handleEditProduct = (product: Product) => {
    setFormData(product);
    setEditingId(product.id);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
      setToast({ message: 'Product deleted', type: 'success' });
    }
  };

  const handleMarkAsSeen = (bookingId: string) => {
    setBookings(bookings.map((b) => (b.id === bookingId ? { ...b, seen: true } : b)));
  };

  const handleMarkAllAsSeen = () => {
    setBookings(bookings.map((b) => ({ ...b, seen: true })));
    setToast({ message: 'All bookings marked as seen', type: 'success' });
  };

  const unseenCount = bookings.filter((b) => !b.seen).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white px-6 py-4 sticky top-0 z-20 shadow-lg">
        <div className="container-max flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Sofalia Admin</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 px-5 py-2 rounded-full transition">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="container-max py-8">
        <div className="flex gap-6 mb-8 border-b border-gray-200">
          <button onClick={() => setActiveTab('products')} className={`flex items-center gap-2 pb-3 font-semibold transition ${activeTab === 'products' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-600 hover:text-amber-600'}`}>
            <Package className="w-4 h-4" /> Products ({products.length})
          </button>
          <button onClick={() => setActiveTab('bookings')} className={`flex items-center gap-2 pb-3 font-semibold transition relative ${activeTab === 'bookings' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-600 hover:text-amber-600'}`}>
            <Calendar className="w-4 h-4" /> Bookings
            {unseenCount > 0 && <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{unseenCount}</span>}
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-amber-500" /> {editingId ? 'Edit Product' : 'Add Product'}</h2>
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <select value={formData.segment} onChange={(e) => setFormData({ ...formData, segment: e.target.value as Segment })} className="w-full p-3 border rounded-lg">
                  {segments.map(s => <option key={s}>{s}</option>)}
                </select>
                <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 border rounded-lg" required />
                <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-3 border rounded-lg" rows={3} required />
                <input type="text" placeholder="Price (e.g., ₦25,000)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full p-3 border rounded-lg" required />
                <input type="text" placeholder="Image URL (optional)" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full p-3 border rounded-lg" />
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600">{editingId ? 'Update' : 'Add Product'}</button>
                  {editingId && <button type="button" onClick={resetForm} className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400">Cancel</button>}
                </div>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Product List</h2>
              {segments.map(segment => {
                const segmentProducts = products.filter(p => p.segment === segment);
                if (segmentProducts.length === 0) return null;
                return (
                  <div key={segment} className="mb-6">
                    <h3 className="text-lg font-semibold text-amber-600 mb-2">{segment}</h3>
                    <div className="space-y-2">
                      {segmentProducts.map(p => (
                        <div key={p.id} className="bg-white p-3 rounded-lg flex justify-between items-center shadow-sm">
                          <div><p className="font-medium">{p.name}</p><p className="text-sm text-gray-500">{p.price}</p></div>
                          <div className="flex gap-2">
                            <button onClick={() => handleEditProduct(p)} className="p-2 bg-amber-100 rounded hover:bg-amber-200"><Edit className="w-4 h-4 text-amber-700" /></button>
                            <button onClick={() => handleDeleteProduct(p.id)} className="p-2 bg-red-100 rounded hover:bg-red-200"><Trash2 className="w-4 h-4 text-red-600" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-serif font-bold">Booking Requests</h2>{unseenCount > 0 && <button onClick={handleMarkAllAsSeen} className="bg-amber-500 text-white px-4 py-2 rounded-lg">Mark All Seen</button>}</div>
            {bookings.length === 0 ? <div className="bg-white p-8 text-center rounded-xl">No bookings yet.</div> : (
              <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="w-full">
                  <thead className="bg-gray-100"><tr><th className="p-3 text-left">Status</th><th>Name</th><th>Email</th><th>Reason</th><th>Budget</th><th>Date</th><th>Message</th></tr></thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} className={`border-t ${b.seen ? 'opacity-70' : 'bg-amber-50'}`}>
                        <td className="p-3"><button onClick={() => handleMarkAsSeen(b.id)} className={`p-1 rounded ${b.seen ? 'bg-green-200' : 'bg-yellow-200'}`}><Check className="w-4 h-4" /></button></td>
                        <td className="p-3 font-medium">{b.name}</td><td className="p-3">{b.email}</td><td className="p-3">{b.reason}</td><td className="p-3">{b.budget || '—'}</td><td className="p-3">{new Date(b.timestamp).toLocaleDateString()}</td><td className="p-3 max-w-xs truncate">{b.message || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};