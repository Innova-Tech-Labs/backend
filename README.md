##Document routes

# Project Routes Documentation

This README provides detailed documentation of the backend server routes for the project. It covers the various operations available through these routes, including managing scavenger hunts, handling photo uploads, awarding badges, and generating social share links.

## Overview

The backend server supports a range of functionalities that are crucial for the operation of the application. These include CRUD operations for scavenger hunts, photo management, badge awards, and social sharing capabilities.

## Routes

### /scavenger

**Description:** Manages operations related to scavenger hunts.  
**Endpoints:**
- **GET /scavenger:** Retrieves all scavenger hunts.
- **POST /scavenger:** Creates a new scavenger hunt.
- **DELETE /scavenger/:id:** Deletes a scavenger hunt by its ID.  

**Expected Output:**
- **GET /scavenger:** Returns an array of scavenger hunt objects.
- **POST /scavenger:** Returns the newly created scavenger hunt object.
- **DELETE /scavenger/:id:** Returns a success message indicating deletion.

### /photo

**Description:** Handles photo uploads and retrieval of user-specific photos.  Extends photo upload functionality by analyzing and describing photo content using AI services.
**Endpoints:**
- **POST /photo/upload:**  a photo and generates a description using AI
- **GET /photo:** Retrieves all photos uploaded by the user.Retrieves all photos uploaded by the user with their descriptions.

**Expected Output:**
- **POST /photo/upload:** Returns a success message upon successful photo upload.
- **GET /photo:** Returns an array of photo objects uploaded by the user.

### /social

**Description:** Generates social share links for scavenger hunts and other content.  
**Endpoints:**
- **GET /social/share/:id:** Generates social share links for a scavenger hunt.

**Expected Output:**
- **GET /social/share/:id:** Returns an object containing social share links for the specified scavenger hunt.

### /badges

**Description:** Manages badge awards and retrieval for users.  
**Endpoints:**
- **POST /badges:** Awards a badge to a user.
- **GET /badges/user/:userId:** Retrieves badges awarded to a user.

**Expected Output:**
- **POST /badges:** Returns a success message upon successful badge award.
- **GET /badges/user/:userId:** Returns an array of badges awarded to the specified user.


### /lists

**Description**: Manages operations related to lists such as creating, retrieving, updating, and deleting lists.
**Endpoints:**
- **GET /lists:** Retrieves all lists.
- **GET /lists/:id:** Retrieves a specific list by its ID.
- **POST /lists:** Creates a new list.
- **PUT /lists/:id:** Updates an existing list by its ID.
- **DELETE /lists/:id:** Deletes a list by its ID.

#### Expected Output:

- **GET /lists:** Returns an array of list objects.
- **GET /lists/:id:** Returns the specified list object if found, otherwise returns a 404 status with an error message.
- **POST /lists:** Returns the newly created list object.
- **PUT /lists/:id:** Returns the updated list object if the update is successful, otherwise returns a 404 status if the list is not found.
- **DELETE /lists/:id:** Returns a success message indicating deletion if the delete operation is successful, otherwise returns a 404 status if the list is not found.


## Additional Functionality

- **Social Share Tracking:** Implement functionality to monitor and record social shares for each piece of content, enhancing engagement analytics.
- **Customize Share Messages:** Provide options for users to customize share messages before generating social share links, allowing for personalized communication.

##
- last upload 2:30pm on 4/17/2024 PST

node test/testDescribeImage.js