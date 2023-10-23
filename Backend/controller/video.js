const Video = require("../models/video");

exports.getTrailer = async (req, res, next) => {
  const filmId = req.body.query;
  if (!filmId) {
    return res.status(400).send({ message: "Not found filmId params" });
  }

  const videos = await Video.fetchAll();
  const found = videos.find((video) => video.id === filmId);
  if (!found) {
    return res.status(400).send({ message: "Not found video" });
  }

  const isSuitable = found.videos.filter((vid) => {
    return vid.official && vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser");
  });

  if (isSuitable.length === 0) {
    return res.status(400).send({ message: "Not found video" });
  }

  const latestTrailer = isSuitable.filter(
    (s) => s.published_at === new Date(Math.max(...isSuitable.map((e) => new Date(e.published_at))).toISOString())
  );

  res.status(200).send(latestTrailer);
};