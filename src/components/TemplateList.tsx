
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Copy, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  questions: any[];
  createdAt: string;
  usageCount: number;
}

interface TemplateListProps {
  templates: Template[];
  onEdit: (template: Template) => void;
  onDelete: (templateId: string) => void;
  onDuplicate: (template: Template) => void;
  onPreview: (template: Template) => void;
}

export function TemplateList({ templates, onEdit, onDelete, onDuplicate, onPreview }: TemplateListProps) {
  const { toast } = useToast();

  const handleDelete = (templateId: string, templateName: string) => {
    if (window.confirm(`Are you sure you want to delete "${templateName}"?`)) {
      onDelete(templateId);
      toast({
        title: "Template Deleted",
        description: `"${templateName}" has been deleted successfully.`
      });
    }
  };

  const handleDuplicate = (template: Template) => {
    onDuplicate(template);
    toast({
      title: "Template Duplicated",
      description: `"${template.name}" has been duplicated successfully.`
    });
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

  if (templates.length === 0) {
    return (
      <Card className="border-ds-border bg-white">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-ds-text-primary mb-2">No Templates Created</h3>
            <p className="text-sm text-ds-text-secondary mb-4">
              Create your first survey template to get started
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <Card key={template.id} className="border-ds-border bg-white hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <CardTitle className="text-ds-text-primary">{template.name}</CardTitle>
                  {template.category && (
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category.replace('-', ' ')}
                    </Badge>
                  )}
                </div>
                {template.description && (
                  <p className="text-sm text-ds-text-secondary">{template.description}</p>
                )}
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPreview(template)}
                  title="Preview Template"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(template)}
                  title="Edit Template"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDuplicate(template)}
                  title="Duplicate Template"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(template.id, template.name)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Template"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center text-sm text-ds-text-secondary">
              <div className="flex items-center space-x-4">
                <span>{template.questions.length} questions</span>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Used {template.usageCount} times</span>
                </div>
              </div>
              <span>Created {new Date(template.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
