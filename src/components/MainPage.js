import React, { useState, useEffect } from "react";
import axios from "axios";
import PreviewPost from "./PreviewPost";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../styles/MainPage.css";
import Nav from "./Nav";

export default function GetInfo() {
  const [articleList, setArticles] = useState([]);

  const [navAuthor, setNavAuthor] = useState({});

  const [inactiveArticles, setInactiveArticles] = useState({});

  const [inactiveNavAuthor, setInactiveNavAuthor] = useState({});

  // Fetch your articles immediately after the component is mounted
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const authorResponse = await axios.get(
          `https://juicer-blogs.herokuapp.com/api/creators/1?populate=%2A`
        );
        console.log(authorResponse.data.data.attributes)
        setArticles(authorResponse.data.data.attributes.creators.data);
        setNavAuthor(authorResponse.data.data.attributes);
        const author2Response = await axios.get(
          "https://juicer-blogs.herokuapp.com/api/creators/2?populate=%2A"
        );
        setInactiveArticles(author2Response.data.data.attributes.creators.data);
        setInactiveNavAuthor(author2Response.data.data.attributes);
      } catch (error) {}
    }
    fetchMyAPI();
  }, []);

  function switchAuthors() {
    const tempArticles = articleList;
    const tempAuthor = navAuthor;
    setArticles(inactiveArticles);
    setNavAuthor(inactiveNavAuthor);
    setInactiveArticles(tempArticles);
    setInactiveNavAuthor(tempAuthor);
  }

  return (
    <>
      <div className="page-content">
        <Nav
          author={navAuthor}
          switchAuthor={switchAuthors}
          articlePage={false}
        />
        <div className="article-list-container">
          {articleList.map((a) => (
            <div key={a.id.toString()}>
              <PreviewPost
                key={a.attributes.slug.toString()}
                article={a.attributes}
                author={navAuthor}
              ></PreviewPost>
              <div className="read-btn-container">
                <Link
                  className="read-btn"
                  key={a.id.toString()}
                  to={`/${a.attributes.slug}`}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
