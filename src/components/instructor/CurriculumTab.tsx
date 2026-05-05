'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CurriculumTabProps {
  course: any;
  onSuccess: () => void;
}

export function CurriculumTab({ course, onSuccess }: CurriculumTabProps) {
  const sections = course.sections || [];
  const totalLectures = sections.reduce((sum: number, s: any) => sum + (s.lectures?.length || 0), 0);

  return (
    <Card className="p-8 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Course Curriculum</h3>
        <p className="text-sm text-muted-foreground">
          {sections.length} sections • {totalLectures} lectures
        </p>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {sections.length > 0 ? (
          sections.map((section: any, idx: number) => (
            <div key={section.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">
                  {idx + 1}. {section.title}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {section.lectures?.length || 0} lectures
                </span>
              </div>

              {/* Lectures */}
              {section.lectures && section.lectures.length > 0 && (
                <div className="pl-4 space-y-2 border-l border-muted-foreground/30">
                  {section.lectures.map((lecture: any, lectureIdx: number) => (
                    <div key={lecture.id} className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">
                        {lectureIdx + 1}. {lecture.title}
                      </span>
                      {lecture.isPreview && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                          Preview
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Add Lecture */}
              <Button variant="outline" size="sm" className="w-full text-xs">
                <Plus className="h-3 w-3 mr-1" />
                Add Lecture
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No sections yet. Add your first section to start building your course.</p>
          </div>
        )}
      </div>

      {/* Add Section Button */}
      <Button className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Section
      </Button>
    </Card>
  );
}
