import { type FunctionComponent, useState } from "react";
import { AiFillDelete, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";
import BlurImage from "../blurImage";
import { type JsonArray } from "@prisma/client/runtime/library";
import { api } from "../../utils/api";
import { toast } from "react-hot-toast";

type ImageSliderProps = {
  images: JsonArray;
  eventid?: number;
  deleteButton?: boolean;
};

const ImageSlider: FunctionComponent<ImageSliderProps> = ({
  images,
  eventid,
  deleteButton,
}: ImageSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagestate, setImagestate] = useState(images);
  const deleteEventImage = api.eventRouter.deleteEventImage.useMutation();

  const handleNextSlide = () => {
    const newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    const newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  const handleDelete = async () => {
    if (imagestate.length > 1) {
      const currentImage = images[currentSlide];
      const loadingToast = toast.loading("Please wait...");
      try {
        await deleteEventImage.mutateAsync(
          {
            id: eventid as number,
            source: currentImage as string,
          },
          {
            onSuccess: () => {
              if (images.length > 1)
                images.splice(images.indexOf(currentImage || ""), 1);
              setImagestate(images);
              toast.dismiss(loadingToast);
              setCurrentSlide(0);
              toast.success("Image removed successfully");
            },
          },
        );
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error("Error deleting image");
        console.log(error);
      }
    } else {
      toast.error("Last image cannot be deleted");
    }
  };

  return (
    <div className="relative">
      {imagestate.length > 1 && (
        <AiOutlineLeft
          onClick={handlePrevSlide}
          className="absolute inset-y-1/2 left-0 z-20 m-auto cursor-pointer text-5xl text-gray-400"
        />
      )}
      <div className="relative m-auto flex h-[350px] w-full overflow-hidden">
        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative z-10 flex h-full w-full"
        >
          {imagestate &&
            imagestate.map((image, index) => {
              if (index === currentSlide) {
                return (
                  <BlurImage
                    alt="event images"
                    key={index}
                    src={image?.toString() || ""}
                    className="max-h-[550px] w-full rounded-xl"
                    style={{ objectFit: "contain" }}
                    height={500}
                    width={500}
                  />
                );
              }
            })}
        </Swipe>
      </div>
      {imagestate.length > 1 && (
        <AiOutlineRight
          onClick={handleNextSlide}
          className="absolute inset-y-1/2 right-0 z-20 m-auto cursor-pointer text-5xl text-gray-400"
        />
      )}

      {deleteButton && imagestate.length > 1 && (
        <div className="mt-3 flex flex-col flex-nowrap items-center justify-center">
          <AiFillDelete
            size={30}
            className="cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
