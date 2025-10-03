"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import styles from "@/styles/HomePage/ParallaxScroll.module.css";


const ParallaxScroll = ({ images }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: containerRef, // Tracks scrolling inside container
    offset: ["start start", "end start"], // Adjusts movement range
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div className={styles.parallaxContainer} ref={containerRef}>
      <div className={styles.parallaxGrid}>
        <div className={styles.column}>
          {firstPart.map((img, idx) => (
            <motion.div key={idx} style={{ y: translateFirst }}>
              <Image
                src={img}
                alt={`Achievement ${idx + 1}`}
                width={300}
                height={400}
                sizes="(max-width: 768px) 100vw, 300px"
                className={styles.parallaxImage}
                loading="lazy"
                decoding="async"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
              />
            </motion.div>
          ))}
        </div>

        <div className={styles.column}>
          {secondPart.map((img, idx) => (
            <motion.div key={idx} style={{ y: translateSecond }}>
              <Image
                src={img}
                alt={`Achievement ${firstPart.length + idx + 1}`}
                width={300}
                height={400}
                sizes="(max-width: 768px) 100vw, 300px"
                className={styles.parallaxImage}
                loading="lazy"
                decoding="async"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
              />
            </motion.div>
          ))}
        </div>

        <div className={styles.column}>
          {thirdPart.map((img, idx) => (
            <motion.div key={idx} style={{ y: translateFirst }}>
              <Image
                src={img}
                alt={`Achievement ${firstPart.length + secondPart.length + idx + 1}`}
                width={300}
                height={400}
                sizes="(max-width: 768px) 100vw, 300px"
                className={styles.parallaxImage}
                loading="lazy"
                decoding="async"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParallaxScroll;
