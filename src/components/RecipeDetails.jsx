import { useParams } from 'react-router-dom';

function RecipeDetails({ list }) {
  const { title } = useParams();
  const formattedTitle = title.replace(/_/g, ' ');
  const recipe = list?.find((item) => item.title === formattedTitle);

  if (!list) {
    return <div>Loading recipe details...</div>;
  }

  if (!recipe) {
    return <div>Recipe not found!</div>;
  }

  return (
    <div className="recipe-details">
        <h1>{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
        <p><strong>Health Score:</strong> {recipe.healthScore}</p>
        <p><strong>Description:</strong></p><div dangerouslySetInnerHTML={{ __html: recipe.summary || 'No description available.' }} />
        <p><strong>Dish Types:</strong></p> 
        <ul>
          {recipe.dishTypes && recipe.dishTypes.length > 0 ? (
            recipe.dishTypes.map((dishType, index) => (
              <li key={index}>{dishType}</li>
            ))
          ) : (
            <li>No dish types available.</li>
          )}
        </ul>
    </div>
  );
}

export default RecipeDetails;