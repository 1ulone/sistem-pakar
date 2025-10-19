import { Route, Routes } from "react-router-dom";
import Prompt from "./Pages/Prompt";
import Result from "./Pages/Result";

export default function App() {
    return (
        <div>
            <p className="absolute text-center text-yellow-400 regular-font text-shadow-lg right-5 top-5 font-bold">
                MUHAMMAD ULWAN ZUHDI <br/>
                223443087 - 3AEC4 
            </p>

            <p className="absolute text-center text-yellow-400 regular-font text-shadow-lg left-5 top-5 font-bold">
                TUGAS SISTEM INTELEJEN <br />
                SISTEM PAKAR
            </p>

            <Routes>
                <Route path="/" element={<Prompt />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </div>
    )
}
