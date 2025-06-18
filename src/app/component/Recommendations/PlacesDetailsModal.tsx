import React from "react";
import {
  MapPin,
  Tag,
  X,
  PoundSterling,
  UserRound,
  Mail,
  CircleCheck,
} from "lucide-react";
import Image from "next/image";
import { ImageData, sampleImages } from "./sampleData";
import { useRecommendationsStore } from "@/stores/useRecommendationStore";

const PlacesDetailsModal = () => {
  const handleImageClick = (image: ImageData, index: number) => {
    console.log("Image clicked:", image, "at index:", index);
  };
  const amenities = ["Parking", "Toilets", "Café", "Playground"];
  const {openShowApproveDetailsModal, closeShowApproveDetailsModal, closeShowPlaceDetailsModal, selectedPlace}=useRecommendationsStore()
  console.log(selectedPlace, "This is the selected")
  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center p-4  z-50">
      <div className="px-5 py-4 bg-white rounded-lg shadow-xl my-4 max-w-[700px] w-full max-h-screen overflow-y-auto">
        <section className="">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-[#404040] font-semibold text-xl">
              Place Details
            </h3>
            <X onClick={()=>closeShowPlaceDetailsModal()} className="text-[#404040]" />
          </div>
          <div className="flex   justify-end my-2.5">
            <div className="w-[80%] flex items-center gap-6">
              <button
             onClick={closeShowApproveDetailsModal}
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
          <div className="">
            <h3 className="text-[#404040] font-semibold text-xl">
              Fun Forest Walk – Highwoods Country Park
            </h3>
            <p className="text-[#565C69] font-normal">
              Great open space for kids to run free. Lots of nature trails and
              picnic spots!
            </p>
            <div className="">
              <div className="flex items-center gap-4 my-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className=" text-[15px] h-[15px]" />
                  <p className="text-[#303237] font-semibold text-[15px]">
                    Colchester, 6km away
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="text-[#D45815] text-[14px] h-[14px]" />
                  <p className="text-[#404040] text-[14px]">Outdoor</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="border px-0.5 border-green-300 py-1.5 rounded-full">
                    <PoundSterling className="text-[14px] h-[14px] text-green-300" />
                  </span>
                  <p className="text-[#404040] text-[14px]">Free</p>
                </div>
              </div>
              <div className="">
                <ParentsVisited />
              </div>
              <div className="">
                <ImageGallery
                  images={sampleImages}
                  maxVisible={4}
                  onImageClick={handleImageClick}
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="">
                  <h3 className="text-[#1D1D1E] font-bold">Submitted By:</h3>
                  <div className="flex items-center gap-5 text-[#1D1D1E]">
                    <div className="flex items-center gap-2">
                      <UserRound className="h-[15px]" />
                      <p className="text-[14px]">Janet Doe</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-[15px]" />
                      <p className="text-[14px]">janetdoe@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F8F2EC] rounded-[8px] py-1.5 px-2.5">
                  <h3 className="text-[#303237] font-semibold text-[16px]">
                    Parent’s Tip
                  </h3>
                  <p className="text-[#565C69]">
                    Brings your child rainboot if it’s raining, the environment
                    get very muddy
                  </p>
                </div>
                <div className="">
                  <h3 className="text-[#1D1D1E] font-bold">Facilities</h3>
                  <div className="flex flex-wrap items-center gap-6">
                    {amenities.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CircleCheck className="h-[15px] text-[#1E9A64]" />
                        <p className="text-[15px] text-[#565C69]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlacesDetailsModal;

interface Parent {
  id: string;
  name: string;
  avatar: string;
}

interface ParentsVisitedProps {
  parents?: Parent[];
  totalCount?: number;
}

const ParentsVisited: React.FC<ParentsVisitedProps> = ({
  parents = [
    {
      id: "1",
      name: "John Doe",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=random",
    },
    {
      id: "3",
      name: "Mike Johnson",
      avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=random",
    },
  ],

  totalCount = 23,
}) => {
  const displayedParents = parents.slice(0, 3);
  const remainingCount = Math.max(0, totalCount - displayedParents.length);

  return (
    <div className="flex items-center space-x-2 ">
      <div className="bg-[#F8F2EC] flex items-center px-3 py-2 rounded-xl gap-2">
        <div className="flex -space-x-2">
          {displayedParents.map((parent, index) => (
            <div
              key={parent.id}
              className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden"
              style={{ zIndex: displayedParents.length - index }}
            >
              <Image
                src={parent.avatar}
                alt={parent.name}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
          ))}

          {remainingCount > 0 && (
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-xs font-medium rounded-full border-2 border-white">
              +{remainingCount}
            </div>
          )}
        </div>

        <span className="text-sm text-[#1D1D1E] font-medium">
          Parents Visited
        </span>
      </div>
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
            className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-transform duration-200 ${
              index > 0 ? "-ml-4" : ""
            }`}
            style={{ zIndex: maxVisible - index }}
            onClick={() => onImageClick?.(image, index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="64px"
            />

            {/* Camera icon overlay for first image */}
            {index === 0 && (
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-black bg-opacity-50 rounded-sm flex items-center justify-center">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
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
