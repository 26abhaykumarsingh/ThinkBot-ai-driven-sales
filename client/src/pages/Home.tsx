import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import CompanyCard from "@/components/CompanyCard";
import CompanyModal from "@/components/CompanyModal";
import FilterBar from "@/components/FilterBar";
import { Company } from "@shared/schema";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartBarIcon } from "lucide-react";
import { Globe } from "@/components/globe";

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filter, setFilter] = useState();
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["companies", filter],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const classification = filter ? [filter] : [];
      const response = await fetch("https://0l13m1sz3b.execute-api.us-east-1.amazonaws.com/v1/getCompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classification: classification,
          limit: 10,
          offset: pageParam * 10,
        }),
      });
      const data = await response.json();
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      // Check if the last page has companies data and if it's a full page
      if (!lastPage?.body?.companies || lastPage.body.companies.length < 10) {
        return undefined;
      }
      return allPages.length;
    }
  });

  // Debugging logs
  // console.log("In view:", inView);
  // console.log("Is loading:", isLoading);
  // console.log("Has next page:", hasNextPage);

  // if (inView && !isLoading && hasNextPage) {
  //   console.log("Fetching next page..."); // Log when fetching
  //   fetchNextPage();
  // }

  // const companies = data?.pages.flat() ?? [];

    // Effect to trigger next page fetch
    React.useEffect(() => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  
    // Flatten and process all pages of companies
    const allCompanies = data?.pages.reduce((acc, page) => {
      if (page?.body?.companies) {
        return [...acc, ...page.body.companies];
      }
      return acc;
    }, []) ?? [];

  return (
    <div className="min-h-screen relative">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-[-1] flex items-center justify-center bg-gradient-to-r from-[#EBF5F7] via-[#FFFFFF] to-[#EBF5F7]">
        <Globe className="w-full h-full object-cover mt-20" />
      </div>

      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <main className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-6xl font-bold mb-3 bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent leading-tight">
            Market Intelligence
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Find the right companies, at the right time <b><i>without the guesswork</i></b>
          </motion.p>
        </motion.div>

        <FilterBar currentFilter={filter} onFilterChange={setFilter} />

        <div className="mt-12 space-y-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-xl" />
            ))
          ) : (
            allCompanies.map((company) => (
              <CompanyCard
                key={company._id}
                company={company}
                onClick={() => setSelectedCompany(company)}
              />
            ))
          )}
           {/* Loading indicator for next page */}
           {isFetchingNextPage && (
            <Skeleton className="h-40 w-full rounded-xl" />
          )}

          {/* Intersection observer target */}
          <div ref={ref} className="h-20 mb-8" />
        </div>

        {/* <div ref={ref} className="h-10" /> */}
      </main>

      <CompanyModal
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </div>
  );
}