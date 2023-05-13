/**
 * index.tsx: The index.tsx file (or index.js for JavaScript) corresponds to the root route (/) of your application. 
 * It's the main entry point of your application when users visit your website's home page. 
 * You can name other files inside the pages folder according to the route you want them to represent. 
 * For example, if you want a route for /about, you would create a file named about.tsx inside the pages folder.
 */
import React from 'react';
import TextInput from '../components/TextInput';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <TextInput />
    </div>
  );
};

export default Home;
