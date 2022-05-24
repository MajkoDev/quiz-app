import { useEffect, useState } from "react";

function Settings() {
  // storing data from API response using setOptions
  const [options, setOptions] = useState(null);

  // loading state
  const [loading, setLoading] = useState(false);

  const [questionCategory, setQuestionCategory] = useState("");

  // make request using fetch
  // pass JSON  as a payload in setOptions
  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (response) => {
          setOptions(response.trivia_categories);
        },
        [setOptions]
      );
  });

  // event that is called when an option is chosen
  const handleCategoryChange = (event) => {
    setQuestionCategory(event.target.value);
  };

  if (!loading) {
    return (
      <div>
        <div>
          <h2>Select Category:</h2>
          <select value={questionCategory} onChange={handleCategoryChange}>
            <option>All</option>
            {options &&
              options.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    );
  } else {
    <p>LOADING...</p>;
  }
}

export default Settings;
