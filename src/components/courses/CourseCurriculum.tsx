'use client';

import { Play, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { SectionWithLectures } from '@/lib/types';

interface CourseCurriculumProps {
  sections: SectionWithLectures[];
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function CourseCurriculum({ sections }: CourseCurriculumProps) {
  const totalLectures = sections.reduce((sum, s) => sum + s.lectures.length, 0);
  const totalDuration = sections.reduce(
    (sum, s) => sum + s.lectures.reduce((lsum, l) => lsum + (l.duration || 0), 0),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Course content</h2>
        <p className="text-sm text-muted-foreground">
          {sections.length} sections • {totalLectures} lectures • {formatDuration(totalDuration)} total hours
        </p>
      </div>

      <Accordion type="single" collapsible defaultValue={sections[0]?.id} className="space-y-3">
        {sections.map((section) => {
          const sectionDuration = section.lectures.reduce((sum, l) => sum + (l.duration || 0), 0);

          return (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="border border-border rounded-lg px-4 data-[state=open]:bg-muted"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center justify-between gap-4 flex-1 text-left">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-foreground">
                      {section.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {section.lectures.length} lectures • {formatDuration(sectionDuration)}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 space-y-2">
                {section.lectures.map((lecture, index) => (
                  <div
                    key={lecture.id}
                    className={`flex items-center justify-between p-3 rounded transition-colors ${
                      lecture.isPreview
                        ? 'bg-card hover:bg-muted cursor-pointer'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {lecture.isPreview ? (
                        <Play className="h-4 w-4 flex-shrink-0 text-primary" />
                      ) : (
                        <Lock className="h-4 w-4 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {String(index + 1).padStart(2, '0')}. {lecture.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {lecture.isPreview && (
                        <Badge variant="secondary" className="text-xs">
                          FREE PREVIEW
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatDuration(lecture.duration || 0)}
                      </span>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
