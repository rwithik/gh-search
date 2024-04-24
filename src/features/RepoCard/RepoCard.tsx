import { useSelector } from "react-redux";
import { selectSelectedItem } from "../RepoCard/selectedRepoSlice";
import { copyText } from "../../utils";

export default function RepoCard() {
  const selectedItem = useSelector(selectSelectedItem);

  if (!selectedItem) {
    return (
      <div className="w-3/4 p-4 rounded-md border border-slate-200 text-slate-400 shadow shadow-white">
        Select a repo to see its details
      </div>
    );
  }

  return (
    <div className="w-3/4 h-64 p-4 rounded-md border border-slate-200 shadow shadow-white flex gap-4">
      <div className="flex flex-col basis-1/2">
        <h2 className="text-lg font-semibold">{selectedItem?.name}</h2>
        <div className="flex gap-2 items-center text-sm">
          <a className="cursor-pointer" href={selectedItem?.html_url}>
            Visit the repo
          </a>
          <svg
            onClick={() => copyText(selectedItem?.html_url)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
            />
          </svg>
        </div>
        <button
          onClick={() => console.log("Deploy clicked")}
          className="border self-start text-sm font-semibold border-white bg-white hover:bg-slate-100 text-slate-900 px-3 py-2 rounded-md mt-auto"
        >
          Deploy
        </button>
      </div>
      <div className="basis-1/2 text-slate-400">
        {selectedItem?.description}
      </div>
    </div>
  );
}
