
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle } from "lucide-react";

interface Question {
  id: string;
  type: 'text' | 'multiple-choice' | 'rating' | 'yes-no';
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  questions: Question[];
  createdAt: string;
  usageCount: number;
}

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
}

export function TemplatePreviewModal({ isOpen, onClose, template }: TemplatePreviewModalProps) {
  if (!template) return null;

  const renderQuestionPreview = (question: Question, index: number) => {
    return (
      <Card key={question.id} className="border-ds-border">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-ds-text-primary flex items-center">
                  {index + 1}. {question.title}
                  {question.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </h4>
                {question.description && (
                  <p className="text-sm text-ds-text-secondary mt-1">{question.description}</p>
                )}
              </div>
              <Badge variant="outline" className="text-xs">
                {question.type.replace('-', ' ')}
              </Badge>
            </div>

            <div className="mt-3">
              {question.type === 'text' && (
                <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
                  <span className="text-gray-400 text-sm">Text input field</span>
                </div>
              )}

              {question.type === 'multiple-choice' && question.options && (
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                      <span className="text-sm">{option}</span>
                    </div>
                  ))}
                </div>
              )}

              {question.type === 'rating' && (
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star key={rating} className="w-6 h-6 text-gray-300" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">1-5 scale</span>
                </div>
              )}

              {question.type === 'yes-no' && (
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                    <span className="text-sm">Yes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                    <span className="text-sm">No</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'student-experience': 'bg-blue-100 text-blue-800',
      'academic-quality': 'bg-green-100 text-green-800',
      'institutional-assessment': 'bg-purple-100 text-purple-800',
      'compliance': 'bg-red-100 text-red-800',
      'research': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-ds-text-primary">Template Preview</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="border-b border-ds-border pb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-ds-text-primary">{template.name}</h2>
              {template.category && (
                <Badge className={getCategoryColor(template.category)}>
                  {template.category.replace('-', ' ')}
                </Badge>
              )}
            </div>
            {template.description && (
              <p className="text-ds-text-secondary">{template.description}</p>
            )}
            <div className="flex items-center space-x-4 mt-3 text-sm text-ds-text-secondary">
              <span>{template.questions.length} questions</span>
              <span>Created {new Date(template.createdAt).toLocaleDateString()}</span>
              <span>Used {template.usageCount} times</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-ds-text-primary">Questions Preview</h3>
            {template.questions.map((question, index) => 
              renderQuestionPreview(question, index)
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-ds-border">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="bg-ds-primary hover:bg-ds-primary-dark">
              Use Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
