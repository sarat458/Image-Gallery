import React from "react";
import sample1 from "./images/sample1.jpg";
import sample2 from "./images/sample2.jpg";
import sample3 from "./images/sample3.jpg";
import GitHubIcon from "@mui/icons-material/GitHub";
import { GITHUB_URL } from "../config";
import "./Gallery.css";
import { useEffect, useState } from "react";



export const Gallery = () => {
  const imagesLength = 3;
  const [index, setIndex] = useState(1);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [source, setSource] = useState(sample1);
  const [imgLeft, setImageLeft] = useState(0);
  const [imgTop, setImageTop] = useState(0);
  const [start, setStart] = useState(0);
  const [left, setLeft] = useState(0);
  const [direction, setDirection] = useState(0);
  const [width,setWidth] = useState(window.innerWidth)

  const [down, setDown] = useState(0);

  //change view
  const [type, setType] = useState(window.innerWidth>992?2:1);

  const magnifierHeight = 100;
  const magnifieWidth = 100;
  const zoomLevel = 1.5;

  const updateWidth= ()=>{
    setWidth(window.innerWidth)
    if(width>992){
      setType(2)
    }else{
      setType(1)
    }
  }

  useEffect(()=>{
    window.addEventListener('resize',updateWidth);
    return ()=> window.removeEventListener('resize',updateWidth)
  },[updateWidth])

  const handlePageRedirect = () => {
    window.open(GITHUB_URL, "_blank");
  };


  const mouseDown = (e) => {
    setDown(true);
    setStart(e.pageX);
    setLeft(
      parseInt(document.getElementById("movable").style.left.split("px")[0])
    );
  };

  const mouseUp = (e) => {
    setDown(false);
    if (direction < 0) {
      if (index !== 1) {
        setIndex(index - 1);
        document.getElementById("movable").style.left =
          -1 * parseInt(index - 2) * 520 + "px";
      }
    } else {
      if (index !== imagesLength) {
        setIndex(index + 1);
        document.getElementById("movable").style.left =
          -1 * parseInt(index) * 520 + "px";
      }
    }
  };

  const clickHandler = (e) => {
    setIndex(e.target.getAttribute("index"));
    document.getElementById("movable").style.left =
      -1 * (parseInt(e.target.getAttribute("index")) - 1) * 520 + "px";
  };

  const nextHandler = (e) => {
    if (index !== imagesLength) {
      const nextIndex = parseInt(index) + 1;
      setIndex(nextIndex);
      document.getElementById("movable").style.left =
        -1 * (parseInt(nextIndex) - 1) * 520 + "px";
    }
  };

  const beforeHandler = (e) => {
    if (index !== 1) {
      const nextIndex = parseInt(index) - 1;
      setIndex(nextIndex);
      document.getElementById("movable").style.left =
        -1 * (parseInt(nextIndex) - 1) * 520 + "px";
    }
  };

  const handleEnter = (e) => {
    if (type === 2) {
      const elem = e.currentTarget;
      const { width, height } = elem.getBoundingClientRect();
      setSize([width, height]);
      setShowMagnifier(true);
    } else {
      setShowMagnifier(false);
    }
  };
  const handleMove = (e) => {
    if (down) {
      e.preventDefault();
      const dir = start - e.pageX;
      setDirection(dir);
      if ((dir < 0 && index !== 1) || (dir > 0 && index !== imagesLength)) {
        document.getElementById("movable").style.left =
          left - (start - e.pageX) + "px";
      }
    } else {
      const elem = e.currentTarget;
      const { top, left } = elem.getBoundingClientRect();
      setSource(elem.getAttribute("src"));
      const x = e.pageX - left - window.pageXOffset;
      const y = e.pageY - top - window.pageYOffset;
      setImageLeft(left);
      setImageTop(top);
      setXY([x, y]);
    }
  };
  const handleLeave = (e) => {
    if (down) {
      e.preventDefault();
      setDown(false);
      mouseUp(e);
    }
    setShowMagnifier(false);
  };

  //JSX components
  const GithubIconRender = ()=>{
    return (
      <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px",
        marginRight: "30px",
      }}
    >
      <GitHubIcon style={{ fontSize: "50px" }} onClick={handlePageRedirect} />
    </div>
    )
    
  }

  const slideShow = ()=>{
    return (
      <div
        style={{
          maxHeight: "500px",
          maxWidth: "520px",
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <div
          id="movable"
          style={{ position: "relative", display: "flex", left: "0px" }}
        >
          <img
            className="imageActive"
            style={{
              maxHeight: "500px",
              maxWidth: "500px",
              marginLeft: "10px",
              marginRight: "10px",
              position: "relative",
            }}
            src={sample1}
            id="test"
            role="presentation"
            alt="sample"
            onMouseDown={mouseDown}
            onMouseEnter={handleEnter}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onMouseUp={mouseUp}
          />
          <img
            className="imageActive"
            style={{
              maxHeight: "500px",
              maxWidth: "500px",
              marginLeft: "10px",
              marginRight: "10px",
              position: "relative",
            }}
            src={sample2}
            id="test"
            role="presentation"
            alt="sample"
            onMouseDown={mouseDown}
            onMouseEnter={handleEnter}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onMouseUp={mouseUp}
          />
          <img
            className="imageActive"
            style={{
              maxHeight: "500px",
              maxWidth: "500px",
              marginLeft: "10px",
              marginRight: "10px",
              position: "relative",
            }}
            src={sample3}
            id="test"
            role="presentation"
            alt="sample"
            onMouseDown={mouseDown}
            onMouseEnter={handleEnter}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onMouseUp={mouseUp}
          />
        </div>
      </div>
    )
  }

  const dotThumbNails = ()=>{
    return (
      <div
        style={{ display: type === 1 ? "flex" : "none", justifyContent: "center", padding:"10px"}}
      >
        <span class="dot" id="image1" index="1" onClick={clickHandler}></span>
        <span class="dot" id="image2" index="2" onClick={clickHandler}></span>
        <span class="dot" id="image3" index="3" onClick={clickHandler}></span>
      </div>
    )
  }

  const imageThumbNails = ()=>{
    return (
      <div
        className="thumbnail"
        style={{
          display: type === 2 ? "flex" : "none",
          justifyContent: "center",
        }}
      >
        <a href="#" class={`previous round ${index==1? "disable":"dark"}`} onClick={beforeHandler}>
          &#8249;
        </a>
        <img
          id="image1"
          index="1"
          className={`${index==="1"?"image-active":"image"}`}
          onClick={clickHandler}
          style={{ maxHeight: "100px", width: "100px"}}
          src={sample1}
          role="presentation"
          alt="sample"
        />
        <img
          id="image2"
          index="2"
          className={`${index==="2"?"image-active":"image"}`}
          onClick={clickHandler}
          style={{ maxHeight: "100px", width: "100px" }}
          src={sample2}
          role="presentation"
          alt="sample"
        />
        <img
          id="image3"
          index="3"
          className={`${index==="3"?"image-active":"image"}`}
          onClick={clickHandler}
          style={{ maxHeight: "100px", width: "100px" }}
          src={sample3}
          role="presentation"
          alt="sample"
        />
        <a href="#" class={`next round ${index==3? "disable":"dark"}`} onClick={nextHandler}>
          &#8250;
        </a>
      </div>
    )
  }

  return (
    <>
      {GithubIconRender()}
      
      {slideShow()}
      
      {dotThumbNails()}

      {imageThumbNails()}
      
      <div
        className="style"
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          borderRadius: "50%",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,
          top: `${y - magnifierHeight / 2 + imgTop}px`,
          left: `${x - magnifieWidth / 2 + imgLeft}px`,
          opacity: "1",
          border: "1px solid lightgray",
          backgroundColor: "white",
          backgroundImage: `url('${source}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,


          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </>
  );
};
