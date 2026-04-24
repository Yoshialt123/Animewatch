import { useEffect, useRef, useState } from "react"; import { useSearchParams } from "react-router-dom"; import Hls from "hls.js"; import { getStream } from "../api";

export default function Watch() { const [params] = useSearchParams(); const id = params.get("id"); const ep = params.get("ep");

const videoRef = useRef(null); const hlsRef = useRef(null);

const [sources, setSources] = useState([]); const [selected, setSelected] = useState(null); const [loading, setLoading] = useState(true);

const loadStream = async () => { setLoading(true);

const data = await getStream(`${id}?ep=${ep}`);
const list = data.sources || [];

// pick best source (prefer m3u8)
const best =
  list.find((s) => s.isM3U8) || list[0];

setSources(list);
setSelected(best);

setLoading(false);

};

useEffect(() => { if (!id || !ep) return; loadStream(); }, [id, ep]);

useEffect(() => { if (!selected || !videoRef.current) return;

const video = videoRef.current;

// cleanup old instance
if (hlsRef.current) {
  hlsRef.current.destroy();
}

if (selected.url.includes("m3u8") && Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource(selected.url);
  hls.attachMedia(video);
  hlsRef.current = hls;
} else {
  video.src = selected.url;
}

}, [selected]);

const toggleFullscreen = () => { const video = videoRef.current; if (!document.fullscreenElement) { video.requestFullscreen(); } else { document.exitFullscreen(); } };

if (loading) return <p className="text-white p-4">Loading player...</p>;

return ( <div className="bg-black min-h-screen text-white p-4"> <h1 className="mb-2">Now Playing</h1>

<div className="relative">
    <video
      ref={videoRef}
      controls
      className="w-full rounded"
    />

    <button
      onClick={toggleFullscreen}
      className="absolute top-2 right-2 bg-red-600 px-3 py-1 rounded"
    >
      Fullscreen
    </button>
  </div>

  {/* Quality selector */}
  <div className="mt-4">
    <h3 className="mb-2">Quality / Sources</h3>
    <div className="flex gap-2 flex-wrap">
      {sources.map((s, i) => (
        <button
          key={i}
          onClick={() => setSelected(s)}
          className={`px-3 py-1 rounded ${
            selected?.url === s.url
              ? "bg-red-600"
              : "bg-zinc-800"
          }`}
        >
          {s.quality || "Auto"}
        </button>
      ))}
    </div>
  </div>
</div>

); }
