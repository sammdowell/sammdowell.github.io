function convertRestaurantsToCategories(restaurantList) {
  const catArray = [];
  const result = {};
  for (let i = 0; i < restaurantList.length; i += 1) {
    catArray.push(restaurantList[i].category);
  }
  for (let i = 0; i < catArray.length; i += 1) {
    if (!result[catArray[i]]) {
      result[catArray[i]] = 0;
    }
    result[catArray[i]] += 1;
  }

  const reply = Object.keys(result).map((category) => ({
    y: result[category],
    label: category
  }));

  console.log('reply', reply);
  return reply;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  return {
    animationEnabled: true,
    colorSet: 'greenShades',
    title: {
      text: 'Places To Eat Out In The Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Restaurants By Category',
      labelFontSize: 12,
      scaleBreaks: {
        customBreaks: [{
          startValue: 40,
          endValue: 40,
          color: 'orange'
        },
        {
          startValue: 85,
          endValue: 100,
          color: 'orange'
        },
        {
          startValue: 140,
          endValue: 175,
          color: 'orange'
        }]
      }
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      color: '#014D65',
      dataPoints: datapointsFromRestaurantsList
    }]
  };

  function runThisWithResultsFromServer(jsonFromServer) {
    console.log('jsonFromServer', jsonFromServer);
    sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
    CanvasJS.addColorSet('greenShades',
      [// colorSet Array

        '#2F4F4F',
        '#008080',
        '#2E8B57',
        '#3CB371',
        '#90EE90'
      ]);

    const dataPoints = convertRestaurantsToCategories(jsonFromServer);
    const options = makeYourOptionsObject(dataPoints);

    const chart = new CanvasJS.Chart('chartContainer',
    chart.render();
    $(window).on('resize', () => {
      chart.render();
    });

    document.body.addEventListener('submit', async (e) => {
      e.preventDefault(); // this stops whatever the browser wanted to do itself.
      const form = $(e.target).serializeArray();
      fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
        .then((fromServer) => fromServer.json())
        .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
        .catch((err) => {
          console.log(err);
        });
    });
}