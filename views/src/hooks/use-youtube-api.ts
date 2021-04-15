import { useEffect, useState } from "react";

type Items = gapi.client.youtube.SearchResult;

type UseYoutuApi = [Array<Items>, boolean];

export function useYoutubeApi(query: string, gapiLoaded: boolean): UseYoutuApi {
  const [result, setResult] = useState<Array<Items>>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (gapiLoaded) {
      const youtube = gapi.client.youtube;
      if (!gapi.client.youtube) {
        throw new Error("youtube client is not defined");
      }
      youtube.search
        .list({
          part: ["snippet"],
          maxResults: 10,
          q: query,
        })
        .then((result) => {
          if (result.result.items) {
            setResult([...(result.result.items as Items[])]);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [gapiLoaded]);
  return [result, loading];
}
