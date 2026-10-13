import { NextResponse } from 'next/server';
import { getStoredSettings, saveStoredSettings, getStoredOrders, getStoredProducts, getStoredFAQ, getStoredBlog } from '@/lib/store';

export async function GET() {
  const settings = getStoredSettings();
  return NextResponse.json({ success: true, settings });
}

export async function PUT(request: Request) {
  try {
    const newSettings = await request.json();
    const current = getStoredSettings();

    const updated = { ...current, ...newSettings };
    saveStoredSettings(updated);

    return NextResponse.json({ success: true, settings: updated, message: 'تم حفظ الإعدادات بنجاح' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في حفظ الإعدادات' }, { status: 500 });
  }
}
