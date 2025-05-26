// import { MessageSquareX, Quote, ThumbsUp, Route } from "lucide-react";
// const RecommendationActionModalItems = [
//   {
//     id: 1,
//     icon: <Route />,
//     text: "View Details",
//   },
//   {
//     id: 2,
//     icon: <Quote />,
//     text: "Parent Reviews",
//   },
//   {
//     id: 3,
//     icon: <ThumbsUp />,
//     text: "Approve Place",
//   },
//   {
//     id: 4,
//     icon: <MessageSquareX />,
//     text: "Reject Place",
//   },
// ];

// const RecommendationActionModal = () => {
//   return (
//     <section className="absolute top-0 right-0 ">
//       <div className="border-b-[#E5E7EF]  bg-white shadow-2xl z-50 w-[290px] rounded-[20px]">
//         {RecommendationActionModalItems.map((item) => (
//           <div
//             key={item.id}
//             className="py-2 text-[#303237]  hover:bg-amber-400 cursor-pointer"
//           >
//             <div className="flex items-center pl-2 gap-2.5">
//               {item.icon}
//               <h3 className="text-base font-normal">{item.text}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default RecommendationActionModal;


import { MessageSquareX, Quote, ThumbsUp, Route } from "lucide-react";

const RecommendationActionModalItems = [
  {
    id: 1,
    Icon: Route,
    text: "View Details",
  },
  {
    id: 2,
    Icon: Quote,
    text: "Parent Reviews",
  },
  {
    id: 3,
    Icon: ThumbsUp,
    text: "Approve Place",
  },
  {
    id: 4,
    Icon: MessageSquareX,
    text: "Reject Place",
  },
];

const RecommendationActionModal = () => {
  return (
    <section className="absolute top-0 right-0">
      <div className="border-b-[#E5E7EF] bg-white shadow-2xl z-50  rounded-[20px]">
        {RecommendationActionModalItems.map(({ id, Icon, text }) => (
          <div
            key={id}
            role="button"
            tabIndex={0}
            className="py-2 text-[#303237] hover:bg-[#EAEEF6] cursor-pointer w-[290px]"
          >
            <div className="flex items-center pl-5 gap-2.5">
              <Icon />
              <h3 className="text-base font-normal">{text}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendationActionModal;
