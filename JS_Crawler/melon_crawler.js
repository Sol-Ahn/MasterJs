// 모듈 가져오기
const axios = require("axios");
const cheerio = require("cheerio");

function melonCrawler() {
  const url = "https://www.melon.com/chart/";

  axios.get(url).then((res) => {
    if (res.status === 200) {
      let crawledMusic = [];

      const $ = cheerio.load(res.data);
      const $musicList = $("table > tbody > tr");
      $musicList.each(function (i) {
        crawledMusic[i] = {
          title: $(this)
            .find("td > div > div > div.ellipsis.rank01 > span > a")
            .text(),
          artist: $(this)
            .find("td > div > div > div.ellipsis.rank02 > a")
            .text(),
          img: $(this).find("td > div > a > img").attr("src"),
        };
      });
      console.log(crawledMusic);
    }
  });
}

melonCrawler();
