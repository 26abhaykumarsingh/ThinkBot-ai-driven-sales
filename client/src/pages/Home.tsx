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
    <div className="min-h-screen relative">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-blue-50 to-primary/10 animate-gradient-slow -z-10" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwwLDAsMC4wMykiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==')] opacity-30 -z-10" />

      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-8">
          <div className="flex items-center gap-3 py-4">
            <motion.div 
              className="p-2 rounded-xl bg-primary text-white"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChartBarIcon className="w-6 h-6" />
            </motion.div>
            <span className="font-bold text-xl">MarketLens</span>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent">
            Market Intelligence
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
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