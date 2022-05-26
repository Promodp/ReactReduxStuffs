import React, { useState, useEffect } from "react";

import axios from "axios";

const Practise = () => {
    const [buttonClick, setButtonClick] = useState(false);

    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        if (buttonClick) {
          const apiData = axios.get(
            "https://newsapi.org/v2/everything?q=tesla&from=2022-05-21&sortBy=publishedAt&apiKey=97b9c873df4244b289358dda55781776")
          apiData.then((response) => {
            console.log(response.data.articles, "response");
    
            const newAscendingSortedCreated = response?.data?.articles.sort(
              (a, b) => {
                return (
                  1 * a["title"].toString().localeCompare(b["title"].toString())
                );
              }
            );
            console.log(newAscendingSortedCreated, "newAscendingSortedCreated");
            setApiData(newAscendingSortedCreated);
          });
        }
      }, [buttonClick]);
    return (
        <div>
            <div style={{ width: "100%" }}>
                {apiData.map((item) => {
                    return (
                        <div>
                            <img width="100px" src={item.urlToImage} />
                            {/* <div width='10px'>{item.title}</div> */}
                        </div>
                    );
                })}
            </div>
            <button onClick={() => setButtonClick(true)}>
            {" "}
            Click to make the api call
          </button>
        </div>
    )

}

export default Practise;