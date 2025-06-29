{
  const body = document.body;
  const header = document.querySelector("header");
  const btnEnPage = header.querySelector(".btn-en-page");
  const btnMainMenu = header.querySelector(".btn-main-menu");
  const menuWrapper = header.querySelector(".menu-wrapper");

  btnEnPage.addEventListener("click", () => {
    window.location.href = "https://www.kakaocorp.com/ir/main?lang=en";
  });

  btnMainMenu.addEventListener("click", () => {
    body.classList.toggle("menu-open");
  });

  menuWrapper.addEventListener("click", (e) => {
    const targetButton = e.target.closest("button.accordion-btn");
    const targetMenu = e.target.closest("li");

    // 이벤트 위임 상황에서, 버튼이나 메뉴 항목 이외의 것을 클릭하였을 경우 함수 실행 중단 시키기 위한 코드
    if (!targetButton || !targetMenu) return;

    // 현재 열려 있는 메뉴 찾기
    const currentOpen = menuWrapper.querySelector(".accordion-open");

    // 이미 열린 메뉴가 있고, 그게 지금 클릭한 메뉴가 아니라면 기존에 열려 있던 메뉴 닫기
    // 두 개가 동시에 열리지 않게 하기 위한 if문
    if (currentOpen && currentOpen !== targetMenu) {
      currentOpen.classList.remove("accordion-open");
    }

    // 토글 (이미 열려 있던 메뉴면 닫고, 아니면 열기)
    targetMenu.classList.toggle("accordion-open");
  });
}
