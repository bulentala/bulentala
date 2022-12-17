"use client";
import { useEffect, useState } from "react";
import supabase from "./utils/supabase";

const AppIndexPage = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("earliest");

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase.from("posts");
      if (sortBy === "latest") {
        query = query.order("created_at desc");
      } else {
        query = query.order("created_at asc");
      }
      const { data } = await query.select();
      setPosts(data);
    };
    fetchPosts();
  }, [setPosts, sortBy]);

  return (
    <>
      <button onClick={() => setSortBy("earliest")}>Sort by :: Earliest</button>
      <button onClick={() => setSortBy("latest")}>Sort by :: Latest</button>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <p>{post.created_at}</p>
          <p>{post.tag.join(", ")}</p>
        </div>
      ))}
    </>
  );
};
export default AppIndexPage;
