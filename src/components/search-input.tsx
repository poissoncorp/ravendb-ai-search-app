"use client";

import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // create a new state variable within this component, to hold the search term, with default value from the URL
    const [queryState, setQueryState] = useState(searchParams.get("q") || "");

    // on queryState change, update the URL in the browser without refreshing the page
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (queryState) {
            params.set("q", queryState);
        } else {
            params.delete("q");
        }

        router.replace(`?${params.toString()}`);
    }, [queryState]);

    // function to bind to the onChange input field - this will update the state variable 
    function handleSearch(term: string) {
        setQueryState(term);
    }

    // render the input field
    return (
        <div className="relative flex items-center">
            <Input
                type="text"
                placeholder="Search for products..."
                className="w-full h-14 pl-12 pr-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                value={queryState}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={24}/>
            </div>
        </div>
    );
}
