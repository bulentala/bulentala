"use client";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
const AppIndexPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase.from("posts");
      if (selectedTag) {
        query = query.where({ tag: selectedTag });
      }
      const { data } = await query.select();
      setPosts(data);
    };

    fetchPosts();
  }, [selectedTag]);

  const handleTagFilter = () => {
    setSelectedTag(prompt("Enter tag to filter by:"));
  };

  return (
    <div>
      <div>
        <input type='search' name='' placeholder='SEARCH' id='' />
      </div>
      <div>
        <button onClick={handleTagFilter}>Tag Filter</button>
      </div>
      <div>
        <button>Sort by :: Latest- Earliest</button>
      </div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <div>
            {post.tag.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppIndexPage;
