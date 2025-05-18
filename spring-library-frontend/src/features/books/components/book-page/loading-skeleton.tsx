import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => (
  <main className="flex flex-col md:flex-row h-screen p-6 gap-24 2xl:gap-56 py-0 2xl:py-20 bg-white justify-center">
    <section className="md:w-1/3 2xl:w-1/4 h-2/3 2xl:h-1/2 flex justify-center">
      <Skeleton className="w-[250px] h-[350px] rounded-lg" />
    </section>

    <article className="md:w-1/2 2xl:w-1/3 flex flex-col gap-6 overflow-auto">
      <Skeleton className="h-10 w-3/4 mb-4" />
      <Skeleton className="h-6 w-1/2 mb-6" />

      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-24" />
      </div>

      <section className="border-y-1 border-gray-300 py-4">
        <Skeleton className="h-20 w-full" />
      </section>

      <section className="flex flex-wrap justify-between gap-4 mt-2">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-16 w-32 rounded-md" />
        ))}
      </section>
    </article>
  </main>
);

export default LoadingSkeleton;
