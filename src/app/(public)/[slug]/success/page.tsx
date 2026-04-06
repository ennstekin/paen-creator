import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Teşekkürler!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Formunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
