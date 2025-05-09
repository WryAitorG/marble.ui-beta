"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const Home = () => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);

  const progress = useRef(0);
  const x = useRef(0.5);
  const time = useRef(Math.PI / 2);
  const reqId = useRef<number | null>(null);

  const setPath = useCallback(
    (progressValue: number) => {
      if (pathRef.current) {
        pathRef.current.setAttribute(
          "d",
          `M0 250 Q${width * x.current} ${250 + progressValue}, ${width} 250`
        );
      }
    },
    [width]
  );

  const lerp = (start: number, end: number, alpha: number) =>
    start * (1 - alpha) + end * alpha;

  const resetAnimation = () => {
    time.current = Math.PI / 2;
    progress.current = 0;
  };

  const animateOut = () => {
    const newProgress = progress.current * Math.sin(time.current);
    progress.current = lerp(progress.current, 0, 0.025);
    time.current += 0.2;
    setPath(newProgress);

    if (Math.abs(progress.current) > 0.75) {
      reqId.current = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const manageMouseEnter = () => {
    if (reqId.current) {
      cancelAnimationFrame(reqId.current);
      resetAnimation();
    }
  };

  const manageMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { movementY, clientX } = e;
    if (!pathRef.current || !lineRef.current) return;
    const pathBound = lineRef.current.getBoundingClientRect();
    x.current = (clientX - pathBound.left) / pathBound.width;
    progress.current += movementY;
    setPath(progress.current);
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  useEffect(() => {
    const updateWidth = () => {
      if (lineRef.current) {
        setWidth(lineRef.current.getBoundingClientRect().width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    setPath(progress.current);
  }, [width, setPath]);

  return (
    <div style={styles.container}>
      <div style={styles.body}>
        <div style={styles.line} ref={lineRef}>
          <div
            style={styles.box}
            onMouseEnter={manageMouseEnter}
            onMouseMove={manageMouseMove}
            onMouseLeave={manageMouseLeave}
          ></div>
          <svg style={styles.svg}>
            <path ref={pathRef} style={styles.path}></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "70vw",
  },
  line: {
    height: "1px",
    marginBottom: "20px",
    width: "100%",
    position: "relative",
  },
  svg: {
    width: "100%",
    height: "500px",
    position: "absolute",
    top: "-250px",
  },
  path: {
    stroke: "black",
    strokeWidth: "1px",
    fill: "none",
  },
  box: {
    height: "40px",
    width: "100%",
    position: "relative",
    top: "-20px",
    zIndex: 1,
  },
};

export default Home;
