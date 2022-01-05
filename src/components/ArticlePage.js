import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MarkdownView from "react-showdown";
import Nav from "./Nav";
import "../styles/ArticlePage.css";
import ArticleHeader from "./ArticleHeader";

export default function GetInfo() {
  let { slug } = useParams();
  let history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [oneArticle, setArticle] = useState({
    articles: [],
    errors: null,
  });

  // Fetch your articles immediately after the component is mounted
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const response = await axios.get(
          `https://juicer-blogs.herokuapp.com/api/articles?populate=%2a&filters[slug][$eq]=${slug}`
        );
        setArticle({ articles: response.data.data });
        setLoading(false);
      } catch (error) {
        setArticle({ errors: error });
      }
    }
    fetchMyAPI();
  }, [slug]);

  const { articles, errors } = oneArticle;
  let article = articles[0];
  // console.log(Object.keys(articles[0]));

  if (errors) {
    return <div>An error occured: {errors.message}</div>;
  }
  if (isLoading) {
    return <div></div>;
  }
  
  return (
    <>
      <div className="page-content">
        <Nav author={article.attributes.creator.data.attributes} articlePage={true} />
        <div className="article-list-container">
          <button class="article-content" onClick={() => history.goBack()}>
            Back
          </button>
          <ArticleHeader article={article}></ArticleHeader>
          <div className="article-content">
            <MarkdownView markdown={article.attributes.body} />
          </div>
        </div>
      </div>
    </>
  );
}

function formatDate(date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateObj = new Date(date);
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  return month + "\n" + day + ", " + year;
}
