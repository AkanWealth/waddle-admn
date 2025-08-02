import Image from "next/image";
import { motion } from "framer-motion";

const EmptyNotification = () => {
  return (
    <div className="flex h-[522px] justify-center items-center px-4">
      <motion.div 
        className="flex flex-col gap-3 items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20, 
            delay: 0.2 
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/NoNotification.svg"
            alt="emptyNotification"
            width={80}
            height={80}
          />
        </motion.div>
        <motion.h3 
          className="text-center text-[#303237] text-[16px] font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          No new notifications at the moment
        </motion.h3>
        <motion.p 
          className="text-center text-[#565C69] text-[14px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Check back later for updates.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default EmptyNotification;
