import React from "react";
import Navbara from "../Components/Navbara";
import Card from "../Components/Card";
import Search from "../Components/Search";
import Btnpost from "../Components/Btnpost"


function Accueil() {
  return (
    <div>
      <Navbara/> 
      <Search/>
      <Btnpost/>
      <Card/>


      

    </div>
  );
}

export default Accueil;
