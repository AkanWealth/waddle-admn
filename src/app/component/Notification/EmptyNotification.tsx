import Image from "next/image";


const EmptyNotification = () => {
 
  return (
    <div className="flex h-[522px] justify-center items-center px-4">
      <div className="flex flex-col gap-3 items-center justify-between">
        <Image
          src="/NoNotification.svg"
          alt="emptyNotification"
          width={80}
          height={80}
        />
        <h3 className="text-center text-[#303237] text-[16px] font-medium">
          No new notifications at the moment
        </h3>
        <p className="text-center text-[#565C69] text-[14px]">
          Check back later for updates.
        </p>
      </div>
    </div>
  );
};

export default EmptyNotification;
