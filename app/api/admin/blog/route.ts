import { NextResponse } from 'next/server';
import { getStoredBlog, saveStoredBlog } from '@/lib/store';
import { BlogPost } from '@/types';

export async function GET() {
  const posts = getStoredBlog();
  return NextResponse.json({ success: true, posts });
}

export async function POST(request: Request) {
  try {
    const newPost: BlogPost = await request.json();
    const posts = getStoredBlog();

    if (posts.some((p) => p.slug === newPost.slug)) {
      return NextResponse.json(
        { success: false, message: 'مقال بهذا الرابط موجود بالفعل' },
        { status: 400 }
      );
    }

    posts.unshift(newPost);
    saveStoredBlog(posts);

    return NextResponse.json({ success: true, post: newPost, message: 'تم إضافة المقال بنجاح' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في إضافة المقال' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedPost: BlogPost = await request.json();
    let posts = getStoredBlog();

    const index = posts.findIndex((p) => p.slug === updatedPost.slug);
    if (index === -1) {
      return NextResponse.json({ success: false, message: 'المقال غير موجود' }, { status: 404 });
    }

    posts[index] = updatedPost;
    saveStoredBlog(posts);

    return NextResponse.json({ success: true, post: updatedPost, message: 'تم تعديل المقال بنجاح' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في تعديل المقال' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ success: false, message: 'يرجى تحديد slug للمقال' }, { status: 400 });
    }

    let posts = getStoredBlog();
    posts = posts.filter((p) => p.slug !== slug);
    saveStoredBlog(posts);

    return NextResponse.json({ success: true, message: 'تم حذف المقال بنجاح' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في حذف المقال' }, { status: 500 });
  }
}
