// 모듈 가져오기
const axios = require("axios");
const cheerio = require("cheerio");

function crawler() {
  const url = "https://news.daum.net/ranking/popular"; // get request를 보낼 url

  // axios로 get request 보내기
  axios.get(url).then((res) => {
    // console.log(res);
    // console.log(res.status);
    if (res.status === 200) {
      // crawling code
      let crawledNews = []; // 객체 배열 형태로 뉴스를 가져 옴.
      // [{title: "...", summary: "...", img: "..."}, {title: "...", summary: "...", img: "..."}, ...]

      // res.data에 있는 tag를 cheerio로 검색해서 변수에 담기
      const $ = cheerio.load(res.data);
      const $newsList = $("#mArticle > div.rank_news > ul.list_news2 > li"); // 각 뉴스의 selector
      $newsList.each(function (i) {
        // $newsList를 순회하며 crawledNews 배열에 각 객체를 저장
        crawledNews[i] = {
          title: $(this).find("li > div.cont_thumb > strong > a").text(),
          summary: $(this).find("li > div.cont_thumb > div > span").text(),
          img: $(this).find("li > a > img").attr("src"),
        };
      });
      console.log(crawledNews);
    }
  });
}

crawler();
