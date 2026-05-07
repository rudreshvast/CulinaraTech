'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Workshop } from '@/lib/data';

interface WorkshopCardProps {
  workshop: Workshop;
}

const modeColors: Record<string, string> = {
  Online: 'bg-blue-100 text-blue-700',
  Offline: 'bg-purple-100 text-purple-700',
  Hybrid: 'bg-green-100 text-green-700',
};

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const modeColor = modeColors[workshop.mode] || 'bg-gray-100 text-gray-700';
  const workshopDate = new Date(workshop.date);
  const endDate = new Date(workshop.endDate);

  return (
    <Link href={`/training`}>
      <div className="flex gap-4 mb-4 bg-background border border-border rounded-lg p-4 pb-5 hover:border-primary-200 hover:shadow-md transition group">
        {/* Image */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image src={workshop.image} alt={workshop.title} fill className="object-cover rounded-lg" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h4 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary-500 transition">
            {workshop.title}
          </h4>

          {/* Organizer */}
          <p className="text-sm py-1 text-muted-foreground mb-2">{workshop.organizer}</p>

          {/* Date and Fee */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Clock className="w-3 h-3" />
            <span>
              {workshopDate.toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
              })}
              –
              {endDate.toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* Fee and Seats */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-semibold text-foreground">₹{workshop.fee}</span>
              {workshop.earlyBirdFee && (
                <span className="text-xs text-secondary-600 font-semibold">₹{workshop.earlyBirdFee} early</span>
              )}
            </div>
            {/* {workshop.seatsLeft <= 10 && (
              <span className="text-xs font-semibold text-destructive">Only {workshop.seatsLeft} left</span>
            )} */}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-end justify-between">
           <span className={`text-xs font-semibold ${modeColor} px-2 py-1 rounded`}>{workshop.mode}</span>
        </div>
      </div>
    </Link>
  );
}
