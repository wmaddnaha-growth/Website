import { NextResponse } from 'next/server';
import { getStoredFAQ, saveStoredFAQ } from '@/lib/store';
import { FAQItem } from '@/types';

export async function GET() {
  const faq = getStoredFAQ();
  return NextResponse.json({ success: true, faq });
}

export async function POST(request: Request) {
  try {
    const newItem: FAQItem = await request.json();
    const faq = getStoredFAQ();

    faq.push({ ...newItem, id: newItem.id || Date.now().toString() });
    saveStoredFAQ(faq);

    return NextResponse.json({ success: true, faq, message: 'تم إضافة السؤال بنجاح' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في إضافة السؤال' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedItem: FAQItem = await request.json();
    let faq = getStoredFAQ();

    const index = faq.findIndex((f) => f.id === updatedItem.id);
    if (index === -1) {
      return NextResponse.json({ success: false, message: 'السؤال غير موجود' }, { status: 404 });
    }

    faq[index] = updatedItem;
    saveStoredFAQ(faq);

    return NextResponse.json({ success: true, faq, message: 'تم تعديل السؤال بنجاح' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في تعديل السؤال' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'يرجى تحديد id للسؤال' }, { status: 400 });
    }

    let faq = getStoredFAQ();
    faq = faq.filter((f) => f.id !== id);
    saveStoredFAQ(faq);

    return NextResponse.json({ success: true, message: 'تم حذف السؤال بنجاح' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في حذف السؤال' }, { status: 500 });
  }
}
