import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard.jsx'
import GeneralDetails from './components/GeneralDetails.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';
import ChartA from './components/ChartA.jsx';
import ChartB from './components/ChartB.jsx';
import Menu from './components/Menu.jsx';

function App( {renderDetails} ) {
  const [list, setList] = useState(null);
  const [longest, setLongest] = useState(null);
  const [shortest, setShortest] = useState(null);
  const [avgHealth, setAvgHealth] = useState(null);
  const [avgTime, setAvgTime] = useState(null);

  const [minHealth, setMinHealth] = useState(0);
  const [maxHealth, setMaxHealth] = useState(100);


  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()) &&
        item.healthScore >= minHealth &&
        item.healthScore <= maxHealth
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
  };

  console.log("Render value: ", renderDetails)
  useEffect(() => {
    const getRecipeData = async () => {
      const response = await fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=" + ACCESS_KEY + "&addRecipeInformation=true&number=10&sort=random");
      const json = await response.json();
      setList(json.results);
      
      if (json.results.length > 0) {
        const longestRecipe = json.results.reduce((a, b) => a.readyInMinutes > b.readyInMinutes ? a : b);
        const shortestRecipe = json.results.reduce((a, b) => a.readyInMinutes < b.readyInMinutes ? a : b);
        const avgTime = Math.round(json.results.reduce((sum, r) => sum + r.readyInMinutes, 0) / json.results.length);
        const avgHealth = Math.round(json.results.reduce((sum, r) => sum + r.healthScore, 0) / json.results.length);

        setLongest(longestRecipe);
        setShortest(shortestRecipe);
        setAvgTime(avgTime);
        setAvgHealth(avgHealth);
        setFilteredResults(json.results);
      }
      };
      getRecipeData().catch(console.error);
    }, []);


      // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:(
        <>
          <div className='top-container'>
            <h2>General Details</h2>
            <div className='details-container'>
              <GeneralDetails data = {longest} type='longest'/>
              <GeneralDetails data = {shortest} type='shortest'/>
              <GeneralDetails data = {avgTime} type='avgTime'/>
              <GeneralDetails data = {avgHealth} type='avgHealth'/>
            </div>
            <div className='chart-dashboard-container'>
              <h2>Dashboard</h2>
              <div className='left-container'>
                <input className='search-bar' type="text" placeholder="Search..." onChange={(e) => searchItems(e.target.value)}/>
                <div className="health-filter">
                  <label>
                    Min Health Score:
                    <input type="range" min="0" max="100" value={minHealth} onChange={(e) => {setMinHealth(Number(e.target.value));searchItems(searchInput);}}/>
                    {minHealth}
                  </label>
                  <label>
                    Max Health Score:
                    <input type="range" min="0" max="100" value={maxHealth} onChange={(e) => {setMaxHealth(Number(e.target.value));searchItems(searchInput);}}/>
                    {maxHealth}
                  </label>
                </div>
                <div className='dashboard-container'>
                  <Dashboard list={filteredResults}/>
                </div>
              </div>
            </div>
          </div>
          <div className='right-container'>
            <h2>Charts</h2>
            <div className='chart-container'>
              <ChartA data={filteredResults} />
              <ChartB data={filteredResults} />
            </div>
          </div>
        </>
    )
    },
    {
      path:"recipe/:title",
      element: <RecipeDetails list={list} />
    }
  ]);


  return (
    <div className='main-container'>
      <div className='sidebar-container'>
        <h1 className='title'>Dish of Data</h1>
        <Menu />
      </div>
      <div className='content-container'>
        {element}
      </div>
    </div>
  )
}

export default App
