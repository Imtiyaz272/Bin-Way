# Bin Way

Bin Way is waste management platform that streamlines the waste collection process using real-time monitoring and route optimization. It enables efficient management of waste bins by notifying authorities when bins are full and optimizing collection routes to save time and resources. Built with MERN stack, this platform aims to enhance operational efficiency, creating a cleaner and smarter environment for communities.

![B1](https://github.com/user-attachments/assets/9f3a4adf-6d15-43dd-9c9f-f14201cc1739)

## **Technologies Used**

Bin Way is built using the following technologies:

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js , Express.js
- **Database**: MongoDB
- **Development Tools**: VS Code , Git & GitHub

## **Features**

1. Role based access for admin and driver.
2. Citizens can report any issues with location details.
3. Admin can get the overview and monitor collection progress of bins for better management.
4. Drivers are provided with optimized collection routes.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Imtiyaz272/bin-way.git
   ```

2. **Navigate to the project folder**

   Change into the project directory:
   ```bash
   cd Bin-Way
   ```
3. **Install backend dependencies**

   Navigate to the backend folder and install required dependencies:
   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies**

   Go to the frontend folder and install required dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
5. **Start the backend server**

   Navigate back to the backend folder and start the server:
   ```bash
   cd backend
   npm start
   ```

6. **Start the frontend server**

   Navigate to the frontend folder and start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev

## **Usage**

To use Bin-Way, follow these steps:

1. **Report an issue as a citizen:**

    ![B2](https://github.com/user-attachments/assets/8dcbd42d-f1c6-4ace-8ac5-5b724455fb4f)

    ![B3](https://github.com/user-attachments/assets/f1172811-3cb1-43eb-b17b-47932239550f)

2. **Admin Dashboard:**

    * Login as an admin 
   
       ![B4](https://github.com/user-attachments/assets/05e14f7b-41e9-4e45-a114-e201a41a4240)
       
       ![B5](https://github.com/user-attachments/assets/08b1f1f6-c152-4093-bac6-ca314e889ebc)

    * Check the issues reported by user
   
       ![B6](https://github.com/user-attachments/assets/a507282e-e11b-4fa4-aae7-892675e38fff)

    * After the issue has been resolved, it can be removed by marking it as resolved 
   
       ![B7](https://github.com/user-attachments/assets/6c31fd08-e6a8-4714-a5b7-d4298d30c019)
   
       ![B8](https://github.com/user-attachments/assets/66072778-de3f-46b1-8dec-466ac48c762e)

    * Check the status of the bins whether they have been picked up, what are their levels and monitor the collection progress 
   
       ![B8-9](https://github.com/user-attachments/assets/5ffb8efb-1bbe-4631-a7e4-09ddba1fab92)
   
    * Enter the ward name whose status you have to check :
       
       ![B9](https://github.com/user-attachments/assets/405800b5-75bb-4255-bb20-accaf32c7cc3)
   
       ![B18](https://github.com/user-attachments/assets/64a05917-73dc-4104-a3f5-1df682ed3283)


    * The ward data is available to admin (ward names with their ids so that it will be easier for them )

       ![B10](https://github.com/user-attachments/assets/1be0a1f9-d8fe-4e1c-9d55-30449ea98049)
   
       ![B11](https://github.com/user-attachments/assets/926ab472-968d-46bc-bd0c-ed2c027f4e89)


3. **Pickup Man/Driver Dashboard:**

   Driver can enter the ward name assigned to him for the collection of bins. The bins are prioritized based on their fill level, with preference given to those above 50%. If the truck still has remaining capacity, dynamic programming is used to select additional bins to maximize waste collection in a single trip. An optimized route for collecting the bins is then generated using the Leaflet API.
   ![B12](https://github.com/user-attachments/assets/951fc003-2256-4ea1-8817-601b866c1165)

   ![B13](https://github.com/user-attachments/assets/b5a24588-fa76-456b-abd4-fdad2a25a8a1)

   ![B14](https://github.com/user-attachments/assets/e6e0c302-9242-4830-9f2b-e4c3476674e8)

   ![B15](https://github.com/user-attachments/assets/2fcac698-f31d-4a82-8e2f-ba7f893e6335)

  For a pickup man, a table will be provided to mark the bin as picked up, after it has been collected. This data will be updated and provided to admin so that he can monitor the process.

  ![B16](https://github.com/user-attachments/assets/08686f9c-eb22-4994-aa8e-56934a5caddf)

  ![B17](https://github.com/user-attachments/assets/2a17aee3-7295-4f25-bad3-e9cdff94a9c9)


## **Future Enhancements**
 
- Integration with IoT sensors for automated bin status updates.
- Advanced analytics using AI for waste management insights.
- Mobile application for increased accessibility.

---
Thank you for exploring Bin Way! 🚀
