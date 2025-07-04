// ✅ Server Component (no 'use client')
import Link from "next/link";
import Image from "next/image";
import { getAllCategories } from "@/services/category";

export default async function CategoriesPage() {
  const res = await getAllCategories();
  const categories = res?.data?.categories || [];

  if (!categories.length) return null;

  return (
    <section className="py-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="items-center justify-between border-b-4 border-[#003459] inline-block pb-2 mb-4">
          <h2 className="text-xl font-semibold">Explore Categories</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              href={`/categories/${cat.slug}`}
              key={cat._id}
              className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-md group bg-white dark:bg-zinc-900 transition block"
            >
              <div className="w-full h-40 relative">
                <Image
                  src={cat.image?.url || "/placeholder.jpg"}
                  alt={cat.image?.alt || cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform rounded-t-md"
                />
              </div>
              <div className="p-2 text-center">
                <p className="text-sm font-medium group-hover:text-primary">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
