import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleAlert, TriangleAlert, AlertTriangle, CheckCircle, Minus, Plus, ArrowRight, RefreshCw, Search } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { insertLegalAnalysisSchema, type LegalAnalysis } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const countries = [
  "United States",
  "India",
  "Both USA and India"
];

const categories = [
  "Employment & Labor",
  "Business & Corporate", 
  "Immigration",
  "Tax & Finance",
  "Healthcare",
  "Real Estate",
  "Technology & Privacy",
  "Education",
  "Other"
];

export function LegalAnalyzer() {
  const [analysisResult, setAnalysisResult] = useState<LegalAnalysis | null>(null);

  const form = useForm({
    resolver: zodResolver(insertLegalAnalysisSchema),
    defaultValues: {
      country: "",
      category: "",
      situation: ""
    }
  });

  const analysisMutation = useMutation({
    mutationFn: async (data: typeof insertLegalAnalysisSchema._type) => {
      const response = await apiRequest("POST", "/api/legal-analysis", data);
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
    }
  });

  const onSubmit = (data: typeof insertLegalAnalysisSchema._type) => {
    analysisMutation.mutate(data);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    form.reset();
  };

  if (analysisResult) {
    const analysis = analysisResult.analysis as import('@shared/schema').LegalAnalysisResult;
    if (!analysis) return null;

    return (
      <section id="analyzer" className="mb-16">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold text-trust-blue mb-6" data-testid="text-analysis-title">
                Law Lens Analysis
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="text-green-600 text-xl mr-3" />
                      <h4 className="font-semibold text-green-600" data-testid="text-favorable-impacts">
                        Favorable Impacts
                      </h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {analysis.favorableImpacts.map((impact, index) => (
                        <li key={index} className="flex items-start" data-testid={`favorable-impact-${index}`}>
                          <Plus className="text-green-600 mr-2 mt-1 text-xs flex-shrink-0" />
                          <span>{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="text-red-600 text-xl mr-3" />
                      <h4 className="font-semibold text-red-600" data-testid="text-potential-concerns">
                        Potential Concerns
                      </h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {analysis.potentialConcerns.map((concern, index) => (
                        <li key={index} className="flex items-start" data-testid={`potential-concern-${index}`}>
                          <Minus className="text-red-600 mr-2 mt-1 text-xs flex-shrink-0" />
                          <span>{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-50 mb-6">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-dark-text mb-3" data-testid="text-detailed-analysis">
                    Detailed Analysis
                  </h4>
                  <div className="prose prose-sm max-w-none text-gray-700" data-testid="detailed-analysis-content">
                    {analysis.detailedAnalysis.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3">{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-trust-blue mb-3" data-testid="text-recommended-actions">
                    Recommended Actions
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {analysis.recommendedActions.map((action, index) => (
                      <li key={index} className="flex items-start" data-testid={`recommended-action-${index}`}>
                        <ArrowRight className="text-trust-blue mr-2 mt-1 text-xs flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Button 
                onClick={resetAnalysis} 
                variant="outline" 
                className="mt-6"
                data-testid="button-new-analysis"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                New Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (analysisMutation.isPending) {
    return (
      <section id="analyzer" className="mb-16">
        <Card className="shadow-lg">
          <CardContent className="text-center py-12">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-trust-blue mb-2" data-testid="text-analyzing">
              Focusing Your Legal View...
            </h3>
            <p className="text-gray-600" data-testid="text-processing">
              Processing your situation against current and proposed laws
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="analyzer" className="mb-16">
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-trust-blue mb-4" data-testid="text-analyzer-title">
              Law Lens
            </h2>
            <p className="text-gray-600 text-lg" data-testid="text-analyzer-description">
              Describe your situation and focus your view on how current and proposed laws might affect you.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-dark-text">
                        Country/Region
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-country">
                            <SelectValue placeholder="Select country/region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country} data-testid={`option-country-${country.toLowerCase().replace(/\s+/g, '-')}`}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-dark-text">
                        Legal Category
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-category">
                            <SelectValue placeholder="Select legal category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category} data-testid={`option-category-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="situation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-dark-text">
                      Describe Your Situation
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Example: I'm a software engineer working remotely for a US company while living in India. I'm concerned about potential changes to tax laws that might affect my income reporting requirements..."
                        className="resize-none"
                        rows={6}
                        data-testid="textarea-situation"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-sm text-gray-500">
                      Be as specific as possible for more accurate analysis
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Alert className="border-warning-amber/20 bg-warning-amber/10">
                <AlertTriangle className="h-4 w-4 text-warning-amber" />
                <AlertDescription>
                  <div>
                    <h4 className="font-semibold text-warning-amber mb-1">
                      Educational Purposes Only
                    </h4>
                    <p className="text-sm text-gray-700">
                      This analysis is for informational purposes only and should not be considered legal advice. 
                      Always consult with qualified legal professionals for specific legal matters.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>

              {analysisMutation.error && (
                <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription data-testid="text-error-message">
                    {analysisMutation.error instanceof Error 
                      ? analysisMutation.error.message 
                      : "Failed to analyze legal impact. Please try again."}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-trust-blue hover:bg-blue-800 text-white font-semibold"
                disabled={analysisMutation.isPending}
                data-testid="button-analyze"
              >
                <Search className="mr-2 h-4 w-4" />
                Focus Legal View
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
