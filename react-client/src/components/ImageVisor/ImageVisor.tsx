import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const ImageVisor = (props: { images: any[] }) => {
  const [index, setIndex] = useState(0);

  const LEFT = -1;
  const RIGHT = 1;

  const imagen = props.images[index];

  const changeImage = (direction: number) => {
    if (direction < 0 && index === 0) {
      setIndex(props.images.length - 1);
      return;
    }

    if (direction > 0 && index === props.images.length - 1) {
      setIndex(0);
      return;
    }

    setIndex(index + direction);
  };

  const dotStyleUnselected = "mx-3 opacity-50";
  const dotStyleSelected = "mx-3 opacity-90";

  return (
    <div className="relative w-full h-72">
      <img src={imagen} alt="" className="w-full h-72 object-cover" />
      <FontAwesomeIcon
        onClick={() => {
          changeImage(LEFT);
        }}
        className="cursor-pointer absolute left-3 top-1/2 text-black text-3xl"
        icon={faCaretLeft}
      />
      <FontAwesomeIcon
        onClick={() => {
          changeImage(RIGHT);
        }}
        className="cursor-pointer absolute right-3 top-1/2 text-black text-3xl"
        icon={faCaretRight}
      />
      <div className="absolute bottom-2 w-full flex flex-row justify-center">
        <FontAwesomeIcon
          icon={faCircle}
          className={index === 0 ? dotStyleSelected : dotStyleUnselected}
        />
        <FontAwesomeIcon
          icon={faCircle}
          className={index === 1 ? dotStyleSelected : dotStyleUnselected}
        />
        <FontAwesomeIcon
          icon={faCircle}
          className={index === 2 ? dotStyleSelected : dotStyleUnselected}
        />
        <FontAwesomeIcon
          icon={faCircle}
          className={index === 3 ? dotStyleSelected : dotStyleUnselected}
        />
      </div>
    </div>
  );
};

export default ImageVisor;
