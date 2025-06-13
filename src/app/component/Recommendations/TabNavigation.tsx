interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabData = ["Places", "Events"];

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="mb-6">
      <nav className="flex items-center border border-gray-300 rounded-lg p-0.5">
        {TabData.map((tab:string) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`relative font-inter py-3 px-8 text-center transition-colors ${
              activeTab === tab
                ? "text-blue-600 font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;
