const testData = [
  {
    id: "1",
    name: "Yatogame-chan Kansatsu Nikki",
    description:
      "After growing up in Tokyo, high school student Jin Kaito moves to Nagoya where he meets Yatogame Monaka, a fellow student who puts her Nagoya dialect on full display. With her cat-like appearance and unvarnished Nagoya dialect, Yatogame won't open up to him at all. This popular local comedy is increasing the status of Nagoya through observation of the adorable Yatogame-chan!",
    picture:
      "https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/abf311bc630e6bb123e072f62c8f2320.jpg",
    wallArt:
      "https://static.vrv.co/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/76da51a0494fbcd18a5779165c8cd67c.jpg"
  },
  {
    id: "2",
    name: "One Piece",
    description:
      "Monkey. D. Luffy refuses to let anyone or anything stand in the way of his quest to become the king of all pirates. With a course charted for the treacherous waters of the Grand Line and beyond, this is one captain who'll never give up until he's claimed the greatest treasure on Earth: the Legendary One Piece!",
    picture:
      "https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/15c8f292c92584f73a65b2d0fd6a167c.jpg",
    wallArt:
      "https://static.vrv.co/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/4085817886f2fbb9cacfb975217bbcc2.jpg",
    seasons: [
      {
        seasonName: 1,
        episodes: [
          {
            name:
              "Hayami Hiro, Mihama Koji, Nishina Kazuki: Beyond The Rainbow",
            episodeNumber: 1,
            description:
              "The tumultuous Prism King Cup has ended, and Shin becomes a first-year high school student at Kakyoin Academy. Edel Rose's new students advance one year as well. In a new environment, Shin's heart races in anticipation for the future. However, the evil hand of Schwarz Rose's supervisor Noriyuki Jin is once again secretly closing in on Edel Rose...",
            picture:
              "https://static.vrv.co/imgsrv/display/thumbnail/320x180/catalog/crunchyroll/5718f09f545b937d1db74b6abd75ef95.jpg",
            watched: false,
            sources: () =>
              fetch(
                "https://www.wonderfulsubs.com/api/v1/media/stream?code=id=157276"
              )
          }
        ]
      }
    ]
  }
];

export default testData;
