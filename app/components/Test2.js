"use client";
import React, { useState } from "react";

const data = [
  {
    id: 1,
    title: "Makale başlığı 2",
    description: "Lorem ipsum dolor sit amet aaaaAAAAaaa.",
    date: "12/16/2022 15:34:56",
    tag: "article",
  },
  {
    id: 2,
    title: "Makale başlığı 2",
    description: "Lorem ipsum dolor sit amet.",
    date: "12/16/2022 15:34:56",
    tag: "blog post",
  },
  {
    id: 3,
    title: "Makale başlığı 3",
    description: "Lorem ipsum dolor sit amet.",
    date: "12/16/2022 15:34:56",
    tag: ["article", "news"],
  },
  {
    id: 4,
    title: "Makale başlığı 4",
    description: "Lorem ipsum dolor sit amet.",
    date: "12/16/2022 15:34:57",
    tag: ["article", "news", "blog post"],
  },
];

const Test2 = () => {
  const [articles, setArticles] = useState(data);
  const [sortOrder, setSortOrder] = useState("asc"); // sıralama
  const [buttonText, setButtonText] = useState("Sort by :: Latest");
  const [selectedTag, setSelectedTag] = useState(""); // state variable for the selected tag
  const [dropdownOpen, setDropdownOpen] = useState(false); // state variable for the dropdown menu

  const handleSort = () => {
    let sortedArticles;
    // sıralama düzenine göre verileri sırala
    if (sortOrder === "asc") {
      sortedArticles = articles.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      setSortOrder("desc"); // sıralama düzenini değiştir
      setButtonText("Sort by :: Earliest"); // düğme yazısını değiştir
    } else {
      sortedArticles = articles.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setSortOrder("asc"); // sıralama düzenini değiştir
      setButtonText("Sort by :: Latest"); // düğme yazısını değiştir
    }
    setArticles(sortedArticles);
  };
  const tags = new Set();
  data.forEach((article) => {
    // If the tag is an array, add all the elements to the Set
    if (Array.isArray(article.tag)) {
      article.tag.forEach((tag) => tags.add(tag));
    } else {
      // If the tag is a single string, add it to the Set
      tags.add(article.tag);
    }
  });
  // Function to handle the click event on the dropdown button
  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };
  // Function to handle the change event on the select element
  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };
  return (
    <div>
      {new Date().getFullYear()}
      <button onClick={handleSort}>{buttonText}</button>
      <button onClick={handleDropdownClick}>Filter</button>
      {dropdownOpen && (
        <select value={selectedTag} onChange={handleTagChange}>
          <option value=''>All</option>
          {[...tags].map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      )}
      {articles.map((item) => {
        // Only render the article if it has a tag that matches the selected tag or if no tag is selected
        if (
          !selectedTag ||
          (Array.isArray(item.tag) && item.tag.includes(selectedTag)) ||
          item.tag === selectedTag
        ) {
          return (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>{item.date}</p>
              <hr />
              <p>{Array.isArray(item.tag) ? item.tag.join(", ") : item.tag}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Test2;
