# 4주차 과제

이번 과제는 디자인 시안에 애니메이션을 적용하는 것이었는데,
Nexon의 마비노기 모바일 100일 기념 이벤트 페이지를 바탕으로
**GSAP 애니메이션**을 적용하고, 고해상도 이미지 대응 및 반응형 레이아웃까지 적용해보았습니다.

---

## 목차

- [과제 개요](#과제-개요)
- [애니메이션 구성](#애니메이션-구성)
- [반응형 처리](#반응형-처리)
- [이미지 최적화](#이미지-최적화)
- [회고](#회고)

---

## 과제 개요

- 기존 마비노기 모바일 이벤트 페이지를 기반으로 마크업을 재구성하고, 각 요소별로 등장 타이밍과 연출을 달리하며 애니메이션을 적용했습니다.
- `.container` 내부에 상단 영역, 캐릭터 영역, 텍스트 영역, CTA 버튼(a 태그) 등으로 마크업을 구성했습니다.
- 애니메이션은 **GSAP Timeline**을 사용하여 요소별 등장 타이밍과 순서를 조정했습니다.

---

## 애니메이션 구성

### GSAP `timeline` defaults 설정

```js
const tl = gsap.timeline({
  defaults: { opacity: 0, ease: "power2.out", duration: 0.5 },
});
```

### 순차 등장 애니메이션

- `.event-badge`: 위에서 작게 튀어나오는 듯한 `y + scale`
- `.subtitle`: 왼쪽에서 슬라이드 인
- `.main-title`: 아래에서 커지며 등장
- `.description`: 회전하며 펼쳐지듯 등장
- `.character-wrapper`: `scale` + `back.out(1.5)` 효과로 튀어나오듯 등장
- `.cta-link`: 아래에서 부드럽게 슬라이드 인

### 반복 애니메이션

- `.cta-link`: `y`축으로 위아래 흔들리는 모션 + `scale` 확대 축소 효과를 반복
- `.game-start`: 전체 애니메이션 완료 후, `scale` 반복 애니메이션 적용

---

## 반응형 처리

- `.main-container`는 기본적으로 `flex-direction: row`, **1024px** 이하에서는 column으로 설정하고, `.content-area`는 `order: 1`을, `.character-wrapper`에는 `order: 2`를 적용하여 캐릭터가 밑으로 내려가도록 하였습니다.

---

## 이미지 최적화

### `<picture>` 요소 활용 (main-title)

- 이미지 포맷 우선순위: AVIF → WebP → PNG
- 해상도 대응: 1x, 2x 지원

```html
<picture class="main-title">
  <source
    srcset="
      ./assets/images/img-text.avif    1x,
      ./assets/images/img-text@2x.avif 2x
    "
    type="image/avif"
  />
  <source
    srcset="
      ./assets/images/img-text.webp    1x,
      ./assets/images/img-text@2x.webp 2x
    "
    type="image/webp"
  />
  <img
    src="./assets/images/img-text.png"
    srcset="./assets/images/img-text.png 1x, ./assets/images/img-text@2x.png 2x"
    alt="마비노기 모바일 100일 간의 이야기"
  />
</picture>
```

### `image-set()` 활용 (CSS)

- 캐릭터 배경 이미지 등을 `<img>` 대신 `background-image`로 삽입하면서 해상도와 포맷 대응을 위해 CSS에서 `image-set()` 사용

```css
.character-wrapper {
  background-image: image-set(
    url("./assets/images/img-nao.avif") type("image/avif") 1x,
    url("./assets/images/img-nao@2x.avif") type("image/avif") 2x,
    url("./assets/images/img-nao.webp") type("image/webp") 1x,
    url("./assets/images/img-nao@2x.webp") type("image/webp") 2x,
    url("./assets/images/img-nao.png") type("image/png") 1x,
    url("./assets/images/img-nao@2x.png") type("image/png") 2x
  );
}
```

---

## 회고

- `.character-wrapper`의 `scale + back.out` 애니메이션을 적용하는 과정에서, 일시적으로 `transform` 영역이 커지면서 **x축 스크롤이 생기는 문제**가 발생했고, 이를 해결하기 위해 `html, body`에 `overflow-x: hidden`을 적용했습니다.

- 다만, **브라우저 창의 height가 작을 때**는 `y축 스크롤`도 함께 생겼고, 이를 `overflow-y: hidden`으로 막으려 했지만, **페이지에 콘텐츠가 많아 스크롤이 필요한 상황에서도 막히기 때문에** 적용하지 못했습니다. 결국 이 문제는 완전히 해결하지 못해 조금 아쉬움이 남았습니다...😢

- 그리고 더 화려하고 시선을 끄는 애니메이션을 만들고 싶었지만, **애니메이션의 구체적인 움직임**을 떠올리는 것이 어려웠습니다...(디자인을 보는 눈이 조금 더 있었더라면...)
