import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, RefreshCw, Database } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { type Law } from "@shared/schema";

const filterOptions = [
  { label: "All Laws", value: "" },
  { label: "USA Current", value: "usa-current", country: "United States", status: "current" },
  { label: "USA Proposed", value: "usa-proposed", country: "United States", status: "proposed" },
  { label: "India Current", value: "india-current", country: "India", status: "current" },
  { label: "India Proposed", value: "india-proposed", country: "India", status: "proposed" },
];

export function LawDatabase() {
  const [activeFilter, setActiveFilter] = useState("");

  const currentFilter = filterOptions.find(f => f.value === activeFilter);

  const { data: laws = [], isLoading, error, refetch } = useQuery<Law[]>({
    queryKey: ["/api/laws", currentFilter?.country, currentFilter?.status],
    enabled: true,
  });

  const getCountryBadgeColor = (country: string) => {
    return country === "United States" 
      ? "bg-trust-blue text-white" 
      : "bg-orange-500 text-white";
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "current" 
      ? "bg-legal-green text-white" 
      : "bg-warning-amber text-white";
  };

  const getCategoryBadgeColor = () => {
    return "bg-accent-purple text-white";
  };

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "Unknown";
    return new Date(date).toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long" 
    });
  };

  return (
    <section id="laws" className="mb-16">
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-trust-blue mb-4" data-testid="text-law-database-title">
                Law Database
              </h2>
              <p className="text-gray-600 text-lg" data-testid="text-law-database-description">
                Browse current and proposed legislation from the USA and India
              </p>
            </div>
            <div className="text-sm text-gray-500">
              <RefreshCw className="inline mr-1 h-4 w-4" />
              Last updated: <span data-testid="text-last-updated">March 15, 2024</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => setActiveFilter(option.value)}
                variant={activeFilter === option.value ? "default" : "outline"}
                className={
                  activeFilter === option.value 
                    ? "bg-trust-blue text-white" 
                    : "bg-gray-100 hover:bg-gray-200 text-dark-text"
                }
                data-testid={`button-filter-${option.value || 'all'}`}
              >
                {option.label}
              </Button>
            ))}
          </div>

          {isLoading && (
            <div className="text-center py-12">
              <LoadingSpinner size="lg" className="mx-auto mb-4" />
              <p className="text-gray-600" data-testid="text-loading-laws">Loading laws...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <Database className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <p className="text-red-600 mb-4" data-testid="text-error-loading">
                Failed to load laws. Please try again.
              </p>
              <Button onClick={() => refetch()} variant="outline" data-testid="button-retry">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !error && laws.length === 0 && (
            <div className="text-center py-12">
              <Database className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <p className="text-gray-600" data-testid="text-no-laws">
                No laws found matching the current filter.
              </p>
            </div>
          )}

          {!isLoading && !error && laws.length > 0 && (
            <div className="space-y-4">
              {laws.map((law) => (
                <Card 
                  key={law.id} 
                  className="border border-gray-200 hover:border-trust-blue transition-colors"
                  data-testid={`card-law-${law.id}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={getCountryBadgeColor(law.country)} data-testid={`badge-country-${law.id}`}>
                            {law.country === "United States" ? "USA" : law.country}
                          </Badge>
                          <Badge className={getStatusBadgeColor(law.status)} data-testid={`badge-status-${law.id}`}>
                            {law.status === "current" ? "Current" : "Proposed"}
                          </Badge>
                          <Badge className={getCategoryBadgeColor()} data-testid={`badge-category-${law.id}`}>
                            {law.category}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-dark-text mb-2" data-testid={`text-law-title-${law.id}`}>
                          {law.title}
                        </h3>
                      </div>
                      {law.sourceUrl && law.sourceUrl !== "#" && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          asChild
                          data-testid={`button-external-link-${law.id}`}
                        >
                          <a 
                            href={law.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-trust-blue hover:text-blue-800 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4" data-testid={`text-law-description-${law.id}`}>
                      {law.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span data-testid={`text-law-date-${law.id}`}>
                        {law.status === "current" ? "Last updated: " : "Proposed: "}
                        {formatDate(law.lastUpdated)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && !error && laws.length >= 8 && (
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                className="bg-gray-100 hover:bg-gray-200 text-dark-text"
                data-testid="button-load-more"
              >
                <Database className="mr-2 h-4 w-4" />
                Load More Laws
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
