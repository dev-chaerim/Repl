import React, { memo, useCallback, useRef } from "react";
import styled from "styled-components";

import { useNavigate } from 'react-router-dom';

import img from "../../assets/img/main/magnifyingglass.png";


const SearchContainer = styled.div`
  text-align: center;
  form {
    div {
      max-width: 360px;
      margin: auto;
      position: relative;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      input {
        width: 100%;
        background-color: #f8f8f8;
        padding: 3px 20px;
        box-sizing: border-box;
        border: none;
        height: 65px;
        border-radius: 12px;
        box-shadow: 3px 3px 8px rgb(0 0 0 / 20%);
        flex: none;
        font-size: 17px;
      }
      button {
        position: absolute;
        right: 10px;
        top: 0; 
        cursor: pointer;
        border: none;
        font-size: 16px;

        img {
          height: 55px;
          padding: 10px;
          box-sizing: border-box;
          max-width: 100%;
          object-fit: cover;
        
        }
      }
    }
  }

  .find_place {
    max-width: 360px;
    height: 65px;
    margin: auto;
    border-radius: 12px;
    background-color: #c4441c;
    box-shadow: 3px 3px 8px rgb(0 0 0 / 20%);

    a {
      display: block;
      cursor: pointer;
      width: auto;
      height: 100%;
      text-decoration: none;
      display: flex;
      align-items: center;
      span {
        margin: auto;
        color: #fff;
      }
    }
  }
`;

const Search = memo(() => {
  /** 페이지 강제 이동을 처리하기 위한 navigate 함수 생성 */
  const navigate = useNavigate();

  /** 지도 찾기 페이지로 이동 이벤트 */
  const onmapSubmit = useCallback((e) => {
    e.preventDefault();

    const current = e.currentTarget;
    const keyword = current.keyword.value;

    let redirectUrl = keyword ? `/map_finder?keyword=${keyword}` : '/map_finder'
    console.log(keyword);
    navigate(redirectUrl);

  },[navigate]);

  return (
    <SearchContainer>
      <form onSubmit={onmapSubmit}>
        <div>
          <input type="text" name='keyword' placeholder="지도를 검색해보세요" />
          <button type='submit'>
            <img src={img} alt="img" />
          </button>
        </div>
      </form>
      <div className="find_place">
        <a href="#!">
          <span>🧭 내 주변 장소 찾기</span>
        </a>
      </div>
    </SearchContainer>
  );
});

export default Search;
