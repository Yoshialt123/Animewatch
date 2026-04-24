import { useEffect, useState } from "react"; import { useParams, useNavigate } from "react-router-dom"; import { getAnime, getEpisodes } from "../api";

export default function Anime() { const { id } = useParams(); const [data, setData] = useState(null); const [eps, setEps] = useState([]); const navigate = useNavigate();

useEffect(() => { getAnime(id).then(setData); getEpisodes(id).then((d) => setEps(d.episodes || [])); }, [id]);

if (!data) return <p className="text-white p-4">Loading...</p>;

return ( <div className="p-4 text-white"> <img src={data.info.img} className="w-60 rounded" /> <h1 className="text-2xl mt-2">{data.info.name}</h1>

<h2 className="mt-4 mb-2">Episodes</h2>

  <div className="grid grid-cols-6 gap-2">
    {eps.map((e) => (
      <button
        key={e.episodeId}
        className="bg-zinc-800 p-2 rounded"
        onClick={() =>
          navigate(`/watch?id=${id}&ep=${e.episodeId}`)
        }
      >
        {e.episodeNo}
      </button>
    ))}
  </div>
</div>

); }
