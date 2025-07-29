"use client";

import React, { useEffect, useState } from 'react';
import Post from '../components/posts.jsx'; 
import { fetchPosts } from '../lib/fetchPosts';

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Chargement des posts...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Erreur : {error}</p>;

  return (
    <div className="mx-40 my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {posts.length === 0 ? (
        <p className="col-span-full text-center text-gray-600">Aucun post pour le moment.</p>
      ) : (
        posts.map((post) => <Post key={post.id} {...post} />)
      )}
    </div>
  );
};

export default Page;
