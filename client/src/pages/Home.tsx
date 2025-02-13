import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import CompanyCard from "@/components/CompanyCard";
import CompanyModal from "@/components/CompanyModal";
import FilterBar from "@/components/FilterBar";
import { Company } from "@shared/schema";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
        >
          Market Intelligence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600 mb-8"
        >
          Find the right companies, at the right time -- without the guesswork
        </motion.p>

        <FilterBar currentFilter={filter} onFilterChange={setFilter} />

        <div className="space-y-4 mt-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
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
      </div>

      <CompanyModal
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </div>
  );
}