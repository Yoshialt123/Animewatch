const BASE = "https://api-anime-rouge.vercel.app";

export const getHome = () => fetch(${BASE}/aniwatch/).then((r) => r.json());

export const searchAnime = (q) => fetch(${BASE}/aniwatch/search?keyword=${encodeURIComponent(q)}&page=1).then((r) => r.json());

export const getAnime = (id) => fetch(${BASE}/aniwatch/anime/${id}).then((r) => r.json());

export const getEpisodes = (id) => fetch(${BASE}/aniwatch/episodes/${id}).then((r) => r.json());

export const getStream = (id, server = "vidstreaming", category = "sub") => fetch( ${BASE}/aniwatch/episode-srcs?id=${encodeURIComponent(id)}&server=${server}&category=${category} ).then((r) => r.json());
