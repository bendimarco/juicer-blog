import React, { useState, useEffect } from "react";
import axios from "axios";
import PreviewPost from "./PreviewPost";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../styles/MainPage.css";
import Nav from "./Nav";

const ArticleBuffer =({navAuthor, articleList, switchAuthors}) => {

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
                      to={`${process.env.PUBLIC_URL}/${a.attributes.slug}`}
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
};

export default ArticleBuffer;