import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import CompanyCard from "@/components/CompanyCard";
import CompanyModal from "@/components/CompanyModal";
import FilterBar from "@/components/FilterBar";
import { Company } from "@shared/schema";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartBarIcon } from "lucide-react";

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [filter, setFilter] = useState<string | undefined>();
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<Company[]>({
    queryKey: ["/api/companies", filter],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        limit: "10"
      });
      if (filter) params.set("status", filter);
      const response = await fetch(`/api/companies?${params}`);
      const data = await response.json();
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined;
    }
  });

  if (inView && !isLoading && hasNextPage) {
    fetchNextPage();
  }

  const companies = data?.pages.flat() ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-primary/5">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary text-white">
              <ChartBarIcon className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl">MarketLens</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Market Intelligence
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Find the right companies, at the right time -- without the guesswork
          </motion.p>
        </motion.div>

        <FilterBar currentFilter={filter} onFilterChange={setFilter} />

        <div className="space-y-6 mt-12">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-xl" />
            ))
          ) : (
            companies.map((company: Company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onClick={() => setSelectedCompany(company)}
              />
            ))
          )}
        </div>

        <div ref={ref} className="h-10" />
      </main>
      <CompanyModal
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </div>
  );
}