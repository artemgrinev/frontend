import type { UseFetchOptions } from "#app";

export async function fetcher<T>(
  endpoint: string,
  options: UseFetchOptions<T> = {}
): Promise<T> {
  try {
    const { data, error, status } = await useFetch(endpoint, options);

    if (status.value === "error") {
      if (error.value) {
        throw new Error(
          error.value?.data?.error ||
            "An unknown error occurred during data fetching."
        );
      }

      if (!data.value) {
        throw new Error("No data returned from the fetch operation.");
      }
    }

    return data.value as T;
  } catch (err: any) {
    throw new Error(err.message || "An error occurred during data fetching.");
  }
}
