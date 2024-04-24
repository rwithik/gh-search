import RepoCard from "./features/RepoCard/RepoCard";
import RepoSearch from "./features/RepoSearch/RepoSearch";

function App() {
  return (
    <div className="mx-auto p-6 flex flex-col gap-8 items-center w-[75vw] max-w-[650px]">
      <h1>GitHub Search</h1>
      <RepoSearch />
      <RepoCard />
    </div>
  );
}

export default App;
