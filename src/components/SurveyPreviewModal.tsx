
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Calendar, 
  User, 
  Eye, 
  Star,
  CheckSquare,
  Circle,
  Type
} from "lucide-react";

interface Question {
  id: string;
  type: 'text' | 'multiple-choice' | 'rating' | 'yes-no' | 'textarea';
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
}

interface Survey {
  id: string;
  title: string;
  type: "GDS" | "ESS" | "SES";
  description: string;
  deadline: string;
  createdBy: string;
  receivedDate: string;
  questions?: Question[];
}

interface SurveyPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  survey: Survey | null;
}

// Mock survey questions based on survey type
const getSurveyQuestions = (surveyType: string): Question[] => {
  const gdsQuestions: Question[] = [
    {
      id: "1",
      type: "multiple-choice",
      title: "What is your current employment status?",
      description: "Please select your current employment situation",
      required: true,
      options: ["Employed full-time", "Employed part-time", "Self-employed", "Unemployed - seeking work", "Unemployed - not seeking work", "Continuing education"]
    },
    {
      id: "2",
      type: "text",
      title: "What is your current job title?",
      description: "If employed, please provide your current job title",
      required: false
    },
    {
      id: "3",
      type: "rating",
      title: "How relevant is your current job to your field of study?",
      description: "Rate the relevance on a scale of 1-5",
      required: true
    },
    {
      id: "4",
      type: "textarea",
      title: "What skills from your education do you use most in your current role?",
      description: "Please describe the key skills and knowledge you apply",
      required: false
    }
  ];

  const essQuestions: Question[] = [
    {
      id: "1",
      type: "rating",
      title: "How satisfied are you with the overall quality of graduates from our institution?",
      description: "Rate your satisfaction on a scale of 1-5",
      required: true
    },
    {
      id: "2",
      type: "multiple-choice",
      title: "Which skills do our graduates demonstrate most effectively?",
      description: "Select all that apply",
      required: true,
      options: ["Technical expertise", "Communication skills", "Problem-solving", "Teamwork", "Leadership", "Adaptability"]
    },
    {
      id: "3",
      type: "textarea",
      title: "What areas would you like to see improved in our graduates?",
      description: "Please provide specific feedback for curriculum enhancement",
      required: false
    }
  ];

  const sesQuestions: Question[] = [
    {
      id: "1",
      type: "rating",
      title: "How satisfied are you with the quality of teaching at the institution?",
      description: "Rate your satisfaction on a scale of 1-5",
      required: true
    },
    {
      id: "2",
      type: "rating",
      title: "How would you rate the library and learning resources?",
      description: "Rate the quality and accessibility of resources",
      required: true
    },
    {
      id: "3",
      type: "yes-no",
      title: "Would you recommend this institution to other students?",
      description: "Based on your overall experience",
      required: true
    },
    {
      id: "4",
      type: "textarea",
      title: "What improvements would enhance your student experience?",
      description: "Please share your suggestions for institutional improvement",
      required: false
    }
  ];

  switch (surveyType) {
    case "GDS": return gdsQuestions;
    case "ESS": return essQuestions;
    case "SES": return sesQuestions;
    default: return gdsQuestions;
  }
};

export const SurveyPreviewModal = ({ isOpen, onClose, survey }: SurveyPreviewModalProps) => {
  if (!survey) return null;

  const questions = survey.questions || getSurveyQuestions(survey.type);

  const renderQuestionPreview = (question: Question, index: number) => {
    const getQuestionIcon = (type: string) => {
      switch (type) {
        case 'text': return <Type className="w-4 h-4" />;
        case 'textarea': return <FileText className="w-4 h-4" />;
        case 'multiple-choice': return <CheckSquare className="w-4 h-4" />;
        case 'rating': return <Star className="w-4 h-4" />;
        case 'yes-no': return <Circle className="w-4 h-4" />;
        default: return <Type className="w-4 h-4" />;
      }
    };

    return (
      <Card key={question.id} className="border-ds-border">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-ds-text-secondary">Q{index + 1}</span>
                  {getQuestionIcon(question.type)}
                  <Badge variant="outline" className="text-xs">
                    {question.type.replace('-', ' ')}
                  </Badge>
                  {question.required && (
                    <Badge variant="destructive" className="text-xs">Required</Badge>
                  )}
                </div>
                <h4 className="font-medium text-ds-text-primary">
                  {question.title}
                </h4>
                {question.description && (
                  <p className="text-sm text-ds-text-secondary mt-1">{question.description}</p>
                )}
              </div>
            </div>

            <div className="mt-4 bg-ds-bg-grey-light rounded-lg p-4">
              {question.type === 'text' && (
                <div className="border border-gray-300 rounded-md p-3 bg-white">
                  <span className="text-gray-400 text-sm">Text input field</span>
                </div>
              )}

              {question.type === 'textarea' && (
                <div className="border border-gray-300 rounded-md p-3 bg-white min-h-[80px]">
                  <span className="text-gray-400 text-sm">Long text input area</span>
                </div>
              )}

              {question.type === 'multiple-choice' && question.options && (
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <div className="w-4 h-4 border border-gray-300 rounded-full bg-white"></div>
                      <span className="text-sm">{option}</span>
                    </div>
                  ))}
                </div>
              )}

              {question.type === 'rating' && (
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star key={rating} className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">1 (Poor) - 5 (Excellent)</span>
                </div>
              )}

              {question.type === 'yes-no' && (
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-gray-300 rounded-full bg-white"></div>
                    <span className="text-sm">Yes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-gray-300 rounded-full bg-white"></div>
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

  const getSurveyTypeColor = (type: string) => {
    switch (type) {
      case "GDS": return "bg-purple-100 text-purple-800 border-purple-300";
      case "ESS": return "bg-blue-100 text-blue-800 border-blue-300";
      case "SES": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Survey Preview</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Survey Header */}
          <Card className="border-ds-border">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Badge className={getSurveyTypeColor(survey.type)}>
                    {survey.type}
                  </Badge>
                  <h2 className="text-xl font-bold text-ds-text-primary">{survey.title}</h2>
                </div>
              </div>
              <p className="text-ds-text-secondary">{survey.description}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-ds-text-muted" />
                  <div>
                    <span className="font-medium text-ds-text-secondary">Created by:</span>
                    <p className="text-ds-text-primary">{survey.createdBy}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-ds-text-muted" />
                  <div>
                    <span className="font-medium text-ds-text-secondary">Deadline:</span>
                    <p className="text-ds-text-primary">{new Date(survey.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-ds-text-muted" />
                  <div>
                    <span className="font-medium text-ds-text-secondary">Questions:</span>
                    <p className="text-ds-text-primary">{questions.length} total</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Survey Questions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-ds-text-primary">Survey Questions</h3>
            <div className="space-y-4">
              {questions.map((question, index) => 
                renderQuestionPreview(question, index)
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-ds-border">
            <Button variant="outline" onClick={onClose}>
              Close Preview
            </Button>
            <Button className="bg-ds-primary hover:bg-ds-primary-dark">
              Proceed to Distribution
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
