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

**Description:** Handles photo uploads and retrieval of user-specific photos.  
**Endpoints:**
- **POST /photo/upload:** Uploads a photo.
- **GET /photo:** Retrieves all photos uploaded by the user.

**Expected Output:**
- **POST /photo/upload:** Returns a success message upon successful photo upload.
- **GET /photo:** Returns an array of photo objects uploaded by the user.

### /photoRoutes

**Description:** Extends photo upload functionality by analyzing and describing photo content using AI services.  
**Endpoints:**
- **POST /photoRoutes/upload:** Uploads a photo and generates a description using AI.
- **GET /photoRoutes:** Retrieves all photos uploaded by the user with their descriptions.

**Expected Output:**
- **POST /photoRoutes/upload:** Returns a success message on successful photo upload with a description.
- **GET /photoRoutes:** Returns an array of photo objects with descriptions uploaded by the user.

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

## Additional Functionality

- **Social Share Tracking:** Implement functionality to monitor and record social shares for each piece of content, enhancing engagement analytics.
- **Customize Share Messages:** Provide options for users to customize share messages before generating social share links, allowing for personalized communication.

##
- last upload 2pm on 4/16/2024 PST