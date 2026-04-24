import { useEffect, useState } from "react"; import { useNavigate } from "react-router-dom"; import { getHome, searchAnime } from "../api";

export default function Home() { const [anime, setAnime] = useState([]); const [search, setSearch] = useState(""); const [loading, setLoading] = useState(true); const navigate = useNavigate();

const load = async () => { setLoading(true); const data = await getHome();

const list =
  data.trendingAnimes?.length
      ? data.trendingAnimes
          : data.latestEpisodes || [];

          setAnime(list);
          setLoading(false);

          };

          const doSearch = async () => { if (!search) return load();

          setLoading(true);
          const data = await searchAnime(search);
          setAnime(data.animes || []);
          setLoading(false);

          };

          useEffect(() => { load(); }, []);

          return ( <div className="min-h-screen bg-zinc-950 text-white p-4"> <header className="flex gap-2 mb-4"> <input className="p-2 w-full text-black rounded" placeholder="Search anime..." value={search} onChange={(e) => setSearch(e.target.value)} /> <button onClick={doSearch} className="bg-red-500 px-4 rounded"> Search </button> </header>

          {loading ? (
              <p>Loading...</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {anime.map((a) => (
                                  <div
                                            key={a.id}
                                                      className="cursor-pointer"
                                                                onClick={() => navigate(`/anime/${a.id}`)}
                                                                        >
                                                                                  <img src={a.img} className="w-full h-48 object-cover rounded" />
                                                                                            <p className="text-sm mt-1 truncate">{a.name}</p>
                                                                                                    </div>
                                                                                                          ))}
                                                                                                              </div>
                                                                                                                )}
                                                                                                                </div>

                                                                                                                ); }