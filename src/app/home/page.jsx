"use client"


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

  if (loading) return <p>Chargement des posts...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h1>Articles de voyage</h1>
      {posts.length === 0 ? (
        <p>Aucun post pour le moment.</p>
      ) : (
        posts.map((post) => <Post key={post.id} {...post} />)
      )}
    </div>
  );
};

export default Page;
