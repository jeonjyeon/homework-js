# 3주차 과제

이번 과제는

1. 제공된 디자인 리소스 → 개발
2. 컴포넌트 클론 개발 (개선 반영)
3. 직접 만든 디자인 → 개발

이렇게 3가지의 선택지가 있었는데, 2번을 선택했습니다!

Off-Canvas, Accordion 등이 있는 `카카오 투자정보`를 클론 코딩하고자 합니다.

최종적으로는 Off-Canvas, Accordion, Tabs, Carousel 4가지를 모두 구현해 내는 것이 목표이지만,
Off-Canvas와 Accordion을 먼저 구현하고, 나머지는 도장깨듯이 찬찬히 진행해 보려 합니다!

---

## 목차

- [클론 코딩](#클론-코딩)
  - [UI](#UI)
  - [Off-Canvas](#Off-Canvas)
    - [HTML 마크업](#HTML-마크업)
    - [CSS 스타일링](#CSS-스타일링)
    - [JS 기능 구현](#JS-기능-구현)
  - [Accordion](#Accordion)
    - [HTML 마크업](#HTML-마크업)
    - [CSS 스타일링](#CSS-스타일링)
    - [JS 기능 구현](#JS-기능-구현)
- [기존 사이트에서 개선할 점](#기존-사이트에서-개선할-점)
  - [Off Canvas 및 Accordion 키보드 접근성 개선](#Off-Canvas-및-Accordion-키보드-접근성-개선)
  - [button 태그와 일부 a 태그 호버 스타일 미제공](#button-태그와-일부-a-태그-호버-스타일-미제공)
  - [Accordion 키보드 조작 개선](#Accordion-키보드-조작-개선)
- [회고](#회고)

---

## 클론 코딩

### UI

- Figma의 플러그인 중 하나인 `html to design`을 사용해서 `카카오 투자정보`의 UI를 받아왔습니다.
- 상단 고정형 헤더, Off-Canvas 메뉴, Accordion 내비게이션 등 실제 사이트의 UI 구조를 반영하여 구현하였습니다.
- Pretendard 폰트를 사용하고, CSS Custom Properties로 여백, 색상 등을 설정했습니다.

### Off Canvas

#### HTML 마크업

- `<button class="btn-main-menu">`를 클릭하면 전체 메뉴(.main-menu)가 화면에 고정되어 나타납니다.
- `.main-menu`는 `ul.menu-wrapper > li.menu` 구조로 구성되어 있으며, accordion과 연동되는 메뉴 구조를 포함하고 있습니다.

#### CSS 스타일링

- `.main-menu`는 `position: fixed`와 `z-index: 100`을 통해 다른 콘텐츠 위에 떠 있도록 설정했습니다.
- `body`에 `.menu-open` 클래스가 추가될 때, `.main-menu`가 `display: flex`로 나타나도록 했습니다.
- `.hamburger` 아이콘과 `.close` 아이콘은 상태에 따라 서로 교체되도록 CSS로 제어했습니다.

#### JS 기능 구현

- `btn-main-menu` 클릭 시 `body`에 `menu-open` 클래스를 toggle하여 메뉴를 여닫을 수 있습니다.
- Escape 키를 눌렀을 때
  - Accordion이 열려 있으면 Accordion만 닫고, 그렇지 않으면 Off-Canvas를 닫도록 처리했습니다.

### Accordion

#### HTML 마크업

- 각 accordion 항목은 `<li class="menu">` 안에 `<button class="accordion-btn">`과 `<ul class="accordion-contents">`로 구성되어 있습니다.
- accordion 콘텐츠는 `<a>` 태그로 구성되어 있고, 외부 링크로 이동하도록 `href`에 링크를 넣어놨습니다.

#### CSS 스타일링

- 기본적으로 `.accordion-contents`는 `display: none`이고, `.menu` 클래스가 있는 `<li>` 태그에 `.accordion-open` 클래스가 추가되면 `.accordion-contents`는 `display: flex`가 됩니다.
- accordion 항목 및 링크 항목에 `hover` 시, `text-decoration: underline`을 적용하여 상호작용 요소임을 인지하기 쉽게 하였습니다.

#### JS 기능 구현

- 이벤트 위임 방식으로 `.menu-wrapper`에 클릭 이벤트를 등록하였고, 이미 열려 있는 메뉴가 있으면 새로 클릭한 메뉴 외에는 자동으로 닫히며, accordion 항목을 하나씩만 열 수 있도록 구현하였습니다.

---

## 기존 사이트에서 개선할 점

### Off Canvas 및 Accordion 키보드 접근성 개선

#### 문제점

- `X` 버튼 클릭이나 Tab 포커스를 통해 닫을 수는 있지만, 키보드 사용 시 `ESC` 키로는 닫히지 않는 것을 발견하게 되었습니다.
- 그래서 `ESC` 키를 통한 키보드 접근성도 추가해 준다면 좋을 것 같다는 생각이 들었습니다.

#### 개선 방향

- 키보드로도 자연스럽게 닫을 수 있도록 `keydown` 이벤트에서 `Escape` 키를 감지해 Off-Canvas 및 Accordion 닫기 처리를 하여 개선해 보았습니다.

#### 코드

```js
// Escape 키로 아코디언 또는 메뉴 닫기
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  const currentOpen = menuWrapper.querySelector(".accordion-open");

  if (currentOpen) {
    // 아코디언이 열려있으면, 아코디언만 닫기
    currentOpen.classList.remove("accordion-open");
  } else if (body.classList.contains("menu-open")) {
    // 아코디언이 닫혀있고,  메인 메뉴가 열려있으면 메인 메뉴 닫기
    body.classList.remove("menu-open");
  }
});
```

### button 태그와 일부 a 태그 호버 스타일 미제공

#### 문제점

- 마우스 사용 시, 버튼에 커서를 올렸을 때, **커서 변경**은 있지만, 호버 스타일이 없어서 **만약 호버 스타일이 있다면 상호작용 가능 요소인지 시각적으로 구분하기 더욱 쉬울 것**이라고 생각했습니다.
- 그리고 Off-Canvas에서 하단의 두 요소는 `<a>` 태그인데, 이 또한 커서 변경은 있지만, 호버 스타일이 없었습니다.

#### 개선 방향

- 마우스 hover 시 **배경색 변화**, **커서 변경**, **ttext-decoration을 underline**으로 설정하는 등 개선해 보았습니다.

#### 코드

```css
button :hover {
  cursor: pointer;
  background-color: var(--gray-400);
  border-radius: var(--space-8);
}

.link-find-out-more {
  &:hover {
    background-color: var(--gray-400);
    box-shadow: 0 0 0 1px var(--black);
  }
}

a:hover {
  text-decoration: underline;
}
```

### Accordion 키보드 조작 개선

#### 문제점

- Accordion 버튼에 `Tab`으로 포커스를 준 후 `Enter` 키를 누르면 정상적으로 열립니다.
- 하지만 `Space`(스페이스바) 키를 통해 Accordion을 열어보려 했으나, 열리지 않았습니다.

#### 원인

- 알고 보니, 기존 사이트에서 Accordion 항목을 `<a>` 태그로 마크업을 했다는 것입니다.
- `<a>` 태그는 Enter 키 입력 시 브라우저가 기본적으로 `click` 이벤트를 발생시키지만, `Space` 키는 기본적으로 스크롤만 발생하고 `click` 이벤트는 발생하지 않는다고 합니다.
- 반면에 `<button>` 태그는 브라우저가 `Enter`, `Space에` 대해 자동으로 `click` 이벤트를 발생시켜서 키보드 접근성이 보장된다는 사실을 알게 되었습니다!!

#### 개선 방향

- Accordion 항목을 `<a>` 태그가 아닌 `<button>` 태그를 사용하여, 키보드 접근성을 보장하도록 개선했습니다.

#### 코드

```html
<li class="menu">
  <button class="accordion-btn" type="button">
    주식정보<svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 4L7.07595 10L13 4"
        stroke="#999999"
        stroke-width="0.964286"
        stroke-miterlimit="10"
      />
    </svg>
  </button>
  <ul class="accordion-contents">
    <li>
      <a href="https://www.kakaocorp.com/ir/stockInformation">주가정보</a>
    </li>
    <li>
      <a href="https://www.kakaocorp.com/ir/dividendInformation">주주환원</a>
    </li>
  </ul>
</li>
```

## 회고

- HTML 마크업부터 CSS 스타일링, JS 기능 구현까지 처음부터 직접 구성해 보면서 처음엔 너무 막막했지만, 하나하나 차근차근 고민하고 어려운 부분은 ChatGPT의 도움을 받아 가며, 결국 완성에 가까워질수록 큰 뿌듯함을 느꼈습니다!
- 그런데... 스타일링 중 예상치 못한 문제가 생기기도 했습니다😢 `main-menu`에 `overflow-y: scroll`을 적용해 스크롤이 가능하도록 설정했는데, 동시에 body도 스크롤이 가능해져서 스크롤이 중복되는 현상이 발생했지만...?! Off-Canvas 메뉴가 열려있을 때만 `body`에 `overflow: hidden;`를 적용해서 스크롤을 막는 방식으로 해결하였습니다!!😁
- 마크업을 진행하면서 틈틈이 HTML Validator를 통해 오류와 경고를 확인했는데, 점점 오류가 사라지고 마크업이 추가되어도 오류가 없었을 때 행복했습니다🤭(소확행 그 자체)
- 그리고 새벽까지 이어진 작업 시간 동안 14기 몇몇 분들과 함께 디스코드 채널에 있었는데, 함께 있다는 것만으로도 정말 든든했습니다! 같은 공간에서 과제를 해나가는 그 분위기만으로도 큰 위로와 동기부여가 되었고, 그래서 3주차 과제도 무사히 마무리할 수 있지 않았나~ 싶습니다!
