import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { Typography } from '@material-ui/core';
import wordsToNumbers from "words-to-numbers";

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles.js";
import horizontallogo from "../src/images/alan-seal-horizontal-color.png"
import homeLogo from "../src/images/homeLogo.png";

const alanKey = "fb8a041bc32b9bbf7c1ebb463631aa352e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === "newHeadlines") {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if( command === "highlight") {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if( command === "open") {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true}) : number;
                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20) {
                        alanBtn().playText("Please try that again.");
                    } else if(article) {
                        window.open(article.url, "_blank");
                        alanBtn().playText("Opening...");
                    }
                }
            }
        })
    }, []);

    return (
        <div>
            <div className={classes.logoContainer}>
                {/* <img src="https://alan.app/voice/images/branding_page/logo-horizontal/color/alan-logo-horizontal-color.png" className={classes.alanLogo} alt="Alan logo" /> */}
                <img className={classes.alanLogo} src={homeLogo}  alt="logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
            <div className={classes.footer}>
            <Typography variant="body1" component="h2">
                Created by
                <a className={classes.link} href="https://www.linkedin.com/in/rudrakarmakar"> Rudra Karmakar</a> -
            </Typography>
                <img className={classes.image} src={horizontallogo} height="50px" alt="Alan AI logo" />
            </div>
        </div>
    );
}

export default App;