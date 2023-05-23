import { signOut } from "next-auth/react";
import { type Dispatch, type SetStateAction } from "react";

const BottomNav = ({
  visibleTabs,
  setActiveTab,
  setShowModal,
  isSelfProfile,
}: {
  visibleTabs: {
    name: string;
    icon: JSX.Element;
  }[];
  setActiveTab: Dispatch<SetStateAction<number>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isSelfProfile: boolean;
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 h-16 w-full max-w-lg -translate-x-1/2 rounded-full border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
      <div
        className={`mx-auto grid h-full max-w-lg ${
          isSelfProfile ? "grid-cols-5" : "grid-cols-3"
        }`}
      >
        {visibleTabs.map((tab, index) => {
          const isFirstTab = index === 0;
          const isLastTab = index === visibleTabs.length - 1;

          const tabClassName = `group inline-flex flex-col items-center justify-center bg-white px-5 hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-900 ${
            isFirstTab ? "rounded-l-full" : ""
          } ${isLastTab ? "rounded-r-full" : ""} ${
            !isFirstTab && !isLastTab
              ? "border-l border-r border-gray-200 dark:border-gray-600"
              : ""
          }`;

          return (
            <button
              onClick={async () => {
                setActiveTab(index);
                if (isSelfProfile) {
                  if (index === 1) {
                    setShowModal(true);
                  }
                  if (index === 4) {
                    await signOut();
                  }
                  if (!(index === 1)) {
                    setShowModal(false);
                  }
                }
              }}
              key={index}
              type="button"
              className={tabClassName}
            >
              {tab.icon}
              <span className="mt-2 hidden text-xs font-medium text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100 sm:block">
                {tab.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
