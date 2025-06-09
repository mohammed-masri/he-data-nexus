
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, Mail, Link, Users, Plus, Trash2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Recipient {
  id: string;
  email: string;
  name: string;
  status: "pending" | "sent" | "responded";
}

interface SurveyData {
  id: string;
  title: string;
  description: string;
  status: "draft" | "active" | "completed";
}

interface SurveySharingModalProps {
  isOpen: boolean;
  onClose: () => void;
  survey: SurveyData | null;
  onSurveyShared: (recipients: Recipient[], shareMethod: string) => void;
}

export const SurveySharingModal = ({ isOpen, onClose, survey, onSurveyShared }: SurveySharingModalProps) => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [newRecipientEmail, setNewRecipientEmail] = useState("");
  const [newRecipientName, setNewRecipientName] = useState("");
  const [shareMethod, setShareMethod] = useState<"email" | "link">("email");
  const [shareMessage, setShareMessage] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const addRecipient = () => {
    if (!newRecipientEmail || !newRecipientName) return;

    const newRecipient: Recipient = {
      id: Date.now().toString(),
      email: newRecipientEmail,
      name: newRecipientName,
      status: "pending"
    };

    setRecipients([...recipients, newRecipient]);
    setNewRecipientEmail("");
    setNewRecipientName("");
  };

  const removeRecipient = (id: string) => {
    setRecipients(recipients.filter(r => r.id !== id));
  };

  const generateShareLink = () => {
    const link = `https://survey.digitalsharjah.ae/survey/${survey?.id || 'demo'}`;
    setShareLink(link);
    return link;
  };

  const handleShare = async () => {
    setIsSharing(true);

    // Simulate sharing process
    setTimeout(() => {
      if (shareMethod === "link") {
        const link = generateShareLink();
        navigator.clipboard.writeText(link);
        toast({
          title: "Share Link Generated",
          description: "Survey link has been copied to your clipboard.",
        });
      } else {
        toast({
          title: "Survey Shared Successfully",
          description: `Survey sent to ${recipients.length} recipients.`,
        });
      }

      onSurveyShared(recipients, shareMethod);
      setIsSharing(false);
      onClose();
    }, 2000);
  };

  if (!survey) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share Survey: {survey.title}</span>
          </DialogTitle>
          <DialogDescription>
            Share this survey with recipients to collect responses.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={shareMethod} onValueChange={(value) => setShareMethod(value as "email" | "link")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email Invitations</span>
            </TabsTrigger>
            <TabsTrigger value="link" className="flex items-center space-x-2">
              <Link className="w-4 h-4" />
              <span>Share Link</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Recipients ({recipients.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="recipientName">Name</Label>
                    <Input
                      id="recipientName"
                      placeholder="Recipient name"
                      value={newRecipientName}
                      onChange={(e) => setNewRecipientName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipientEmail">Email</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="recipientEmail"
                        type="email"
                        placeholder="recipient@example.com"
                        value={newRecipientEmail}
                        onChange={(e) => setNewRecipientEmail(e.target.value)}
                      />
                      <Button onClick={addRecipient} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {recipients.length > 0 && (
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {recipients.map((recipient) => (
                      <div key={recipient.id} className="flex items-center justify-between p-2 border border-ds-border rounded">
                        <div>
                          <p className="font-medium text-sm">{recipient.name}</p>
                          <p className="text-xs text-ds-text-secondary">{recipient.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{recipient.status}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRecipient(recipient.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div>
              <Label htmlFor="shareMessage">Custom Message (Optional)</Label>
              <Textarea
                id="shareMessage"
                placeholder="Add a custom message to your survey invitation..."
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                rows={3}
              />
            </div>
          </TabsContent>

          <TabsContent value="link" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Survey Link</CardTitle>
                <CardDescription>
                  Generate a shareable link that can be distributed through any channel.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button onClick={generateShareLink} variant="outline" className="w-full">
                    Generate Share Link
                  </Button>
                  {shareLink && (
                    <div className="p-3 bg-ds-secondary rounded border">
                      <p className="text-sm font-mono break-all">{shareLink}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSharing}>
            Cancel
          </Button>
          <Button 
            onClick={handleShare} 
            disabled={isSharing || (shareMethod === "email" && recipients.length === 0)}
            className="bg-ds-primary hover:bg-ds-primary-dark"
          >
            {isSharing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sharing...
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 mr-2" />
                Share Survey
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
