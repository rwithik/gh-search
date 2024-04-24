import { useSelector } from "react-redux";
import { selectSelectedItem } from "../RepoCard/selectedRepoSlice";
import { copyText, shortNumber } from "../../utils";
import Button from "../../components/Button";
import copyIcon from "../../assets/icons/copy.svg";

export default function RepoCard() {
  const selectedItem = useSelector(selectSelectedItem);

  if (!selectedItem) {
    return (
      <div className="w-3/4 p-4 rounded-md border border-black text-slate-600 shadow shadow-white">
        Select a repo to see its details
      </div>
    );
  }

  return (
    <div className="w-full h-64 p-4 rounded-md border border-black shadow flex gap-4">
      <div className="flex flex-col gap-2 basis-1/2">
        <h2 className="text-lg font-semibold">{selectedItem?.full_name}</h2>
        <span className="text-sm text-slate-600">
          {shortNumber(selectedItem.stargazers_count)} stars
        </span>
        <span className="text-sm text-slate-600">
          {shortNumber(selectedItem.forks_count)} forks
        </span>
        <span className="text-sm text-slate-600">
          {shortNumber(selectedItem.watchers_count)} watchers
        </span>
      </div>
      <div className="basis-1/2 items-end flex flex-col justify-between text-slate-600 text-right text-sm">
        <p>{selectedItem?.description}</p>
        <div className="flex gap-2 mt-2 items-center text-sm text-right">
          <a
            className="cursor-pointer text-black underline hover:text-primary"
            href={selectedItem?.html_url}
            target="_blank"
            rel="noopener"
          >
            Visit the repo
          </a>
          <img
            src={copyIcon}
            onClick={() => copyText(selectedItem?.html_url)}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
        <Button
          className="mt-auto"
          onClick={() => window.open(selectedItem.html_url, "_blank")}
        >
          Deploy
        </Button>
      </div>
    </div>
  );
}
