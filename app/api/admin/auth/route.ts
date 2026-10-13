import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true, message: 'تم تسجيل الدخول بنجاح' });
      response.cookies.set('wamaddadnaha_admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    return NextResponse.json(
      { success: false, message: 'كلمة المرور غير صحيحة' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'خطأ في معالجة طلب تسجيل الدخول' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'تم تسجيل الخروج' });
  response.cookies.set('wamaddadnaha_admin_session', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}
