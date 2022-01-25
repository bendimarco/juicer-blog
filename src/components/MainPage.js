import React, { useState, useEffect } from "react";
import axios from "axios";
import PreviewPost from "./PreviewPost";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../styles/MainPage.css";
import Nav from "./Nav";
import ArticleBuffer from "./ArticleBuffer";
import anime from "animejs";

export default function GetInfo() {
  const [articleList, setArticles] = useState([]);

  const [navAuthor, setNavAuthor] = useState({});

  const [inactiveArticles, setInactiveArticles] = useState({});

  const [inactiveNavAuthor, setInactiveNavAuthor] = useState({});

  const [loading, setLoading] = useState(false);

  const animationRef = React.useRef(null);

  useEffect(() => {
    animationRef.current = anime({
      targets: ".loading, .loading2, .loading3",
      translateX: "13rem",
      rotate: 180,
      borderRadius: "8px",
      duration: 2000,
      loop: true,
      // scale: [
      //   { value: 0.1, easing: "easeOutSine", duration: 500 },
      //   { value: 1, easing: "easeInOutQuad", duration: 1200 },
      // ],
      // delay: anime.stagger(200, { grid: [14, 5], from: "center" }),
      // translateX: 250,
      // delay: function(el, i) { return i * 100; },
      // direction: 'alternate',
      // loop: true,
      // easing: 'easeInOutSine'
    });
  }, []);

  // Fetch your articles immediately after the component is mounted
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const authorResponse = await axios.get(
          `https://juicer-blogs.herokuapp.com/api/creators/1?populate=%2A`
        );
        console.log(authorResponse);
        const author2Response = await axios.get(
          "https://juicer-blogs.herokuapp.com/api/creators/2?populate=%2A"
        );
        setLoading(true);
        return [authorResponse, author2Response];
      } catch (error) {
        console.log(error.code);
        console.log(error.message);
        console.log(error.stack);
      }
    }
    fetchMyAPI().then((result) => {
      let active = result[0],
        inactive = result[1];
      setArticles(active.data.data.attributes.creators.data);
      setNavAuthor(active.data.data.attributes);
      setInactiveArticles(inactive.data.data.attributes.creators.data);
      setInactiveNavAuthor(inactive.data.data.attributes);
    });
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
    <div>
      {loading ? (
        <ArticleBuffer
          navAuthor={navAuthor}
          articleList={articleList}
          switchAuthors={switchAuthors}
        />
      ) : (
        <div className="loading-div">
          <div className="loading" />
          <div className="loading2" />
          <div className="loading3" />
        </div>
      )}
    </div>
  );
}
