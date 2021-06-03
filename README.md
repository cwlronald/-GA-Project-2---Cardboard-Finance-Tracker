# Cardboard Finance Tracker

## Introduction

Link to website: https://pacific-wildwood-59476.herokuapp.com/

Ever since I was young, I have always had an extreme passion in the collectible aspect of trading card games but not so much the playing of the actual card game(the last time I actually learnt and played a card game was more than a decade ago). Pokemon, Yu-Gi-Oh, Raw Deal, Final Fantasy, Neopets, Battle Spirits, Flesh and Blood..... I've dabbled in collecting most of them. As I got older, the financial aspect of treating these hobbyist items as actual assets for investments intrigued me more and more. Since 2017, I've been actively tracking my personal portfolio of collectibles via Googlesheets. The data was recorded on a cost basis but not on actual market price valuation. Hence, I decided to build something that would allow me to track it!

Unfortunately, I am not able to pull the live card prices from the API as I would get a 429 error request. This is due to my approach to the project which I will talk about further. 

## Code breakdown
The code can be broken down as such:
- Pull card data from API: https://pokemontcg.io/
- Pull account information from firebase
- Data prep between both data sets
- Displaying the data on the webpage
- Search function to trigger the pokemon API for card information
- Enabling live read and write from firebase and on the webpage
- Account creation + login/out + update profile

## Biggest challenges (descending order)
### Planning out how and what data I needed to pull 
This was by far the biggest challenge I faced. It was not so much a test of my ability to code, but a test of my ability to plan out the flow of actions and data that passes through my code. It was more akin towards an optimization game rather than a brute force coding issue.
- The data stored on firebase was as lean as possible, only consisting of the user, what card he has and the quantity.
- Whenever the website started running, data from firebase would be pulled and used to query the pokemon API to get the market prices. This was because I wanted the user to be able to consistently see the value of their portfolio on the navigation bar. 
- These multiple requests immediately started to throttle
- This was made worse by the fact that the search card function would pull all the cards of the same pokemon
- Which boils down to my next point

### Understanding useEffects, states, Promises, async functions and the whole nine yards
It's a complicated(?) topic, but I'm still trying my best to understand it. Alot of doing right now and not enough understanding. Issac was able to fix alot of my issues because he understood the above mentioned functions better

### CSS
What else can I say? truly a love hate relationship. But I hope I get there. It took me way too long to get the data to display simply like this. Way way way too long.

### Everything else
The last part which was challenging enough was coding in the mindset of the react framework. I am beginning to realize that it makes life alot easier once you get the hang of it.

## Future improvements
Due to the API limitation, it is not feasible to get this app out to many users until I'm able to fix it. Assuming that I can do that, the next step would be to integrate ebay API data to get a comprehensive view on the prices of graded cards as well.


