
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Eye, EyeOff, AlertTriangle, Key, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyType: "production" | "test";
  onKeyGenerated: (key: string, expiresAt: string) => void;
}

export const ApiKeyGenerationModal = ({ isOpen, onClose, keyType, onKeyGenerated }: ApiKeyGenerationModalProps) => {
  const [step, setStep] = useState<"confirm" | "generating" | "generated">("confirm");
  const [generatedKey, setGeneratedKey] = useState("");
  const [keyVisible, setKeyVisible] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const { toast } = useToast();

  const generateApiKey = () => {
    setStep("generating");
    
    // Simulate API key generation
    setTimeout(() => {
      const prefix = keyType === "production" ? "sk_live_" : "sk_test_";
      const randomKey = prefix + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
      const expiration = new Date();
      expiration.setFullYear(expiration.getFullYear() + 1);
      
      setGeneratedKey(randomKey);
      setExpiresAt(expiration.toISOString().split('T')[0]);
      setStep("generated");
      
      // Call parent callback
      onKeyGenerated(randomKey, expiration.toISOString().split('T')[0]);
    }, 2000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedKey);
      toast({
        title: "API Key Copied",
        description: "The API key has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy the API key. Please copy it manually.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setStep("confirm");
    setGeneratedKey("");
    setKeyVisible(false);
    setKeyName("");
    setExpiresAt("");
    onClose();
  };

  const renderConfirmStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          <Key className="w-5 h-5" />
          <span>Generate {keyType === "production" ? "Production" : "Test"} API Key</span>
        </DialogTitle>
        <DialogDescription>
          {keyType === "production" 
            ? "This will generate a new production API key for live data submissions."
            : "This will generate a new test API key for development and testing."
          }
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <Label htmlFor="keyName">Key Name (Optional)</Label>
          <Input
            id="keyName"
            placeholder={`${keyType === "production" ? "Production" : "Test"} API Key`}
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
          />
        </div>

        {keyType === "production" && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Security Warning:</strong> This API key will have access to live data. 
              Store it securely and never share it publicly.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={handleClose}>Cancel</Button>
        <Button onClick={generateApiKey} className="bg-ds-primary hover:bg-ds-primary-dark">
          Generate API Key
        </Button>
      </DialogFooter>
    </>
  );

  const renderGeneratingStep = () => (
    <>
      <DialogHeader>
        <DialogTitle>Generating API Key...</DialogTitle>
        <DialogDescription>
          Please wait while we generate your secure API key.
        </DialogDescription>
      </DialogHeader>

      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ds-primary"></div>
      </div>
    </>
  );

  const renderGeneratedStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>API Key Generated Successfully</span>
        </DialogTitle>
        <DialogDescription>
          Your API key has been generated. Copy it now as it won't be shown again.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> Copy this API key now. For security reasons, 
            it cannot be retrieved again after closing this dialog.
          </AlertDescription>
        </Alert>

        <div>
          <Label>Generated API Key</Label>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex-1 relative">
              <Input
                value={keyVisible ? generatedKey : "•".repeat(generatedKey.length)}
                readOnly
                className="font-mono text-sm pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setKeyVisible(!keyVisible)}
              >
                {keyVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <Label className="text-xs text-ds-text-secondary">Type</Label>
            <p className="capitalize">{keyType}</p>
          </div>
          <div>
            <Label className="text-xs text-ds-text-secondary">Expires</Label>
            <p>{expiresAt}</p>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button onClick={handleClose} className="bg-ds-primary hover:bg-ds-primary-dark">
          Done
        </Button>
      </DialogFooter>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        {step === "confirm" && renderConfirmStep()}
        {step === "generating" && renderGeneratingStep()}
        {step === "generated" && renderGeneratedStep()}
      </DialogContent>
    </Dialog>
  );
};
