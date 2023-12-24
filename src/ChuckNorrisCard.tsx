import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import axios from 'axios';

const ChuckNorrisCard: React.FC = () => {
    const [joke, setJoke] = useState<any>({});
    const [cocktail, setCocktail] = useState<any>({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchChuckNorrisJoke = async () => {
        try {
          const response = await axios.get('https://api.chucknorris.io/jokes/random');
          setJoke(response.data);
        } catch (error) {
          console.error('Error fetching Chuck Norris joke:', error);
        }
      };
  
      const fetchCocktail = async () => {
        try {
          const cocktailResponse = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
          setCocktail(cocktailResponse.data.drinks[0]);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching cocktail:', error);
        }
      };
  
      fetchChuckNorrisJoke();
      fetchCocktail();
    }, []);
  
    return (
      <Card
        title="Chuck Norris Joke and Cocktail"
        style={{ width: 300, margin: 'auto', marginTop: 20 }}
        cover={<img alt="Chuck Norris" src={cocktail.strDrinkThumb} />}
      >
        {loading ? (
          <Spin size="large" />
        ) : (
          <div>
            <p>
              <strong>ID:</strong> {joke.id}
              <br />
              <strong>Value:</strong> {joke.value}
            </p>
            <p>
              <strong>Cocktail Glass:</strong> {cocktail.strInstructions}
            </p>
          </div>
        )}
      </Card>
    );
  };
  
  export default ChuckNorrisCard;