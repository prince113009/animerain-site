
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const API_KEY = '3cce3b62801ae08200d8afc9304e95a6';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function AnimeRain() {
  const [trending, setTrending] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/trending/tv/day?api_key=${API_KEY}&language=en-US`)
      .then((res) => setTrending(res.data.results || []));
  }, []);

  const handleSearch = async (q) => {
    setQuery(q);
    if (q.length < 2) return;
    const res = await axios.get(`${BASE_URL}/search/tv`, {
      params: {
        api_key: API_KEY,
        query: q,
        language: 'en-US'
      }
    });
    setResults(res.data.results || []);
  };

  const renderCard = (anime) => (
    <Card key={anime.id} className="w-44 shadow-md">
      <CardContent className="p-2">
        <img
          src={`https://image.tmdb.org/t/p/w500${anime.poster_path}`}
          alt={anime.name}
          className="rounded-xl mb-2"
        />
        <div className="text-white text-sm font-semibold">
          {anime.name}
        </div>
        <div className="text-xs text-gray-400">⭐ {anime.vote_average}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">AnimeRain</h1>
      <Input
        className="mb-6 w-full max-w-md bg-gray-900 border border-gray-700 text-white"
        placeholder="Search anime..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {query.length > 1 ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {results.map(renderCard)}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Trending Now</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {trending.map(renderCard)}
          </div>
        </div>
      )}
    </div>
  );
}
