// components/NotificationItem.tsx
import Image from "next/image";
import { motion } from "framer-motion";

interface NotificationItemProps {
  isRead: boolean;
  title: string;
  description: string;
  date: string;
  timeAgo: string;
  onClick?: () => void;
  onHover?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  isRead,
  title,
  description,
  date,
  timeAgo,
  onClick,
  onHover,
}) => {
  return (
    <motion.div
      className="flex gap-3 p-4 border-b cursor-pointer"
      whileHover={{ backgroundColor: "#f9fafb" }}
      transition={{ duration: 0.2 }}
      layout
      onClick={onClick}
      onMouseEnter={onHover}
    >
      {/* Icon */}
      <div className="shrink-0 relative">
        <motion.div
          className="w-10 h-10 rounded-full bg-[#F8F2EC] flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image width={24} height={24} src="/WaddleImg.png" alt="avatar" />
        </motion.div>
        {!isRead && (
          <motion.div
            className="bg-[#1E9A64] h-[8px] w-[8px] absolute top-0 left-0 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          ></motion.div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <motion.h3
          className="font-semibold text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {description}
        </motion.p>
        <motion.div
          className="text-sm text-gray-400 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {date}
        </motion.div>
      </div>

      {/* Time + More Icon */}
      <div className="flex flex-col justify-between items-end text-sm text-gray-400">
        <span>{timeAgo}</span>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {/* <MoreVertical className="w-4 h-4 mt-2 cursor-pointer" /> */}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotificationItem;
