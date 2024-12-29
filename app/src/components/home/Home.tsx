import { useAppData } from "../../context/AppDataContext";
import { Ingredient } from "../../types/types";
import { getUniqueIngredients } from "../../utils/utils";
import DaysSection from "../day/DaysSection";
import IngredientsSection from "../ingredient/IngredientsSection";
import "../../styles/components/home/Home.css";

const Home = () => {
  const { days, recipes, ingredients } = useAppData();
  const weeklyIngredients: Ingredient[] = getUniqueIngredients(days, recipes, ingredients);

  return (
    <div>
      <h1>Home Page</h1>
      <div className="home-container">
        <DaysSection/>
        <IngredientsSection ingredients={weeklyIngredients} />
      </div>
    </div>
  );
}

export default Home;