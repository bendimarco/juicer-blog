import React from "react";
import "../styles/ArticlePage.css"
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function ArticleHeader({ article }) {
  return (
    <div className="post-preview">
      <h1 className="title"> {article.title} </h1>
      <h4 className="desc"> {article.description} </h4>
      <div className="author-date-container">
      {/* <div className="pfp-container">
        <img src={article.author.picture}></img>
      </div> */}
        <h6 className="author"> {article.author.name} </h6>
        <h6 className="date"> {formatDate(article.published_at)} </h6>
      </div>
    </div>
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