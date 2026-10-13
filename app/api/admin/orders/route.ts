import { NextResponse } from 'next/server';
import { getStoredOrders, saveStoredOrders, Order } from '@/lib/store';

export async function GET() {
  const orders = getStoredOrders();
  return NextResponse.json({ success: true, orders });
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const orders = getStoredOrders();

    const order = orders.find((o) => o.id === id);
    if (!order) {
      return NextResponse.json({ success: false, message: 'الطلب غير موجود' }, { status: 404 });
    }

    order.status = status;
    saveStoredOrders(orders);

    return NextResponse.json({ success: true, order, message: 'تم تحديث حالة الطلب' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في تحديث الطلب' }, { status: 500 });
  }
}
