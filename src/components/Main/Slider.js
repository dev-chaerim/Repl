import React, { memo, useEffect, useCallback, useState, useRef } from "react";
import { NavLink } from "react-router-dom";

/** glider
 * https://www.npmjs.com/package/react-glider
 */
import Glider from "react-glider";
import "glider-js/glider.min.css";
import "../../assets/css/styles.scss";

// 임시데이터
let data = [
  { id: 1, emoji: "🍣", title: "초밥", desc: "10명의 사용자" },
  { id: 2, emoji: "🥗", title: "샐러드", desc: "20명의 사용자" },
  { id: 3, emoji: "🍞", title: "식빵", desc: "30명의 사용자" },
  { id: 4, emoji: "🍔", title: "햄버거", desc: "40명의 사용자" },
  { id: 5, emoji: "🍥", title: "라면", desc: "50명의 사용자" },
  { id: 6, emoji: "🍮", title: "푸딩", desc: "40명의 사용자" },
  { id: 7, emoji: "🍷", title: "와인", desc: "30명의 사용자" },
  { id: 8, emoji: "☕️", title: "커피", desc: "20명의 사용자" },
];
// 임시데이터 배열 랜덤 처리
data = data.sort(() => Math.random() - 0.5);
let plusData = [...data, ...data, ...data, ...data, ...data, ...data];

const Slider = memo(() => {
  const gliderRef = useRef(null);
  const preventInterval = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if(preventInterval.current) {
        return;
      }
      gliderRef.current.scrollItem(index++ % plusData.length, false);
    }, 2500);
    return () => {
      clearInterval(interval);
    };
  },[])
  
  const onMouseOver = useCallback(() => {
    setMouseOver(true);
    preventInterval.current = true
  },[mouseOver]);

  const onMouseOut = useCallback(() => {
    setMouseOver(false);
    preventInterval.current = false
  },[mouseOver]);

  return (
    <div className="container" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      
      {mouseOver === true? 
      (
        <Glider
        className="glider-container"
        draggable
        hasArrows
        slidesToShow={1}
        slidesToScroll={1}
        ref={gliderRef}
      >
        {plusData.map(({ id, emoji, title, desc }, i) => {
          return (
            <div key={i}>
              <NavLink to={`/theme/${id}`}>
                <div className="emoji">{emoji}</div>
                <div className="title">{title}</div>
                <div className="desc">{desc}</div>
              </NavLink>
            </div>
          );
        })}
      </Glider>
      ): 
       (
        <Glider
        className="glider-container"
        draggable
        hasArrows={false}
        slidesToShow={1}
        slidesToScroll={1}
        ref={gliderRef}
       
      >
        {plusData.map(({ id, emoji, title, desc }, i) => {
          return (
            <div key={i}>
              <NavLink to={`/theme/${id}`}>
                <div className="emoji">{emoji}</div>
                <div className="title">{title}</div>
                <div className="desc">{desc}</div>
              </NavLink>
            </div>
          );
        })}
      </Glider>
      )}
    </div>
  );
});

export default Slider;
