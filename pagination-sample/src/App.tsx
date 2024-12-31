import { useState } from "react";
import {
  IconChevronCompactDown,
  IconChevronCompactUp,
} from "@tabler/icons-react";
import paginationMessage from "./config/paginationMessages";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [buttonCount, setButtonCount] = useState(3);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <ExpandButton isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {isExpanded && (
        <div className="bg-slate-100 flex flex-col items-center mx-64 mb-16 p-4 rounded-b-lg gap-4">
          <PageButton buttonCount={buttonCount} currentPage={currentPage} />
          <NavigationMessage message={paginationMessage[currentPage - 1]} />
          <Navigation
            buttonCount={buttonCount}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}

function ExpandButton({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: Function;
}) {
  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div
      className={`bg-slate-100 flex flex-col items-center mx-64 mt-16 p-4 rounded-t-lg gap-4 ${
        !isExpanded && " rounded-b-lg"
      }`}
      onClick={handleExpand}
    >
      {!isExpanded && <IconChevronCompactDown />}
      {isExpanded && <IconChevronCompactUp />}
    </div>
  );
}

function PageButton({
  currentPage,
  buttonCount,
}: {
  currentPage: number;
  buttonCount: number;
}) {
  return (
    <div className="w-full flex justify-around">
      {Array.from({ length: buttonCount }, (_, i) => (
        <button
          key={i}
          className={`bg-gray-600 text-white rounded-full w-8 h-8 shadow-lg ${
            i + 1 === currentPage &&
            "bg-white text-black border-2 border-slate-400"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

function NavigationMessage({ message }: { message: string }) {
  return (
    <p className="text-center border-4 border-dotted border-slate-400 px-8 py-4 rounded-full">
      {message}
    </p>
  );
}

function Navigation({
  setCurrentPage,
  buttonCount,
}: {
  setCurrentPage: Function;
  buttonCount: number;
}) {
  const changePage = (count: number) => {
    setCurrentPage((prevPage: number) => {
      if (prevPage + count < 1) return 1;
      if (prevPage + count > buttonCount) return buttonCount;
      return prevPage + count;
    });
  };

  return (
    <div className="flex gap-8">
      <button
        className="rounded-full px-8 py-1 bg-gradient-to-br from-slate-400 to-slate-600 text-white hover:bg-gradient-to-bl hover:from-red-200 hover:to-blue-400 hover:text-slate-100"
        onClick={() => changePage(-1)}
      >
        Previous
      </button>

      <button
        className="rounded-full px-8 py-1 bg-gradient-to-bl from-slate-400 to-slate-600 text-white hover:bg-gradient-to-bl hover:from-red-200 hover:to-blue-400 hover:text-slate-100"
        onClick={() => changePage(1)}
      >
        Next
      </button>
    </div>
  );
}

export default App;
