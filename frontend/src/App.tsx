import React from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

console.log(process.env.REACT_APP_SUPABASE_URL);
// Initialize the JS client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

// Make a request
function App() {
  const test = async () => {
    const { data, error } = await supabase.from("User").select("*");
    console.log(data, error);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={test}>aaa</button>
      </header>
    </div>
  );
}

export default App;
