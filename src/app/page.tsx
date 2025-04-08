import {store} from "@/lib/store";
import {SearchInput} from "@/components/search-input";
import {ProductList} from "@/components/product-list";
import {Product} from "@/types/product";

// Args meaning: this page is a server component, and it will be re-rendered on every url params change (searchParams is a special property of the injected argument object)
export default async function Home({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) 
{
    // get the 'q' parameter from the URL, this page will be re-rendered on every change of the search parameter (search bar input modifies this 'q' parameter)
    const searchTerm = typeof searchParams.q === "string" ? searchParams.q : "";

    const session = store.openSession();

    let products: Product[];
    
    // search the products using actual 'q' parameter from the URL
    if (searchTerm) {
        // querying the database using vector search with a custom term
        // we don't need to generate embedding for the search term - it's done automatically by the pre-configured AI ETL! 
        // we don't need to care about generating, storing, using, or even caching it!
        const rawQuery = `
            from Products
            where vector.search(embedding.text(Name, ai.task('openai-large')), $searchTerm, 0.60)
        `;

        products = await session.advanced
            .rawQuery<Product>(rawQuery)
            .addParameter("searchTerm", searchTerm)
            .waitForNonStaleResults()
            .all();
    } else {
        products = await session
            .query<Product>({ collection: "Products" })
            .all();
    }

    const parsedProducts = JSON.parse(JSON.stringify(products));

    // render header, search input, and product list filled with our results
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-center mb-8">Multi-language cravings explorer</h1>
                
                <div className="max-w-3xl mx-auto">
                    <SearchInput/>
                </div>

                <div className="mt-12">
                    <ProductList
                        products={parsedProducts}
                        isLoading={false}
                    />
                </div>
            </div>
        </main>
    );
}
