document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({
    defaults: { opacity: 0, ease: "power2.out", duration: 0.5 },
  });

  // 순차 등장
  tl.from(".event-badge", {
    y: -20,
    scale: 0.8,
  })
    .from(
      ".subtitle",
      {
        x: -50,
      },
      "-=0.3",
    )
    .from(
      ".main-title",
      {
        y: 100,
        scale: 1.2,
        duration: 0.6,
      },
      "-=0.4",
    )
    .from(
      ".description",
      {
        rotationX: -90,
        transformOrigin: "top center",
        duration: 0.6,
      },
      "-=0.3",
    )
    .from(
      ".character-wrapper",
      {
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.5)", // 튕기듯 등장
        transformOrigin: "center bottom", // x는 center, y는 bottom 기준으로 적용
      },
      "-=0.5",
    )
    .from(
      ".cta-link",
      {
        y: 50,
      },
      "-=0.2",
    );

  // 등장 애니메이션 끝난 뒤 시작 (tl 전체 끝난 뒤 시작)
  tl.add(() => {
    // cta-link 흔들기 + 약간의 확대/축소 반복 효과
    gsap.to(".cta-link", {
      y: -5,
      scale: 1.02,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 1.5,
    });

    // game-start에 scale 반복 효과
    gsap.to(".game-start", {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut",
    });
  });
});
