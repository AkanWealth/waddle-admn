import React, { useEffect, useState } from "react";
import {
  MapPin,
  Tag,
  X,
  UserRound,
  CircleCheck,
  BadgeCent,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { ImageData } from "./sampleData";
import { useRecommendationsStore } from "@/stores/useRecommendationStore";
import StatusBadge from "./StatusBadge";
import { recommendationService } from "@/utils/recommendationService";
import { LuMoveDiagonal } from "react-icons/lu";
type Creator = { name: string; email?: string; profile_picture?: string };

type EventDetails = {
  id: string;
  name: string;
  description?: string;
  address?: string;
  category?: string;
  images?: string[];
  facilities?: string[];
  tips?: string;
  creator?: Creator;
  status?: string;
  isDeleted?: boolean;
  isVerified?: boolean;
  isFree: boolean;
};
const PlacesDetailsModal = ({
  selectedPlace,
}: {
  selectedPlace: EventDetails;
}) => {
  console.log("This is the places own");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const handleImageClick = (image: ImageData, index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };
  const closeLightbox = () => setIsLightboxOpen(false);
  const showPrev = () => setLightboxIndex((idx) => (idx > 0 ? idx - 1 : idx));
  const showNext = (maxIndex: number) =>
    setLightboxIndex((idx) => (idx < maxIndex ? idx + 1 : idx));
  // Define a local type for the event structure
  const {
    openShowApproveDetailsModal,
    openShowRejectDetailsModal,
    closeShowPlaceDetailsModal,
  } = useRecommendationsStore();

  // if (!selectedPlace) {
  //   return (
  //     <div className="fixed inset-0 modal-backdrop flex items-center justify-center p-4 z-50">
  //       <div className="px-5 py-4 bg-white rounded-lg shadow-xl my-4 max-w-[700px] w-full max-h-screen overflow-y-auto">
  //         <div>Loading event details...</div>
  //       </div>
  //     </div>
  //   );
  // }

  const amenities =
    selectedPlace?.facilities && selectedPlace?.facilities.length > 0
      ? selectedPlace?.facilities
      : [];
  const images: ImageData[] =
    selectedPlace?.images && selectedPlace?.images.length > 0
      ? selectedPlace.images.map((img: string, idx: number) => ({
          id: idx + 1,
          src: img,
          alt: selectedPlace.name || "Event image",
        }))
      : [];

  // Use creator for submitted by, avatar, and email
  const creator: Creator = selectedPlace?.creator ?? {
    name: "",
    email: "",
    profile_picture: "",
  };
  const submittedBy = creator?.name || "Unknown";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const submittedByAvatar = creator?.profile_picture
    ? creator.profile_picture.startsWith("http")
      ? creator.profile_picture
      : `https://waddleapp-bucket.s3.eu-north-1.amazonaws.com/crowdsource/${creator.profile_picture}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(submittedBy)}`;
  const submittedByEmail = creator?.email || "No email";

  // Determine status using the same logic as in recommendations/page.tsx
  let derivedStatus: "Pending" | "Rejected" | "Approved" = "Pending";
  if (selectedPlace.status === "PENDING") {
    derivedStatus = "Pending";
  }
  if (selectedPlace.status === "APPROVED") {
    derivedStatus = "Approved";
  }
  if (selectedPlace.status === "REJECTED") {
    derivedStatus = "Rejected";
  }

  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center p-4  z-50">
      <div className="px-5 py-4 bg-white rounded-lg shadow-xl my-4 max-w-[700px] w-full max-h-screen overflow-y-auto">
        <section className="">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-[#404040] font-semibold text-xl">
              Place Details
            </h3>
            <X
              onClick={() => closeShowPlaceDetailsModal()}
              className="text-[#404040]"
            />
          </div>
          {derivedStatus === "Pending" && (
            <div className="flex   justify-end my-2.5">
              <div className="w-[80%] flex items-center gap-6">
                <button
                  onClick={openShowRejectDetailsModal}
                  type="button"
                  className="flex-1 border border-[#CC0000] px-3 py-2 text-[#CC0000] rounded-xl"
                >
                  Reject
                </button>
                <button
                  className="flex-1 bg-[#2853A6] px-3 py-2 rounded-xl text-[#F8F2EC]"
                  type="button"
                  onClick={openShowApproveDetailsModal}
                >
                  Approve
                </button>
              </div>
            </div>
          )}
          <div className="flex py-3">
            <p className="">{StatusBadge(derivedStatus)}</p>
          </div>
          <div className="">
            <h3 className="text-[#404040] font-semibold text-xl">
              {selectedPlace?.name || "Event Name"}
            </h3>
            <p className="text-[#565C69] font-normal">
              {selectedPlace?.description || "No description provided."}
            </p>
            <div className="">
              <div className="flex items-center gap-4 my-1.5">
                <div className="flex items-center gap-1">
                  <MapPin className="text-[#BDC0CE] text-[16px] h-[16px]" />
                  <p className="text-[#303237] font-semibold text-[15px]">
                    {selectedPlace?.address || "No address"}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="text-[#D45815] text-[16px] h-[16px]" />
                  <p className="text-[#404040] text-[14px]">
                    {selectedPlace?.category || "No category"}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <BadgeCent className="text-[#1E9A64] text-[16px] h-[16px]" />
                  <p className="text-[#404040] text-[14px]">
                    {selectedPlace.isFree ? "Free" : "Paid"}
                  </p>
                </div>
                {/* No fee in Place, so skip PoundSterling/fee */}
              </div>
              <div className="">
                <ParentsVisited
                  id={selectedPlace.id}
                  tag="place"
                  // parents={[
                  //   {
                  //     id: "1",
                  //     name: submittedBy,
                  //     avatar: submittedByAvatar,
                  //   },
                  // ]}
                />
              </div>
              <div className="">
                <ImageGallery
                  images={images}
                  maxVisible={4}
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="">
                  <h3 className="text-[#1D1D1E] font-bold">Submitted By:</h3>
                  <div className="flex items-center gap-5 text-[#1D1D1E]">
                    <div className="flex items-center gap-1">
                      <UserRound className="h-[15px]" />
                      <p className="text-[14px]">{submittedBy}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-[15px]" />
                      <p className="text-[14px]">{submittedByEmail}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F8F2EC] rounded-[8px] py-1.5 px-2.5">
                  <h3 className="text-[#303237] font-semibold text-[16px]">
                    Parent’s Tip
                  </h3>
                  <p className="text-[#565C69]">
                    {selectedPlace?.tips
                      ? selectedPlace?.tips
                      : "No tips provided."}
                  </p>
                </div>
                <div className="">
                  <h3 className="text-[#1D1D1E] font-bold">Facilities</h3>
                  <div className="flex flex-wrap items-center gap-6">
                    {amenities.length > 0 ? (
                      amenities.map((item: string) => (
                        <div key={item} className="flex items-center gap-2">
                          <CircleCheck className="h-[15px] text-[#1E9A64]" />
                          <p className="text-[15px] text-[#565C69]">{item}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-[15px] text-[#565C69]">
                        No facilities listed.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {isLightboxOpen && images.length > 0 && (
        <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="px-5 py-4 bg-[#f5f5f5] rounded-lg shadow-xl my-4 max-w-[700px] w-full max-h-screen overflow-hidden relative">
            <button
              aria-label="Close"
              onClick={closeLightbox}
              className="absolute top-3 right-3 z-10 text-[#404040] hover:text-black rounded-full p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative z-0 w-full h-[60vh]">
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, 700px"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={showPrev}
                disabled={lightboxIndex === 0}
                className={`flex items-center gap-2 px-3 py-2 rounded border border-[#D0D0D0] text-[#404040] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Prev
              </button>
              <span className="text-sm text-[#7E8494]">
                {lightboxIndex + 1} / {images.length}
              </span>
              <button
                onClick={() => showNext(images.length - 1)}
                disabled={lightboxIndex === images.length - 1}
                className={`flex items-center gap-2 px-3 py-2 rounded border border-[#D0D0D0] text-[#404040] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacesDetailsModal;

interface ParentsVisitedProps {
  id: string;
  tag: "place" | "event";
}

interface ApiParent {
  id: string;
  user: { name: string; profile_picture?: string };
}

export const ParentsVisited: React.FC<ParentsVisitedProps> = ({ id, tag }) => {
  const [isLoading, setIsLoading] = useState(true);
  const fetchParents = async () => {
    try {
      setIsLoading(true);
      if (tag == "event") {
        const response =
          await recommendationService.fetchParentsWhoMadeEventRecommendation(
            id
          );
        console.log(response, "This is the response for parents on event");
        if (response.success) {
          console.log(
            response.data.data.parents,
            "This is the response for parents on place"
          );
          setparentVisited(response.data.data.parents);
        }
      } else if (tag == "place") {
        const response =
          await recommendationService.fetchParentsWhoMadePlaceRecommendation(
            id
          );
        if (response.success) {
          console.log(
            response.data.data.parents,
            "This is the response for parents on place"
          );
          setparentVisited(response.data.data.parents);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchParents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [parentVisited, setparentVisited] = useState<ApiParent[]>([]);
  const [parentList, setparentList] = useState<ApiParent[]>([]);
  const [remainingCountNum, setremainingCountNum] = useState(0);
  // const displayedParents = parentVisited.slice(0, 3);
  // const remainingCount = Math.max(0, totalCount - displayedParents.length);
  useEffect(() => {
    const sortParent = () => {
      const displayedParents = parentVisited.slice(0, 3);
      setparentList(displayedParents);

      const remainingCount = Math.max(
        0,
        parentVisited.length - displayedParents.length
      );
      setremainingCountNum(remainingCount);
    };
    sortParent();
  }, [parentVisited]);

  return (
    <div className="flex items-center space-x-2 ">
      {isLoading ? (
        <div className="bg-[#F8F2EC] flex items-center px-3 py-2 rounded-xl gap-2">
          <svg
            className="animate-spin h-4 w-4 text-[#2853A6]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span className="text-sm text-[#1D1D1E] font-medium">
            Loading parents...
          </span>
        </div>
      ) : parentVisited.length > 0 ? (
        <div className="bg-[#F8F2EC] flex items-center px-3 py-2 rounded-xl gap-2">
          <div className="flex -space-x-2">
            {parentList.map((parent, index) => (
              <div
                key={parent.id}
                className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                style={{ zIndex: parentList.length - index }}
              >
                <Image
                  src={parent.user.profile_picture || "/Avatar.png"}
                  alt={parent.user.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            ))}
            {remainingCountNum >= 4 ? (
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-xs font-medium rounded-full border-2 border-white">
                +{remainingCountNum}
              </div>
            ) : (
              <p>{3}</p>
            )}
          </div>

          <span className="text-sm text-[#1D1D1E] font-medium">
            {parentVisited.length} Parents{" "}
            {tag == "event" ? "Going" : "Visited"}
          </span>
        </div>
      ) : (
        <div className="bg-[#F8F2EC] flex items-center px-3 py-2 rounded-xl gap-2">
          <p className="text-black">
            No Parent {tag == "event" ? "Going" : "Visited"}
          </p>
        </div>
      )}
    </div>
  );
};

interface ImageGalleryProps {
  images: ImageData[];
  maxVisible?: number;
  onImageClick?: (image: ImageData, index: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  maxVisible = 4,
  onImageClick,
}) => {
  const visibleImages = images.slice(0, maxVisible);
  const remainingCount = Math.max(0, images.length - maxVisible);

  return (
    <div className="my-2.5">
      {/* Images Label */}
      <h3 className="text-[#404040] font-semibold">Images</h3>

      {/* Image Gallery Container */}
      <div className="flex items-center">
        {visibleImages.map((image, index) => (
          <div
            key={image.id}
            className={`relative w-[120px] h-[85px] rounded-lg overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-transform duration-200 ${
              index > 0 ? "-ml-4" : ""
            }`}
            style={{ zIndex: maxVisible - index }}
            onClick={() => onImageClick?.(image, index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              // fill
              width={120}
              height={85}
              className="object-cover"
              // sizes="64px"
            />

            {/* Camera icon overlay for first image */}
            {index === 0 && (
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-black bg-opacity-50 rounded-sm flex items-center justify-center">
                <LuMoveDiagonal />
              </div>
            )}
          </div>
        ))}

        {/* Remaining count indicator */}
        {remainingCount > 0 && (
          <div
            className={`relative w-16 h-16 rounded-lg bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors duration-200 ${
              visibleImages.length > 0 ? "-ml-4" : ""
            }`}
            style={{ zIndex: 0 }}
            onClick={() => onImageClick?.(images[maxVisible], maxVisible)}
          >
            <span className="text-sm font-semibold text-gray-600">
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
