"use client";

import { useRef } from "react";
import { Card } from "@/components/card";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      const cards = cardRefs.current;
      const totalScrollHeight = window.innerHeight * 3;
      const positions = [14, 38, 62, 86];
      const rotations = [-15, -7.5, 7.5, 15];

      const cardsContainer = containerRef.current?.querySelector(".cards");

      // Pin the card container during scroll
      ScrollTrigger.create({
        trigger: cardsContainer,
        start: "top top",
        end: `+=${totalScrollHeight}`,
        pin: true,
        pinSpacing: true,
      });

      // Animate spread and rotation on scroll
      cards.forEach((card, index) => {
        gsap.to(card, {
          left: `${positions[index]}%`,
          rotation: rotations[index],
          ease: "none",
          scrollTrigger: {
            trigger: cardsContainer,
            start: "top top",
            end: `+=${window.innerHeight}`,
            scrub: 0.5,
            id: `spread-${index}`,
          },
        });
      });

      // Animate card flip
      cards.forEach((card, index) => {
        const frontEl = card.querySelector(".flip-card-front");
        const backEl = card.querySelector(".flip-card-back");
        const staggerOffset = index * 0.05;
        const startOffset = 1 / 3 + staggerOffset;
        const endOffset = 2 / 3 + staggerOffset;

        ScrollTrigger.create({
          trigger: cardsContainer,
          start: "top top",
          end: `+=${totalScrollHeight}`,
          scrub: 1,
          id: `rotate-flip-${index}`,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress >= startOffset && progress <= endOffset) {
              const animationProgress = (progress - startOffset) / (1 / 3);
              const frontRotation = -180 * animationProgress;
              const backRotation = 180 - 180 * animationProgress;
              const cardRotation = rotations[index] * (1 - animationProgress);

              gsap.to(frontEl, { rotateY: frontRotation, ease: "power1.out" });
              gsap.to(backEl, { rotateY: backRotation, ease: "power1.out" });
              gsap.to(card, {
                xPercent: -50,
                yPercent: -50,
                rotate: cardRotation,
                ease: "power1.out",
              });
            }
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <ReactLenis root>
      <div className="container" ref={containerRef}>
        <section className="hero">
          <h1>
            Keep Scrolling to <br /> reveal the cards
          </h1>
        </section>

        <section className="cards">
          {[...Array(4)].map((_, index) => (
            <Card
              key={index}
              id={`card-${index + 1}`}
              frontSrc="/card-front.jpg"
              frontAlt="Card Image"
              backText="Your card details appear here"
              ref={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </section>

        <section className="footer">
          <h1>Footer or Upcoming Section</h1>
        </section>
      </div>
    </ReactLenis>
  );
}
