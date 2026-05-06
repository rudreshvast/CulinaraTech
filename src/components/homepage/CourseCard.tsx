'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth.store';
import { LoginRequiredModal } from '@/components/auth/LoginRequiredModal';
import { PaymentModal } from '@/components/modals/PaymentModal';
import { Course } from '@/lib/data';

interface CourseCardProps {
  course: Course;
}

const badgeColors: Record<string, { bg: string; text: string }> = {
  Hot: { bg: 'bg-red-100', text: 'text-red-700' },
  Popular: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Trending: { bg: 'bg-purple-100', text: 'text-purple-700' },
  New: { bg: 'bg-green-100', text: 'text-green-700' },
  Quick: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  Expert: { bg: 'bg-orange-100', text: 'text-orange-700' },
  Premium: { bg: 'bg-pink-100', text: 'text-pink-700' },
};

const categoryColors: Record<string, string> = {
  'Dairy Tech': 'bg-blue-100 text-blue-700',
  'Food Safety': 'bg-green-100 text-green-700',
  'Baked Goods': 'bg-yellow-100 text-yellow-700',
  Beverages: 'bg-purple-100 text-purple-700',
  'Protein Processing': 'bg-red-100 text-red-700',
  Packaging: 'bg-gray-100 text-gray-700',
  'Oils & Fats': 'bg-orange-100 text-orange-700',
  'Spices & Condiments': 'bg-amber-100 text-amber-700',
  'Cold Chain': 'bg-cyan-100 text-cyan-700',
  'Health Foods': 'bg-pink-100 text-pink-700',
};

export function CourseCard({ course }: CourseCardProps) {
  const { isAuthenticated } = useAuthStore();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const badgeColor = course.badge ? badgeColors[course.badge] : null;
  const categoryColor = categoryColors[course.category] || 'bg-gray-100 text-gray-700';

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setLoginModalOpen(true);
    } else {
      setPaymentModalOpen(true);
    }
  };

  return (
    <>
      <Link href={`/courses`} className="flex-shrink-0 w-60">
        <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition group h-96 flex flex-col">
          {/* Image Container */}
          <div className="relative h-1/3 overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition"
            />
            {course.badge && (
              <div className={`absolute top-3 left-3 ${badgeColor?.bg} ${badgeColor?.text} text-xs font-semibold px-3 py-1 rounded-full`}>
                {course.badge}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            {/* Category */}
            <div className={`inline-block ${categoryColor} text-xs font-semibold px-2 py-1 rounded mb-3`}>
              {course.category}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-3 group-hover:text-primary-500 transition">
              {course.title}
            </h3>

            {/* Instructor */}
            <div className="flex items-center gap-2 mb-3 mt-auto">
              <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                <Image src={course.instructor.picture} alt={course.instructor.name} fill className="object-cover" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-foreground line-clamp-1">{course.instructor.name}</p>
                <p className="text-muted-foreground">Instructor</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-foreground">
                {course.instructor.rating} ({course.instructor.reviews.toLocaleString()})
              </span>
            </div>

            {/* Footer Row */}
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-secondary-600">{course.price}</span>
                {course.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">{course.originalPrice}</span>
                )}
              </div>
              <button
                onClick={handleEnrollClick}
                className="bg-primary hover:bg-primary-600 text-primary-foreground text-xs font-semibold px-2 py-1 rounded transition"
              >
                Enroll
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Modals */}
      <LoginRequiredModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        title="Login Required"
        description="Please login to your account to enroll in courses"
      />
      <PaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        courseTitle={course.title}
        price={course.price}
        instructor={course.instructor.name}
        onProceed={() => {
          console.log('Payment proceeded for course:', course.title);
          setPaymentModalOpen(false);
        }}
      />
    </>
  );
}
