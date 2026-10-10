function ProductsLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-[1200px] px-3 py-6 sm:px-5 sm:py-8 md:px-6">
        {/* Heading Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-36 animate-pulse rounded-lg bg-gray-200 sm:h-10" />

          <div className="mt-3 h-4 max-w-md animate-pulse rounded bg-gray-200" />

          <div className="mt-4 h-9 w-44 animate-pulse rounded-full bg-gray-200" />
        </div>

        {/* Product Cards Skeleton */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-4 sm:rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-gray-200" />

                <div className="flex-1">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                  <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-gray-100" />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />

                  <div className="mt-2 h-6 w-24 animate-pulse rounded bg-gray-200" />
                </div>

                <div className="h-8 w-16 animate-pulse rounded-lg bg-green-50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
export default ProductsLoading