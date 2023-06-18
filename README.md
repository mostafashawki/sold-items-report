# Sales Report example using React

This is a sample React application that demonstrates the implementation of a DataTable component (without any third party libray so it 100% React, Javascript and css) to display data and usage of dark theme using CSS variables. The app allows users to toggle between a light and dark theme and dynamically filter and display data in a table and collapse/expand columns and rows using CSS transitions.

## Features

- Dark theme toggle button with sun 🌞 and moon 🌚 icons.
- DataTable component to display data in a tabular format.
- Filter functionality to dynamically search and display filtered data using `Show Orders by Countries` button.
- Smooth transitions when collapse/expand columns and rows using CSS transitions, exapnding column by clicking on the `Total Value` header to see the divided amout by brand, and to expand row by clicking on the value itself on each row to see all the orders history items.
- Use `handleRetrieveAllData` function to retrieve all data.
- `Loading` effect on retreiving data and `Debounce` effect on filteration.

## How to Run

Follow the instructions below to run the React app locally:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/mostafashawki/sold-items-report.git
   ```

2. Navigate to the project directory:

   ```bash
   cd project-directory
   ```

3. Install dependencies using npm or Yarn:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173/` to view the app.

## Technologies Used

- React - JavaScript library for building user interfaces.
- Vite - Fast build tooling for modern web applications.
- CSS - Cascading Style Sheets for styling the app.
- JavaScript - Programming language used for logic and interactivity.
- JSX - JavaScript Syntax Extension and occasionally referred as JavaScript XML

## License

This project is licensed under the MIT License.