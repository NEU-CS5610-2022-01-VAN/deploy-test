fetch("https://northeastern-university-343405.uw.r.appspot.com/users")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
