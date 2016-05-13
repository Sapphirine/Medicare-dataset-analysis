# Medicare-dataset-analysis

Refer to video for the detailed explanation of the steps of execution:


To get the US average state-wise spending for all diseases to be reflected in the UI:

  1. ./db.sh
  2. python cost_predictor.py 
  3. npm install
  4. node server.js
  5. Go to the browser and type http://127.0.0.1:9000/spending
  
  The above steps lead you to the web page where the US map showing average state-wise 
  spending for all diseases is shown.
  
To get the US total state-wise spending for all diseases to be reflected in the UI:

  1. ./db.sh
  2. python total_predictor.py 
  3. npm install
  4. node server.js
  5. Go to the browser and type http://127.0.0.1:9000/spending
  
  The above steps lead you to the web page where the US map showing total state-wise 
  spending for all diseases is shown.
  
To get the disease trends prediction:

  1. ./db_test.sh
  2. python count_predictor.py 
  3. npm install
  4. node server.js
  5. Go to the browser and type http://127.0.0.1:9000/trend
  
  The above steps lead you to the web page where the bar graph for the disease trends in 2016 is shown
  
  To get the hospital recommendation for a particular zipcode:
  
  1. npm install
  2. node server.js
  3. Go to the browser and type http://127.0.0.1:9000/reco
  4. Type in the zipcode in the input search box

  The above steps lead you to the web page where hospital recommendation for the zipcode entered is shown
