import { NextResponse } from 'next/server';
import { addStoredOrder } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      city,
      address,
      deliveryType,
      paymentMethod,
      items,
      subtotal,
      discountAmount,
      total,
    } = body;

    if (!fullName || !email || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'بيانات الطلب غير مكتملة' },
        { status: 400 }
      );
    }

    const orderId = `WM-${Math.floor(100000 + Math.random() * 900000)}`;
    const waqfAmount = Math.round(total * 0.3); // 30% Waqf allocation

    const order = addStoredOrder({
      id: orderId,
      customerName: fullName,
      email,
      phone,
      city: city || 'القاهرة',
      address,
      deliveryType: deliveryType || 'digital',
      paymentMethod: paymentMethod || 'card',
      items: items.map((i: any) => ({
        productId: i.product?.id || i.id,
        productName: i.product?.name || i.name,
        price: i.product?.price ?? i.price ?? 0,
        quantity: i.quantity || 1,
      })),
      subtotal: subtotal || total,
      discountAmount: discountAmount || 0,
      total: total || 0,
      waqfAmount,
      status: 'pending',
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      order,
      message: 'تم تسجيل الطلب بنجاح',
    });
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { success: false, message: 'خطأ في تنفيذ الطلب' },
      { status: 500 }
    );
  }
}
