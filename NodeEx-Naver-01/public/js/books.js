document.addEventListener("DOMContentLoaded", () => {
  const search_form = document.querySelector("form.search");
  const onSubmitHandler = (e) => {
    /**
     * submit event 는 사용자 코드에 의해 중단할수 없다
     * 중간에 데이터 검증을 실행하고
     * 데이터 검증에 실패 했을때 submit event 를 멈추고 다시 사용자에게
     * 입력을 할것을 요청해야 하는데 그것이 안된다
     *
     * 그래서 event 함수 처음에 e.preventDefault() 함수를 실행하여
     * 원래의 submit 이벤트를 강제로 종료 시켜야 한다.
     *
     * form 의 submit event 를 핸들링하는 함수에서는 반드시 코드 첫부분에
     * e.preventDefault() 함수를 실행해야 한다
     */
    e.preventDefault();
    // alert("Submit");
    const input = search_form.querySelector("input");
    if (!input.value) {
      alert("검색어를 입력해 주세요");
      input.select();
      return false;
    }
    search_form.submit();
  };
  /**
   * 화면의 form.search 에는 input box 가 한개만 있는 구조이다
   * 보통은 button 을 클릭하여 서버로 데이터를 전송하는데,
   * 현재의 경우는 input box 에 문자열을 입력하고 Enter 를 누르면
   * 서버로 데이터가 전송된다
   * 이때 form 에 발생하는 event  submit
   *
   * enter 를 눌럿을때
   * input box 에 문자열이 입력되었는지 검증을 하기 위해 submit event 를 핸들링한다
   *
   */
  search_form.addEventListener("submit", onSubmitHandler);
});
