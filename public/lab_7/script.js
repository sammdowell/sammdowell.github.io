function convertRestaurantsToCategories(restaurantList) {
  console.log('testfunctionresturant');
  // process your restaurants here!
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
  console.log('testfunctionmakeyouroptionsobject');
  // set your chart configuration here!
  CanvasJS.addColorSet('purpleShades', [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
    '#DDA0DD',
    '#FF00FF',
    '#9370DB',
    '#F488F0',
    '#8B008B',
    '#6D2AFF'
  ]);
  const canvasJSConfigObject ={
    animationEnabled: true,
    colorSet: 'purpleShades',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Resturants by Category',
      interval: 10,
      maximum: 200,
      labelFontSize: 12,
      // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
      scaleBreaks: {
	      customBreaks: [{
	             startValue: 40,
	             endValue: 50,
	             color: 'teal',
	             type: 'zigzag'
        },
        {
	             startValue: 85,
	             endValue: 100,
	             color: 'teal',
	             type: 'zigzag'
        },
        {
          startValue: 140,
          endValue: 175,
          color: 'teal',
          type: 'zigzag'
        }]
 
      },
    },
    
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
  return canvasJSConfigObject;
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('testfunctionrunthiswithresultsfromserver');
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
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
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer));
  console.log('testfunctioneventlistener');

});