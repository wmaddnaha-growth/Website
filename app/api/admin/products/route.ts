import { NextResponse } from 'next/server';
import { getStoredProducts, saveStoredProducts } from '@/lib/store';
import { Product } from '@/types';

export async function GET() {
  const products = getStoredProducts();
  return NextResponse.json({ success: true, products });
}

export async function POST(request: Request) {
  try {
    const newProduct: Product = await request.json();
    const products = getStoredProducts();

    if (products.some((p) => p.id === newProduct.id || p.slug === newProduct.slug)) {
      return NextResponse.json(
        { success: false, message: 'منتج بهذا المعرف أو الرابط موجود بالفعل' },
        { status: 400 }
      );
    }

    products.push(newProduct);
    saveStoredProducts(products);

    return NextResponse.json({ success: true, product: newProduct, message: 'تم إضافة المنتج بنجاح' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في إضافة المنتج' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedProduct: Product = await request.json();
    let products = getStoredProducts();

    const index = products.findIndex((p) => p.id === updatedProduct.id);
    if (index === -1) {
      return NextResponse.json({ success: false, message: 'المنتج غير موجود' }, { status: 404 });
    }

    products[index] = updatedProduct;
    saveStoredProducts(products);

    return NextResponse.json({ success: true, product: updatedProduct, message: 'تم تعديل المنتج بنجاح' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في تعديل المنتج' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'يرجى تحديد id للمنتج' }, { status: 400 });
    }

    let products = getStoredProducts();
    products = products.filter((p) => p.id !== id);
    saveStoredProducts(products);

    return NextResponse.json({ success: true, message: 'تم حذف المنتج بنجاح' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في حذف المنتج' }, { status: 500 });
  }
}
