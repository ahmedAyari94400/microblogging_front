// src/components/Post.jsx
import React from 'react';

const Post = ({
  description,
  url_pictures,
  hashtag,
  created_at,
  likes = [],
  comments = []
}) => {
  

  return (
    <article className="post-card" style={styles.card}>
      {url_pictures && (
        <img src={url_pictures} alt="Photo de voyage" style={styles.image} />
      )}

      <div style={styles.content}>
        <p style={styles.description}>{description || 'Pas de description.'}</p>

        {hashtag && <p style={styles.hashtag}>#{hashtag}</p>}

        <p style={styles.meta}>
          <strong>Créé le :</strong> 
        </p>

        <div style={styles.stats}>
          <span>💬 {comments.length} commentaire(s)</span>
          <span>❤️ {likes.length} like(s)</span>
        </div>
      </div>
    </article>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '1rem',
    marginBottom: '1.5rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  content: {
    padding: '0 0.5rem',
  },
  description: {
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
  hashtag: {
    color: '#3498db',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  meta: {
    fontSize: '0.9rem',
    color: '#777',
    marginBottom: '0.5rem',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: '#444',
    marginTop: '1rem',
  },
};

export default Post;
