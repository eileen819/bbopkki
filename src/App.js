import { useState } from "react";
import { data } from "./imageDb";

// Fisher-Yates (Knuth) shuffle 알고리즘
function shuffleArray(array) {
  const shuffledArray = [...array]; // 원본 배열을 복사

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // 0부터 i까지의 랜덤한 인덱스를 선택
    const j = Math.floor(Math.random() * (i + 1));

    // 현재 인덱스 i와 랜덤한 인덱스 j의 요소를 교환
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

function Modal({ onClose, imgUrl }) {
  return (
    <div className="modal__container" onClick={onClose}>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <div
          className="box__image"
          style={{ backgroundImage: `url(${imgUrl})` }}
        ></div>
        <button className="btn--close" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const [shuffledData, setShuffledData] = useState(shuffleArray(data));
  // const [usedImg, setUsedImg] = useState([]);

  const modalOpen = (imageUrl) => {
    setSelectedImg(imageUrl);
    setIsModalOpen(true);
    // const unUsedImgs = data.filter((image) => !usedImg.includes(image.id));

    // if (unUsedImgs.length > 0) {
    //   const randomImg =
    //     unUsedImgs[Math.floor(Math.random() * unUsedImgs.length)];
    //   setSelectedImg(randomImg.image);
    //   setIsModalOpen(true);
    //   setUsedImg((prev) => [...prev, randomImg.id]);
    // } else {
    //   setUsedImg([]);
    // }
  };
  const onShuffle = () => setShuffledData(shuffleArray(data));

  return (
    <div className="container">
      <div className="inner">
        <div className="title">
          <div className="title__sub">💛 재유니를 뽑아라! 💛</div>
          <button className="btn--shuffle" onClick={onShuffle}>
            Shuffle
          </button>
        </div>
        <div className="image__container">
          {shuffledData.map((image) => (
            <div
              key={image.id}
              className="image__item"
              onClick={() => modalOpen(image.image)}
            ></div>
          ))}
        </div>
        {isModalOpen && (
          <Modal imgUrl={selectedImg} onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
