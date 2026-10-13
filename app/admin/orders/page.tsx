'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Order } from '@/lib/store';
import { ShoppingBag, Search, CheckCircle2, Truck, XCircle, Clock, Eye, X } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: Order['status']) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      const data = await res.json();
      if (data.success) {
        setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
        if (selectedOrder?.id === id) {
          setSelectedOrder({ ...selectedOrder, status });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.includes(search) ||
      order.phone.includes(search) ||
      order.email.includes(search);
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return <div className="py-20 text-center text-stone-500 font-bold">جاري تحميل الطلبات...</div>;
  }

  return (
    <div className="space-y-8 dir-rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-sand-200 pb-4">
        <div>
          <Badge variant="gold" className="mb-1">
            المبيعات وتتبع الطلبات
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-arabic">
            إدارة الطلبات والمبيعات ({orders.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            متابعة طلبات العملاء، تحديث حالة التسليم والشحن، واحتساب الوقف.
          </p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <Card hoverEffect={false} className="p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="بحث برقم الطلب، الاسم، أو الهاتف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs px-3 py-2 pr-9 border border-sand-300 rounded-xl bg-white"
          />
          <Search className="w-4 h-4 text-stone-400 absolute right-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-bold w-full sm:w-auto">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'pending', label: 'قيد الانتظار' },
            { id: 'completed', label: 'مكتمل' },
            { id: 'shipped', label: 'تم الشحن' },
            { id: 'cancelled', label: 'ملغي' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setStatusFilter(btn.id)}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                statusFilter === btn.id
                  ? 'bg-burgundy-900 text-white'
                  : 'bg-sand-100 text-stone-700 hover:bg-sand-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Orders Table */}
      <Card hoverEffect={false} className="p-6 bg-white space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-stone-500 text-sm">
            لا توجد طلبات تطابق عناصر البحث.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-sand-200 text-stone-500 font-bold bg-sand-50/50">
                  <th className="p-3">رقم الطلب</th>
                  <th className="p-3">المشتري</th>
                  <th className="p-3">الاتصال والتسليم</th>
                  <th className="p-3">الإجمالي</th>
                  <th className="p-3">الوقف (30%)</th>
                  <th className="p-3">تاريخ الطلب</th>
                  <th className="p-3">الحالة</th>
                  <th className="p-3 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-sand-100 hover:bg-sand-50/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-stone-900">{order.id}</td>
                    <td className="p-3 font-bold text-stone-900">{order.customerName}</td>
                    <td className="p-3">
                      <div>{order.phone}</div>
                      <div className="text-[11px] text-stone-400">{order.email}</div>
                    </td>
                    <td className="p-3 font-bold text-stone-900">{order.total} ج.م</td>
                    <td className="p-3 font-bold text-emerald-700">+{order.waqfAmount} ج.م</td>
                    <td className="p-3 text-stone-500">
                      {new Date(order.createdAt).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold text-[11px] inline-block ${
                          order.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.status === 'completed'
                          ? 'مكتمل'
                          : order.status === 'shipped'
                          ? 'تم الشحن'
                          : order.status === 'cancelled'
                          ? 'ملغي'
                          : 'قيد الانتظار'}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 rounded-lg bg-sand-100 hover:bg-burgundy-900 hover:text-white transition-colors"
                        title="عرض التفاصيل"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 dir-rtl">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-sand-200 pb-3">
              <div>
                <h3 className="font-bold text-lg text-stone-900">تفاصيل الطلب: #{selectedOrder.id}</h3>
                <span className="text-xs text-stone-500">
                  {new Date(selectedOrder.createdAt).toLocaleString('ar-EG')}
                </span>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 rounded-full text-stone-400 hover:text-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-800">
              <div className="bg-sand-50 p-3.5 rounded-2xl space-y-1">
                <p><strong>اسم المشتري:</strong> {selectedOrder.customerName}</p>
                <p><strong>البريد:</strong> {selectedOrder.email}</p>
                <p><strong>الهاتف:</strong> {selectedOrder.phone}</p>
                <p><strong>طريقة التسليم:</strong> {selectedOrder.deliveryType === 'digital' ? 'PDF رقمي' : `شحن مطبوع (${selectedOrder.city})`}</p>
                {selectedOrder.address && <p><strong>العنوان:</strong> {selectedOrder.address}</p>}
                <p><strong>طريقة الدفع:</strong> {selectedOrder.paymentMethod}</p>
              </div>

              <div className="space-y-2 border-t border-sand-200 pt-3">
                <p className="font-bold text-stone-900 text-sm">العناصر المشتراة:</p>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-sand-200">
                    <span>{item.productName} (×{item.quantity})</span>
                    <span className="font-bold">{item.price * item.quantity} ج.م</span>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-900 flex justify-between font-bold">
                <span>المساهمة في الوقف (30%):</span>
                <span>+{selectedOrder.waqfAmount} ج.م</span>
              </div>

              {/* Status Update Options */}
              <div className="pt-2 border-t border-sand-200 space-y-2">
                <label className="block font-bold">تغيير حالة الطلب:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'pending')}
                    className="py-1.5 px-2 rounded-lg bg-amber-100 text-amber-900 font-bold hover:bg-amber-200"
                  >
                    قيد الانتظار
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'completed')}
                    className="py-1.5 px-2 rounded-lg bg-emerald-100 text-emerald-900 font-bold hover:bg-emerald-200"
                  >
                    مكتمل
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'shipped')}
                    className="py-1.5 px-2 rounded-lg bg-blue-100 text-blue-900 font-bold hover:bg-blue-200"
                  >
                    تم الشحن
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')}
                    className="py-1.5 px-2 rounded-lg bg-red-100 text-red-900 font-bold hover:bg-red-200"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
