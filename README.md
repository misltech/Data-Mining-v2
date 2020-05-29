 **Includes more features and automation**
<br/> *Updated version of this project.* See Data-Mining-v1

This project was created for CUNY Research Foundation to determine if geolocation determines human happiness.

## General Layout of this project:
 1. User types in keyword and a location(autocomplete included)
 2. Parsed form data is then sent to google maps api.
 3. In which returns lat / lon coordinates.
 4. Using this data we're able to get unique results from flickr api.
 5. Each image returned from flickr is then sent to faceplusplus. If it contains a face, it is included in data and is displayed.
 6. User has the option to query multiple locations which will return a bar chart which tells them which location had higher smiles.

## Beta: See beta branch
 - Import your own API keys
 - Better data structure
 - Flickr Image Randomizer
 - Slightly improved queue system using promises.
 - Fixed syncronous picture fetching.
 - Better UI/UX using SweetAlert.js
