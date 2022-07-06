# DB Updating Table Dev Challenge

## Update July 6th:

- Refactor the app code to divide it into functional and architectural layers so it's easy to divide and share functionalities among the app components

## Issues found June 14th:

1. Not able to update the table based on STOMP subscribe event. I was only able to discard duplicates (not to update its values into the already existing fields) and sort by the asked column

2. Not able to make a functional solution for point 2) of this challenge. I was able to draw sparklines for each row but these are based in random numbers... As I wasn't able to track and update each currency pair values, I wasn't able to make the x axis (time) and calculate de Midprice.

3. I think my main issue with this challenge has been to be working with websockets and STOMP that I never worked with and not been able to update the stream of data properly into the table. I had to spent a lot of time reading STOMP documentation to be able to work with its methods and events.

4. I think I could have been able to achieve a major percent of this challenge if I could use React and beeing free to fetch data from an REST API or other similar data stream. I could have been able to perform an updating table, rerendering this information based on the state or context (saving the continuous flow of data in any of these solutions).

5. By having the prior point fulfilled I think I could have been approach the sparklines part of the challenge with more confidence.
