import  useLeagueContext  from "../../context/useLeagueContext";
  
const CurrentLeagueView = () => {

  const { currentLeague } = useLeagueContext();


  return (
    <div>
      <h1 className="text-2xl font-bold">{currentLeague?.name}</h1>
      {/* <h2 className="text-lg font-semibold">Current Season: {currentSeason?.name}</h2> */}
      {/* dump all season info as a string into a div */}
      {/* <div className="text-sm text-gray-500">{JSON.stringify(currentSeason)}</div> */}
    </div>
  );
};

export default CurrentLeagueView;
