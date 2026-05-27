# The Odin Project - Where's Wally

## Summary

This is a photo tagging app using the same idea as the book "Where's Wally". The user will try to find the characters on an images and by clicking on the image in the correct place the user with notified if they have found Wally and his friends.

## To-do

- Setup app with a front and back end
- Setup database to store the images pixel co-ordinates of different images.
- Choose image (choose different sizes. phone, tablet and computer)
- Plot co-ordinates on images of characters
- create the frontend where the user clicks on the image a displays a box and a dropdown menu that shows the character then they choose which one it is. If the user clicks away, then the box and dropdown disappear
- Once the front end displays this, then hook this with the backend which has all the correct pixel co-ordinates for the images and character. This will validate the user if they are correct. To help with different screen size, in the logic, Figure out which screen size it is first. then show the right co-ordinates for that screen size. When fetching the validation. Take it from the table which corresponds to the screen size
- Create a display for when they are correct. like show a border around the character that has been found
- Setup a way of timing the user (done server side)
- Keep the score and when the user finds all the characters. prompt for their name and show time it took for a leader board (use a popup for the name adding)

### Database tables

- user (id, name, time)
  - Create
  - Read
- characters (id, name, screenSize, co-ordinates)
  - Create
  - Read (filter by screen size then match co-ordinates)
