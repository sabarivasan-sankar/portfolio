import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const NAME = "Sabarivasan Sankar";
const DOT_INDEX = NAME.indexOf("i");
const HEAD = NAME.slice(0, DOT_INDEX + 1);
const TAIL = NAME.slice(DOT_INDEX + 1);

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const wrapRef = useRef(null);
  const ballRef = useRef(null);
  const tailRef = useRef(null);
  const wipeBarRef = useRef(null);
  const letterRefs = useRef([]);
  letterRefs.current = [];

  const setLetterRef = (el) => {
    if (el) letterRefs.current.push(el);
  };

  useGSAP(
    () => {
      const letters = letterRefs.current;
      const ball = ballRef.current;
      const wrapRect = wrapRef.current.getBoundingClientRect();

      const positions = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          cx: r.left + r.width / 2 - wrapRect.left,
          top: r.top - wrapRect.top,
          bottom: r.bottom - wrapRect.top,
        };
      });

      const ballSize = 18;
      const dotSize = 9;
      const liftPad = 30;
      // Ball rests right on the baseline (bottom of the line) between letters.
      const baselineY = positions[0].bottom - ballSize / 2;

      gsap.set(ball, {
        xPercent: -50,
        yPercent: -50,
        width: ballSize,
        height: ballSize,
        x: positions[0].cx,
        y: baselineY,
      });
      gsap.set(letters, { opacity: 0, y: 8, scale: 0.5 });
      gsap.set(wrapRef.current, { opacity: 1 });

      const tl = gsap.timeline({
        delay: 0.15,
        onComplete: () => {
          const heroName = document.querySelector(".name");

          // Fall back to a plain fade if the hero heading isn't found.
          if (!heroName) {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.45,
              delay: 0.3,
              onComplete,
            });
            return;
          }

          // The ball (still sitting as the dot) travels with the text since
          // it's a child of wrap — Flip.fit glides the whole completed name,
          // dot included, into the exact position/size of the real hero
          // heading, then the curtain dissolves to reveal it already merged.
          gsap
            .timeline({ delay: 0.35, onComplete })
            .add(
              Flip.fit(wrapRef.current, heroName, {
                duration: 0.7,
                ease: "power2.inOut",
                scale: true,
                absolute: true,
              })
            )
            .to(containerRef.current, { opacity: 0, duration: 0.3, ease: "power1.out" }, "-=0.15");
        },
      });

      // Ball sits under a letter; that letter appearing pulls it up, and
      // — except for the final "i" — it arcs over to the next letter: the
      // horizontal glide runs continuously across the whole hop while the
      // vertical motion decelerates into the peak then accelerates back
      // down, so it traces a real gravity curve instead of going straight
      // up, then peeling off in a diagonal line.
      positions.slice(0, DOT_INDEX).forEach((pos, i) => {
        const peakY = pos.top - liftPad;
        const nextX = positions[i + 1].cx;
        const riseDur = 0.17;
        const fallDur = 0.2;
        const label = `launch${i}`;
        const spinDir = Math.sign(nextX - pos.cx) || 1;

        // anticipation: squat down before launching off the baseline
        tl.to(ball, { scaleX: 1.35, scaleY: 0.65, duration: 0.06, ease: "power1.out" }, ">");

        tl.addLabel(label, ">")
          // a full, steady 360° turn drives the hop — position rides along
          // with it on the same clock, rather than rotation just decorating
          // a translate that was already going to happen.
          .to(ball, { rotation: `+=${spinDir * 360}`, duration: riseDur + fallDur, ease: "none" }, label)
          .to(ball, { x: nextX, duration: riseDur + fallDur, ease: "power1.inOut" }, label)
          // vertical decelerates up to the peak...
          .to(
            ball,
            { y: peakY, scaleX: 0.7, scaleY: 1.35, duration: riseDur, ease: "power2.out" },
            label
          )
          .to(letters[i], { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: "back.out(2.5)" }, label)
          .to(
            ball,
            { scaleX: 1, scaleY: 1, duration: 0.07, ease: "power1.inOut" },
            `${label}+=${riseDur - 0.05}`
          )
          // ...then accelerates back down, stretching as it falls
          .to(
            ball,
            { y: baselineY, scaleX: 0.78, scaleY: 1.3, duration: fallDur, ease: "power2.in" },
            `${label}+=${riseDur}`
          )
          // hard squash on impact, then spring back round with a little wobble
          .to(
            ball,
            { scaleX: 1.45, scaleY: 0.55, duration: 0.06, ease: "power1.out" },
            `${label}+=${riseDur + fallDur}`
          )
          .to(
            ball,
            { scaleX: 1, scaleY: 1, duration: 0.14, ease: "elastic.out(1,0.4)" },
            `${label}+=${riseDur + fallDur + 0.06}`
          );
      });

      // The finale: the ball arrives under the "i" and rises toward the dot
      // spot, but instead of one clean landing it overshoots and settles
      // with a real decaying bounce — GSAP's bounce.out ease traces that
      // rebound curve in a single tween, so it reads as actual physics
      // rather than a hand-tuned hop. The stem pops in as the bounce begins.
      const dotPos = positions[DOT_INDEX];
      const dotPeakY = dotPos.top - dotSize / 2 - 1;

      tl.to(letters[DOT_INDEX], { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: "back.out(2.5)" }, ">")
        .to(ball, { y: dotPeakY, duration: 0.65, ease: "bounce.out" }, "<")
        .to(ball, { scaleX: 1.15, scaleY: 0.85, duration: 0.06, ease: "power1.out" }, ">")
        .to(ball, { scaleX: 1, scaleY: 1, duration: 0.1, ease: "power1.inOut" }, ">")
        .to(ball, { width: dotSize, height: dotSize, duration: 0.12, ease: "power1.out" }, ">");

      // Once the dot settles, the rest of the name reveals as a wipe: a
      // green leading bar sweeps across while a clip-path opens up behind
      // it, uncovering the trailing letters in one continuous motion
      // instead of them popping in individually.
      if (TAIL) {
        const tailRect = tailRef.current.getBoundingClientRect();
        const barTop = tailRect.top - wrapRect.top;
        const barHeight = tailRect.height;
        const startX = tailRect.left - wrapRect.left;
        const endX = tailRect.right - wrapRect.left;
        const barWidth = 5;
        const wipeDur = 0.55;

        gsap.set(wipeBarRef.current, {
          top: barTop,
          left: 0,
          width: barWidth,
          height: barHeight,
          x: startX - barWidth / 2,
          opacity: 1,
        });
        gsap.set(tailRef.current, { clipPath: "inset(0% 100% 0% 0%)" });

        tl.to(
          wipeBarRef.current,
          { x: endX - barWidth / 2, duration: wipeDur, ease: "power1.inOut" },
          "+=0.15"
        )
          .to(tailRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: wipeDur, ease: "power1.inOut" }, "<")
          .to(wipeBarRef.current, { opacity: 0, duration: 0.2, ease: "power1.out" }, ">");
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-surface overflow-hidden"
    >
      <div
        ref={wrapRef}
        className="relative flex whitespace-nowrap font-serif4 font-bold text-on-surface opacity-0"
        style={{ fontSize: "clamp(28px, 7vw, 64px)", lineHeight: 1 }}
      >
        {HEAD.split("").map((ch, i) => (
          <span
            key={i}
            ref={setLetterRef}
            className="inline-block"
            style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
          >
            {i === DOT_INDEX ? "ı" : ch}
          </span>
        ))}
        <span ref={tailRef} className="inline-block">
          {TAIL}
        </span>
        <div
          ref={ballRef}
          className="absolute top-0 left-0 rounded-full all-shadow-30"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, #dcfbee 0%, #95d3ba 50%, #4f9a80 100%)",
          }}
        />
        <div ref={wipeBarRef} className="absolute rounded-xs bg-primary-fixed" />
      </div>
    </div>
  );
};

export default Preloader;
