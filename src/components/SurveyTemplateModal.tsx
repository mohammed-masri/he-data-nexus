
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  type: 'text' | 'multiple-choice' | 'rating' | 'yes-no';
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
}

interface SurveyTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: any) => void;
}

export function SurveyTemplateModal({ isOpen, onClose, onSave }: SurveyTemplateModalProps) {
  const { toast } = useToast();
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: 'text',
      title: '',
      required: false
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const newOptions = [...(question.options || []), ''];
      updateQuestion(questionId, 'options', newOptions);
    }
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, 'options', newOptions);
    }
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex);
      updateQuestion(questionId, 'options', newOptions);
    }
  };

  const handleSave = () => {
    if (!templateName.trim()) {
      toast({
        title: "Error",
        description: "Template name is required",
        variant: "destructive"
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "Error", 
        description: "At least one question is required",
        variant: "destructive"
      });
      return;
    }

    const template = {
      id: Date.now().toString(),
      name: templateName,
      description: templateDescription,
      category,
      questions,
      createdAt: new Date().toISOString(),
      usageCount: 0
    };

    onSave(template);
    
    // Reset form
    setTemplateName("");
    setTemplateDescription("");
    setCategory("");
    setQuestions([]);
    
    toast({
      title: "Success",
      description: "Template created successfully"
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-ds-text-primary">Create Survey Template</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="template-name">Template Name *</Label>
              <Input
                id="template-name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g., Student Satisfaction Survey"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student-experience">Student Experience</SelectItem>
                  <SelectItem value="academic-quality">Academic Quality</SelectItem>
                  <SelectItem value="institutional-assessment">Institutional Assessment</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="template-description">Description</Label>
            <Textarea
              id="template-description"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              placeholder="Describe the purpose and scope of this template..."
              rows={3}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-ds-text-primary">Questions</h3>
              <Button onClick={addQuestion} size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Question
              </Button>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => (
                <Card key={question.id} className="border-ds-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-ds-text-secondary">Question {index + 1}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(question.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Question Type</Label>
                      <Select
                        value={question.type}
                        onValueChange={(value) => updateQuestion(question.id, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text Input</SelectItem>
                          <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                          <SelectItem value="rating">Rating Scale</SelectItem>
                          <SelectItem value="yes-no">Yes/No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Question Title *</Label>
                      <Input
                        value={question.title}
                        onChange={(e) => updateQuestion(question.id, 'title', e.target.value)}
                        placeholder="Enter your question..."
                      />
                    </div>

                    <div>
                      <Label>Description (Optional)</Label>
                      <Input
                        value={question.description || ''}
                        onChange={(e) => updateQuestion(question.id, 'description', e.target.value)}
                        placeholder="Additional context or instructions..."
                      />
                    </div>

                    {question.type === 'multiple-choice' && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label>Options</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addOption(question.id)}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Option
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {(question.options || []).map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                              <Input
                                value={option}
                                onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                placeholder={`Option ${optionIndex + 1}`}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeOption(question.id, optionIndex)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`required-${question.id}`}
                        checked={question.required}
                        onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={`required-${question.id}`}>Required question</Label>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-ds-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-ds-primary hover:bg-ds-primary-dark">
              Create Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
