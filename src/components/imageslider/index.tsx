import { type FunctionComponent, useState } from "react";
import { AiFillDelete, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe"
import BlurImage from "../blurImage";
import { type JsonArray} from "@prisma/client/runtime/library";
import { api } from "../../utils/api";
import { toast } from "react-hot-toast";

type ImageSliderProps = {
    images: JsonArray;
    height: number;
    width: number;
    eventid?: number;
    deleteButton?: boolean;
};

const ImageSlider: FunctionComponent<ImageSliderProps> = ({ images, height, width, eventid, deleteButton }: ImageSliderProps) => {
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
                await deleteEventImage.mutateAsync({
                    id: eventid as number,
                    source: currentImage as string,
                }, {
                    onSuccess: () => {
                        if (images.length > 1)
                            images.splice(images.indexOf(currentImage || ""), 1);
                        setImagestate(images);
                        toast.dismiss(loadingToast);
                        setCurrentSlide(0);
                        toast.success("Image removed successfully");
                    }
                });
            } catch (error) {
                toast.dismiss(loadingToast);
                toast.error("Error deleting image");
                console.log(error);
            }
        } else {
            toast.error("Last image cannot be deleted")
        }
    }    

    return (
        <div className="relative">
            <AiOutlineLeft
                onClick={handlePrevSlide}
                className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
            />
            <div className="w-full h-[350px] flex overflow-hidden relative m-auto">
                <Swipe
                onSwipeLeft={handleNextSlide}
                onSwipeRight={handlePrevSlide}
                className="relative z-10 w-full h-full flex"
                >
                {imagestate && imagestate.map((image, index) => {
                    if (index === currentSlide) {
                        return (
                            <BlurImage
                                alt="event images"
                                key={index}
                                src={image?.toString() || ""}
                                className="max-h-[550px] w-full rounded-xl"
                                style={{ objectFit: "contain" }}
                                height={height}
                                width={width}
                            />
                        );
                    }
                })}
                </Swipe>
            </div>
            <AiOutlineRight
                onClick={handleNextSlide}
                className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
            />
            {
                deleteButton && (imagestate.length>1) && (
                    <div className="mt-3 flex flex-col items-center justify-center flex-nowrap">
                        <AiFillDelete size={30} className="cursor-pointer" onClick={handleDelete}/>
                    </div>
                )
            }  
        </div>
    );
};

export default ImageSlider;